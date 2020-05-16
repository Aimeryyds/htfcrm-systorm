/*
 * @Author: Thomas Ji 
 * @Date: 2019-02-15 16:37:24 
 * @Last Modified by: Thomas Ji
 * @Last Modified time: 2019-02-26 14:05:59
 */
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';

class TableA extends Module{
    constructor(props, context){
        super(props, context);
    }

    render(){
        let tabledata = this.props.data, data = [], list = tabledata.list ? tabledata.list :[];
        for(let i = 0; i < list.length; i++){
            data.push([list[i][0]].concat(list[i].slice(2)));
        }
        let flags = this.props.flags;

        return (
        <div className='qunatityTable kehumanagerdetail' style={{position: 'relative'}}>
        <div style={{overflowX: 'scroll'}}>
             <table className="custom_module_table" style={{width: '100%'}}>
            <thead>
                <tr>
                    <th>客户经理</th>
                    <th  className={flags[0]!= -1 ? "sorted" : ''} onClick={() => this.props.handleSort(1)}>当前保有量<sapn className={flags[0] == -1 ?"iconfont icon-paixumoren" :flags[0] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'} ></sapn></th>
                    <th  className={flags[1] != -1  ? "sorted" : ''} onClick={()=>this.props.handleSort(2)}>保有量增量<sapn className={flags[1] == -1 ?"iconfont icon-paixumoren" :flags[1] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'}></sapn></th>
                    <th  className={flags[2] != -1 ? "sorted" : ''} onClick={()=>this.props.handleSort(3)}>增量百分比<sapn className={flags[2] == -1 ?"iconfont icon-paixumoren" :flags[2] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'}></sapn></th>
                    
                </tr>
            </thead>
                <tbody>
                   { data.map((obj)=>{
                       return (<tr key={obj[0].id}>
                           <td>
                               {obj[0].name}
                           </td>
                           <td>
                               {obj[1]}
                           </td>
                           <td>
                               {obj[2]}
                           </td>
                           <td>
                               {parseFloat(obj[3]).toFixed(2)}%
                           </td>
                       </tr>)
                   })} 
                </tbody>
             </table>
             </div>
            
        </div>);
    }
}
export default TableA;