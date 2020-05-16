/*
 * @Author: Thomas Ji 
 * @Date: 2019-02-15 16:37:38 
 * @Last Modified by: Thomas Ji
 * @Last Modified time: 2019-02-28 14:37:39
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
        let chart = echarts.init(document.getElementById('chartincrement')), data = this.props.data;
        
        let option = {
                color: ['#7CB1F9'],
                tooltip:{
                    trigger: 'axis'
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
                    name: '保有量增量（单位：万元）',
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
                        data: data.increment,
                        type: 'bar',
                        itemStyle: {
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}%',
                            color:'black'
                        },
                        barWidth: '50%'
                    },
                ]}
    
        
        chart.setOption(option);
    }
    render(){
        
        return (<div>
            <div id="chartincrement" style={{height:'280px'}}></div>
        </div>)
    }
}
export default ChartA;