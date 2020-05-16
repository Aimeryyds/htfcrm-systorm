import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import CurQTable from './curQuantityTable';
//升降级表格
class UpDownTable extends CurQTable{
    constructor(props, context) {
        super(props, context);

    }


    render(){

        let data = this.props.data || [], rotate = this.props.rotate,screenH = screen.availHeight, total = this.props.total || [];
        total = total.concat();
        let type = this.props.type;
        let period = this.props.period, cur = '当日', titles = ['升级', '流失','降级'];
        total.unshift(0);
        period = parseInt(period);
        console.log(period);
        switch(period){
            case 0: cur = "当日"; break;
            case 1: cur = "当周"; break;
            case 2: cur = "当月"; break;
            case 3: cur = "当季度"; break;
            case 4: cur = "半年"; break;
            case 5: cur = "当年"; break;
        }
        return (
            <div className='up_down_table'>
            <div style={{position:'relative'}}>
            <div style={{overflow:'auto', width: rotate ? screenH + 'px' : '100%' }}>
                <table className="custom_module_table" style={{width: '595px'}}>
                    <thead>
                        <tr>
                            <th style={{width: '85px'}}>
                                客户名称
                            </th>
                            <th style={{width: '80px'}}>
                                金额变动
                            </th>
                            <th>
                                保有量（T+1）
                            </th>
                            <th>
                                {titles[type - 3] + cur}权益份额
                            </th>
                            <th>
                                {titles[type - 3] + cur}货币份额
                            </th>
                            <th>
                                {titles[type - 3] + cur}固收份额
                            </th>
                            <th>
                                {titles[type - 3] + cur}其他份额
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={item[0].id}>
                                    {
                                        item.map((td, index) => {
                                            if(index == 0)
                                                return (
                                                    <td key={index}>
                                                        {item[0].name}
                                                    </td>
                                                )
                                            else
                                                return <td key={index}>
                                                    {td}
                                                </td>
                                        })
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                    <thead>
                        <tr>
                            {total.map((item, index) => {
                                if(index == 0)
                                    return <th key={index}>总计</th>
                                else 
                                    return <th key={index}>{item}</th>
                            })}
                        </tr>
                    </thead>

                </table>
                <table style={{position:'absolute', top: 0, left: 0, width: '85px'}} className="custom_module_table">
                        <thead>
                            <tr><th style={{width: '85px', height: '71px'}}>
                                客户名称
                            </th></tr>
                            
                        </thead>
                        <tbody>
                            
                                {
                                    data.map((item, index) => {
                                        
                                        return <tr key={item[0].id + 'rel'}>
                                            <td className='cust_name' onClick={() => {this.goToDetail(item[0].id, item[0].custType || 0)}}>
                                                {item[0].name}>>
                                            </td>
                                        </tr>
                                    })
                                }
                            
                        </tbody>
                        <thead>
                            <tr>
                                <th>总计</th>
                            </tr>
                        </thead>
                </table>
                </div>
                </div>
            </div>
        )
        
    }
}
 export default UpDownTable;