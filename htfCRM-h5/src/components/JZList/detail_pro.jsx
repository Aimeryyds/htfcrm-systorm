import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import Moment from 'moment'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class DetailPro extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {},
        }
    }

    componentDidMount() {
        this.changeTilte("竞品详情");
        this.getDetail();
    }

    getDetail() {
        this.request({
            api:'CompetingGoodsDetails',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }

    render() {
        let { detailData } = this.state;
        
        return <div className="N_customer_List_detail">
            <WhiteSpace size="lg" className="bg_f5"/>

            <div className="info_style_a">
                <WhiteSpace size="lg"/>
                <Flex  className="mb_15">
                    <div
                        style={{
                            color: '#fff',
                            padding: '.05rem .15rem .05rem .2rem',
                            borderRadius: '0rem 0.13rem 0.13rem 0',
                            lineHeight: 1,
                            fontSize: '.16rem'

                        }}
                        className="bg_ui"
                    >
                        {detailData.new_raisetype||'----'}
                    </div>
                </Flex>

                <div className="ml_15 mb_20">
                    <div className='fs_16 color000 mb_5'>
                        { detailData.new_name||'---'}
                    </div>
                    <div className='fs_12 color666'>
                        { detailData.new_fundcode||'---'}
                    </div>
                </div>
                {
                    detailData.productlist &&
                    <WingBlank>
                        <div className="mb_15">
                            <span className="iconfont icon-sjibenxinxi color_ui_linear"
                                  style={{marginRight: '.12rem'}}></span>
                            <span className="fs_16 color_ui">基本信息</span>
                        </div>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">发行日期</div>
                                    <div className="color000 fs_16">{detailData.productlist.new_releasedate || '---'}</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">成立日期</div>
                                    <div className="color000 fs_16">{detailData.productlist.new_establishadte || '---'}</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">竞品类型</div>
                                    <div className="color000 fs_16">{detailData.productlist.raisetype || '---'}</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">竞品规模</div>
                                    <div className="color000 fs_16">{detailData.productlist.assetscale || '---'}</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">期限</div>
                                    <div className="color000 fs_16">{detailData.productlist.term ? (detailData.productlist.term + '天') : '---'}</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">近期收益率</div>
                                    <div className="color000 fs_16">{detailData.productlist.recentyeild || '---'}</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">起购点</div>
                                    <div className="color000 fs_16">{detailData.productlist.purpchaseoint || '---'}</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">所属竞争对手</div>
                                    <div className="color000 fs_16">{detailData.productlist.competitor || '---'}</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">银行平台</div>
                                    <div className="color000 fs_16">{detailData.productlist.parties || '---'}</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">我司同类产品</div>
                                    <div className="color000 fs_16">{detailData.productlist.productid || '---'}</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                }
            </div>








        </div>
    }
}
export default DetailPro;
