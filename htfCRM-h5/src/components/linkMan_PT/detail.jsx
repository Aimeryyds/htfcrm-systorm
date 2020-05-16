import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class LinkManDetail_PT extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {
                PlatformContact: {}
            }
        }
    }

    componentDidMount() {
        this.changeTilte("联系人信息");
        this.getLeadDetail();
    }

    getLeadDetail() {
        this.request({
            api: 'GetPlatformContactDetail',
            params: {
                new_partiesid: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }

	/**
     * 调用集成方APP电话功能
     * @param tel
     */
    callPhone(tel) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(!tel) { return; }

        if(isAndroid && window.AndroidHtfPortal) {
            window.AndroidHtfPortal.callPhone(tel)
        }
        if(isiOS && window.webkit) {
            window.webkit.messageHandlers.callPhone.postMessage(tel)
        }
    }

    render() {

        let { detailData } = this.state;

        return <div className="N_customer_List_detail">
            <WhiteSpace size="lg" className="bg_f5"/>

            <div className="info_style_a">
                <WhiteSpace size="lg"/>

                <Flex justify="between" className="mb_25">
                    <div className="ml_15">
						<span className="fs_18 color000 mr_10">
							{ detailData.name }
						</span>
                    </div>
                    <div
                        style={{
                            color: '#fff',
                            padding: '.05rem .15rem .05rem .2rem',
                            borderRadius: '.13rem 0 0 .13rem',
                            lineHeight: 1,
                            fontSize: '.16rem'

                        }}
                        className="bg_ui"
                    >
                        { detailData.PlatformContact.new_position || '---' }
                    </div>
                </Flex>

                <WingBlank>
                    <div className="mb_15">
                        <span className="iconfont icon-sjibenxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
                        <span className="fs_16 color_ui">基础信息</span>
                    </div>
                    <Flex className="mb_15" align="start">
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">负责人</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.ownerid || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">对接层面分类</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_level || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align="start">
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">三方客户</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_partiesid || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">日常联系人姓名</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_name || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align="start">
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">所属部门</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_department || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">汇添富对接人姓名</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_htf_contact || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15" align="start">
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">手机联系人方式</div>
                                <div className="color000 fs_16"
                                     onClick={()=>this.callPhone(detailData.PlatformContact.new_mobile)}
                                >
                                    { detailData.PlatformContact.new_mobile ? this.formatPhone(detailData.PlatformContact.new_mobile) : '---'  }
                                </div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">电话联系人方式</div>
                                <div className="color000 fs_16"
                                     onClick={()=>this.callPhone(detailData.PlatformContact.new_tel)}
                                >
                                    { detailData.PlatformContact.new_tel ? this.formatPhone(detailData.PlatformContact.new_tel) : '---' }
                                </div>
                            </div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15" align="start">
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">直接领导人姓名</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_manager_name || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">直属领导人职级</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_manager_position || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15" align="start">
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">部门最高决策领导人姓名</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_top_name || '---' }</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_12 mb_5">部门最高决策领导人职级</div>
                                <div className="color000 fs_16">{ detailData.PlatformContact.new_top_position || '---' }</div>
                            </div>
                        </Flex.Item>
                    </Flex>

                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">备注</div>
                        <div className="color000 fs_16">{detailData.PlatformContact.new_summary || '---'}</div>
                    </div>
                </WingBlank>


                <WhiteSpace size="lg"/>
            </div>



        </div>
    }
}

export default LinkManDetail_PT;


