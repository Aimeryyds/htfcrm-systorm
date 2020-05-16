import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

const titleMap = {
    '/': '首页',
    '/Home':'首页',
    '/QKList': '潜客列表',
    '/QKListDetail': '潜客详情',
    '/SKList': '客户列表',
    '/SKListDetail': '客户详情',
    '/SellCharts': '销售漏斗',
    '/View360': '客户信息',
    '/ActivityList': '活动列表',
    '/ActivityDetail': '活动详情',
    '/TradingDetail': '交易记录明细',
    '/JZList': '竞争对手',
    '/JZListDetail': '竞争对手详情',
    '/JJList': '基金产品',
    '/JJListDetail': '基金产品详情',
    '/JZListDetailPro':'竞品详情',
    '/LinkMan':'联系人',
    '/LinkManDetail':'联系人详情',
    '/ToDoList':'待办事项',
    '/TodoListDetail':'待办事项',
    '/BusinessProject':'项目漏斗',
    '/BusinessProjectList':'初步接触',
    '/BusinessProjectDetail':'项目详情',
    '/ServeList':'拜访列表',
    '/ServeDetail':'拜访详情',
    '/ManagerFile':'基金经理列表',
    '/ManagerDetail':'基金经理详情',
    '/ManagerInfo':'个人信息',
}

const unBack = {
    '/': true,
    '/Home': true,
    '/QKList': true,
    '/SKList': true,
    '/SellCharts': true,
}

class MyTitle extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    back() {
        this.context.router.goBack()
    }

    render() {

        let {  } = this.state;
        let pathname = this.props.pathname;

        return <div>

            <div className="N_my_title">
                { !unBack[pathname] &&
                    <div className="back iconfont icon-sfanhui color_ui" onClick={()=>this.back()}></div>
                }
                <span className="name">{ titleMap[pathname] }</span>
            </div>

            <div style={{height: '.5rem'}}></div>

        </div>
    }
}

export default MyTitle;