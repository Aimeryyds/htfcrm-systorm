import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import moment from 'moment'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

import ServeDetailBaiFang from './detail_baifang'
import Detail2 from './detail-2'
import Detail3 from './detail-3'
import Detail4 from './detail-4'
import Detail5 from './detail-5'
import Detail6 from './detail-6'
import Detail7 from './detail-7'

class ServeDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: []
        }

    }

    componentDidMount() {
        // this.changeTilte("联系详情");
        this.handleData();
    }

    handleData() {
        let { id ,type="2" } = this.props.location.query;
        switch (type) {
            case "1":
                this.getDetail1();
                this.changeTilte("拜访详情");
                break;
            case "2":
                this.getDetail2();
                this.changeTilte("短信详情");
                break;
            case "3":
                this.getDetail3();
                this.changeTilte("邮件详情");
                break;
            case "4":
                this.getDetail4();
                this.changeTilte("电话详情");
                break;
            case "5":
                // this.getDetail5();       //即时通讯详情是列表传递过来的
                this.changeTilte("即时通讯详情");
                break;
            case "6":
                this.getDetail6();
                this.changeTilte("活动详情");
                break;
            case "7":
                this.getDetail7();
                this.changeTilte("礼品详情");
                break;
        }
    }

    /**
     * 拜访详情
     */
    getDetail1() {
        
        this.request({
            api: 'ServeDetail',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            console.log(res.data)
            this.setState({
                detailData: res.data
            })
        })
    }

    /**
     * 短信详情
     */
    getDetail2() {
        this.request({
            api: 'QueryMessageRecordDetail',
            params: {
                serialno: this.props.location.query.id,
                custno: ''
            }
        }, (res)=> {
            this.setState({
                detailData: res.data.data[0]
            })
        })
    }

    /**
     * 邮件详情
     */
    getDetail3() {
        this.request({
            api: 'QueryEmailRecordDetail',
            params: {
                id: this.props.location.query.id,
                address: this.props.location.query.address,
            }
        }, (res)=> {
            this.setState({
                detailData: res.data.data[0]
            })
        })
    }

    /**
     * 电话详情
     */
    getDetail4() {
        this.request({
            api: 'QueryPhoneTouchRecordDetail',
            params: {
                serialno: this.props.location.query.id,
                custno: ''
            }
        }, (res)=> {
            this.setState({
                detailData: res.data.data[0]
            })
        })
    }

    /**
     * 即时通讯详情
     */
    // getDetail5() {
    //     this.request({
    //         api: 'InstantMessagingDetail',
    //         params: {
    //             from: moment().subtract(30, 'days').format('YYYY-MM-DD'),       //发送方ID
    //             to: moment().subtract(0, 'days').format('YYYY-MM-DD'),           //接收方ID
    //         }
    //     }, (res)=> {
    //         this.setState({
    //             detailData: res
    //         })
    //     })
    // }

    /**
     * 活动详情
     */
    getDetail6() {
        this.request({
            api: 'QueryActivityTouchRecordDetail',
            params: {
                serialno: this.props.location.query.id,
                custno: ''
            }
        }, (res)=> {
            this.setState({
                detailData: res.data.data[0]
            })
        })
    }

    /**
     * 礼品详情
     */
    getDetail7() {
        this.request({
            api: 'QueryPresentRecordDetail',
            params: {
                serialno: this.props.location.query.id,
                custno: ''
            }
        }, (res)=> {
            this.setState({
                detailData: res.data.data[0]
            })
        })
    }

    render() {
        let { detailData } = this.state;
        let { type="2" } = this.props.location.query;
        

        return <div className="">

            { type === "1" && <ServeDetailBaiFang data={ detailData } id={this.props.location.query.id}/> }

            { type === "2" && <Detail2 data={ detailData } /> }

            { type === "3" && <Detail3 data={ detailData } /> }

            { type === "4" && <Detail4 data={ detailData } /> }

            { type === "5" && <Detail5 /> }

            { type === "6" && <Detail6 data={ detailData } /> }

            { type === "7" && <Detail7 data={ detailData } /> }

        </div>
    }
}

export default ServeDetail;