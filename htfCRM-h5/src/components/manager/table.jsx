import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';

class TableA extends Module{
    constructor(props, context){
        super(props, context);
    }

    render(){
        let data = this.props.data || [], sorted = this.props.sorted, iconClass = "iconfont ";
        switch(sorted){
            case -1: iconClass += "icon-paixumoren"; break;
            case 0: iconClass += 'icon-shengxu';break;
            case 1: iconClass += 'icon-jiangxu'; break;
        }
        return (
        <div className='qunatityTable' style={{position: 'relative'}}>
        <div style={{overflowX: 'scroll'}}>
             <table className="custom_module_table" style={{tableLayout:'fixed', width:'655px'}}>
            <thead>
                <tr>
                    <th style={{width: '97px'}}>客户名称</th>
                    <th style={{width: '97px'}}>客户编号</th>
                    <th  className={this.props.sorted != -1 ? "sorted" : ''} onClick={this.props.handleSort} style={{width: '97px'}}>现有保有量<sapn className={iconClass}></sapn></th>
                    <th style={{width: '97px'}}>省份</th>
                    <th style={{width: '97px'}}>城市</th>
                    <th style={{width: '162px'}}>手机号</th>
                </tr>
            </thead>
                <tbody>
                   { data.map((obj)=>{
                       return (<tr key={obj.id}>
                           <td className='custName' style={{width:'97px'}}>
                               {obj.name}>>
                           </td>
                           <td>
                               {obj.custnum}
                           </td>
                           <td>
                               {obj.curquantity}
                           </td>
                           <td>
                               {obj.province}
                           </td>
                           <td>
                               {obj.city}
                           </td>
                           <td>
                               {obj.mobile}
                           </td>
                       </tr>)
                   })} 
                </tbody>
             </table>
             </div>
             <table className="custom_module_table" style={{position:'absolute', top:'0', left:'0', width:'100px',background:'white'}}>
                <thead>
                    <tr>
                        <th>
                            客户名称
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((obj) => {
                        return (<tr key={"rel" +obj.id}>
                            <td className='custName'  onClick={()=> {this.context.router.push({
                                pathname: 'SKListDetail',
                                query:{
                                    id:obj.id,
                                    userType: this.props.userType
                                }
                            })}}>
                                {obj.name}>>
                            </td>
                        </tr>)
                    })}
                </tbody>
             </table>
        </div>);
    }
}
export default TableA;