import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts';
import {List} from 'antd-mobile';
const Item = List.Item;
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
        let chart = echarts.init(document.getElementById('chartb')), data = this.props.data, dates = data.dates, quantity = data.quantity;
        
        let option = {
            color:['#7BB1F9'],
            tooltip:{
                trigger: 'axis',
            },
            grid:{
                left:'15%'
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
                    color: 'black'
                },
                data: dates
            },
            yAxis: {
                type: 'value',
                name: '总保有量（单位：百万）',
                splitLine: {
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        color:"#CCCCCC"
                    }
                },
                nameTextStyle:{
                    
                    padding: [0,0,0,80]
                },
            },
            series: [
                {
                    
                    data: quantity,
                    type: 'line',
                    smooth: true,
                },
            ]

        }
        chart.setOption(option);
    }
    render(){
        return (<div>
            <Item>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
               高净值客户总保有量
            </div>
            </Item>
            <div id="chartb" style={{height:'280px'}}></div>
        </div>)
    }
}
export default ChartB;