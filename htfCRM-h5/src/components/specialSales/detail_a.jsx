import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailBase extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { detailData3 } = this.props;
        return <div  className="SK_module_a">
            <WhiteSpace style={{height:'0.1rem'}} className="bg_f5"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont1 iconjihuamubiao1 mr_10 colord0d"></span>
                    计划目标
                </div>
                <div>


                    <Flex align="start" style={{borderBottom: '1px solid #eee'}}>
                        <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconjihuakaishishijian fs_18 color_ui"></span>
                                </div>
                                <span className="color666">计划开始时间</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.proposedstart||'---'}
                            </div>
                        </Flex.Item>
                        <Flex.Item style={{padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconjihuajieshushijian fs_18 color_ui"></span>
                                </div>
                                <span className="color666">计划结束时间</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.proposedend||'---'}
                            </div>
                        </Flex.Item>
                    </Flex>

                    <Flex align="start" style={{borderBottom: '1px solid #eee'}}>
                        <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconshijikaishishijian1 fs_18 color_ui"></span>
                                </div>
                                <span className="color666">实际开始时间</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.actualtime||'---'}
                            </div>
                        </Flex.Item>
                        <Flex.Item style={{padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconshijijieshushijian fs_18 color_ui"></span>
                                </div>
                                <span className="color666">实际结束时间</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.actualendtime||'---'}
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex align="start" style={{borderBottom: '1px solid #eee'}}>
                        <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconshijijieshushijian fs_18 color_ui"></span>
                                </div>
                                <span className="color666">总目标指标</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.targetindexid||'---'}
                            </div>
                        </Flex.Item>
                        <Flex.Item style={{padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconbaoshouzongmubiao fs_18 color_ui"></span>
                                </div>
                                <span className="color666">保守总目标</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.conservativetarget||'---'}
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex align="start" style={{borderBottom: '1px solid #eee'}}>
                        <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconjinjiezongmubiao fs_18 color_ui"></span>
                                </div>
                                <span className="color666">进阶总目标</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.advancedtarget||'---'}
                            </div>
                        </Flex.Item>
                        <Flex.Item style={{padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconshijizhi fs_18 color_ui"></span>
                                </div>
                                <span className="color666">实际值</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.actualvalue||'---'}
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex align="start">
                        <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                            <div className="fs_14 mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconyusuanfeiyong fs_18 color_ui"></span>
                                </div>
                                <span className="color666">预算费用</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.budgetcost||'---'}
                            </div>
                        </Flex.Item>
                        <Flex.Item style={{padding: '.15rem .1rem'}}>
                            <div className="mb_10">
                                <div className="icon_b mr_10">
                                    <span className="iconfont1 iconzongchengben fs_18 color_ui"></span>
                                </div>
                                <span className="color666 fs_14">总成本</span>
                            </div>
                            <div className="fs_12 color999 ml_30">
                                {detailData3.actualcost||'---'}
                            </div>
                        </Flex.Item>
                    </Flex>
                </div>




            </WingBlank>


        </div>
    }
}

export default DetailBase;