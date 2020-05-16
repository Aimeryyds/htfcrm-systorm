import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailSD extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { detailData } = this.props;
        let data = detailData.depth
        if(!data) {
            return <div></div>
        }

        return <div className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f5"/>
            <WingBlank size="sm">

                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-kshenduxinxi mr_10 color48"></span>深度信息
                </div>

                <Flex style={{borderBottom: '1px solid #eee'}} align="start">
                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kgoutongfengge fs_12"></span>
                            </div>
                            <span className="color666">证件类型</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.identitytype || '---' }
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{ padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-zhengjianhaoma fs_12"></span>
                            </div>
                            <span className="color666">证件号码</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.identityno || '---' }
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex style={{borderBottom: '1px solid #eee'}} align="start">
                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-zongbaoyouliang fs_12"></span>
                            </div>
                            <span className="color666">拒绝短信</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.refuse_sms || '---' }
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{ padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-zongbaoyouliang fs_12"></span>
                            </div>
                            <span className="color666">拒绝邮件</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.refuse_email || '---' }
                        </div>
                    </Flex.Item>
                </Flex>
                <div className="line fs_14">
                    <div className="icon_a mr_10 bg_ui_linear colorF">
                        <span className="iconfont icon-kdizhi fs_12"></span>
                    </div>
                    <span className="color666">个人爱好</span>
					<span className="ml_10 color999 fs_12">
						{ data.hobby || '---' }
					</span>
                </div>
                

                
            </WingBlank>
        </div>
    }
}

export default DetailSD;


// <Flex style={{borderBottom: '1px solid #eee'}}>
//     <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
//         <div className="fs_14 mb_10">
//             <div className="icon_a mr_10 bg_ui_linear colorF">
//                 <span className="iconfont icon-kchanpinleixing fs_12"></span>
//             </div>
//             <span>产品类型</span>
//         </div>
//         <div className="fs_12 color999 ml_30">
//             { data.new_preference_product  || '---' }
//         </div>
//     </Flex.Item>
//     <Flex.Item style={{ padding: '.15rem .1rem'}}>
//         <div className="fs_14 mb_10">
//             <div className="icon_a mr_10 bg_ui_linear colorF">
//                 <span className="iconfont icon-kchuanzhen fs_12"></span>
//             </div>
//             <span>收益率</span>
//         </div>
//         <div className="fs_12 color999 ml_30">
//             { data.new_preference_rete  || '---' }
//         </div>
//     </Flex.Item>
// </Flex>