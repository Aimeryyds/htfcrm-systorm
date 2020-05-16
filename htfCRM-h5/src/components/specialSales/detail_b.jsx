import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailBase extends Module {
    constructor(props, context) {
        super(props, context);
        this.state={
            isOpen:true,
            openIndex:0
        }
    }

    componentDidMount() {
    }

    isOpenDel(index){
        let { openIndex, isOpen } = this.state;
        if(index === openIndex) {
            this.setState({
                openIndex: index,
                isOpen: !this.state.isOpen
            })
        } else {
            this.setState({
                openIndex: index,
                isOpen: true
            })
        }
    }

    render() {
        let { detailData4 } = this.props;
        let {isOpen,openIndex}=this.state;
        return <div  className="SK_module_a">
            <WhiteSpace style={{height:'0.1rem'}} className="bg_f5"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48" style={{border:0}}>
                    <span className="iconfont1 iconxiangguanchanpin mr_10 colord0d"></span>相关产品
                </div>
                {
                    detailData4.length>0&&detailData4.map((item,index)=>{
                        return (
                            <div key={index}>
                                <Flex style={{padding: '15px',borderTop:'1px solid #eee'}} >
                                    <Flex.Item className="fs_14 color666" style={{flex: 4}} onClick={()=>this.context.router.push({
                                            pathname: '/JJListDetail',
                                            query: {
                                                id:item.productid
                                            }})}>
                            <span style={(isOpen&&openIndex===index)?{lineHeight: '.27rem',color:'#DDAF59'}:{lineHeight: '.27rem',color:'#73affa'}} >
                                {item.productName||'---'}&nbsp;&nbsp;({item.fundcode||'---'})
                            </span>
                                    </Flex.Item>
                                    <Flex.Item onClick={()=>this.isOpenDel(index)} style={{flex: 1.4, textAlign: 'right',}}>
                                        <span style={{transform:'rotate(90deg)',display:'inline-block'}} className="iconfont icon-kgengduo color999"></span>
                                    </Flex.Item>
                                </Flex>
                                {
                                    isOpen&&openIndex===index&&<div>
                                        <div className="line fs_14" style={{border:0,borderBottom:'1px solid #eee'}}>
                                            <div className="icon_b mr_10">
                                                <span className="iconfont1 iconzhuangtai fs_18 color_ui"></span>
                                            </div>
                                            <span className="color666">状态</span>
                                            <span className="ml_10 color999 fs_12">
						{item.statecode||'---'}
					</span>
                                        </div>

                                        <Flex align="start" style={{borderBottom: '1px solid #eee'}}>
                                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                                <div className="fs_14 mb_10">
                                                    <div className="icon_b mr_10">
                                                        <span className="iconfont1 iconchanpinleixing fs_18 color_ui"></span>
                                                    </div>
                                                    <span className="color666">产品类型</span>
                                                </div>
                                                <div className="fs_12 color999 ml_30">
                                                    {item.investtarget||'---'}
                                                </div>
                                            </Flex.Item>
                                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                                <div className="fs_14 mb_10">
                                                    <div className="icon_b mr_10">
                                                        <span className="iconfont1 iconchanpinjingli1 fs_18 color_ui"></span>
                                                    </div>
                                                    <span className="color666">产品经理</span>
                                                </div>
                                                <div className="fs_12 color999 ml_30">
                                                    {item.managerName||'---'}
                                                </div>
                                            </Flex.Item>
                                        </Flex>

                                        <Flex align="start" style={{borderBottom: '1px solid #eee'}}>
                                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                                <div className="fs_14 mb_10">
                                                    <div className="icon_b mr_10">
                                                        <span className="iconfont1 iconkaifangqishiriqi1 fs_18 color_ui"></span>
                                                    </div>
                                                    <span className="color666">开放起始日期</span>
                                                </div>
                                                <div className="fs_12 color999 ml_30">
                                                    {item.openstartdate||'---'}
                                                </div>
                                            </Flex.Item>
                                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                                <div className="fs_14 mb_10">
                                                    <div className="icon_b mr_10">
                                                        <span className="iconfont1 iconkaifangqishiriqi1 fs_18 color_ui"></span>
                                                    </div>
                                                    <span className="color666">开放结束日期</span>
                                                </div>
                                                <div className="fs_12 color999 ml_30">
                                                    {item.openenddtate||'---'}
                                                </div>
                                            </Flex.Item>
                                        </Flex>
                                        <Flex align="start">
                                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                                <div className="fs_14 mb_10">
                                                    <div className="icon_b mr_10">
                                                        <span className="iconfont1 iconkaifangqishiriqi1 fs_18 color_ui"></span>
                                                    </div>
                                                    <span className="color666">初始销售起始日</span>
                                                </div>
                                                <div className="fs_12 color999 ml_30">
                                                    {item.issuedate||'---'}
                                                </div>
                                            </Flex.Item>
                                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                                <div className="fs_14 mb_10">
                                                    <div className="icon_b mr_10">
                                                        <span className="iconfont1 iconkaifangqishiriqi1 fs_18 color_ui"></span>
                                                    </div>
                                                    <span className="color666">初始销售截止日</span>
                                                </div>
                                                <div className="fs_12 color999 ml_30">
                                                    {item.issueenddate||'---'}
                                                </div>
                                            </Flex.Item>
                                        </Flex>
                                    </div>
                                }

                            </div>
                        )
                    })
                }





            </WingBlank>


        </div>
    }
}

export default DetailBase;