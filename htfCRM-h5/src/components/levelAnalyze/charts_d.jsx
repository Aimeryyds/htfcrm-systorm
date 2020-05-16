import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class ChartsD extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    componentDidMount() {
        this.renderEcharts();
    }
    componentDidUpdate(){
        this.renderEcharts();
    }
    renderEcharts() {
        let { chartsListA, timeIndex } = this.props;
        let myChart = echarts.init(document.getElementById('chartsd_bar')), legendData;
        switch(timeIndex){
            case 0:legendData = ["昨日", '今日']; break;
            case 1:legendData = ["上周", '本周']; break;
            case 2:legendData = ["上月", '本月']; break;
            case 3:legendData = ["上个季度", '本季度']; break;
            case 4:legendData = ["上半年", '本半年']; break;
            case 5:legendData = ["去年", '今年']; break;
        }
        let options = {
            color: ['#fa7375', '#7bb1f9', '#ffd35a','#5a96e6', '#ffb900'],
            legend: {
                data: legendData,
                bottom: 0,
            },
            grid: {
                left:"14%",
                right:"5%",
                top: "20%",
                bottom:"20%",
                containLabel: false,
            },
            xAxis: {
                type: 'category',
                splitLine: {show:false},
                data: ['黄金', '白金', '钻石', '财富', '战略'],
                axisLabel: {
                    interval: 0,
                    // rotate: 30,
                    fontSize: 12,
                    formatter: function (value) {
                        switch (value) {
                            case '黄金':
                                return value  ;
                                break;
                            case '白金':
                                return value ;
                                break;
                            case '钻石':
                                return value ;
                                break;
                            case '财富':
                                return value ;
                                break;
                            case '战略':
                                return value ;
                                break;
                        }
                    },
                }
            },
            yAxis: {
                name: '保有量(单位:亿)',
                type : 'value',
                axisLabel: {
                    interval: 0,
                    // rotate: 30,
                    fontSize: 12,
                }
            },
            series: [
                {
                    name: legendData[0],
                    type: 'bar',
                    barGap: 0,
                    label: {
                        show: true,
                        position: 'top',
                        color: '#666',
                        offset:[-5, 0],
                    },
                    data: chartsListA.lastMonth,
                    barWidth: "25%",
                    itemStyle:{
                        barBorderRadius: [2,2,0, 0]
                    },
                    

                },
                {
                    name: legendData[1],
                    type: 'bar',
                    itemStyle:{
                        barBorderRadius: [2,2,0, 0]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#666',
                        offset:[15, 0],
                        formatter: function (value) {
                            let lastVal = chartsListA.lastMonth[value.dataIndex];
                            let thisVal = value.data;
                            if(lastVal == 0){
                                return value.data;
                            }
                            if(lastVal > thisVal) {
                                let _val = ((lastVal-thisVal)/lastVal*100).toFixed(2)
                                return  '{a|-' + _val + '%\n' +value.data + '}' ;
                            }
                            if(lastVal < thisVal) {
                                let _val = ((thisVal-lastVal)/lastVal*100).toFixed(2)
                                return  '{b|' + _val + '%\n' +value.data + '}' ;
                            }
                            if(lastVal === thisVal) {
                                return  value.data;
                            }
                        },
                        rich:{
                            a:{
                                color:'green'
                            },
                            b:{
                                color: 'red'
                            }
                        }
                    },

                    data: chartsListA.thisMonth
                }
            ]
        };
        if(this.props.tabType === 1){
            options = {
                color: ['#fa7375', '#7bb1f9', '#ffd35a','#5a96e6', '#ffb900'],
            legend: {
                data:legendData,
                bottom: 0
            },
            grid: {
                left:"14%",
                right:"5%",
                top: "20%",
                bottom:"20%",
                containLabel: false,
            },
            xAxis: {
                type: 'category',
                // splitLine: {show:false},
                data: ['百万以下有效户', '百万有效户', "500万有效户"],
                axisLabel: {
                    interval: 0,
                    fontSize: 10,
                    rotate:0,
                    
                    formatter: function (value) {
                        switch (value) {
                            case '百万以下有效户':
                                return value + '\n' + '(≤100万)' ;
                                break;
                            case '百万有效户':
                                return value + '\n' + '(100-500万)' ;
                                break;
                            case '500万有效户':
                                return value + '\n' + '(≥500万)' ;
                                break;
                        }
                    },
                }
            },
            yAxis: {
                name: '保有量(单位:亿)',
                type : 'value',
                axisLabel: {
                    interval: 0,
                    // rotate: 30,
                    fontSize: 12,
                }
            },
            series: [
                {
                    name: legendData[0],
                    type: 'bar',
                    barGap: 0,
                    label: {
                        show: true,
                        position: 'top',
                        color: '#666',
                    offset:[-5, 0],

                    },
                    data: chartsListA.lastMonth.slice(0,3),
                    barWidth: "20%",

                },
                {
                    name: legendData[1],
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top',
                        color: '#666',
                        offset:[15, 0],
                        formatter: function (value) {
                            let lastVal = chartsListA.lastMonth[value.dataIndex];
                            let thisVal = value.data;
                            if(lastVal == 0){
                                return value.data;
                            }
                            if(lastVal > thisVal) {
                                let _val = ((lastVal-thisVal)/lastVal*100).toFixed(2)
                                return  '{a|-' + _val + '%\n' +value.data + '}' ;
                            }
                            if(lastVal < thisVal) {
                                let _val = ((thisVal-lastVal)/lastVal*100).toFixed(2)
                                return "{b|" + _val + '%\n' +value.data + '}';
                            }
                            if(lastVal === thisVal) {
                                return  value.data;
                            }
                        },
                        rich:{
                            a:{
                                color:'green'
                            },
                            b:{
                                color: 'red'
                            }
                        }
                    },
                    barWidth: "20%",
                    data: chartsListA.thisMonth.slice(0, 3)
                }
            ]
            }
        }
        myChart.setOption(options);
        myChart.off("click");
        myChart.on("click", (param) => {
            this.props.levelChange(param.name)
        });

    }

    render() {
        return <div>
            <div id="chartsd_bar" style={{width: '100%', height: '270px', paddingBottom: '20px'}}></div>
        </div>
    }
}

export default ChartsD;