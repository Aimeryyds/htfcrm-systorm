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
                <div className="fs_16">
                    { data.presentname || '---'}
                </div>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">备注</div>
                        <div className="fs_14 color333">{ data.remark || '---'}</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送人</div>
                        <div className="fs_14 color333">{ data.sender || '---'}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">接收人</div>
                        <div className="fs_14 color333">{ data.recipient || '---'}</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送数量</div>
                        <div className="fs_14 color333">{ data.presentnum || '---'}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送日期</div>
                        <div className="fs_14 color333">{ data.senddate || '---'}</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建人</div>
                        <div className="fs_14 color333">{ data.creator || '---'}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建时间</div>
                        <div className="fs_14 color333">{ data.createdate || '---'}</div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">相关活动</div>
                        <div className="fs_14 color333">{ data.activity || '---'}</div>
                    </Flex.Item>
                </Flex>
            </div>

        </div>
    }
}

export default Detail2;