import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex,  } from 'antd-mobile';

class DetailLXR extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showMore: false
        }
    }

    componentDidMount() {
    }

    render() {
        let { detailData, query } = this.props;
        let { showMore } = this.state;
        let data = detailData.primaryContacts

        if(!data) {
            return <div></div>
        }
        
        return <div className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f5"/>
            <WingBlank size="lg">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-klianxirenxinxi mr_10 color48"></span>
                    联系人信息
                </div>
            </WingBlank>
                {
                    data.map((item, index) => {
                        if(!showMore && index === 1) {
                            return <div key={index}></div>
                        }
                        return (
                            <div key={index}>
                              { index > 0 &&<WhiteSpace size='sm' className='bg_f5'/>}
                            <WingBlank size='lg'>
                                <Flex style={{borderBottom: '1px solid #eee' }} align="start">
                                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                                <span className="iconfont icon-krenwu fs_12"></span>
                                            </div>
                                            <span className="color666">{ item.name || '---' }</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            { item.jobtitle || '---' }
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item style={{ padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                                <span className="iconfont icon-kshoujihaoma fs_12"></span>
                                            </div>
                                            <span className="color666">手机号</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            { item.mobile ? this.formatPhone(item.mobile) : '---' }
                                        </div>
                                    </Flex.Item>
                                </Flex>

                                <Flex align="start">
                                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                                <span className="iconfont icon-kyoujian fs_12"></span>
                                            </div>
                                            <span className="color666">电子邮箱</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            { item.email || '---' }
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item style={{ padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_a mr_10 bg_ui_linear colorF">
                                                <span className="iconfont icon-kdianhua fs_12"></span>
                                            </div>
                                            <span className="color666">联系电话</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            { item.phone ? this.formatPhone(item.phone) : '---' }
                                        </div>
                                    </Flex.Item>
                                </Flex>

                                <div className="line fs_14" style={{borderBottom: '1px solid #f6f6f6',}}>
                                    <div className="icon_a mr_10 bg_ui_linear colorF">
                                        <span className="iconfont icon-kdizhi fs_12"></span>
                                    </div>
                                    <span className="color666">地址</span>
                                <span className="ml_10 color999 fs_12">
                                    { item.address || '---' }
                                </span>
                                </div></WingBlank>
                            </div>
                        )
                    })
                }
                <div
                    className='fs_14 color999'
                    style={{textAlign:'center', padding: '10px 0'}}
                    onClick={()=>{this.setState({showMore:!this.state.showMore})}}
                >
                    {showMore ? '收起' : '更多'}
                    <span className={["iconfont", showMore ? "icon-shanglashouqi" : "icon-xialagengduo", "color_ui_linear", "fs_12", "ml_5"].join(' ')} style={{marginRight: '.12rem'}}></span>
                </div>
           

        </div>
    }
}

export default DetailLXR;