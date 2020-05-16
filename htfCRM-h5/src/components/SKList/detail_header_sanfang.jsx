import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import ShowBadge from './show_badge'		//客户标签

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailHeaderSanfang extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShowBadge: false,			//是否显示更多标签
        }
    }

    componentDidMount() {}
    

    render() {
        let { query, detailData } = this.props;
        let { isShowBadge } = this.state;

        if(!detailData.manager) {
            return <div></div>
        }

        return <div>
            <div id="detailHeaderB" style={{position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fff', zIndex: 99}}>
                <WhiteSpace size="lg" className="bg_f6"/>
                <WingBlank size="sm" className="info_style_a">
                    <WhiteSpace size="lg"/>
                    <div className="ml_10 mr_10" style={{position: 'relative'}}>
                        <Flex
                            justify="between"
                            className="mb_10"
                        >
                            <Flex.Item className="fs_18 color000">
                                { detailData.name }
                            </Flex.Item>
                        </Flex>

                        <div className={ detailData.remark && "mb_20"}>
                            {  <Badge text={'三方客户'} className={"badge-style0"} /> }
                            { detailData.star && <Badge text={detailData.star} className={"badge-style1"} /> }
                        </div>

                        {
                            detailData.behalf &&
                            <div className="fs_14 color999 mb_10">
                                法人代表: { detailData.behalf }
                            </div>
                        }

                        {
                            detailData.remark &&
                            <div className="fs_14 color999 mb_10">
                                备注: { detailData.remark }
                            </div>
                        }

                        <ShowBadge
                            badgeData={detailData.tags}
                            name={detailData.name}
                            isShowBadge={isShowBadge}
                            cloaseShowBadge={()=>this.setState({isShowBadge: false})}
                        />

                    </div>

                    <Flex style={{borderTop: '1px solid #eee'}}>
                        { detailData.manager &&
                        <Flex.Item style={{borderRight: '1px solid #eee', padding: '.1rem'}}>
                            <Flex>
                                <Flex.Item style={{flex: 2.5}}>
                                    <div style={{width: '.35rem', height: '.35rem', backgroundColor: '#eee', borderRadius: '50%', overflow: 'hidden'}}>
                                        <img src={ detailData.manager.headpic } alt=""/>
                                    </div>
                                </Flex.Item>
                                <Flex.Item style={{flex: 7.5}}>
                                    {
                                        detailData.manager.name ?
                                            <div>
                                                <div className="fs_12 color999">负责人</div>
                                                <div className="fs_16 color666">{ detailData.manager.name }</div>
                                            </div> :
                                            <div className="fs_16 color666 mb_5 mt_5">暂无负责人</div>
                                    }


                                </Flex.Item>
                            </Flex>
                        </Flex.Item>
                        }
                        
                        <Flex.Item>
                            <div className="fs_12 color999">共享客户经理</div>
                            <div className="fs_16 color666">{ detailData.manager.managers }</div>
                        </Flex.Item>
                    </Flex>
                    
                </WingBlank>
                <WhiteSpace size="lg" className="bg_f6"/>
            </div>

            {/** 非三方头部站位用 **/}
            <div id="detailHeader_zw_b" className='bg_f6'></div>
        </div>
    }
}

export default DetailHeaderSanfang;