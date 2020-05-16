import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
class TableA extends Module{
    constructor(props, context){
        super(props, context);
    }

    render(){
        let data = this.props.data;
        return (
        <div className='kehumanagerdetail' style={{position: 'relative'}}>
        <div style={{overflowX: 'scroll'}}>
             <table className="custom_module_table" style={{width: 900 + "px",}}>
            <thead>
                <tr>
                    <th style={{width: '90px'}}>客户经理</th>
                    <th>非净值流失客户数</th>
                    <th>非净值流失保有量</th>
                    <th>当前保有量</th>
                    <th>非净值流失客户占比</th>
                    <th>非净值流失保有量占比</th>
                    <th>非净值挽回客户数</th>
                    <th>非净值挽回保有量</th>
                    <th>非净值挽回客户占比</th>
                    <th>非净值挽回保有量占比</th>
                </tr>
            </thead>
                <tbody>
                   { data.map((obj, index)=>{
                       return (<tr key={obj[0].id}>
                           {obj.map((item, index) => {
                               if(index === 0){
                                   return (<td className='custName' key={index}>{item.name}>></td>)
                               }else{
                                   return (<td key={index}>{item}</td>)
                               }
                           })}
                       </tr>)
                   })} 
                </tbody>
             </table>
             </div>
             <table className="custom_module_table" style={{position:'absolute', top:'0', left:'0', width:'90px',background:'white'}}>
                <thead>
                    <tr>
                        <th style={{ height:'51px'}}>
                            客户名称
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((obj) => {
                        return (<tr key={"rel" +obj[0].id}>
                            <td className='custName'  onClick={()=> {this.context.router.push({
                                pathname: 'SKListDetail',
                                query:{
                                    id:obj[0].id,
                                    userType: this.props.userType
                                }
                            })}}>
                                {obj[0].name}>>
                            </td>
                        </tr>)
                    })}
                </tbody>
             </table>
        </div>);
    }
}
export default TableA;