import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { WhiteSpace,WingBlank,Flex,Badge,List,Text } from 'antd-mobile';
import moment from 'moment';
class LevelChangeDetail extends Module {

    constructor(props,context){
        super(props,context);
        this.state = {
            cusName:'',
            details:{}
        }
    }

    componentDidMount(){
        this.getDetailInfo()
    }
    
    getDetailInfo(){
        this.request({
            api:'GetLevelChangeDetail',
            params: {
                id: this.props.location.query.id
            }
        },res=>{
            console.log(res.data[0])
            let userInfo = res.data[0]
            this.setState({details:userInfo})
            this.changeTilte(`客户等级变更(${userInfo.cusName})`)
        })
    }

    jump(id) {
        this.context.router.push({
            pathname: '/LevelChangeAnalyze',
            query: {
                id  
            }
        })
    }

    render(){
        let { details } = this.state
        return <div>
            <WhiteSpace size="md" className="bg_f6"/>

            <div style={{paddingBottom:'.15rem'}}>
                <Flex style={{padding: ".15rem"}}  justify="between">
                    <div onClick={()=>
                    this.context.router.push({
                        pathname: '/SKListDetail',
                        query: {
                            id: details.cusId,
                            userType: details.userType
                        }
                    })
                    }>
                        <Text className="color_ui fs_14">
                            { details.cusName }
                        </Text>
                        <Text className="color_ui" style={{paddingLeft:'.05rem'}}>
                            >
                        </Text>
                    </div>

                    <Text className="fs_14 color999">
                        { moment(details.date).format('YYYYMMDD') }
                    </Text>
                </Flex>
                <Flex >
                    <Badge text={details.changeType}
                           style={{ marginLeft: 12,
                                    padding: '0.03rem 0.14rem',
                                    backgroundColor: '#fff0f0',
                                    borderRadius: '0.11rem',
                                    height:'0.22rem',
                                    color:'#fb5c5f',
                                    marginLeft:'0.15rem'
                                    }}
                    />
                    <Badge text={details.nowLevel}
                           style={{ marginLeft: 12,
                               padding: '0.03rem 0.14rem',
                           backgroundColor: '#fff9f0',
                           borderRadius: '0.11rem' ,
                           height:'0.22rem',
                           color:'#fb935c',
                           marginLeft:'0.1rem'
                           }}
                    />
                    <Badge text={details.cusType}
                           style={{
                                marginLeft: 12,
                               padding: '0.03rem 0.14rem',
                                backgroundColor: '#edf7ff',
                                borderRadius: '0.11rem',
                                color: '#66bdff',
                                height:'0.22rem',
                               marginLeft: '0.11rem'
                            }}
                    />
                </Flex>
            </div>

            <WhiteSpace size="md" className="bg_f6"/>

            <div className="N_SK_List_detail">
                <div style={{padding: '.13rem'}}>
                    <span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_10" />
                    <span className="fs_16 color_ui">基本信息</span>
                </div>
                <Flex>
                    <Flex.Item style={{borderTop: '1px solid #eee', borderRight: '1px solid #eee', padding:'.15rem'}}>
                        <div className="fs_14 mb_10">
                            <span className="iconfont1 iconbiangengqiandengji fs_18 color_ui va mr_5"/>
                            <span className="color666">变更前等级</span>
                        </div>
                        <div className="fs_14 color999" style={{marginLeft:'0.21rem'}}>
                            {details.beforeLevel || '---'}
                        </div>
                    </Flex.Item>
                    <Flex.Item  style={{borderTop: '1px solid #eee', padding:'.15rem', marginLeft: 0}}>
                        <div className="fs_14 mb_10">
                            <span className="iconfont1 iconbiangenghoudengji fs_18 color_ui va mr_5"/>
                            <span className="color666">变更后等级</span>
                        </div>
                        <div className="fs_14 color999" style={{ marginLeft: '0.21rem' }}>
                            {details.afterLevel || '---'}
                        </div>
                    </Flex.Item>
                </Flex>

                <Flex>
                    <Flex.Item style={{borderTop: '1px solid #eee', borderRight: '1px solid #eee', padding:'.15rem'}}>
                        <div className="fs_14 mb_10">
                            <span className="iconfont1 iconbiangengqianbaoyouliang fs_18 color_ui va mr_5"/>
                            <span className="color666">变更前保有量</span>
                        </div>
                        <div className="fs_14 color999" style={{ marginLeft: '0.21rem' }}>
                            {details.beforeBaoYouLiang ? details.beforeBaoYouLiang : '---'}万元
                        </div>
                    </Flex.Item>
                    <Flex.Item  style={{borderTop: '1px solid #eee', padding:'.15rem', marginLeft: 0}}>
                        <div className="fs_14 mb_10">
                            <span className="iconfont1 iconxianyoubaoyouliang fs_18 color_ui va mr_5"/>
                            <span className="color666">现有保有量</span>
                        </div>
                        <div className="fs_14 color999" style={{ marginLeft: '0.21rem' }}>
                            {details.afterBaoYouLiang ? details.afterBaoYouLiang : '---'}万元
                        </div>
                    </Flex.Item>
                </Flex>

                <Flex>
                    <Flex.Item style={{borderTop: '1px solid #eee', borderRight: '1px solid #eee', padding:'.15rem'}}>
                        <div className="fs_14 mb_10">
                            <span className="iconfont1 iconbiangengqianfene fs_18 color_ui va mr_5"/>
                            <span className="color666">变更前份额</span>
                        </div>
                        <div className="fs_14 color999" style={{ marginLeft: '0.21rem' }}>
                            {details.beforeMoney ? details.beforeMoney : '---'}万份
                        </div>
                    </Flex.Item>
                    <Flex.Item  style={{borderTop: '1px solid #eee', padding:'.15rem', marginLeft: 0}}>
                        <div className="fs_14 mb_10">
                            <span className="iconfont1 iconxianyoufene fs_18 color_ui va mr_5"/>
                            <span className="color666">现有份额</span>
                        </div>
                        <div className="fs_14 color999" style={{ marginLeft: '0.21rem' }}>
                            {details.afterMoney ? details.afterMoney : '---'}万份
                        </div>
                    </Flex.Item>
                </Flex>

                <div className="line fs_14" style={{paddingLeft:'0.15rem'}}>
                    <span className="iconfont1 iconkeguanyuanyin fs_18 color_ui va mr_5"/>
                    <span className="color666">客观原因:</span>
					<span className="ml_10 color999 fs_14">
                        {details.SecondReason}
					</span>
                </div>

                <div className="line fs_14" style={{ paddingLeft: '0.15rem' }}>
                    <span className="iconfont1 iconkeguanshuoming fs_18 color_ui va mr_5"/>
                    <span className="color666">客观说明:</span>
					<span className="ml_10 color999 fs_14">
                        {details.SecondReasonDesc}
					</span>
                </div>

                <Flex className="line fs_14" justify="between" onClick={()=>{this.jump(details.id)}}>
                    <div style={{ paddingLeft: '0.05rem' }}>
                        <span className="iconfont1 iconzhuguanyuanyin fs_18 color_ui va mr_5"/>
                        <span className="color666">主观原因:</span>
                        <span className="ml_10 color999 fs_14">
                            {details.mainReason}
                        </span>
                    </div>
                    <div className="iconfont icon-kgengduo color999 fs_14"></div>
                </Flex>

                <div className="line fs_14" onClick={() => { this.jump(details.id) }} style={{ paddingLeft: '0.15rem' }}>
                    <span className="iconfont1 iconzhuguanshuoming fs_18 color_ui va mr_5"/>
                    <span className="color666">主观说明:</span>
					<div className="color999 fs_14" style={{margin: '.15rem 0 0 .21rem'}}>
                        {details.mainReasonDesc}
					</div>
                </div>

            </div>
            
        </div>
    }

}

export default LevelChangeDetail;