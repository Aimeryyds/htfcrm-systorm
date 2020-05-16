import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//调入调出表格
class InOutTable extends Module{
    constructor(props, context) {
        super(props, context);

    }
    goToDetail(id, type){
        this.context.router.push({
            pathname: 'SKListDetail',
            query:{
                id,
                userType: this.props.userType
            }
        })
    };

    render(){
        let { data } = this.props, total = this.props.total || [];
        data = data || [];
        total = total.concat();
        total.unshift(0);
        return (<div>
            <table className="custom_module_table" style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th style={{width: '30%', padding: '10px 0'}}>客户名称</th>
                        <th style={{width: '70%', padding: '10px 0'}}>保有量（T+1）</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={item[0].id}>
                            <td className="cust_name" onClick={()=> {this.goToDetail(item[0].id, item[0].custType||0)}}>
                                {item[0].name}>>
                            </td>
                            <td>
                                {item[1]}
                            </td>
                        </tr>
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
        </div>
            
        )
    }
}
 export default InOutTable;