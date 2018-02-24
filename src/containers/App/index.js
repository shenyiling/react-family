import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
    Icon
} from 'antd';
import Sider from '../../components/Sider/index.js';
import './style.less'

import Home from '../Home';
import XssFinder from '../XssFinder';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false
        }
    }

    toggle = () => {
        if(this.state.collapsed) {
            this.setState({
                collapsed: false
            });
        } else {
            this.setState({
                collapsed: true
            });
        }
    }

    render() {
        return (
            <div className="app">
                <Sider 
                    className="side-menu"
                    collapsed={this.state.collapsed}
                    />
                <div className="content">
                    <header>
                        <Icon 
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
                            onClick={this.toggle}
                            />
                        <div className="user">
                        <Icon type='user' />
                            <span>神以灵</span>
                        </div>
                    </header>
                    <div className="app-content">
                        <Route path='/' component={ Home } exact={true} />
                        <Route path='/xss' component={ XssFinder } exact={true} />
                    </div>
                </div>
            </div>
        )
    }
}
