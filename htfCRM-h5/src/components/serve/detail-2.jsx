import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class Detail2 extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
    }
    
    render() {
        let { data } = this.props;

        return <div className="">
            <WhiteSpace size="lg" className="bg_f5"/>
            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <div className="fs_16 mb_10">
                    { data.custname || '---' }
                </div>
                <div
                    className="colorF"
                    style={{background: '#e94f4f', display: 'inline-block', lineHeight: '.24rem', padding: '0 .1rem', borderRadius: '4px'}}
                >
                    { data.spstatus === '0' ? "成功" : '失败' }
                </div>
                <div
                    className="colorF ml_10"
                    style={{background: '#108ee9', display: 'inline-block', lineHeight: '.24rem', padding: '0 .1rem', borderRadius: '4px'}}
                >
                    { data.prioritystr || '---' }
                </div>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">手机号码</div>
                        <div className="fs_14 color333">{ data.mobile ? this.formatPhone(data.mobile) : '---'  }</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送人</div>
                        <div className="fs_14 color333">{ data.brokername || '---' }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送日期</div>
                        <div className="fs_14 color333">{ data.senddate || '---' }</div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建人</div>
                        <div className="fs_14 color333">{ data.creator || '---' }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建时间</div>
                        <div className="fs_14 color333">{ data.createdate || '---' }</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">短信内容</div>
                        <div className="fs_14 color333">{ data.content }</div>
                    </Flex.Item>
                </Flex>
            </div>



        </div>
    }
}

export default Detail2;