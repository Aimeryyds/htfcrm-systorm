import React, { Component, PropTypes } from 'react';
import Module from '../lib/module';
import FastClick from "fastclick";
import $ from 'jquery';
import {  } from 'antd-mobile';
import './mock.js';                   //mock数据，打包时注释掉，否则会拦截ajax请求

class App extends Module {
    constructor(props, context) {
        super(props, context);
        this.context.router;
        this.state = {
            isSuccess: true   //网关改false,内网：true;
        }
    }

    componentWillMount() {
        this.clearTabHistory();
    }

    componentDidMount() {
        this.getAppUserInfo();
        window.themeSet = this.themeSet();
        //关闭loading动画
        document.getElementById("J_app-mask-app-load").style.display = "none";
        FastClick.attach(document.body);
    }

    //初次,清空所有记录的tab状态
    clearTabHistory() {
        let storage=window.localStorage;
        try {
            storage.removeItem('SkListTab');
            storage.removeItem('SkListTabIndex');
            storage.removeItem('SkListLevel');
            storage.removeItem('SkListManage');

            storage.removeItem('QkListTab');
            storage.removeItem('QkListTabIndex');

            storage.removeItem('JJListTab');
            storage.removeItem('JJListTabIndex');

            storage.removeItem('view360Tab');
            storage.removeItem('todoListTab');
            storage.removeItem('JZListTab');
            storage.removeItem('serveListTab');
        } catch (e){
            console.log('IOS10 - localStorage无效')
        }

    }
    
	/**
     * JS文件加载时被执行,返回一个全局方法提供外部调用
     * window.themeSet("1")  金色
     * window.themeSet("2")  棕色
     * @returns {Function}
     */
    themeSet() {
        return function(theme) {
            if(theme === "2") {
                $(".container").removeClass('gold_theme').addClass('brown_theme')
            } else {
                $(".container").removeClass('brown_theme').addClass('gold_theme')
            }
        }
    }

    
    //集成APP用户数据获取
    getAppUserInfo() {
        let that = this;
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let userInfo = '{}';
        let userInfo_JSON;
        if(isAndroid && window.AndroidHtfPortal) {
            userInfo = window.AndroidHtfPortal.GetSysInfo();
            userInfo_JSON = JSON.parse(userInfo);
            this.setCookie('Authorization', userInfo_JSON.token);
            this.setCookie('userInfo', userInfo,  { path: '/' });
            this.setState({
                isSuccess: true
            })
        }
        if(isiOS &&  window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.iosGetUserInfo) {
            window.iosAcceptUserInfo = function (token) {
                userInfo = token;
                userInfo_JSON = JSON.parse(userInfo);
                that.setCookie('Authorization', userInfo_JSON.token);
                that.setCookie('userInfo', userInfo,  { path: '/' });
                that.setState({
                    isSuccess: true
                })
            };
            window.webkit.messageHandlers.iosGetUserInfo.postMessage(null);
        }

    }

    render() {
        let { isSuccess } = this.state;
        return (
            <div className={["container", "gold_theme"].join(' ')}>
                {
                    isSuccess &&
                    this.props.children
                }
            </div>
        )
    }
}

export default App;
