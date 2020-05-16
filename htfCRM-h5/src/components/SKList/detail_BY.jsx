import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, Flex } from 'antd-mobile';

class DetailBY extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { data } = this.props;

        return <WingBlank size="sm" className="SK_module_a">
            <div className="fs_18 color000 m_title color48">
                <span className="iconfont icon-klianxiren mr_10 color48"></span>客户备用地址信息
            </div>

            <Flex style={{borderBottom: '1px solid #eee'}}  align="start">
                <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                    <div className="fs_14 mb_10">
                        <div className="icon_a mr_10 bg_ui_linear colorF">
                            <span className="iconfont icon-kdianhua fs_12"></span>
                        </div>
                        <span className="color666">收信人名称</span>
                    </div>
                    <div className="fs_12 color999 ml_30">
                        { data.industry ||  '---' }
                    </div>
                </Flex.Item>
                <Flex.Item style={{padding: '.15rem .1rem'}}>
                    <div className="fs_14 mb_10">
                        <div className="icon_a mr_10 bg_ui_linear colorF">
                            <span className="iconfont icon-kshoujihaoma fs_12"></span>
                        </div>
                        <span className="color666">收信人电话</span>
                    </div>
                    <div className="fs_12 color999 ml_30">
                        { data.other && (data.other.regist_capital || '---') }
                    </div>
                </Flex.Item>
            </Flex>

            <div className="line fs_14">
                <div className="icon_a mr_10 bg_ui_linear colorF">
                    <span className="iconfont icon-kdizhi fs_12"></span>
                </div>
                <span className="color666">邮编</span>
					<span className="ml_10 color999 fs_12">
						{ data.other && (data.other.identityno || '---') }
					</span>
            </div>
            <div className="line fs_14">
                <div className="icon_a mr_10 bg_ui_linear colorF">
                    <span className="iconfont icon-kdizhi fs_12"></span>
                </div>
                <span className="color666">地址</span>
					<span className="ml_10 color999 fs_12">
						{ data.no || '---' }
					</span>
            </div>
        </WingBlank>
    }
}

export default DetailBY;