import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';
import echarts from 'echarts';

class ThirdPartyDocument extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            segmentOptions: ["规模对比", "我司排名"],
            segmentSelected: 0,
            segmentOptions_a: ["排名", "趋势"],
            segmentSelected_a: 0,

        }
    }

    componentDidMount() {
        this.changeTilte("三方档案分析");
    }

	/**
     * 大类切换
     */
    segmentOnChange(opt, index) {
        this.setState({
            segmentSelected: index
        })
    }

	/**
     * 小类切换
     */
    segmentOnChangeA(opt, index) {
        this.setState({
            segmentSelected_a: index
        })
    }

    renderChart(){
        let chart = echarts.init(document.getElementById('myChart')),
            data = this.props.data,
            dates = data.dates,
            netLoss = data.netLoss,
            netBack = data.netBack,
            unNetLoss = data.unNetLoss,
            unNetBack = data.unNetBack;
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

    render() {
        let {  } = this.state;

        return <div>
            <WhiteSpace style={{height: '15px'}} className="bg_f6"/>
            <WhiteSpace style={{height: '20px'}}/>
            <div className="htf-segment" style={{ height: "30px", width: "300px", margin: "0 auto", fontSize: '.12rem' }}>
                {
                    this.state.segmentOptions.map((opt, index) => {
                        return <div
                            key={index}
                            className={this.state.segmentSelected === index ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                            onClick={() => this.segmentOnChange(opt, index) }
                        >
                            {opt}
                        </div>
                    })
                }
            </div>
            <WhiteSpace style={{height: '20px'}}/>

            <Flex align="baseline" justify="between">
                <div
                    className="color_ui fs_16 bg_ui_2"
                    style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}
                >
                    三方平台规模
                </div>

                <div className="htf-segment mr_20" style={{ height: "30px", width: ".86rem", fontSize: '.12rem' }}>
                    {
                        this.state.segmentOptions_a.map((opt, index) => {
                            return <div
                                key={index}
                                className={this.state.segmentSelected_a === index ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                                onClick={() => this.segmentOnChangeA(opt, index) }
                            >
                                {opt}
                            </div>
                        })
                    }
                </div>
            </Flex>

            <div id="myChart" style={{height: "280px"}}></div>


        </div>
    }
}

export default ThirdPartyDocument;