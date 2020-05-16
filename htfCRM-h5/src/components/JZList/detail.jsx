import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import Moment from 'moment'

import { WingBlank, WhiteSpace, Flex, Tabs, List } from 'antd-mobile';
const Item = List.Item;

class JZListDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {},
            tabVal:Number(window.localStorage.JZListTab)||0,
            tabs: [
                { title: '对手详情' },
                { title: '竞品详情' },
            ],
        }
    }

    componentDidMount() {
        this.changeTilte("竞争对手详情");
        this.getLeadDetail();
    }

    getLeadDetail() {
        let _api;
        if(this.state.tabVal==0){
            _api='CompetitorsRivalDetail';
        }
        if(this.state.tabVal==1){
            _api='CompetitorsGoodsDetail';
        }

        this.request({
            api:_api,
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }
    
    //tabs
    tabsChange(tab, index) {
        this.setState({
            tabVal: index,
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
        },()=>{this.getLeadDetail();})

    }
    jump(id) {
        let storage=window.localStorage;
        storage.setItem('JZListTab', this.state.tabVal);
        this.context.router.push({
            pathname: '/JZListDetailPro',
            query: {
                id
            }
        })
    }
    render() {

        let { detailData,tabs,tabVal } = this.state;

        return <div className="N_customer_List_detail">
            <WhiteSpace size="lg" className="bg_f5"/>

            <div className='ml_15'>
                <WhiteSpace size="lg"/>
                <div className='color000 fs_16 mb_10'>
                    { detailData.name||'---'} ({detailData.new_no||'---'})
                </div>
                <div className='color666 fs_14 mb_10'>
                    主要产品：{ detailData.keyproduct||'---'}
                </div>
                <div className='color666 fs_14 mb_10'>
                    产品优势：{ detailData.Otherdetails && (detailData.Otherdetails.new_strengths || '---') }
                </div>
                <div className='color666 fs_14'>
                    产品劣势：{ detailData.Otherdetails && (detailData.Otherdetails.new_weknesses|| '---') }
                </div>
            </div>
            <div style={{marginTop:'0.45rem'}}>

            </div>
            <Tabs
                tabs={tabs}
                page={tabVal}
                onChange={(tab, index) => this.tabsChange(tab, index) }
            >

            </Tabs>
            <WhiteSpace size="lg" className="bg_f5"/>
            {
                tabVal==0&&detailData.companydetails&&
                <div>
                    <WingBlank>
                        <WhiteSpace size="lg"/>
                        <div className="mb_20">
                            <span className="iconfont icon-sjibenxinxi color48" style={{marginRight: '.12rem'}}></span>
                            <span className="fs_16 color48">基本信息</span>
                        </div>
                        <Flex className="mb_15 ml_30" align='start'>
                            <Flex.Item style={{flex: '3'}}>
                                <div className="color999 fs_14 mb_5">联系方式</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: '7'}}>
                                <div className="color000 fs_14 mb_5">{detailData.companydetails.new_mobile||'----'}</div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15 ml_30" align='start'>
                            <Flex.Item style={{flex: '3'}}>
                                <div className="color999 fs_14 mb_5">公司网址</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: '7'}}>
                                <div className="color000 fs_14 mb_5">{detailData.companydetails.new_websiteurl ||'----'}</div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15 ml_30" align='start'>
                            <Flex.Item style={{flex: '3'}}>
                                <div className="color999 fs_14 mb_5">公司地址</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: '7'}}>
                                <div className="color000 fs_14 mb_5">{detailData.companydetails.address1_composite ||'----'}</div>
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                    {detailData.Otherdetails&&
                    <div>
                        <WhiteSpace size="lg" className="bg_f5"/>
                        <WingBlank>
                            <WhiteSpace size="lg"/>
                            <div className="mb_20">
                                <span className="iconfont icon-jqitaxinxi color48" style={{marginRight: '.12rem'}}></span>
                                <span className="fs_16 color48">其他信息</span>
                            </div>
                            <Flex className="mb_15 ml_30" align='start'>
                                <Flex.Item style={{flex: '3'}}>
                                    <div className="color999 fs_14 mb_5">创建人员</div>
                                </Flex.Item>
                                <Flex.Item style={{flex: '7'}}>
                                    <div className="color000 fs_14 mb_5">{detailData.Otherdetails.createdby	||'----'}</div>
                                </Flex.Item>
                            </Flex>
                            <Flex className="mb_15 ml_30" align='start'>
                                <Flex.Item style={{flex: '3'}}>
                                    <div className="color999 fs_14 mb_5">创建时间</div>
                                </Flex.Item>
                                <Flex.Item style={{flex: '7'}}>
                                    <div className="color000 fs_14 mb_5">{detailData.Otherdetails.createdon	||'----'}</div>
                                </Flex.Item>
                            </Flex>
                            <Flex className="mb_15 ml_30" align='start'>
                                <Flex.Item style={{flex: '3'}}>
                                    <div className="color999 fs_14 mb_5">更新人员</div>
                                </Flex.Item>
                                <Flex.Item style={{flex: '7'}}>
                                    <div className="color000 fs_14 mb_5">{detailData.Otherdetails.modifiedby	||'----'}</div>
                                </Flex.Item>
                            </Flex>
                            <Flex className="mb_15 ml_30" align='start'>
                                <Flex.Item style={{flex: '3'}}>
                                    <div className="color999 fs_14 mb_5">更新时间</div>
                                </Flex.Item>
                                <Flex.Item style={{flex: '7'}}>
                                    <div className="color000 fs_14 mb_5">{detailData.Otherdetails.modifiedon	||'----'}</div>
                                </Flex.Item>
                            </Flex>
                        </WingBlank>
                    </div>
                    }
                </div>
            }
            {
                tabVal==1&&
                (detailData.list&&detailData.list.length!==0?
                    <div>
                        <WingBlank>
                            <WhiteSpace size="lg"/>
                            <div className="mb_5">
                                <span className="iconfont icon-sjibenxinxi color48" style={{marginRight: '.12rem'}}></span>
                                <span className="fs_16 color48">竞品列表</span>
                            </div>
                            <List className='JZ_product_list'>
                                {
                                    detailData.list.map((item, index) => {
                                        return <Item arrow="horizontal"  key={index} multipleLine onClick={() => {this.jump(item.new_competitveproductid)}}>
                                            <div className='fs_16 color000'>{item.new_name||'----'}</div>
                                            <div className='fs_12 color999'>{item.new_fundcode ||'----'}</div>
                                        </Item>
                                    })
                                }

                            </List>
                        </WingBlank>
                    </div>:
                    <div style={{width:'100%',textAlign:'center',lineHeight:'2rem'}}>
                            暂无竞品信息
                    </div>)
            }

        </div>
    }
}

export default JZListDetail;


// <div className="dashed_style" style={{margin:'.2rem .15rem'}}></div>
//
// <div className="info_style_a">
// 	<WingBlank>
// 	<div className="mb_15">
// 	<span className="fs_16 color000">订阅信息</span>
// 	</div>
// 	<Grid
// data={subData}
// renderItem={dataItem => (
// 	<Checkbox>
// 		{ dataItem.text }
// 	</Checkbox>
// )}
// columnNum={3}
// hasLine={false}
// square={false}
// activeStyle={false}
// className="checkbox_list"
// 	/>
// 	</WingBlank>
// 	</div>