import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'

class ChartB extends Module{
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
        let chart = echarts.init(document.getElementById('chartb')), data = this.props.data, upData = data.uplevel, downData=data.downlevel,unchange=data.NoChange, dates = data.time ? data.time : [], type = this.props.tabValue, end = 50;
        if(type == 0){
            end = 20;
        }
        
        let option = {
            tooltip:{
                trigger: 'axis'
            },
            legend:{
                data:["升级", "降级", "无异动"],
                bottom: 0
            },
            grid:{
                left: '13%'
            },
            dataZoom:{
                type: 'inside',
                startValue:0,
                endValue: 5
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
                    padding: [12,0]
                },
                data: dates
            },
            yAxis: {
                type: 'value',
                name: '保有量（单位：亿元）',
                splitLine: {
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        color:"#CCCCCC"
                    }
                },
                axisLabel:{
                    rotate: 45
                },
                nameTextStyle:{
                    
                    padding: [0,0,0,80]
                },
            },
            series: [
                {
                    name: '升级',
                    data: upData,
                    type: 'bar',
                    itemStyle: {
                        color: '#FA7375',
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    barWidth:15,
                    label: {
                        show: false,
                        position: 'top',
                    }
                },
                {
                    name: '降级',
                    data: downData,
                    type:'bar',
                    itemStyle: {
                        color: '#7CB1F9'
                    },
                    barWidth:15,
                    barGap:0,
                    label: {
                        show: false,
                        position: 'top',
                    }
                },
                {
                    name: '无异动',
                    data: unchange,
                    type:'bar',
                    itemStyle: {
                        color: '#FBD168',
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    barWidth:15,
                    barGap:0,
                    label: {
                        show: false,
                        position: 'top',
                    }
                }
            ]

        }
        chart.setOption(option);
    }
    render(){
        return (<div>
            <div id="chartb" style={{height:'280px'}}></div>
        </div>)
    }
}
export default ChartB;