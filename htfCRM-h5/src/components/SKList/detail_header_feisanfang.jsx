import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'
import ShowBadge from './show_badge'		//客户标签

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailHeaderFeiSanfang extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShowBadge: false,			//是否显示更多标签,
            TQLable: [],            //特权标签
            levelChangeShow: false,     //是否显示等级趋势
        }
    }

    componentDidMount() {
        this.getCustomerPrivilegeLable();
    }

	/**
     * 客户特权标签
     */
    getCustomerPrivilegeLable() {
        let { query, detailData } = this.props;
        this.request({
            api: 'GetCustomerPrivilegeLable',
            params: {
                id: query.id
            }
        }, (res) => {
            this.setState({
                TQLable: res.data.data || []
            })
        })
    }

    //跳转客户360视图
    showView360(name) {
        let { query, detailData } = this.props;
        this.context.router.push({
            pathname: '/View360',
            query: {
                id: query.id,
                name: name,
                userType: query.userType
            }
        })
    }

    //展示全部标签
    handleBadgeShow(tags) {
        if(tags.length > 3) {
            this.setState({
                isShowBadge: true
            })
        }
    }

    renderChart() {
        let { levelChangeList } = this.props;
        let myChart = echarts.init(document.getElementById('funnelChart'));
        let _changeData=[], _ecviplvl=[], seriesData = [];

        //X轴展示当天时间之前一年内时间: 庆军
        console.log(levelChangeList)
        levelChangeList.map((item, index)=>{
            _changeData.push(item.changeDate.trim());
            _ecviplvl.push(item.ecviplvl);
        });
        for(let i = 0; i < _changeData.length; i++){
            seriesData.push([_changeData[i].trim(), _ecviplvl[i]]);
        }

        console.log(_changeData, _ecviplvl)
        let option = {
            animation: false,
            title:{
                text:"客户等级趋势图",
                left:'center'
            },
  
            grid:{
                left: 60
            },
            tooltip: {
                trigger: 'axis',
                // position: function (pt) {
                //     return [pt[0] - 30, 130];
                // },
                axisPointer:{
                    axis: 'x'
                }
            },

            xAxis: {
                type: 'time',
                boundaryGap: [0, 0],

                // axisPointer: {
                //     snap: true,
                //     lineStyle: {
                //         color: '#5a96e6',
                //         opacity: 0.5,
                //         width: 1
                //     },
                //     label: {
                //         show: true,
                //         formatter: function (params) {
                //             return echarts.format.formatTime('yyyy-MM-dd', params.value);
                //         },
                //         backgroundColor: '#5a96e6'
                //     },
                //     handle: {
                //         show: true,
                //         color: '#5a96e6',
                //         size: 30,
                //         margin:20
                //     },
                // },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                axisTick: {
                    inside: true
                },
                axisLabel:{
                    rotate: 30,
                },
                splitLine: {
                    show: false
                },

                data:["普通客户", "黄金客户", "白金客户", "钻石客户", "财富客户", "战略客户"],
            },


            series: [
                {
                    type:'line',
                    // smooth: true,
                    // showSymbol: false,
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#5a96e6'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: seriesData
                },


            ]
        }
        // let option = {
        //     title: {
        //         text: '等级走势图',
        //         left: 'center',
        //         textStyle: {
        //             fontSize: 16,
        //             fontWeight: 'normal',
        //         },
        //         padding: [10, 0, 0, 0]
        //     },
        //     grid: {
        //         top: 70,
        //         left: '6%',
        //         right: '8%',
        //         bottom: '5%',
        //         containLabel: true
        //     },
        //     xAxis: {
        //         type: 'time',
        //         boundaryGap: false,
        //         axisLine: {onZero: false},
        //         axisLabel: {
        //             interval: 0,
        //             rotate: 40
        //         },
        //     },
        //     yAxis: {
        //         name: '客户等级',
        //         type: 'category',
        //         boundaryGap: false,
        //         axisLine: {onZero: false},
        //         axisLabel: {
        //             interval: 0,
        //             rotate: 40
        //         },
        //         data: ["普通客户", "黄金客户", "白金客户", "钻石客户", "财富客户", "战略客户"]
        //     },
        //     series: [
        //         {
        //             name:'等级趋势',
        //             type:'line',
        //             stack: '总量',
        //             itemStyle: {
        //                 color: '#5a96e6',
        //                 normal: {
        //                     label: {
        //                         show: true,
        //                         formatter: "{c}",
        //                         color: '#5a96e6'
        //                     },
        //                     color: '#5a96e6'
        //                 }
        //             },
        //             lineStyle: {
        //                 color: '#5a96e6'
        //             },
        //             tooltip : {
        //                 show: true,
        //                 trigger: 'item',
        //                 axisPointer: {
        //                     type: 'cross',
        //                     animation: false,
        //                     label: {
        //                         backgroundColor: 'red'
        //                     }
        //                 }
        //             },
        //             smooth: true,
        //             data: seriesData
        //         }
        //     ]
        // };
        myChart.setOption(option)
    }

    handleLevel() {
        let detailData = this.props.detailData;
        let { lastLevelChange, levelChangeList } = this.props;

        if (lastLevelChange === "升级") {
            return <div>
                {/* { levelChangeList[levelChangeList.length -1] && levelChangeList[levelChangeList.length -1]['ecviplvl']} */}
                {detailData.level}
                <div className="fs_12" style={{transform: 'rotate(-90deg)', display: 'inline-block'}}>→</div>
            </div>
        } else if (lastLevelChange === "降级") {
            return <div>
                {/* { levelChangeList[levelChangeList.length -1] && levelChangeList[levelChangeList.length -1]['ecviplvl']} */}
                {detailData.level}
                <div className="fs_12" style={{transform: 'rotate(90deg)', display: 'inline-block'}}>→</div>
            </div>
        } else {
            return detailData.level;
        }
    }

    render() {
        let { query, detailData, lastLevelChange, levelChangeList } = this.props;
        let { isShowBadge, TQLable, levelChangeShow } = this.state;

        if(!detailData.other) {
            return <div></div>
        }

        return <div>
            <div id="detailHeaderA" style={{position: 'fixed', top:'0', right: '0', left: '0', backgroundColor: '#fff', zIndex: 11}}>
                <WhiteSpace size="lg" className="bg_f6"/>
                <WingBlank size="sm" className="info_style_a" >
                    <WhiteSpace size="lg"/>
                    <div className="ml_10 mr_10" style={{position: 'relative'}}>
                        <Flex
                            justify="between"
                            className="mb_10"
                            onClick={()=>this.showView360( detailData.name)}
                        >
                            <Flex.Item className="fs_18 color000" style={{flex: 4}}>
                                { detailData.name }
                                <span className="fs_14 color666" style={{marginLeft: '.1rem'}}>
                                    { detailData.sex }
                                </span>
                            </Flex.Item>
                            <Flex.Item style={{flex: 1.4, textAlign: 'right'}}>
                                <span className='fs_10 color999' style={{verticalAlign: '2px'}}>
                                    360视图
                                </span>
                                <span className="iconfont icon-kgengduo color_ui"></span>
                            </Flex.Item>
                        </Flex>
                        <div className={ (detailData.level || detailData.custtype) && "mb_20"}>
                            {
								/**
								 * 当前客户类型
                                 */
                                detailData.custtype &&
                                <Badge text={detailData.custtype} className={"badge-style0 mb_10"} />
                            }
                            {
								/**
								 * 客户级别
                                 */
                                detailData.level &&
                                <Badge
                                    text={ this.handleLevel() }
                                    className={"badge-style1 mb_10"}
                                    onClick={()=>{
                                        if(this.props.levelChangeList.length === 0)
                                            return;
                                        this.setState({levelChangeShow: true},()=>{
                                            this.renderChart()
                                        })
                                    }}
                                />
                            }
                            {
								/**
								 * 年龄
                                 */
                                (detailData.age !== '' && detailData.age !== null) &&
                                <Badge text={detailData.age + '岁'} className={"badge-style2 mb_10"} />
                            }
                            {
								/**
								 * 现有保有量
                                 */
                                detailData.Depth && detailData.Depth.currentquantity &&
                                <Badge text={detailData.Depth.currentquantity} className={"badge-style3 mb_10 mr_10"} />
                            }
                            {
								/**
								 * 特权标签
                                 */
                                TQLable.map((item, index)=>{
                                    return <Badge key={index} text={ item.name } className={["badge-style"+(index%3), 'mb_10'].join(' ')} />
                                })
                            }

                        </div>
                        <ShowBadge
                            badgeData={detailData.tags}
                            name={detailData.name}
                            isShowBadge={isShowBadge}
                            cloaseShowBadge={()=>this.setState({isShowBadge: false})}
                        />
                        {
                            detailData.other.remark &&
                            <div className="fs_14 color999 mb_10">
                                备注: { detailData.other.remark }
                            </div>
                        }
                    </div>

                    {/** 接触记录跳转 **/}
                    <Flex
                        style={{borderTop: '1px solid #eee', padding: '15px'}}
                        onClick={()=>{
									this.context.router.push({
										pathname: '/ServeList',
										query: {
											no: detailData.no,
										}
									})
								}}
                    >
                        <Flex.Item className="fs_14 color666" style={{flex: 4}}>
                            <div className="icon-img icon_img_baifangjilu inline va_middle mr_10" ></div>
                            <span style={{lineHeight: '.27rem'}}>
                                接触记录
                            </span>
                        </Flex.Item>
                        <Flex.Item style={{flex: 1.4, textAlign: 'right'}}>
                            <span className="iconfont icon-kgengduo color_ui"></span>
                        </Flex.Item>
                    </Flex>

                    {/** 负责人、共享客户经理 **/}
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
                        <Flex.Item style={{padding:"0.1rem"}}>
                            <div className="fs_12 color999">共享客户经理</div>
                            <div className="fs_16 color666">{ detailData.manager.managers }</div>
                        </Flex.Item>
                    </Flex>

                </WingBlank>
            </div>

            {/** 非三方头部站位用 **/}
            <div id="detailHeader_zw" className='bg_f6'></div>


            {
                /** 客户级别趋势 **/
                levelChangeShow &&
                <div style={{position: 'fixed', top: '0', bottom: '0', left: '0', right: '0', zIndex: '999'}}>
                    <div
                        style={{background: 'rgba(0, 0, 0, .2)', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', zIndex: '1000'}}
                        onClick={()=>this.setState({levelChangeShow: false})}
                    ></div>
                    <div
                        style={{position: 'absolute', top: '50%', left:'0', right: '0', marginTop: '-150px', height: '300px', backgroundColor: '#fff', zIndex: '1001'}}
                        id="funnelChart"
                    >

                    </div>
                </div>
            }


        </div>
    }
}

export default DetailHeaderFeiSanfang;