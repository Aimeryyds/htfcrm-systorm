import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Text, ListView, SearchBar } from 'antd-mobile';

class CustomeGroupSearchDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {}
        }
    }

    componentDidMount() {
        this.changeTilte("");
        this.getCustInfo();
    }

    /**
     * 获取客户信息
     * 前端搜索
     * @returns {*}
     */
    getCustInfo() {
        let { id, custno } = this.props.location.query;
        let _params = {
            custGroupId: id
        };
        this.request({
            api: 'GetCustInfo',
            params: _params
        }, (res)=>{
            let data = res.data;
            let _data = data.filter(item => item.custno === custno);
            console.log(_data,data)
            this.setState({
                detailData: _data[0]
            })
        })
    }

    render() {
        let { detailData } = this.state;


        return <div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
            <Flex justify="between" style={{padding: ".10rem .15rem"}}>
                <Text className="fs_14 color333">
                    { detailData.name }
                    ({ detailData.custno })
                </Text>
            </Flex>

            <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                    <Flex align="start">
                        <span className="iconfont1 icondangniandengjilishidengji fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">当年等级</div>
                            <div className="fs_12 color999 mt_10">
                                { detailData.ecvip }
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
                <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                    <Flex align="start">
                        <span className="iconfont1 icondangniandengjilishidengji fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">历史等级</div>
                            <div className="fs_12 color999 mt_10">
                                { detailData.echisvip }
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
            </Flex>
            <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                    <Flex align="start">
                        <span className="iconfont1 iconbaoyouliang fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">保有量</div>
                            <div className="fs_12 color999 mt_10">
                                { this.fmoney(detailData.currentq) }万元
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
                <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                    <Flex align="start">
                        <span className="iconfont1 iconbaoyouliang fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">历史最高保有量</div>
                            <div className="fs_12 color999 mt_10">
                                { this.fmoney(detailData.highes) }万元
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
            </Flex>
            <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                    <Flex align="start">
                        <span className="iconfont1 icondianhua fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">手机号</div>
                            <div className="fs_12 color999 mt_10">
                                { this.formatPhone(detailData.mobile) }
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
                <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                    <Flex align="start">
                        <span className="iconfont1 iconfuzeren fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">负责人</div>
                            <div className="fs_12 color999 mt_10">
                                { detailData.ownerName }
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
            </Flex>
            <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                    <Flex align="start">
                        <span className="iconfont1 iconbeizhu fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">备注</div>
                            <div className="fs_12 color999 mt_10 mr_15 hft_hidden_line2" style={{lineHeight: 1.5}}>
                                { detailData.summary }
                            </div>
                        </div>
                    </Flex>
                </Flex.Item>
            </Flex>
            <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                    <Flex align="start">
                        <span className="iconfont1 iconzidingyibiaoqian fs_18 color_ui mr_10"/>
                        <div>
                            <div className="fs_14 color666">自定义标签</div>
                            <Flex  wrap="wrap">
                                {
                                    detailData.customlabel && detailData.customlabel.map((item, index)=>{
                                        return  <div key={index} style={{lineHeight: '.22rem', borderRadius: '.11rem', color: '#FB5C5F', backgroundColor: '#FFF0F0', padding: '0 .07rem'}} className="fs_12 mr_10 mt_10">
                                            { item }
                                        </div>
                                    })
                                }
                            </Flex>
                        </div>
                    </Flex>
                </Flex.Item>
            </Flex>
        </div>
    }
}

export default CustomeGroupSearchDetail;