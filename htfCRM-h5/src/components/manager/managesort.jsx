//客户经理分析
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import ManagerQa from './quantityanalyze';
import { Tabs, WhiteSpace } from 'antd-mobile';
import LossRank from './lossrank';
import DeRank from './degraderank';
class ManagerAnalyze extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            tabValue: 0
        }
    }

    componentDidMount(){
        this.changeTilte('客户经理分析');
    }

    render(){
        let tabValue = this.state.tabValue;
        return (
        <div className='manager_sort'>
            <Tabs tabs={[{title:'保有量排名', value: 0}, {title:'流失率排名', value: 1},{title:'降级率排名', value: 2},]} onChange={
                (tab, index) => {
                    this.setState({
                        tabValue: tab.value
                    })
                }
            }/>
            {tabValue == 0 && <ManagerQa/>}
            {tabValue == 1 && <LossRank/>}
            {tabValue == 2 && <DeRank/>}
        </div>
        )
    }

}
export default ManagerAnalyze;