import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailHeader extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            TQLable: [],            //特权标签
        }
    }

    componentDidMount() {
        
    }

	/**
     * 客户特权标签
     */
    



    //展示全部标签
    handleBadgeShow(tags) {
        if(tags.length > 3) {
            this.setState({
                isShowBadge: true
            })
        }
    }


    render() {
        let { detailData } = this.props;
        return <div>
            <div id="detailHeaderA" style={{position: 'fixed', top:'0', right: '0', left: '0', backgroundColor: '#fff', zIndex: 11}}>
                <WhiteSpace size="lg" className="bg_f6"/>
                <WingBlank size="sm" className="info_style_a" >
                    <WhiteSpace size="lg"/>
                    <div className="ml_10 mr_10" style={{position: 'relative'}}>
                        <Flex
                            justify="between"
                            className="mb_10"
                            
                        >
                            <Flex.Item className="fs_18 color000" style={{flex: 4}}>
                                { detailData.name }
                                <span className="fs_14 color666" style={{marginLeft: '.1rem'}}>
                                    { detailData.sex == "男" ? "先生" : "女士" }
                                </span>
                            </Flex.Item>
                        </Flex>
                        <div className={ (detailData.level || detailData.custtype) && "mb_20"}>
                            {
                                
								/**
								 * 行业
                                 */
                                detailData.Base && 
                                <Badge text={detailData.Base.industry} className={"badge-style0 mb_10"} />
                            }
                            {
								/**
								 * 服务级别
                                 */
                                detailData.Base &&
                                <Badge
                                    className={"badge-style1 mb_10"}
                                    text={detailData.Base.srv_level}
                                />
                            }
                            {
								/**
								 * 职务
                                 */
                                
                                <Badge text={detailData.jobtitle} className={"badge-style2 mb_10"} />
                            }

                        </div>
                        {
                            detailData.depth &&
                            <div className="fs_14 color999 mb_10">
                                备注: { detailData.depth.remark }
                            </div>
                        }
                    </div>

                    

                </WingBlank>
            </div>

            {/** 非三方头部站位用 **/}
            <div id="detailHeader_zw" className='bg_f6'></div>
        </div>
    }
}

export default DetailHeader;