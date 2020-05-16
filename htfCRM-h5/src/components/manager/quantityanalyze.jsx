/*
 * @Author: Thomas Ji 
 * @Date: 2019-02-15 15:04:33 
 * @Last Modified by: Thomas Ji
 * @Last Modified time: 2019-02-25 22:14:28
 */


import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import SelectBadge from '../fundflow/selectBadge';
import { WhiteSpace, Tabs } from 'antd-mobile';
import ChartQ from './quantitychart';
import TableQ from './quantityanalyzetable';
import Chart1 from './incrmentchart';
import Chart2 from './incrementratechart';
class ManagerQA extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            period: 0,  //每日-年度
            tabValue: 0,  //0-2， 保有量，增量，百分比
            data: {},
            sorted: 0,
            sortedFlags: [-1,-1,-1],  //如果为0则降序，1则升序,-1初始
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        this.request({
            api: 'GetManagerQuantityAnalyze',
            params:{
                period: this.state.period,
                bytype: (this.state.tabValue + 1) * 10
            }
        }, (res) => {
            this.setState({
                data: res.data
            })
        })
    }
    handleSort = (val) => {
        let sorted = val, data = this.state.data, list = this.state.data.list, flags = this.state.sortedFlags;
        for(let i = 0; i < 3; i++){
            if(i != val - 1){
                flags[i] = -1;
            }
        }
        if(flags[val - 1] == 0 || flags[val-1] < 0){
            flags[val -1] = 1;
            list.sort((a, b)=> b[val + 1] - a[val + 1]);
        }else{
            flags[val - 1] = 0;
            console.log('before', list);
            list = list.reverse();
            console.log('jiag',list);
        }
        data.list = list;
        
        this.setState({sorted, data, sortedFlags: flags});
    }
    render(){
       let date = this.state.data.date;
       date = date ? date : '';
       let type = this.state.tabValue,  list = this.state.data.list ? this.state.data.list : [], title = '', data = {};
       list = list.concat();
       list = list.sort((a, b) => b[type + 2] - a[type + 2]);
       list = list.slice(0, 6);
       if(type === 0){
           let xData = [], curData = [], preData = [], legendData = [];
            title = "客户经理排名";
            for(let i = 0; i < list.length; i++){
                curData.push(list[i][2]);
                preData.push(list[i][1]);
                xData.push(list[i][0].name);
            }
            switch(this.state.period){
                case 0: legendData = ['当日', '昨日']; break;
                case 1: legendData = ['本周', '上周']; break;
                case 2: legendData = ['本月', '上月']; break;
                case 3: legendData = ['本季度', '上季度']; break;
                case 4: legendData = ['今年', '去年']; break;
            }
            data = {curData, preData, legendData, xData};
       }else if(type === 1){
            let xData = [], increment = [];
            title = '客户经理增量排名';
            for(let i = 0; i < list.length; i++){
                xData.push(list[i][0].name);
                increment.push(list[i][3]);
            }
            data = { xData, increment};
       }else{
        let xData = [], increment = [];
        title = '客户经理增量百分比排名';
        for(let i = 0; i < list.length; i++){
            xData.push(list[i][0].name);
            increment.push(list[i][4]);
        }
        data = { xData, increment};
       }
        return (
            <div className="quantityanalyze">
                <WhiteSpace size='lg' className='bg_f6'/>
                <SelectBadge options={['每日', '每周', '月度', '季度', '年度']} selected={this.state.period} onChange={(opt, index)=>{
                    this.setState({
                        period: index
                    }, this.getData)
                }}/>
                <Tabs tabs={[{title: '保有量'}, {title:'保有量增量'}, {title: '增量百分比'}]} onChange={(tab, index)=> {
                    this.setState({
                        tabValue: index
                    }, this.getData)
                }}/>
                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
               {title}
            </div>  <span style={{paddingRight:'15px', fontSize:'13px', color:'#CCCCCC'}}>
                数据日期: {date}
            </span>
            </div>
                {this.state.tabValue === 0 && <ChartQ data={data} />}
                {this.state.tabValue === 1 && <Chart1 data={data} />}
                {this.state.tabValue === 2 && <Chart2 data={data} />}
                <WhiteSpace size='lg' className="bg_f6"/>
                <div className="module_title_a">客户经理保有量明细</div>
                <TableQ data={this.state.data} handleSort={this.handleSort} flags={this.state.sortedFlags}/>
            </div>
        )
    }
}

export default ManagerQA;
