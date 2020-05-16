import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Tabs, List } from 'antd-mobile';
import ChartA from './charta';
import ChartB from './chartb';
import Tips from './tips';
class UpAndDown extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            tabValue: 2,  // 0近30天，1近90天....
            dataA: {},  //客户升降级图数据
            dataB: {},  //高净值整体,
        }
    }
    componentDidMount(){
        this.getDataA();
        this.getDataB();
    }
    getDataA(){
        let type = this.state.tabValue;
        switch(type){
            case 0: type = 1;break;
            case 1: type = 3;break;
            case 2: type = 6;break;
            case 3: type = 12;break;
            case 4: type = 24;break;
        }
        this.request({
            api: 'GetManagerCustLevelChange',
            params: {
                selectedUserIds: this.props.id,
                type,
            }
        }, (res) => {
            let data = res.data, downLevel = data.downlevel || [];
            downLevel = downLevel.map(item => -item);
            data.downlevel = downLevel;
            this.setState({
                dataA: data
            });
        });
    }
    getDataB(){
        let type = this.state.tabValue;
        switch(type){
            case 0: type = 1;break;
            case 1: type = 3;break;
            case 2: type = 6;break;
            case 3: type = 12;break;
            case 4: type = 24;break;
        }
        this.request({
            api: 'GetManagerHighValue',
            params: {
                // id: this.props.id,
                type: type
            }
        }, (res) => {
            let data = res.data;
            // downLevel = downLevel.map(item => -item);
            // data.downlevel = downLevel;
            this.setState({
                dataB: data
            });
        });     
    }

    render(){
        return (<div className='upAndDown'>
            <Tabs tabs={[{title:'近30天', value:0}, {title:'近90天', value:1}, {title:'近半年', value:2}, {title:'近一年', value:3},{title:'近两年', value:4}]} onChange={(val)=> {
                this.setState({
                    tabValue: val.value
                }, () => { this.getDataA(); this.getDataB();})
            }} page={this.state.tabValue}/>
            <div style={{position: 'relative'}}><div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
                客户经理所辖客户升降级
            </div>
            <ChartA data={this.state.dataA} tabValue={this.state.tabValue}/>
            <Tips/>
            </div >
            <div style={{position: 'relative'}}>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
                高净值客户整体升降级统计
            </div>
            <ChartB data={this.state.dataB} tabValue={this.state.tabValue}/>
            <Tips/>
            </div>
        </div>)
    }
}

export default UpAndDown;