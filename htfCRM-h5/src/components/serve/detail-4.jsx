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
                    { data.taskname || '---'}
                </div>
                <div
                    className="colorF"
                    style={{background: '#e94f4f', display: 'inline-block', lineHeight: '.24rem', padding: '0 .1rem', borderRadius: '4px'}}
                >
                    { data.typecontent || '---'}
                </div>
                <div
                    className="colorF ml_10"
                    style={{background: '#108ee9', display: 'inline-block', lineHeight: '.24rem', padding: '0 .1rem', borderRadius: '4px'}}
                >
                    { data.calltype === "1" ? "去电" : "来电" }
                </div>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">操作人员</div>
                        <div className="fs_14 color333">{ data.agentname || '---'}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">外呼类型</div>
                        <div className="fs_14 color333">{ data.calloutcontent || '---'}</div>
                    </Flex.Item>
                </Flex>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">开始时间</div>
                        <div className="fs_14 color333">{ data.begintime || '---'}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">结束时间</div>
                        <div className="fs_14 color333">{ data.endtime || '---'}</div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建人</div>
                        <div className="fs_14 color333">{ data.creator || '---'}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建时间</div>
                        <div className="fs_14 color333">{ data.createddate || '---'}</div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">电话号码</div>
                        <div className="fs_14 color333">{ data.phone ? this.formatPhone(data.phone) : '---'}</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">任务名称</div>
                        <div className="fs_14 color333">{ data.taskname || '---'}</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">服务请求</div>
                        <div className="fs_14 color333">{ data.tsjyflag || '---'}</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">服务内容</div>
                        <div className="fs_14 color333">{ data.content || '---'}</div>
                    </Flex.Item>
                </Flex>
            </div>



        </div>
    }
}

export default Detail2;