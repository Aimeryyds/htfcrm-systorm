import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import $ from 'jquery'
import { WingBlank } from 'antd-mobile';
import echarts from 'echarts'


class SellCharts extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        this.changeTilte("销售漏斗");
        this.renderFunnelChart();
    }

    renderFunnelChart() {
        let myChart1 = echarts.init(document.getElementById('funnelChart1'));
        let option1 = {
            title: {
                text: '销售活动社交仪表盘',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                show: false
            },
            legend: {
                data: ['展现','点击','访问','咨询','订单'],
                top: 'bottom'
            },
            series: [
                {
                    name: '预期',
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    label: {
                        normal: {
                            formatter: '{b}'
                        },
                        emphasis: {
                            position:'inside',
                            formatter: '{b}预期: {c}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.7
                        }
                    },
                    data: [
                        {value: 60, name: '访问'},
                        {value: 40, name: '咨询'},
                        {value: 20, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}
                    ]
                },
                {
                    name: '实际',
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    maxSize: '80%',
                    label: {
                        normal: {
                            position: 'inside',
                            formatter: '{c}%',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            position:'inside',
                            formatter: '{b}实际: {c}%'
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.5,
                            borderColor: '#fff',
                            borderWidth: 2
                        }
                    },
                    data: [
                        {value: 30, name: '访问'},
                        {value: 10, name: '咨询'},
                        {value: 5, name: '订单'},
                        {value: 50, name: '点击'},
                        {value: 80, name: '展现'}
                    ]
                }
            ]
        };
        let myChart2 = echarts.init(document.getElementById('funnelChart2'));
        let option2 = {
            title: {
                text: '销售活动社交仪表盘',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                show: false
            },
            legend: {
                data: ['展现','点击','访问','咨询','订单'],
                top: 'bottom'
            },
            series: [
                {
                    name: '实际',
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    maxSize: '80%',
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{c}%',
                            textStyle: {
                                color: '#333'
                            }
                        },
                        emphasis: {
                            position:'inside',
                            formatter: '{b}: {c}%'
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    data: [
                        {value: 30, name: '访问'},
                        {value: 10, name: '咨询'},
                        {value: 5, name: '订单'},
                        {value: 50, name: '点击'},
                        {value: 80, name: '展现'}
                    ]
                }
            ]
        };
        myChart1.setOption(option1);
        myChart2.setOption(option2);
    }

    render() {
        return <div className="N_business">
            <WingBlank>
                <div id="funnelChart1" style={{height: '300px', margin: '.2rem 0'}}></div>
                <div id="funnelChart2" style={{height: '300px', margin: '.2rem 0'}}></div>
            </WingBlank>

        </div>
    }
}

export default SellCharts;