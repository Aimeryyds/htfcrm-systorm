import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Tabs, WhiteSpace, List } from 'antd-mobile';
import SelectBadge from '../fundflow/selectBadge';
import echarts from 'echarts';
import LossTable from './losstable';
const Item = List.Item;
const Brief = Item.Brief;
class LossRank extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            period: 0,    //0,1,2月度，季度，年度
            tabValue: 0,   //0,1,流失客户数， 流失率
            chartData: [],    //图表数据
            sorted: 0,
            date:'',
            sortFlags: [-1,-1, -1]
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
            api:'GetManagerLossRank',
            params: {
                period: this.state.period,
                
            }
        }, (res) => {
            let data = res.data, list = [], names = data.names || [], ori = data.originCustNum||[], lossNum = data.lossNum || [], lossRate = data.lossRate || [];
            for(let i = 0; i < names.length; i++){
                list.push([names[i], ori[i], lossNum[i], lossRate[i]]);
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
        let chart = echarts.init(document.getElementById('lossrankchart')), xData = [], yData = [], tabValue = this.state.tabValue,data = this.state.chartData, yName = '';
        data = data.concat();
        console.log(data);
        data.sort((a,b) => b[tabValue + 2] - a[tabValue + 2]);
        data = data.slice(0, 6);
        for(let i = 0; i < data.length; i++){
            xData.push(data[i][0]);
            if(tabValue == 0){
                yData.push(data[i][2]);
                yName = '流失客户数（单位：人）'
            }else{
                yData.push(data[i][3]);
                yName = '流失率(单位: %)';
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
                            color:'black'
                        },
                        barWidth: '50%'
                    },
                    
                ]
        };
        chart.setOption(option);
    }
    render(){
        let chartTitle = ["流失客户数", "流失率"][this.state.tabValue], date = this.state.chartData.date;
        return (<div>
            <WhiteSpace size='lg' className='bg_f6'/>
            <SelectBadge options={['月度', '季度', '年度']} selected={this.state.period} onChange={(opt, index)=>{
                    this.setState({
                        period: index
                    }, this.getData)
                }}/>
            <Tabs tabs={[{title:'流失客户数', value:0}, {title: '流失率', value: 1}]} onChange={(tab, index) => {
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
            <div id="lossrankchart" style={{height:'280px'}}></div>
            <WhiteSpace className='bg_f6' size='lg'/>
            <div className="module_title_a">客户经理流失明细</div>
            <LossTable data={this.state.chartData} flags={this.state.sortFlags} handleSort={this.handleSort}/>
            <List>
                <Item>期初客户<Brief>期初保有量百万及以上的客户</Brief></Item>
                <Item>流失客户<Brief>期初客户到期末降至百万以下</Brief></Item>
            </List>
        </div>)
    }
}
export default LossRank;