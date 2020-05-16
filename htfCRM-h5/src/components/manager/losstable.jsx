/*
 * @Author: Thomas Ji 
 * @Date: 2019-02-15 16:37:24 
 * @Last Modified by: Thomas Ji
 * @Last Modified time: 2019-02-26 14:06:55
 */
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';

class TableA extends Module{
    constructor(props, context){
        super(props, context);
    }

    render(){
        let data = this.props.data, flags = this.props.flags;
        

        return (
        <div className='qunatityTable kehumanagerdetail' style={{position: 'relative'}}>
        <div style={{overflowX: 'scroll'}}>
             <table className="custom_module_table" style={{width: '100%'}}>
            <thead>
                <tr>
                    <th>客户经理</th>
                    <th  className={flags[0]!= -1 ? "sorted" : ''} onClick={() => this.props.handleSort(1)}>期初客户数<sapn className={flags[0] == -1 ?"iconfont icon-paixumoren" :flags[0] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'}></sapn></th>
                    <th  className={flags[1]!= -1 ? "sorted" : ''} onClick={()=>this.props.handleSort(2)}>流失客户数<sapn className={flags[1] == -1 ?"iconfont icon-paixumoren" :flags[1] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'}></sapn></th>
                    <th  className={flags[2]!= -1 ? "sorted" : ''} onClick={()=>this.props.handleSort(3)}>流失率<sapn className={flags[2] == -1 ?"iconfont icon-paixumoren" :flags[2] == 0 ? 'iconfont icon-shengxu' : 'iconfont icon-jiangxu'}></sapn></th>
                    
                </tr>
            </thead>
                <tbody>
                   { data.map((obj, index)=>{
                       return (<tr key={index}>
                           <td>
                               {obj[0]}
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