import React from 'react'
import { Progress, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { is, fromJS } from 'immutable'

import XssHeader from './components/XssHeader'
import SearchBar from './components/SearchBar'
import SiteBar from '../../components/SiteBar'
import './style.less'
import iconSrc from '../../static/dun.svg'
import * as XssActions from './actions'

export class XssIndex extends React.Component {

    static propTypes = {
        xssFinder: PropTypes.object.isRequired,
        xssActions: PropTypes.object.isRequired
    }

    state = {
        loading: false,
        percent: 0
    }

    shouldComponentUpdate(nextProps, nextState) {
        const nextSites = nextProps.xssFinder.toJS().sites
        const { sites } = this.props.xssFinder.toJS()
        return !is(fromJS(this.state), fromJS(nextState)) || !is(fromJS(sites), fromJS(nextSites))
    }

    _delete = error => {
        if(error) {
            message.error('删除失败')
        } else {
            message.success('删除成功')
        }
    }

    done = () => {
        clearInterval(this.timer);
        this.setState({
            percent: 100
        });

        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 2000);
    }

    handleSearch = e => {
        if(e.keyCode === 13) {
            this.props.xssActions.fetchAllSites(e.target.value, this.done);
            this.setState({
                percent: 0,
                loading: true
            });
            this.timer = setInterval(() => {
                if(this.state.percent === 100) {
                    return ;
                }
                let newPercent = Math.floor(this.state.percent + Math.random() * 3 + 1);
                newPercent = newPercent > 95 ? 95 : newPercent;
                this.setState({
                    percent: newPercent
                });
            }, 500);
        }
    }

    render() {

        const {
            xssActions
        } = this.props;

        const {
            sites
        } = this.props.xssFinder.toJS();

        let completedStatus = false
        if(sites && sites.length !== 0) {
            completedStatus = sites.reduce((status, site) => status && site.updated, true)
        }

        return (
            <div className="xss-index">
                <XssHeader completedStatus={completedStatus}/>
                <div className="xss-icon">
                    <img src={iconSrc} alt="xss" />
                </div>
                <SearchBar onSearch={ this.handleSearch } />
                <div className={classnames("loading", {
                    visible: this.state.loading,
                    hide: !this.state.loading
                })}>
                    <span className="progress-title">站点链接挖掘中</span>
                    <Progress 
                        className="progress-bar"
                        percent={this.state.percent} />
                </div>
                <div className="site-container">
                    {
                        sites.map(site => (
                            <SiteBar 
                                key={site.id}
                                status={site.status}
                                url={site.url}
                                handleClick={ done => {
                                    xssActions.updateSiteStatus(site.url, site.id, done);
                                } }
                                onDelete={ () => {
                                        xssActions.deleteSite(site.id, this._delete);
                                } }
                                />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    ({ xssFinder }) => ({ xssFinder }),
    dispatch => ({
        xssActions: bindActionCreators(XssActions, dispatch)
    })
)(XssIndex)