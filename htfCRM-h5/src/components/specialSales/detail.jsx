import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import DetailA from './detail_a'		//计划目标
import DetailB from './detail_b'		//相关产品
import DetailC from './detail_c'			//深度信息


import $ from 'jquery'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar, Button } from 'antd-mobile';


class Detail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData1: {},				//信息
            detailData2: {},				//信息
            detailData3: {},				//信息
            detailData4: {},				//信息
            detailData5: [],				//信息

        }

    }

    componentDidMount() {
        let { title} = this.props.location.query;
        this.changeTilte(title);
        this.getDetail1();
        this.getDetail2();
        this.getDetail3();


    }

    componentWillUnmount() {

    }





    getDetail1() {
        this.request({
            api: 'GetSpecialDetailA',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData1: res.data.sale,
                detailData2: res.data.Base,
                detailData3: res.data.pla,
            })
        })
    }


    getDetail2() {
        this.request({
            api: 'GetSpecialDetailB',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData4: res.data,
            })
        })
    }

    getDetail3() {
        this.request({
            api: 'GetSpecialDetailC',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {

            this.setState({
                detailData5: res.data,
            })
        })
    }







    render() {
        let {detailData1,detailData2,detailData3,detailData4,detailData5}=this.state;
        return <div className="N_SK_List_detail specialDetail">


            <div className="one_modules">
                <div className="title fs_16 color000">
                    {detailData1.xsjhName||'----'}
                </div>
                <div className="title_label fs_12">
                   <span style={{color:'#FB5C5F',background:'#fff0f0'}}>{detailData1.activitytype}</span>
                    <span style={{color:'#fb935c',background:'#fff9f0'}}>{detailData1.activitystate}</span>
                    {detailData1.highworth==='是'&&<span style={{color:'#66bdff',background:'#edf7ff'}}>高净值</span>}
                    {detailData1.ownoublic==='是'&&<span style={{color:'#66bdff',background:'#edf7ff'}}>自有大众</span>}
                    {detailData1.threeparty==='是'&&<span style={{color:'#66bdff',background:'#edf7ff'}}>三方拓展</span>}

                </div>
                <div className="remarks">
                    <div className="word">备注：</div>
                    <div className="con">
                        {detailData1.describle||'----'}
                    </div>
                </div>
            </div>


            <div  className="SK_module_a">
                <WhiteSpace style={{height:'0.1rem'}} className="bg_f5"/>
                <WingBlank size="sm">
                    <div className="fs_18 color000 m_title color48">
                        <span className="iconfont1 iconjibenxinxi mr_10 colord0d"></span>
                        基本信息
                    </div>
                    <div>
                        <Flex  style={{borderBottom: '1px solid #eee' }} align="start">
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_b mr_10">
                                        <span className="iconfont1 iconxiaoshouneirong fs_18 color_ui"></span>
                                    </div>
                                    <span className="color666">
                                        销售内容
                                    </span>
                                </div>
                                <div className="fs_12 color999 ml_30" style={{wordBreak:'break-all',lineHeight:'0.18rem'}}>
                                    <span className="mr_10" >{detailData2.objective||'----'}</span>
                                </div>
                            </Flex.Item>
                        </Flex>

                        <Flex align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_b mr_10">
                                        <span className="iconfont1 iconbiaojimoban fs_18 color_ui"></span>
                                    </div>
                                    <span className="color666">标记模板</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    {detailData2.istemplate||'----'}
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_b mr_10">
                                        <span className="iconfont1 iconfuzeren fs_18 color_ui"></span>
                                    </div>
                                    <span className="color666">负责人</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    {detailData2.ownerid||'----'}
                                </div>
                            </Flex.Item>
                        </Flex>

                        <div className="line fs_14" >
                            <div className="icon_b mr_10">
                                <span className="iconfont1 iconjihuabianhao fs_18 color_ui"></span>
                            </div>
                            <span className="color666">计划编号</span>
                            <span className="ml_10 color999 fs_12">
						{detailData2.codename||'----'}
					</span>
                        </div>



                    </div>
                </WingBlank>
            </div>

            <DetailA detailData3={detailData3}></DetailA>
            <DetailB detailData4={detailData4}></DetailB>
            <DetailC detailData5={detailData5}></DetailC>








        </div>
    }
}

export default Detail;





