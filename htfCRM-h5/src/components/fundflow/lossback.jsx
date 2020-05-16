import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { List, WhiteSpace } from 'antd-mobile';
import echarts from 'echarts';
const Item  =  List.Item;
class LossBack extends Module{
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
        let chart = echarts.init(document.getElementById('losschart')), data = this.props.data, dates = data.dates, netLoss = data.netLoss, netBack = data.netBack, unNetLoss = data.unNetLoss, unNetBack = data.unNetBack;
        if(dates){
            for(let i = 0; i < dates.length; i++){
                netLoss[i] = netLoss[i] + unNetLoss[i];
                netBack[i] = netBack[i] + unNetBack[i];
            }
        }
        let option = {
            legend: {data:['非净值波动流失', '非净值波动挽回', "净值波动流失", "净值波动挽回"],
            bottom: 0,
            formatter: function(name){
                if(name === '非净值波动挽回'){
                    return name + '          ';
                }else if(name === '净值波动流失')
                    return name + '     ';
                if(name === '非净值波动流失')
                    return name + '  ';
                return name;
            },
            itemGap:5,
            itemWidth: 10,
            itemHeight: 10,
            width: '80%'
        },
            tooltip:{
                trigger: 'axis',
            },
            grid:{
                left:'15%'
            },
            xAxis: {
                type:'category',
                data: dates,
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
            },
            yAxis:{
                type: 'value',
                name: '流失/挽回客户变化（单位：人）',
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
                    name: '非净值波动流失',
                    data: unNetLoss,
                    type: 'bar',
                    itemStyle: {
                        color: '#FF2B2E',
                    },
                    stack: 'one'
                },
                {
                    name: '非净值波动挽回',
                    data: unNetBack,
                    type: 'bar',
                    itemStyle: {
                        color: '#2B83F8',
                    },
                    stack: 'two'
                },
                {
                    name: '净值波动流失',
                    data: netLoss,
                    type: 'bar',
                    itemStyle: {
                        color: '#FA7375',
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    stack: 'one'
                },
                {
                    name: '净值波动挽回',
                    data: netBack,
                    type: 'bar',
                    itemStyle: {
                        color: '#7CB1F9',
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    stack: 'two',
                    barGap: 0
                },
            ]
        };
        chart.off('click');
        chart.on('click', this.props.chartClick)
        chart.setOption(option);
    }
    render(){
       
        return (
            <div className='lossback'>
                <Item>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
               流失/挽回客户分布图
            </div>
            </Item>
            <div id="losschart" style={{height: "280px", width:'375px'}}></div>
            <WhiteSpace size='lg' className='bg_f6'/>
            
            </div>
        )
    }
}

export default LossBack;