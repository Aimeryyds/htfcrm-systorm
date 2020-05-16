import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailKHLX extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { detailData, query } = this.props;
        let data = detailData.contact

        if(!data) {
            return <div></div>
        }


        return <div className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f5"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-klianxiren mr_10 color48"></span>客户联系信息
                </div>

                <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdianhua fs_12"></span>
                            </div>
                            <span className="color666">联系电话</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.phone ? this.formatPhone(data.phone) : '---' }
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kshoujihaoma fs_12"></span>
                            </div>
                            <span className="color666">邮编</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.post || '---' }
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex  align="start">
                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kyoujian fs_10"></span>
                            </div>
                            <span className="color666">电子邮箱</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.email || '---' }
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kchuanzhen fs_12"></span>
                            </div>
                            <span className="color666">传真</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.fax || '---' }
                        </div>
                    </Flex.Item>
                </Flex>
                <div className="line fs_14">
                    <div className="icon_a mr_10 bg_ui_linear colorF">
                        <span className="iconfont icon-kdizhi fs_12"></span>
                    </div>
                    <span className="color666">地址</span>
					<span className="ml_10 color999 fs_12">
						{ data.address || '---' }
					</span>
                </div>
            </WingBlank>
        </div>
    }
}

export default DetailKHLX;