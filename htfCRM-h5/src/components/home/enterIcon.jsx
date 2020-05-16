import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class EnterIcon extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    signIn() {
        console.log("--签到")
        //签到
        this.request({
            api: 'GetUserInfo',
        }, (res) => {
            let id = res.data.id;
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            if (!id) { return; }

            if (isAndroid && window.AndroidHtfPortal.IappSignIn) {
                window.AndroidHtfPortal.IappSignIn(id);
            }
            if (isiOS && window.webkit) {
                window.webkit.messageHandlers.IappSignIn.postMessage(id);
            }
        })
    }

	/**
     * 签到是个列外,需要调用方法,而不是进行跳转
     */
    handleClick() {
        this.context.router.push({
            pathname: this.props.url
        })
    }

    /**
     * 点击打点
     * @constructor
     */
    CreateEntranceRecord(id, name) {
        console.log(id, name)
        if(id !== "qiandao"){
            if(id) {
                let _params = {
                    entranceId: id,
                    entranceName: name,   //入口名称
                };
                this.request({
                    api: 'CreateEntranceRecord',
                    params: _params
                }, ()=>{
                    this.handleClick();
                })
            } else {
                this.handleClick();
            }

        } else {
            this.signIn();
        }

    }

    render() {
        let { menusRule, id, name } = this.props;

        return menusRule ? <Flex.Item className="module_item">
            <div
                onClick={()=>this.CreateEntranceRecord(id, name)}
                style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
            >
                <div className={["icon-img mb_15", this.props.icon].join(' ')}></div>
                <span className="fs_14 home_text" style={{fontWeight: '200'}}>
                    { name }
                </span>
            </div>
        </Flex.Item>: <div></div>
    }
}

export default EnterIcon;