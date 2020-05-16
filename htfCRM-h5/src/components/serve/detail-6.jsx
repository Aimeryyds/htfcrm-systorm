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
                    { data.caption || '---' }
                </div>
                <div
                    className="colorF"
                    style={{background: '#e94f4f', display: 'inline-block', lineHeight: '.24rem', padding: '0 .1rem', borderRadius: '4px'}}
                >
                    { data.optname || '---' }
                </div>
            </div>

            <div style={{padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">联系人姓名</div>
                        <div className="fs_14 color333">{ data.contactor || '---' }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">联系人电话</div>
                        <div className="fs_14 color333">{ data.phone ? this.formatPhone(data.phone) : '---' }</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">联系人邮件地址</div>
                        <div className="fs_14 color333">{ data.email || '---' }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">联系人地址</div>
                        <div className="fs_14 color333">{ data.address || '---' }</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">活动开始时间</div>
                        <div className="fs_14 color333">{ data.startdate || '---' }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">活动结束时间</div>
                        <div className="fs_14 color333">{ data.enddate || '---' }</div>
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



        </div>
    }
}

export default Detail2;