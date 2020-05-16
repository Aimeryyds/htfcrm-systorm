import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class ActivityDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData:{}
        }
    }

    componentDidMount() {
        this.changeTilte("活动详情");
        this.getDetail();
    }

    getDetail() {
        this.request({
            api: 'GetCampaignDetail',
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

        let {detailData} = this.state;

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
                        { detailData.type || '---' }
                    </div>

                </Flex>
                <WingBlank>
                    <Flex className="mb_15" justify='between' align='start'>
                        <div className="color48 fs_16 mb_5" style={{width:'70%',lineHeight:'0.24rem'}}>{ detailData.name || '---' }</div>
                        <div className="color48 fs_12 mb_5" style={{width:'30%',lineHeight:'0.24rem',textAlign:'right'}}>{ detailData.date || '---' }</div>
                    </Flex>

                    <div style={{wordWrap:'break-word',lineHeight:'0.2rem'}} className='fs_14 color666 mb_30'>
                        { detailData.desc || '---' }
                    </div>



                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">活动对象</div>
                                <div className="color000 fs_16">{ detailData.actobj || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">预算费用</div>
                                <div className="color000 fs_16">{ detailData.budget || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">计划开始时间</div>
                                <div className="color000 fs_16">{ detailData.begin_time || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">计划结束时间</div>
                                <div className="color000 fs_16">{ detailData.end_time || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">创建人</div>
                                <div className="color000 fs_16">{ detailData.createdby || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">创建时间</div>
                                <div className="color000 fs_16">{ detailData.createdon || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">更新人</div>
                                <div className="color000 fs_16">{ detailData.modifiedby|| '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">更新时间</div>
                                <div className="color000 fs_16">{ detailData.modifiedon || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <div className="mb_15">
                        <div className="color999 fs_10 mb_5">活动话术</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ detailData.actspeech || '---' }</div>
                    </div>
                </WingBlank>


            </div>
        </div>
    }
}

export default ActivityDetail;