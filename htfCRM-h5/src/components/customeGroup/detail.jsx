import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WhiteSpace, Flex, Text, Toast } from 'antd-mobile';

class CustomeGroupDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: [],
            keHuList: [],
            showDetail: [0],
            showList: [],        //1:打开   0:隐藏
        }
    }

    componentDidMount() {
        let { name } = this.props.location.query;
        this.changeTilte( name );
        Toast.loading('数据加载中...', 0);
        Promise.all([
            this.getDetail(),
            this.getCustInfo()
        ]).then((res)=>{
            let data0 = res[0].data;
            let data1 = res[1].data;
            let _showList = [];
            Toast.hide();
            data1.map((item, index) => {
                index === 0 ? _showList.push(1) : _showList.push(0);
            });
            this.setState({
                detailData: data0[0],
                keHuList: data1,
                showList: _showList
            })
        })
    }

	/**
	 * 获取详情
     */
    getDetail() {
        let { id } = this.props.location.query;
        let _params = {
            custGroupId: id
        };
        return this.requestPromise({
            api: "GetCustGroupBase",
            params: _params,
            hideToast: true
        })
    }

	/**
     * 获取客户信息
     * @returns {*}
     */
    getCustInfo() {
        let { id } = this.props.location.query;
        let _params = {
            custGroupId: id
        };
        return this.requestPromise({
            api: 'GetCustInfo',
            params: _params,
            hideToast: true
        })
    }

    toggleDetail(index) {
        let { showDetail } = this.state;
        let _showDetail = this.deepClone(showDetail);
        _showDetail[index] = _showDetail[index] ? 0 : 1
        this.setState({
            showDetail: _showDetail
        })
    }

    /**
     * 开关客户信息
     */
    toggleList(index) {
        let { showList } = this.state;
        let _showList = this.deepClone(showList);
        _showList[index] = _showList[index] ? 0 : 1
        this.setState({
            showList: _showList
        })
    }

    render() {
        let { detailData, keHuList, showDetail, showList } = this.state;
        let { id, name } = this.props.location.query;
        console.log(detailData, keHuList, showDetail, showList)

        return <div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <Flex align="start" style={{padding: ".15rem 0"}}>
                <span className="iconfont1 iconjibenxinxi fs_14 color999 ml_15 mr_10"/>
                <Text className="fs_16 color333">基本信息</Text>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            <Flex justify="between">
                <Flex align="start" style={{padding: ".1rem 0"}}>
                    <span className="iconfont1 iconfuzeren fs_18 color_ui ml_15 mr_10"/>
                    <div className="fs_14 color666" style={{marginTop: '3px'}}>负责人</div>
                </Flex>
                <div className="fs_12 color999 mr_15">
                    { detailData.ownerName }
                </div>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            <Flex align="start" style={{padding: ".1rem 0"}}>
                <span className="iconfont1 iconbeizhu fs_18 color_ui ml_15 mr_10" />
                <div>
                    <Text className="fs_14 color666"  style={{marginTop: '3px'}}>说明</Text>
                    <div
                        className={["fs_12 color999 mt_10 mr_15", !showDetail[0] && "hft_hidden_line2"].join(" ")}
                        style={{lineHeight: '1.5'}}
                        onClick={()=>this.toggleDetail(0)}
                    >
                        { detailData.des }
                    </div>
                </div>
            </Flex>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <Flex justify="between" style={{padding: ".15rem 0"}}>
                <Flex align="start" >
                    <span className="iconfont1 iconxiezuoren fs_14 color999 ml_15 mr_10"/>
                    <Text className="fs_16 color333">客户信息</Text>
                </Flex>
                <div
                    className="iconfont1 iconsousuo1 color999 fs_16 mr_15"
                    onClick={()=>this.context.router.push({pathname: '/CustomeGroupSearch',query: {id,name}})}
                ></div>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            {
                keHuList.map((item, index)=>{
                    return <div key={index}>
                        <Flex justify="between" style={{padding: ".10rem .15rem"}} onClick={()=>this.toggleList(index)}>
                            <Text className="fs_14 color333">
                                { item.name }
                                ({ item.custno })
                            </Text>
                            <div className={["iconfont1 iconzhankaishouqi fs_12 color666", !!showList[index] && "rotate180"].join(" ")}></div>
                        </Flex>
                        {
                            !!showList[index] &&
                                <div>
                                    <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                                        <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                                            <Flex align="start">
                                                <span className="iconfont1 icondangniandengjilishidengji fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">当年等级</div>
                                                    <div className="fs_12 color999 mt_10">
                                                        { item.ecvip }
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                        <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                                            <Flex align="start">
                                                <span className="iconfont1 icondangniandengjilishidengji fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">历史等级</div>
                                                    <div className="fs_12 color999 mt_10">
                                                        { item.echisvip }
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                                        <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                                            <Flex align="start">
                                                <span className="iconfont1 iconbaoyouliang fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">保有量</div>
                                                    <div className="fs_12 color999 mt_10">
                                                        { this.fmoney(item.currentq) }万元
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                        <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                                            <Flex align="start">
                                                <span className="iconfont1 iconbaoyouliang fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">历史最高保有量</div>
                                                    <div className="fs_12 color999 mt_10">
                                                        { this.fmoney(item.highes) }万元
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                                        <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                                            <Flex align="start">
                                                <span className="iconfont1 icondianhua fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">手机号</div>
                                                    <div className="fs_12 color999 mt_10">
                                                        { this.formatPhone(item.mobile) }
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                        <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                                            <Flex align="start">
                                                <span className="iconfont1 iconfuzeren fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">负责人</div>
                                                    <div className="fs_12 color999 mt_10">
                                                        { item.ownerName }
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                                        <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                                            <Flex align="start">
                                                <span className="iconfont1 iconbeizhu fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">备注</div>
                                                    <div className="fs_12 color999 mt_10 mr_15 hft_hidden_line2" style={{lineHeight: 1.5}}>
                                                        { item.summary }
                                                    </div>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                                        <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                                            <Flex align="start">
                                                <span className="iconfont1 iconzidingyibiaoqian fs_18 color_ui mr_10"/>
                                                <div>
                                                    <div className="fs_14 color666">自定义标签</div>
                                                    <Flex  wrap="wrap">
                                                        {
                                                            item.customlabel.map((item, index)=>{
                                                                return  <div key={index} style={{lineHeight: '.22rem', borderRadius: '.11rem', color: '#FB5C5F', backgroundColor: '#FFF0F0', padding: '0 .07rem'}} className="fs_12 mr_10 mt_10">
                                                                        { item }
                                                                </div>
                                                            })
                                                        }
                                                    </Flex>
                                                </div>
                                            </Flex>
                                        </Flex.Item>
                                    </Flex>
                                </div>

                        }
                        <WhiteSpace style={{height: '1px'}} className="bg_f6"/>
                    </div>
                })
            }

        </div>
    }
}

export default CustomeGroupDetail;