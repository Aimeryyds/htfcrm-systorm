import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailKHGX extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: []
        }
    }

    componentDidMount() {
        this.getCustomerRelations();		//客户关系
    }

    /**
     * 获取非三方客户详情-客户关系
     */
    getCustomerRelations() {
        let { query } = this.props;
        this.request({
            api: 'GetCustomerRelations',
            params: {
                id: query.id,
                type: query.userType
                // type: this.props.data.custtype
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }

    render() {
        let { detailData } = this.state;
        let { query } = this.props;
        let { data } = this.props;//其他数据如果有这个数据就加载，没有就不加载
        
		/**
         * 只在个人、机构下显示
         */
        if(!detailData || query.userType === '-2' ||  query.userType === '2' || detailData.length==0 || !data.Depth ) {
            return <div></div>
        }

        return <div  className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f5"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-klianxiren mr_10 color48"></span>客户关系
                </div>

                {
                    /** 机构 **/
                    query.userType === '0' &&
                    detailData.map((item, index)=>{
                        return <Flex key={index} style={{borderBottom: '1px solid #eee' }} align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-krenwu fs_12"></span>
                                    </div>
                                    <span
                                        className="color666"  
                                        // onClick={()=>{
                                        //     this.context.router.push({
                                        //         pathname: '/SKListDetail',
                                        //         query: {
                                        //             id: item.nameid
                                        //         }
                                        //     })
                                        // }}
                                    >
                                        { item.name || '---' }
                                    </span>
                                </div>
                                <div className="fs_12 color999 ml_30">
                                    <span className="mr_10" >{ item.relations1 }</span>
                                    <span className="mr_10" >{ item.relations2 }</span>
                                </div>
                            </Flex.Item>
                        </Flex>
                    })

                }

                {
                    /** 个人 **/
                    query.userType === '1' &&
                    detailData.map((item, index)=>{
                        return <Flex key={index} style={{borderBottom: '1px solid #eee' }} align="start">
                            <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                <div className="fs_14 mb_10">
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-krenwu fs_12"></span>
                                    </div>
                                    <span
                                        // onClick={()=>{
                                        //     this.context.router.push({
                                        //         pathname: '/SKListDetail',
                                        //         query: {
                                        //             id: item.nameid,
                                        //             userType:""
                                        //         }
                                        //     })
                                        // }}
                                    >{ item.name }</span>
                                </div>
                                <div
                                    className="fs_12 color999 ml_30"
                                    
                                >
                                    <span className="color666">
                                        {item.relations1}
                                    </span>
                                    <span className="color666">
                                        {item.relations2}
                                    </span>
                                </div>
                            </Flex.Item>
                        </Flex>
                    })
                }



            </WingBlank>
        </div>
    }
}

export default DetailKHGX;
//
// <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
//     <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
//         <div className="fs_14 mb_10">
//             <div className="icon_a mr_10 bg_ui_linear colorF">
//                 <span className="iconfont icon-kdianhua fs_12"></span>
//             </div>
//             <span className="color666">收信人名称</span>
//         </div>
//         <div className="fs_12 color999 ml_30">
//             { data.industry ||  '---' }
//         </div>
//     </Flex.Item>
//     <Flex.Item style={{padding: '.15rem .1rem'}}>
//         <div className="fs_14 mb_10">
//             <div className="icon_a mr_10 bg_ui_linear colorF">
//                 <span className="iconfont icon-kshoujihaoma fs_12"></span>
//             </div>
//             <span className="color666">收信人电话</span>
//         </div>
//         <div className="fs_12 color999 ml_30">
//             { data.other && (data.other.regist_capital || '---') }
//         </div>
//     </Flex.Item>
// </Flex>
//
// <div className="line fs_14">
//     <div className="icon_a mr_10 bg_ui_linear colorF">
//     <span className="iconfont icon-kdizhi fs_12"></span>
//     </div>
//     <span className="color666">邮编</span>
//     <span className="ml_10 color999 fs_12">
//     { data.other && (data.other.identityno || '---') }
// </span>
// </div>
// <div className="line fs_14">
//     <div className="icon_a mr_10 bg_ui_linear colorF">
//         <span className="iconfont icon-kdizhi fs_12"></span>
//         </div>
//         <span className="color666">地址</span>
//         <span className="ml_10 color999 fs_12">
//         { data.no || '---' }
//     </span>
// </div>
/*style={{color: '#0366d6'}}
                                        onClick={()=>{
                                            this.context.router.push({
                                                pathname: '/LinkManDetail',
                                                query: {
                                                    id: item.nameid
                                                }
                                            })
                                        }}*/
