import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import NoContent from '../widget/onContent';
import SearchBar from '../widget/seachBar';
class CustSearch extends Module{
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: {},     //列表数据
        }

    }
   
    render(){
        return (<div>
            <SearchBar placeholder='客户名称/手机号'/>
        </div>)
    }
}
 export default CustSearch;