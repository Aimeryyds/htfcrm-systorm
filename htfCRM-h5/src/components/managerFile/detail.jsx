import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WhiteSpace, Flex ,List } from 'antd-mobile';
const ListItem = List.Item;
class Detail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData:{},
        }
    }

    componentDidMount() {
        this.changeTilte("基金经理详情");
        this.getDetail();
    }

    getDetail() {
        this.request({
            api: 'FundManagerDetails',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }

    jumpTo(val) {
        this.context.router.push({
            pathname: val,
            query: {
                id:this.props.location.query.id
            }
        })
    }

    render() {
        let {detailData} = this.state;
        return <div className="N_manager_detail">
            <ListItem
                className="user-info-wrap"
                arrow="horizontal"
            >
                <div className="info-box" onClick={()=>{this.jumpTo('/ManagerInfo')}}>
                    <div className="header-img">
                        <img src={detailData.entityimage||require('../../resources/images/defaultImg.png')} alt=""/>
                    </div>
                    <div className="content">
                        <div  className='info-name' style={{fontSize: '.16rem', color:'2b2b2b',fontWeight: '700', }}>{detailData.new_name||'---'}<span className='fs_12 color666' style={{display:'inline-block',paddingLeft:'0.05rem'}}>{detailData.new_gender||'---'}</span></div>
                        <div className='info-sign' style={{fontSize: '.12rem', color: '#2b2b2b'}}>
                            {detailData.new_degree}
                            <span className='ml_10'>{detailData.new_birth_year}</span>
                        </div>
                    </div>
                </div>
            </ListItem>
            <WhiteSpace size="lg" className="bg_f5"/>
            {
                (detailData.list &&detailData.list.length !== 0) ?
                <div>
                    <WhiteSpace size="lg"/>
                    <div className=" mb_20 ml_15">
                        <span className="iconfont icon-sjibenxinxi color48" style={{marginRight: '.12rem'}}></span>
                        <span className="fs_16 color48">产品列表</span>
                    </div>
                    {
                         detailData.list.map((item, index) => {
                            return <div className='ml_15 product_list' key={index}>
                                <Flex justify="between" className="mb_5 ml_30">
                                    <div className="color000 fs_16">
                                        {item.new_productname || '---'}
                                    </div>
                                    <div
                                        style={{
                                            color: '#fff',
                                            padding: '.05rem .15rem .05rem .2rem',
                                            borderRadius: '.13rem 0 0 .13rem',
                                            lineHeight: 1,
                                            fontSize: '.16rem',
                                        }}
                                        className="bg_ui"
                                    >
                                        {item.new_fundstatus || '---'}
                                    </div>
                                </Flex>
                                <div className='color999 fs_12 mb_20 ml_30'>
                                    {item.new_productnumber || '---'}
                                </div>
                                <Flex className="mb_15 ml_30" align='start'>
                                    <Flex.Item style={{flex: '3'}}>
                                        <div className="color999 fs_14 mb_5">基金性质</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14 mb_5">{item.new_property || '----'}</div>
                                    </Flex.Item>
                                </Flex>
                                <Flex className="mb_15 ml_30" align='start'>
                                    <Flex.Item style={{flex: '3'}}>
                                        <div className="color999 fs_14 mb_5">资产规模</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14 mb_5">{item.new_fundscale || '----'}</div>
                                    </Flex.Item>
                                </Flex>
                                <Flex className="mb_15 ml_30" align='start'>
                                    <Flex.Item style={{flex: '3'}}>
                                        <div className="color999 fs_14 mb_5">任职日期</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14 mb_5">{item.new_startdate || '----'}</div>
                                    </Flex.Item>
                                </Flex>
                            </div>

                        })

                    }
                </div> :
                    <div style={{
                    width: '100%', height: '2.5rem', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', position: 'relative'
                }}>
                    <img width='40%' src={require('../../resources/images/noProductList.png')} alt=""/>
                    <div style={{position: 'absolute', bottom: '0.4rem'}} className='fs_14 color666'>暂无相关产品信息</div>
                </div>
            }

        </div>
    }
}

export default Detail;