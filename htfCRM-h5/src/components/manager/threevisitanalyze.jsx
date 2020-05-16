//三方拜访数据分析
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { WhiteSpace } from 'antd-mobile';
import SelectBadge from '../widget/selectbadge';
import echarts from 'echarts'
class ThreeVisitAnalyze extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            dateType: 0,  //0:每日，1：每周，2：每月
            data:{},
            date:'',
            sorted: 0,
            sortedFlags: [-1,-1],  //如果为0则降序，1则升序,-1初始
            sign:false
        }
    }

    componentDidMount(){
        this.changeTilte('三方拜访数据分析');
        this.getData();
    }

    componentDidUpdate(){
        this.renderChart();
    }

    renderChart(){
        let chart = echarts.init(document.getElementById('chart'));
        let list = this.state.data.list ? this.state.data.list : [], data = {};
        list = list.concat();

        list = !this.state.sign?list.sort((a, b) => b[1] - a[1]):list;
        list = list.slice(0, 6);
        let xData = [], curData = [], preData = [], legendData = ['总拜访次数','实地拜访次数'];
        for(let i = 0; i < list.length; i++){
            curData.push(list[i][2]);
            preData.push(list[i][1]);
            xData.push(list[i][0].name);
        }
        data = {curData, preData, legendData, xData};

        let option = {
            color: [ '#7CB1F9','#FA7375',],
            tooltip:{
                trigger: 'axis'
            },
            legend:{
                data:data.legendData.reverse(),
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
                    interval: 0,
                },
                data: data.xData,
            },
            yAxis: {
                type: 'value',
                name: '拜访次数（单位：位）',
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
                    name: data.legendData[0],
                    data: data.preData,
                    type: 'bar',
                    itemStyle: {
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    label: {
                        show: false,
                        position: 'top',
                        rotate: 30
                    },
                    barWidth: '30%'
                },
                {
                    name: data.legendData[1],
                    data: data.curData,
                    type:'bar',
                    itemStyle: {
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    barGap:0,
                    label: {
                        show: false,
                        position: 'top',

                        rotate: 30
                    },
                    barWidth: '30%'
                }
            ]}
        chart.setOption(option);
    }

    getData(){
        this.request({
            api: 'GetThreeVisitAnalyze',
            params:{
                dateType: this.state.dateType,
            }
        }, (res) => {
            console.log('三方拜访数据',res)
            this.setState({
                data: res.data,
                date:res.data.date,
                sorted: 0,
                sortedFlags: [-1,-1],
                sign:false
            })
        })
    }

    handleSort = (val) => {
        let sorted = val, data = this.state.data, list = this.state.data.list, flags = this.state.sortedFlags;
        for(let i = 0; i < 2; i++){
            if(i != val - 1){
                flags[i] = -1;
            }
        }
        if(flags[val - 1] == 0 || flags[val-1] < 0){
            flags[val -1] = 1;
            list.sort((a, b)=> b[val] - a[val]);
        }else{
            flags[val - 1] = 0;
            list = list.reverse();
        }
        data.list = list;
        this.setState({sorted, data, sortedFlags: flags,sign:true});
    }

    render(){
        let {data,date,dateType,sortedFlags}=this.state;
        let _data=data.list?data.list:[];
        _data = !this.state.sign?_data.sort((a, b) => b[1] - a[1]):_data;

        return (
            <div className='threevisit_analyze'>
                <SelectBadge options={['每日', '每周', '月度']} selected={this.state.dateType} onChange={(opt, index)=>{
                    this.setState({
                        dateType: index
                    }, this.getData)
                }}/>
                <div style={{position:'relative'}}>
                    <div id="chart" style={{height:'280px'}}></div>
                    <div style={{position:'absolute',top:'30px',right:'15px',fontSize:'13px', color:'#CCCCCC'}}>数据日期:{date}</div>
                </div>

                <WhiteSpace size='lg' className="bg_f6"/>
                <div className="module_title_a">客户经理拜访明细</div>
                <div className='qunatityTable kehumanagerdetail' style={{position: 'relative'}}>
                    <div style={{overflowX: 'scroll'}}>
                        <table className="custom_module_table" style={{width: '100%'}}>
                            <thead>
                            <tr>
                                <th>客户经理</th>
                                <th  className={sortedFlags[0]!= -1 ? "sorted" : ''} onClick={() => this.handleSort(1)}>实地拜访次数<sapn className={sortedFlags[0] == -1 ?"iconfont icon-paixumoren" :sortedFlags[0] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'} ></sapn></th>
                                <th  className={sortedFlags[1] != -1  ? "sorted" : ''} onClick={()=>this.handleSort(2)}>总拜访次数<sapn className={sortedFlags[1] == -1 ?"iconfont icon-paixumoren" :sortedFlags[1] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'}></sapn></th>
                            </tr>
                            </thead>
                            <tbody>
                            {_data&&_data.map((item,index)=>{
                                return (<tr key={index}>
                                    <td style={{width:'97px',color:'#73AFFA'}}
                                        onClick={()=>{
                                            this.context.router.push({
                                                pathname: '/ManageVisitTable',
                                                query: {
                                                    id: item[0].id,
                                                    dateType,
                                                }
                                            })
                                        }}>
                                        {item[0].name}
                                    </td>
                                    <td>
                                        {item[1]}
                                    </td>
                                    <td>
                                        {item[2]}
                                    </td>
                                </tr>)
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}
export default ThreeVisitAnalyze;