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
        let { detailData, query } = this.props;

        if(!detailData.other) {
            return <div></div>
        }

        return <div  className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f5"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-klianxiren mr_10 color48"></span>客户基本信息
                </div>

                {
                    /**
                     *  非个人
                     */
                    query.userType != 1 &&
                    <div>
                        <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-hangyefenlei fs_12"></span>
                                    </div>
                                    <span className="color666">行业类别</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.industryType ||  '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-zhuceziben fs_12"></span>
                                    </div>
                                    <span className="color666">注册资本</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.other && (detailData.other.regist_capital || '---') }
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-farendaibiao fs_10"></span>
                                    </div>
                                    <span className="color666">法人代表</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.other && (detailData.other.instrepr_nm || '---') }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-zhengjianleixing fs_12"></span>
                                    </div>
                                    <span className="color666">证件类型</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.m_identityType || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>

                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kkehulaiyuan fs_12"></span>
                            </div>
                            <span className="color666">账户初始来源</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.new_acco_from || '---' }
					</span>
                        </div>

                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-zhengjianhaoma fs_12"></span>
                            </div>
                            <span className="color666">证件号码</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.other && (detailData.other.identityno || '---') }
					</span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kehubianhao fs_12"></span>
                            </div>
                            <span className="color666">客户编号</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.no || '---' }
					</span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-shenbaojigou fs_12"></span>
                            </div>
                            <span className="color666">申办机构</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.other && (detailData.other.bid_inst || '---') }
					</span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-shenbaojigou fs_12"></span>
                            </div>
                            <span className="color666">高端合格投资者金融资产认定</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.other && (detailData.PQI_INVEST || '---') }
					</span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-shenbaojigou fs_12"></span>
                            </div>
                            <span className="color666">认定有效期开始日期</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.PQI_ASSET_STR_DT && (detailData.PQI_INVEST || '---') }
					</span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-shenbaojigou fs_12"></span>
                            </div>
                            <span className="color666">认定有效期日期</span>
					<span className="ml_10 color999 fs_12">
						{ detailData.PQI_ASSET_STR_DT && (detailData.PQI_ASSET_END_DT || '---') }
					</span>
                        </div>
                    </div>
                }


                {
                    /**
                     *  个人
                     */
                    query.userType == 1 &&
                    <div>
                        <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kdianhua fs_12"></span>
                                    </div>
                                    <span className="color666">出生日期</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.birth ||  '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kshoujihaoma fs_12"></span>
                                    </div>
                                    <span className="color666">证件类型</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.p_identityType || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdizhi fs_12"></span>
                            </div>
                            <span className="color666">证件号码</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.other && (detailData.other.identityno || '---') }
                        </span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdizhi fs_12"></span>
                            </div>
                            <span className="color666">客户编号</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.no || '---' }
                        </span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdizhi fs_12"></span>
                            </div>
                            <span className="color666">高端投资者投资经历认证</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.PQI_INVEST || '---' }
                        </span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdizhi fs_12"></span>
                            </div>
                            <span className="color666">高端投资者金融资产认证</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.PQI_ASSET || '---' }
                        </span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdizhi fs_12"></span>
                            </div>
                            <span className="color666">认定有效期开始日期</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.PQI_ASSET_STR_DT || '---' }
                        </span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kdizhi fs_12"></span>
                            </div>
                            <span className="color666">认定有效期结束日期</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.PQI_ASSET_END_DT || '---' }
                        </span>
                        </div>
                    </div>
                }
            </WingBlank>


        </div>
    }
}

export default DetailBase;