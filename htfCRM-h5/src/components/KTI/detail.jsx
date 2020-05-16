import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Flex, Modal, Text, Toast, TextareaItem } from 'antd-mobile';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class KTIDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dateilData: {},
            isshow: false,
            detailXZRData: [],
            rejectVal: "",  //驳回信息

            showList: [0,0,0],        //1:打开   0:隐藏
            XZRShowList: [],        //1:打开   0:隐藏
            modal1: false
        }
    }

    componentDidMount() {
        this.changeTilte("销售漏斗");
        this.ajaxFn();

    }

    ajaxFn() {
        // console.log("---1")
        Toast.loading('数据加载中...', 0);
        Promise.all([
            this.getKTIDetail(),
            this.getKTIDetailXZR()
        ]).then((res)=>{
            // console.log("---2")
            let data0 = res[0].data[0]
            let data1 = res[1].data;
            let _XZRShowList= [];
            this.changeTilte(data0.name);
            data1.map((item, index) => {
                index === 0 ? _XZRShowList.push(1) : _XZRShowList.push(0);
            });
            Toast.hide();
            this.setState({
                dateilData: data0,
                isshow: data0.isshow,
                detailXZRData: data1,
                XZRShowList: _XZRShowList
            })
        })
    }

	/**
     * KIT详情
     * @returns {*}
     */
    getKTIDetail() {
        return this.requestPromise({
            api: 'GetKTIDetail',
            hideToast: true,
            params: {
                id: this.props.location.query.id
            }
        })
    }
    /**
     * KIT详情中协作人列表
     * @returns {*}
     */
    getKTIDetailXZR() {
        return this.requestPromise({
            api: 'GetKTIDetailXZR',
            hideToast: true,
            params: {
                id: this.props.location.query.id
            }
        })
    }

    /**
     * 驳回按钮调用接口
     */
    updateReject() {
        this.request({
            api: "UpdateReject",
            params: {
                id: this.props.location.query.id,
                new_rejection_opinion: this.state.rejectVal
            }
        },(res)=>{
            Toast.info("驳回成功", 2);
            // this.setState({
            //     isshow: false
            // })
            this.ajaxFn();
        })
    }

    /**
     * 审批按钮调用接口
     */
    updateApprove() {
        this.request({
            api: "UpdateApprove",
            params: {
                id: this.props.location.query.id
            }
        },(res)=>{
            Toast.info("审批成功", 2);
            this.ajaxFn();
        })
    }

    //驳回
    handleReject() {
        if(this.state.rejectVal.trim() === "") {
            Toast.info("请填写驳回意见!", 1)
            return;
        }
        this.setState({
            modal1: false
        }, ()=>{
            this.updateReject();
        })

    }

    //审批
    handleApprove() {
        Modal.alert('审批', '是否确认审批?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => this.updateApprove() },
        ])
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

	/**
     * 开关协作人
     */
    toggleXZR(index) {
        let { XZRShowList } = this.state;
        let _XZRShowList = this.deepClone(XZRShowList);
        _XZRShowList[index] = _XZRShowList[index] ? 0 : 1
        this.setState({
            XZRShowList: _XZRShowList
        })
    }

    toggleDetail(index) {
        let { showList } = this.state;
        let _showList = this.deepClone(showList);
        _showList[index] = _showList[index] ? 0 : 1
        this.setState({
            showList: _showList
        })
    }

    render() {
        let { dateilData, detailXZRData, XZRShowList, showList, isshow } = this.state;

        return <div>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <div className="fs_16 color333 mt_15 ml_15 mb_15"  >
                { dateilData.name }
            </div>
            <Flex className="mb_15">
                <div style={{lineHeight: '.22rem', borderRadius: '.11rem', color: '#FB5C5F', backgroundColor: '#FFF0F0', padding: '0 .07rem'}} className="fs_12 ml_15">
                    进度:{ dateilData.progress }
                </div>
                <div style={{lineHeight: '.22rem', borderRadius: '.11rem', color: '#FB935C', backgroundColor: '#FFF9F0', padding: '0 .07rem'}} className="fs_12 ml_10">
                    更新频频率:{ dateilData.frequency }
                </div>
                <div style={{lineHeight: '.22rem', borderRadius: '.11rem', color: '#66BDFF', backgroundColor: '#EDF7FF', padding: '0 .07rem'}} className="fs_12 ml_10">
                    审批状态:{ dateilData.statu }
                </div>
            </Flex>

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
                    { dateilData.ownerName }
                </div>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            <Flex align="start" style={{padding: ".1rem 0"}}>
                <span className="iconfont1 iconjinzhan fs_18 color_ui ml_15 mr_10" />
                <div>
                    <Text className="fs_14 color666"  style={{marginTop: '3px'}}>进展</Text>
                    <div
                        className={["fs_12 color999 mt_10 mr_15", !showList[0] && "hft_hidden_line2"].join(" ")}
                        style={{lineHeight: '1.5'}}
                        onClick={()=>this.toggleDetail(0)}
                    >
                        { dateilData.progr }
                    </div>
                </div>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            <Flex align="start" style={{padding: ".1rem 0"}}>
                <span className="iconfont1 iconbeizhu fs_18 color_ui ml_15 mr_10" />
                <div>
                    <Text className="fs_14 color666"  style={{marginTop: '3px'}}>备注</Text>
                    <div
                        className={["fs_12 color999 mt_10 mr_15", !showList[1] && "hft_hidden_line2"].join(" ")}
                        style={{lineHeight: '1.5'}}
                        onClick={()=>this.toggleDetail(1)}
                    >
                        { dateilData.remark }
                    </div>
                </div>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            <Flex align="start" style={{padding: ".1rem 0"}}>
                <span className="iconfont1 iconbohuiyijian fs_18 color_ui ml_15 mr_10" />
                <div>
                    <Text className="fs_14 color666"  style={{marginTop: '3px'}}>驳回意见</Text>
                    <div
                        className={["fs_12 color999 mt_10 mr_15", !showList[2] && "hft_hidden_line2"].join(" ")}
                        style={{lineHeight: '1.5'}}
                        onClick={()=>this.toggleDetail(2)}
                    >
                        { dateilData.opinion }
                    </div>
                </div>
            </Flex>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <Flex align="start" style={{padding: ".15rem 0"}}>
                <span className="iconfont1 iconxiezuoren fs_14 color999 ml_15 mr_10"/>
                <Text className="fs_16 color333">协作人</Text>
            </Flex>
            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>

            {
                detailXZRData.map((item, index)=>{
                    return <div key={index}>
                        <Flex justify="between" style={{padding: ".10rem .15rem"}} onClick={()=>this.toggleXZR(index)}>
                            <Text className="fs_14 color333">
                                { item.Name }
                            </Text>
                            <div className={["iconfont1 iconzhankaishouqi fs_12 color666", !!XZRShowList[index] && "rotate180"].join(" ")}></div>
                        </Flex>
                        {
                            !!XZRShowList[index] && <Flex style={{borderTop: '1px solid #f6f6f6'}}>
                                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.12rem 0 .12rem .15rem'}}>
                                    <Flex align="start">
                                        <span className="iconfont1 iconbumen fs_18 color_ui mr_10"/>
                                        <div>
                                            <div className="fs_14 color666">业务部门</div>
                                            <div className="fs_12 color999 mt_10">
                                                { item.BMname }
                                            </div>
                                        </div>
                                    </Flex>
                                </Flex.Item>
                                <Flex.Item style={{padding: '.12rem 0 .12rem .15rem', margin: 0}}>
                                    <Flex align="start">
                                        <span className="iconfont1 icondianhua fs_18 color_ui mr_10"/>
                                        <div>
                                            <div className="fs_14 color666">电话</div>
                                            <div className="fs_12 color999 mt_10">
                                                { this.formatPhone(item.Phone) }
                                            </div>
                                        </div>
                                    </Flex>
                                </Flex.Item>
                            </Flex>
                        }
                        <WhiteSpace style={{height: '1px'}} className="bg_f6"/>
                    </div>
                })
            }

            {
                isshow &&
                <Flex justify="between" style={{padding: '.4rem .2rem'}} className="bg_f6">
                    <div
                        className="bg_ui colorF fs_16"
                        style={{width: '1.5rem', lineHeight: '.38rem', borderRadius: '4px', textAlign: 'center'}}
                        onClick={()=>this.setState({modal1: true})}
                    >驳回</div>
                    <div
                        className="bg_ui colorF fs_16"
                        style={{width: '1.5rem', lineHeight: '.38rem', borderRadius: '4px', textAlign: 'center'}}
                        onClick={()=>this.handleApprove()}
                    >审批</div>
                </Flex>
            }


            <Modal
                className="htf_Modal_TextareaItem"
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={()=>this.setState({modal1: false})}
                title="驳回意见"
                footer={
                [
                    { text: '取消', onPress: () => { this.setState({modal1: false}) } },
                    { text: '驳回', onPress: () => this.handleReject()}
                ]
            }
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <TextareaItem
                    style={{border: '1px solid #f6f6f6'}}
                    rows={5}
                    count={2000}
                    value={this.state.rejectVal}
                    onChange={(val)=>this.setState({rejectVal: val})}
                />
            </Modal>




        </div>
    }
}

export default KTIDetail;