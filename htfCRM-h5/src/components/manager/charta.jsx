import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'

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
        let chart = echarts.init(document.getElementById('charta')), data = this.props.data, upData = data.uplevel, downData=data.downlevel, dates = data.time ? data.time : [], type = this.props.tabValue, end = 50;
        if(type == 0)
            end = 20;
        let option = {
            tooltip:{
                trigger: 'axis'
            },
            dataZoom:{
                type: 'inside',
                startValue: 0,
                endValue: 6
            },
            legend:{
                data:["升级", "降级"],
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
                    padding:[14,0]
                },
                data:dates
            },
            yAxis: {
                type: 'value',
                name: '人数（单位：人）',
                splitLine: {
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        color:"#CCCCCC"
                    }
                },
                minInterval:1,
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
                        color: '#7CB1F9',
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    barWidth:15,
                    barGap:0,
                    label: {
                        show: false,
                        position: 'bottom',
                    }
                }
            ]

        }
        chart.setOption(option);
    }
    render(){
        return (<div>
            <div id="charta" style={{height:'280px'}}></div>
        </div>)
    }
}
export default ChartA;