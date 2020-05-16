import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { TabBar } from 'antd-mobile';

class footNav extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedTab: 'lcgl',
            currentPath: null
        }
        this.pathMap = {
            Home: '/Home',
            QKList: '/QKList',
            SKList: '/SKList',
            SellCharts: '/SellCharts',
        }
        this.keyMap = {
            '/': 'Home',
            '/Home': 'Home',
            '/QKList': 'QKList',
            '/SKList': 'SKList',
            '/SellCharts': 'SellCharts',

        }
    }

    componentDidMount() {
        let pathname = this.props.pathname;
        this.setState({
            selectedTab: this.keyMap[pathname]
        });
    }

    componentDidUpdate() {
        let pathname = this.props.pathname;
        let { currentPath } = this.state;
        //防止无限循环
        if(pathname === currentPath) {
            return;
        }
        this.setState({
            currentPath: pathname,
            selectedTab: this.keyMap[pathname]
        });
    }

    tabChange(name) {
        this.context.router.push({
            pathname: this.pathMap[name]
        })
        this.setState({
            selectedTab: name
        })
    }


    render() {
        let selectedTab = this.state.selectedTab;
        return <div className="N_foot_nav">
            <TabBar
                barTintColore="#fff"
                tintColor="#DDAF59"
            >
                <TabBar.Item
                    title="首页"
                    key="Home"
                    icon={<div className="iconfont icon-zqianke" ></div>}
                    selectedIcon={<div className="iconfont icon-zqianke color_ui"></div>}
                    onPress={()=>this.tabChange("Home")}
                    selected={selectedTab === "Home"}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="潜客"
                    key="QKList"
                    icon={<div className="iconfont icon-zqianke" ></div>}
                    selectedIcon={<div className="iconfont icon-zqianke color_ui"></div>}
                    onPress={()=>this.tabChange("QKList")}
                    selected={selectedTab === "QKList"}
                >

                </TabBar.Item>
                <TabBar.Item
                    title="客户"
                    key="SKList"
                    icon={<div className="iconfont icon-zkehu"></div>}
                    selectedIcon={<div className="iconfont icon-zkehu color_ui"></div>}
                    onPress={()=>this.tabChange("SKList")}
                    selected={selectedTab === "SKList"}
                >

                </TabBar.Item>
                <TabBar.Item
                    title="报表"
                    key="SellCharts"
                    icon={<div className="iconfont icon-zbaobiao"></div>}
                    selectedIcon={<div className="iconfont icon-zbaobiao color_ui"></div>}
                    onPress={()=>this.tabChange("SellCharts")}
                    selected={selectedTab === "SellCharts"}
                >

                </TabBar.Item>

            </TabBar>
        </div>
    }
}

export default footNav;

// <TabBar.Item
//     title="报表"
//     key="SellCharts"
//     icon={<div className="iconfont icon-yewuguanli"></div>}
//     selectedIcon={<div className="iconfont icon-yewuguanli"></div>}
//     onPress={()=>this.tabChange("table")}
//     selected={selectedTab === "table"}
//     selected={selectedTab === "table"}
// >
//
// </TabBar.Item>