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
        let { detailData, query } = this.props;
        let data = detailData.Depth

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
                                <span className="iconfont icon-zongbaoyouliang fs_12"></span>
                            </div>
                            <span className="color666">现有保有量</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.currentquantity || '---' }
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{ padding: '.15rem .1rem'}}>
                        <div className="fs_14 mb_10">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-zongbaoyouliang fs_12"></span>
                            </div>
                            <span className="color666">历史最高保有量</span>
                        </div>
                        <div className="fs_12 color999 ml_30">
                            { data.highesthistoricalreserves || '---' }
                        </div>
                    </Flex.Item>
                </Flex>

                <div className="fs_14"  style={{borderBottom: '1px solid #eee', padding: '.15rem .1rem'}}>
                    <div className="icon_a mr_10 bg_ui_linear colorF">
                        <span className="iconfont icon-kchanpinleixing fs_12"></span>
                    </div>
                    <span className="color666">收益率</span>
                    <div className="ml_30 color999 fs_12">
                    <div className="mt_10">{ data.productrate ||"---"}</div>
                    </div>
                </div>

                {
                    /**
                     * 非机构客户
                     */
                    query.userType !== '0' &&
                    <div>
                        <Flex style={{borderBottom: '1px solid #eee'}} align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kzhiwei fs_12"></span>
                                    </div>
                                    <span className="color666">职业</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_o_vocation || '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{ padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kgerenaihao fs_12"></span>
                                    </div>
                                    <span className="color666">个人爱好</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_hobby || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex style={{borderBottom: '1px solid #eee'}} align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kxinggetedian fs_12"></span>
                                    </div>
                                    <span className="color666">性格特点</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_character  || '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{ padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kguanlianzhanghu fs_12"></span>
                                    </div>
                                    <span className="color666">关联账户</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_relate_account  || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>

                        <Flex align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kgoutongfengge fs_12"></span>
                                    </div>
                                    <span className="color666">沟通风格</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_communicate_type  || '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item  style={{ padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kkehulaiyuan fs_12"></span>
                                    </div>
                                    <span className="color666">客户来源</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_source  || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>

                }

                {
                    /**
                     * 机构客户
                     */
                    query.userType === '0' &&
                    <div>
                        <Flex style={{borderBottom: '1px solid #eee'}} align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kzhiwei fs_12"></span>
                                    </div>
                                    <span className="color666">投资者类型</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.investor_type  || '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{ padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kgerenaihao fs_12"></span>
                                    </div>
                                    <span className="color666">法人代表姓名</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.instrepr_name  || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kxinggetedian fs_12"></span>
                                    </div>
                                    <span className="color666">企业性质</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.inst_propertiy  || '---' }
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{ padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kguanlianzhanghu fs_12"></span>
                                    </div>
                                    <span className="color666">关联账户</span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    { data.new_relate_account  || '---' }
                                </div>
                            </Flex.Item>
                        </Flex>

                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kchanpinleixing fs_12"></span>
                            </div>
                            <span className="color666">股东账号</span>
                            <div className="ml_30 color999 fs_12">
                                <div className="mt_10">深交所账号{ data.sz_sec_acc || '---' }</div>
                                <div className="mt_10">上交所账号{ data.sh_sec_acc || '---' }</div>
                            </div>
                        </div>

                        <div className="line fs_14">
                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                <span className="iconfont icon-kchanpinleixing fs_12"></span>
                            </div>
                            <span className="color666">客户来源</span>
                        <span className="ml_10 color999 fs_12">
                            { data.new_source || '---' }
                        </span>
                        </div>

                    </div>
                }
                
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