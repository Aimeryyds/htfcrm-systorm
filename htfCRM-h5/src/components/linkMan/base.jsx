import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex} from 'antd-mobile';

class DetailBase extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { detailData } = this.props;

        return <div  className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f5"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-sjibenxinxi mr_10 color48"></span>基础信息
                </div>
                    <div>
                        <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-chushengriqi fs_12"></span>
                                    </div>
                                    <span className="color666">出生日期</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.Base ?  detailData.Base.birth :  '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-zhengjianleixing fs_12"></span>
                                    </div>
                                    <span className="color666">学历</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.Base ?  detailData.Base.education :  '---' }
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-farendaibiao fs_12"></span>
                                    </div>
                                    <span className="color666">直属上司</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.Base ?  detailData.Base.imd_supervisor.name :  '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-chushengriqi fs_12"></span>
                                    </div>
                                    <span className="color666">生日提醒日期</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { detailData.Base ?  detailData.Base.birthday_remind :  '---' }
                                </div>
                            </Flex.Item>
                        </Flex>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-shenbaojigou fs_12"></span>
                            </div>
                            <span className="color666">公司名称</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.Base ?  detailData.Base.company :  '---' }
                        </span>
                        </div>
                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-krenwu fs_12"></span>
                            </div>
                            <span className="color666">负责人</span>
                        <span className="ml_10 color999 fs_12">
                            { detailData.Base ?  detailData.Base.responsible_person :  '---' }
                        </span>
                        </div>
                        
                    </div>
                
            </WingBlank>


        </div>
    }
}

export default DetailBase;