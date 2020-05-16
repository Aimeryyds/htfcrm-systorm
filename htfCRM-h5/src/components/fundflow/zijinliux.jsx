import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import {List} from 'antd-mobile';
import ChartA from './chara';
const Item = List.Item;
class Zijin extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            
        }
        
    }
    componentDidMount(){
    }



    render(){
        let state = this.state;
        return (
        <div>
            
              
            
            <ChartA data={this.state.chartData}/>
        </div>)
        
    }
}
export default Zijin;