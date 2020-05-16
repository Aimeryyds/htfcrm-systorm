//降级率排名

import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Tabs, WhiteSpace, List } from 'antd-mobile';
import SelectBadge from '../fundflow/selectBadge';
import echarts from 'echarts';
import DeTable from './detable';
const Item = List.Item;
const Brief = Item.Brief;
class DeRank extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            period: 0,    //0,1,2月度，季度，年度
            tabValue: 0,   //0,1,降级客户数 降级率
            chartData: [],    //图表数据
            sortFlags: [-1, -1, -1],
            date:''
        }
    }
    componentDidMount(){
        this.getData();
        this.renderChart();
    }
    componentDidUpdate(){
        this.renderChart();
    }
    getData = () => {
        this.request({
            api:'GetManagerDeGradation',
            params: {
                period: this.state.period,
               
            }
        }, (res) => {
            let data = res.data, list = [], names = data.names || [], ori = data.originCustNum||[], deNum = data.degradationNum || [], deRate = data.degradRate || [];
            for(let i = 0; i < names.length; i++){
                list.push([names[i], ori[i], deNum[i], deRate[i]]);
            }
            this.setState({
                chartData: list,
                date: res.data.date
            })
        })
    }
    handleSort = (val)=>{
        let chartData = this.state.chartData, flags = this.state.sortFlags;
        for(let i = 0; i < 3; i++){
            if(i != val - 1){
                flags[i] = -1;
            }
        }
        if(flags[val - 1] == 0 || flags[val-1] < 0){
            flags[val -1] = 1;
            chartData.sort((a, b)=> b[val] - a[val]);
        }else{
            flags[val - 1] = 0;
            chartData.sort((a,b) => a[val] - b[val])
        }
        this.setState({
            chartData: chartData,
            sortFlags: flags
        })
    }
    renderChart(){
        let chart = echarts.init(document.getElementById('derankchart')), xData = [], yData = [], tabValue = this.state.tabValue,data = this.state.chartData, yName = '';
        data = data.concat();
        data.sort((a,b) => b[tabValue + 2] - a[tabValue + 2]);
        data = data.slice(0, 6);
        for(let i = 0; i < data.length; i++){
            xData.push(data[i][0]);
            if(tabValue == 0){
                yData.push(data[i][2]);
                yName = '降级客户数（单位：人）'
            }else{
                yData.push(data[i][3]);
                yName = '降级率(单位: %)';
            }
        }
        
        let option = {
            color: ['#7BB1F9',],
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
                        color: 'black'
                    },
                    data: xData,
                },
                yAxis: {
                    type: 'value',
                    name: yName,
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
                        data: yData,
                        type: 'bar',
                        itemStyle: {
                            barBorderRadius: [2, 2, 0, 0]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function(params){
                                if(tabValue == 0){
                                    return params.value;
                                }else{
                                    return params.value + '%';
                                }
                            },
                            color: 'black'
                        },
                        barWidth: '50%'
                    },
                    
                ]
        };
        chart.setOption(option);
    }
    render(){
        let chartTitle = ["降级客户数", "降级率"][this.state.tabValue];
        return (<div>
            <WhiteSpace size='lg' className='bg_f6'/>

            <SelectBadge options={['月度', '季度', '年度']} selected={this.state.period} onChange={(opt, index)=>{
                    this.setState({
                        period: index
                    }, this.getData)
                }}/>
            <Tabs tabs={[{title:'降级客户数', value:0}, {title: '降级率', value: 1}]} onChange={(tab, index) => {
                this.setState({
                    tabValue: tab.value
                })
            }}/>
                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
               {chartTitle}
            </div>  <span style={{paddingRight:'15px', fontSize:'13px', color:'#CCCCCC'}}>
                数据日期: {this.state.date}
            </span>
            </div>
            <div id="derankchart" style={{height:'280px'}}></div>
            <WhiteSpace size='lg' className='bg_f6'/>
            <div className="module_title_a">客户经理降级明细</div>
            <DeTable data={this.state.chartData} flags={this.state.sortFlags} handleSort={this.handleSort}/>
            <List>
                <Item>期初客户<Brief>期初保有量百万及以上的客户</Brief></Item>
                <Item>降级客户<Brief>期初客户等级>期末客户等级</Brief></Item>
            </List>
        </div>)
    }
}
export default DeRank;