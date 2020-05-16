import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class ChartsC extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        this.renderEcharts()
    }
    componentDidUpdate(){
        this.renderEcharts();
    }
    renderEcharts() {
        let { chartsListC } = this.props, dates = chartsListC.date,keys, options;
        dates = dates.map((date) => {
            return date.split(/[^\x00-\xff]/).join('-').slice(0, -1);
        });
        if(this.props.tabType === 0)
            keys = ['HJ', "BJ","ZS","CF",'ZL'];
        else
            keys = ['BWX', "BW", "WBW"];
        let seriesData = {};
        for(let key of keys){
            seriesData[key] = [];
            for(let i = 0; i < dates.length; i++){
                seriesData[key].push([dates[i], chartsListC.list[key][i]]);
            }
        }
        let myChart = echarts.init(document.getElementById('lineA'));
        if(this.props.peroid == 0){

        
        options = {
            color: ['#fa7375', '#7bb1f9', '#ffd35a','#5a96e6', '#ffb900'],
            tooltip:{
                trigger: 'axis',
            },
            legend: {
                data:['黄金', '白金', '钻石', '财富', '战略'],
                bottom: 0
            },
            grid: {
                left:"14%",
                right:"5%",
                top: "20%",
                bottom:"20%",
                containLabel: false,
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
                
            },
            yAxis: {
                type: 'value',
                name: "客户数(单位:人)"
            },
            series: [
                {
                    name:'黄金',
                    type:'line',
                    smooth:true,
                    data: seriesData.HJ,
                    

                },
                {
                    name:'白金',
                    type:'line',
                    smooth:true,
                    data: seriesData.BJ,
                    
                },
                {
                    name:'钻石',
                    smooth:true,
                    type:'line',
                    data: seriesData.ZS,
                    
                },
                {
                    name:'财富',
                    smooth:true,
                    type:'line',
                    data: seriesData.CF,
                    
                },
                {
                    name:'战略',
                    smooth:true,
                    type:'line',
                    data:seriesData.ZL,
                    
                }
            ]

        };
        if(this.props.tabType === 1){//保有量客户
            options.legend.data=["百万以下有效户", "百万有效户", "500万有效户"];
            options.series = [
                {
                    name:'百万以下有效户',
                    smooth:true,
                    type:'line',
                    data: seriesData.BWX,
                    
                },
                {
                    name:'百万有效户',
                    smooth:true,
                    type:'line',
                    data: seriesData.BW,
                    
                },
                {
                    name:'500万有效户',
                    smooth:true,
                    type:'line',
                    data: seriesData.WBW,
                    
                },
            ]
        }
    }else{
        options = {
            color: ['#fa7375', '#7bb1f9', '#ffd35a','#5a96e6', '#ffb900'],
            legend: {
                data:['黄金', '白金', '钻石', '财富', '战略'],
                bottom: 0
            },
            grid: {
                left:"14%",
                right:"5%",
                top: "20%",
                bottom:"20%",
                containLabel: false,
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartsListC.date,
                // axisLabel: {
                //     interval: 0,
                //     rotate: 30,
                //     fontSize: 12,
                // }
            },
            yAxis: {
                type: 'value',
                name: "客户数（单位：人）"
            },
            series: [
                {
                    name:'黄金',
                    type:'line',
                    data: chartsListC.list.HJ,
                    
                },
                {
                    name:'白金',
                    type:'line',
                    data: chartsListC.list.BJ,
                    
                },
                {
                    name:'钻石',
                    type:'line',
                    data: chartsListC.list.ZS,
                    
                },
                {
                    name:'财富',
                    type:'line',
                    data: chartsListC.list.CF,
                    
                },
                {
                    name:'战略',
                    type:'line',
                    data:chartsListC.list.ZL,
                    
                }
            ]

        };
        if(this.props.tabType === 1){//保有量客户
            options.legend.data=["百万以下有效户", "百万有效户", "500万有效户"];
            options.series = [
                {
                    name:'百万以下有效户',
                    type:'line',
                    data: chartsListC.list.BWX,
                    
                },
                {
                    name:'百万有效户',
                    type:'line',
                    data: chartsListC.list.BW,
                    
                },
                {
                    name:'500万有效户',
                    type:'line',
                    data: chartsListC.list.WBW,
                    
                },
            ]
        }
    }
        myChart.setOption(options);
    }

    render() {


        return <div>
            <div id="lineA" style={{width: '100%', height: '270px', paddingBottom: '20px'}}></div>
        </div>
    }
}

export default ChartsC;