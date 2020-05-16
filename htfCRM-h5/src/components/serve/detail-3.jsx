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
                    { data.topic || '---'  }
                    <span className="fs_12 color999 ml_5">(序列号: { data.id })</span>
                </div>
                <div
                    className="colorF"
                    style={{background: '#e94f4f', display: 'inline-block', lineHeight: '.24rem', padding: '0 .1rem', borderRadius: '4px'}}
                >
                    { data.status || '---'  }
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
                        <div className="fs_12 color999 mb_5">序列号</div>
                        <div className="fs_14 color333">{ data.id  || '---'  }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">群发序列号</div>
                        <div className="fs_14 color333">{ data.id2 || '---'  }</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建人</div>
                        <div className="fs_14 color333">{ data.brokername || '---' }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建时间</div>
                        <div className="fs_14 color333">{ data.createdate || '---' }</div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送人邮箱</div>
                        <div className="fs_14 color333">{ data.from }</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">接收地址</div>
                        <div className="fs_14 color333">{ data.address }</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">附件</div>
                        <div className="fs_14 color333">{ data.xxx || '---'  }</div>
                    </Flex.Item>
                </Flex>
            </div>



        </div>
    }
}

export default Detail2;