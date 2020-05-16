import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import echarts from 'echarts';
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class CallOutReport extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sumHuJiao: 0,       //总呼叫人数
            weiHuJiao: 0,       //未呼
            weiJieTong: 0,      //未接通
            yiHuJiao: 0,        //已呼
            yiJieTong: 0,       //已接通
            meiXingQu: 0,       //没兴趣
            yiBan: 0,           //一般
            yongXingQu: 0       //有兴趣
        }
    }

    componentDidMount() {
        this.changeTilte("科创版外呼客户分析");
        this.getKeChuangReport();

    }

    getKeChuangReport() {
        this.request({
            api: "KeChuangReport"
        }, (res)=>{
            this.setState({
                sumHuJiao: res.data.huJiao.sumHuJiao,
                weiHuJiao: res.data.huJiao.weiHuJiao,
                weiJieTong: res.data.huJiao.weiJieTong,
                yiHuJiao: res.data.huJiao.yiHuJiao,
                yiJieTong: res.data.huJiao.yiJieTong,
                meiXingQu: res.data.xingQu.meiXingQu,
                yiBan: res.data.xingQu.yiBan,
                yongXingQu: res.data.xingQu.yongXingQu
            }, ()=>{
                this.renderChartA();
                this.renderChartB()
            })
        })
    }

    renderChartA() {
        let { sumHuJiao, weiHuJiao, weiJieTong, yiHuJiao, yiJieTong } = this.state;
        let myChart = echarts.init(document.getElementById('myChartA'));
        let innerData = [
            {name: "未呼", value: weiHuJiao },
            {name: "已呼", value: yiHuJiao },
        ];
        let outData = [
            {name: "未呼", value: weiHuJiao },
            {name: "未接通", value: weiJieTong },
            {name: "已接通", value: yiJieTong },
        ];

        let option_a = {
            color:['#7CB1F9', '#FF9193','#64D5FF','#FBD168','#FF8102', '#2B83F8'],
            series: [
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['36%', '36%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{name: '', value: 1, selected:false, itemStyle: {borderColor: '#f6f6f6', borderWidth: 1, color: '#fff'}}]
                },
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['0', '20%'],
                    label: {
                        normal: {
                            show: true,
                            position:'inside',
                            formatter: '{b}',
                            color: "#fff"
                            // fontSize: 6
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 90
                        }
                    },
                    data: innerData
                },
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    label: {
                        normal: {
                            position:'outside',
                            formatter: '{b}\n{c}人\n{d}%',
                            color: "#333",
                            fontWeight: "normal",
                        },

                    },
                    labelLine: {
                        length: 20,
                        length2: 10
                    },
                    data: outData
                }
            ]
        };
        myChart.setOption(option_a);
    }

    renderChartB() {
        let { meiXingQu, yiBan, yongXingQu } = this.state;
        let myChart = echarts.init(document.getElementById('myChartB'));
        let option_a = {
            color:['#5A95E5', '#FF8102','#FBD168'],
            series: [
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['0', '60%'],
                    label: {
                        normal: {
                            position:'outside',
                            formatter: '{b}\n{c}人\n{d}%',
                            color: "#333",
                            fontWeight: "normal"
                        }
                    },
                    labelLine: {
                        length: 20,
                        length2: 10
                    },
                    data: [{name: "无意向", value: meiXingQu}, {name: "一般", value: yiBan}, {name: "有兴趣", value: yongXingQu}]
                }
            ]
        };
        myChart.setOption(option_a);
    }

    render() {
        let { sumHuJiao, yiJieTong, weiHuJiao, weiJieTong, yiHuJiao } = this.state;

        return <div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <div id="myChartA" style={{height: '300px'}}></div>

            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>
            <Flex style={{textAlign: 'center'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.1rem 0'}}>
                    <div className="fs_16 color666 mb_5">{ this.fmoney(sumHuJiao, true) }</div>
                    <div className="fs_12 color999">总分配人数</div>
                </Flex.Item>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.1rem 0'}}>
                    <div className="fs_16 color666 mb_5">{ this.fmoney(yiHuJiao, true) }</div>
                    <div className="fs_12 color999">已呼人数</div>
                </Flex.Item>
                <Flex.Item style={{ padding: '.1rem 0'}}>
                    <div className="fs_16 color666 mb_5">{ this.fmoney(weiHuJiao, true) }</div>
                    <div className="fs_12 color999">未呼人数</div>
                </Flex.Item>
            </Flex>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <WhiteSpace style={{height: '15px'}}/>
            <Flex>
                <div style={{backgroundColor: "#FEF7E9", lineHeight: ".3rem", padding: '0 .15rem', borderRadius: "0 .15rem .15rem 0"}} className="color_ui fs_14">
                    已拨通客户情况
                </div>
            </Flex>

            <div id="myChartB" style={{height: '300px'}}></div>

        </div>
    }
}

export default CallOutReport;