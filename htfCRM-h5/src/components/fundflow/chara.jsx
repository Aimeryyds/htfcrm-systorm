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
        let chart = echarts.init(document.getElementById('charta')), data = this.props.data, inflows = data.Inflows,noInFlow = data.NoInflows, noOutFlow = data.NoOutflows,outfows=data.Outflows, dates = data.DateSeries ? data.DateSeries : [], netFlow = data.NetWorth , includeNo = data.IncludeNoManager, option = {};
        function toFixed2(arr){
            if(arr){
                return arr.map(item => item.toFixed(2));
            }else
            return [];
        }
        inflows = toFixed2(inflows);
        noInFlow = toFixed2(noInFlow);
        noOutFlow = toFixed2(noOutFlow);
        outfows = toFixed2(outfows);
        netFlow = toFixed2(netFlow);
        chart.clear();
        if(includeNo){//包含无管户
            option = {
                tooltip:{
                    trigger: 'axis',
                    
                },
                grid:{
                    left:'15%',
                    bottom: '34%'
                },
                legend:{
                    data:["有管户资金流入", "无管户资金流入","有管户资金流出", "无管户资金流出", '净流入'],
                    formatter: function(name){
                        if(name === '无管户资金流入'){
                            return  name + "   ";
                        }
                        return name;
                    },
                    itemGap: 5,
                    left: "20%",
                    right: '20%',
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
                        rotate: 45,
                        interval:1
                    },
                    data: dates
                },
                yAxis: {
                    type: 'value',
                    name: '客户资金流向（单位：百万）',
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
                        name: '有管户资金流入',
                        data: inflows,
                        type: 'bar',
                        itemStyle: {
                            color: '#7BB1F9',
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        // barWidth:'',
                    },
                    {
                        name: '无管户资金流入',
                        data: noInFlow,
                        type: 'bar',
                        itemStyle: {
                            color: '#A57877',
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        // barWidth:'',
                    },
                    {
                        name: '有管户资金流出',
                        data: outfows,
                        type:'bar',
                        itemStyle: {
                            color: '#FBD168'
                        },
                        // barWidth:15,
                        barGap:0,
                        
                    },
                    {
                        name: '无管户资金流出',
                        data: noOutFlow,
                        type:'bar',
                        itemStyle: {
                            color: '#47903D',
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        // barWidth:15,
                        barGap:0,
                       
                    },
                    {
                        name:'净流入',
                        type:'line',
                        data: netFlow,
                        itemStyle: {
                            color: '#FF8100'
                        }
                    }
                ]
    
            }
        }else{
            option = {
                tooltip:{
                    trigger: 'axis',
                },
                grid:{
                    left:'15%',
                    bottom:'25%'
                },
                legend:{
                    data:["资金流入", "资金流出",  '净流入'],
                    bottom: 10
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
                        rotate: 45,
                        interval:1
                    },
                    data: dates
                },
                yAxis: {
                    type: 'value',
                    name: '客户资金流向（单位：百万）',
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
                        name: '资金流入',
                        data: inflows,
                        type: 'bar',
                        itemStyle: {
                            color: '#7BB1F9',
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        // barWidth:'',
                    },
                    {
                        name: '资金流出',
                        data: outfows,
                        type:'bar',
                        itemStyle: {
                            color: '#FBD168'
                        },
                        // barWidth:15,
                        barGap:0,
                        
                    },
                    {
                        name:'净流入',
                        type:'line',
                        data: netFlow,
                        itemStyle: {
                            color: '#FF8100'
                        }
                    }
                ]
    
            }

        }
        
        
        chart.setOption(option);
    }
    render(){
        return (<div>
            <Item>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
               高净值客户资金流向统计
            </div>
            </Item>
            <div id="charta" style={{height:'330px'}}></div>
        </div>)
    }
}
export default ChartB;