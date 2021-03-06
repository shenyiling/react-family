import React from 'react';
import echarts from 'echarts';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

import { option } from './config';

export default class MiniBarChart extends React.Component{
    static defaultProps = {
        className: ''
    }

    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        footerTitle: PropTypes.string.isRequired,
        footerCount: PropTypes.number.isRequired
    }

    componentDidMount() {
        this.graph = echarts.init(this.chartDom);
        this.graph.setOption(option);
    }

    render() {
        const {
            className,
            title,
            count,
            footerTitle,
            footerCount
        } = this.props;

        return (
            <div className={classnames("bar-chart-container", className)}>
                <div className="chart-top">
                    <div className="title">{ title }</div>
                    <div className="total">{ count }</div>
                </div>
                <div 
                    className={classnames("mini-barchart", className)}
                    ref={d => { this.chartDom = d }}
                    >

                </div>
                <div className="chart-bot">
                    <span>{ footerTitle }</span>
                    <span>{ footerCount }</span>
                </div>
            </div>
            
        );
    }
}