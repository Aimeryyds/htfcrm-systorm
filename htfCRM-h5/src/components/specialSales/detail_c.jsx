import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailBase extends Module {
    constructor(props, context) {
        super(props, context);
        this.state={
            showMore: false,
        }
    }

    componentDidMount() {
    }

    render() {
        let {detailData5} = this.props;
        let {showMore}=this.state;
        let showButton = false;
        if(!detailData5) {
            return <div></div>
        }
        if(detailData5.length >= 2){
            showButton = true;
        }

        return  <div  className="SK_module_a">
            <WhiteSpace style={{height:'0.1rem'}} className="bg_f5"/>
            <WingBlank size="sm" >
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont1 iconyingxiaohuodong mr_10 colord0d"></span>营销活动
                </div>
                {
                    detailData5&&detailData5.map((item,index)=>{
                        if(!showMore && index === 1) {
                            return <div key={index}></div>
                        }
                        return(
                            <div key={index}>
                                <Flex  style={{borderBottom: '1px solid #eee' }} align="start">
                                    <Flex.Item style={{padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_b mr_10">
                                                <span className="iconfont1 iconchanpinhuodongmingcheng1 fs_18 color_ui"></span>
                                            </div>
                                            <span className="color666">
                                        活动名称
                                    </span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            <span className="mr_10" >{item.activityName||'---'}</span>
                                        </div>
                                    </Flex.Item>
                                </Flex>

                                <Flex align="start" style={{borderBottom:'1px solid #eee'}}>
                                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_b mr_10">
                                                <span className="iconfont1 iconhuodongzhuangtai fs_18 color_ui"></span>
                                            </div>
                                            <span className="color666">活动状态</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            {item.activityState||'---'}
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item style={{padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_b mr_10">
                                                <span className="iconfont1 iconfuzeren fs_18 color_ui"></span>
                                            </div>
                                            <span className="color666">负责人</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            {item.activityOwnerid||'---'}
                                        </div>
                                    </Flex.Item>
                                </Flex>
                                <Flex align="start" style={{borderBottom:'1px solid #eee'}}>
                                    <Flex.Item style={{borderRight: '1px solid #eee', padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_b mr_10">
                                                <span className="iconfont1 iconjihuakaishishijian fs_18 color_ui"></span>
                                            </div>
                                            <span className="color666">计划开始时间</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            {item.scheduledstart||'---'}
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item style={{padding: '.15rem .1rem'}}>
                                        <div className="fs_14 mb_10">
                                            <div className="icon_b mr_10">
                                                <span className="iconfont1 iconjihuajieshushijian fs_18 color_ui"></span>
                                            </div>
                                            <span className="color666">计划结束时间</span>
                                        </div>
                                        <div className="fs_12 color999 ml_30">
                                            {item.scheduledend||'---'}
                                        </div>
                                    </Flex.Item>
                                </Flex>




                            </div>)





                    })
                }{ showButton &&
            <div
                className='fs_14 color999'
                style={{textAlign:'center', padding: '10px 0'}}
                onClick={()=>{this.setState({showMore:!this.state.showMore})}}
            >
                {showMore ? '收起' : '更多'}
                <span className={["iconfont", showMore ? "icon-shanglashouqi" : "icon-xialagengduo", "color_ui_linear", "fs_12", "ml_5"].join(' ')} style={{marginRight: '.12rem'}}></span>
            </div>}
            </WingBlank>


        </div>
    }
}

export default DetailBase;