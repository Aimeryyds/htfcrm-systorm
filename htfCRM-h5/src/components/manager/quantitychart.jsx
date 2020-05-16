/*
 * @Author: Thomas Ji 
 * @Date: 2019-02-15 16:37:38 
 * @Last Modified by: Thomas Ji
 * @Last Modified time: 2019-02-26 16:29:43
 */
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'
//保有量对比分布图
class ChartA extends Module{
    constructor(props, context){
        super(props, context);
    }
    componentDidMount(){
        this.renderChart();
    }
    componentDidUpdate(){
        this.renderChart();
    }
    renderChart(){
        let chart = echarts.init(document.getElementById('chartq')), data = this.props.data;
        let option = {
                color: [ '#7CB1F9','#FA7375',],
                tooltip:{
                    trigger: 'axis'
                },
                legend:{
                    data:data.legendData.reverse(),
                    bottom: 0
                },
                xAxis:{
                    type:'category',
                    splitLine: {
                        show: false
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#CCCCCC"
                        }
                    },
                    axisLabel:{
                        color: 'black',
                        interval: 0,
                    },
                    data: data.xData,
                },
                yAxis: {
                    type: 'value',
                    name: '保有量（单位：百万）',
                    splitLine: {
                        show: false
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#CCCCCC"
                        }
                    },
                    nameTextStyle:{
                        padding: [0,0,0,70]
                    },
                },
                series: [
                    {
                        name: data.legendData[0],
                        data: data.preData,
                        type: 'bar',
                        itemStyle: {
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        label: {
                            show: false,
                            position: 'top',
                            rotate: 30
                        },
                        barWidth: '30%'
                    },
                    {
                        name: data.legendData[1],
                        data: data.curData,
                        type:'bar',
                        itemStyle: {
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        barGap:0,
                        label: {
                            show: false,
                            position: 'top',
                         
                            rotate: 30
                        },
                        barWidth: '30%'
                    }
                ]}
    
        
        chart.setOption(option);
    }
    render(){
        
        return (<div>
            <div id="chartq" style={{height:'280px'}}></div>
        </div>)
    }
}
export default ChartA;