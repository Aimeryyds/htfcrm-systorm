import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//当前存量表格
class CurQuantityTable extends Module {
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
    }

    render() {
        let data = this.props.data || [], period = this.props.period, pre = "上月", cur = "本月", rotate = this.props.rotate,screenH = screen.availHeight;
        let total = this.props.total || [];
        total = total.concat();
        total.unshift(0);
        switch(parseInt(period)){
            case 0: pre="昨日", cur = "今日"; break;
            case 1: pre="上周", cur = "本周"; break;
            case 2: pre="上月", cur = "本月"; break;
            case 3: pre="上季度", cur = "本季度"; break;
            case 4: pre="上半年", cur = "本半年"; break;
            case 5: pre="去年", cur = "今年"; break;
        }
        return (
            <div style={{ position: 'relative' }} className="cur_quantity_table">

                <div style={{ overflowX: 'scroll', width: rotate ? screenH + 'px' : '100%'}} className="tablecontainer" id='tablecon'>

                    <table className="custom_module_table" style={{width: '1275px', tableLayout:'fixed'}}>
                        <thead>
                            <tr>
                                <th style={{width:'85px'}}>客户名称</th>
                                <th style={{width:'90px'}}>{pre}保有量</th>
                                <th style={{width:'90px'}}>{cur}保有量</th>
                                <th style={{width:'90px'}}>{pre}权益保有量</th>
                                <th style={{width:'90px'}}>{cur}权益保有量</th>
                                <th style={{width:'90px'}}>{cur}权益占比</th>
                                <th style={{width:'90px'}}>{pre}货币保有量</th>
                                <th style={{width:'90px'}}>{cur}货币保有量</th>
                                <th style={{width:'90px'}}>{cur}货币占比</th>
                                <th style={{width:'90px'}}>{pre}固收保有量</th>
                                <th style={{width:'90px'}}>{cur}固收保有量</th>
                                <th style={{width:'90px'}}>{cur}固收占比</th>
                                <th style={{width:'90px'}}>{pre}其他保有量</th>
                                <th style={{width:'90px'}}>{cur}其他保有量</th>
                                <th style={{width:'90px'}}>{cur}其他占比</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => <tr key={item[0].id}>
                                {item.map((td, index) => {
                                    if(index===0){
                                        return <td key={index}>{td.name}>></td>
                                    }else{
                                        return <td key={index}>{td}</td>
                                    }
                                })}
                            </tr>)}
                        </tbody>
                        <thead>
                            <tr>
                                {total.map((item,index) => {
                                    if(index == 0)
                                        return <th key={index}>总计</th>
                                    else
                                        return <th key={index}>{item}</th>
                                })}
                            </tr>
                        </thead>
                    </table>
                </div>
                <table className="custom_module_table" style={{position:'absolute',left: 0, top: 0, backgroundColor:'white'}}>
                    <thead>
                        <tr><th style={{width:'85px', height:"51px"}}>客户名称</th></tr>
                    </thead>
                    <tbody>
                    {data.map(item => <tr key={item[0].id + 'obs'}>
                                <td  className='cust_name' onClick={()=> {this.goToDetail(item[0].id, item[0].custType|| 0)}}>{item[0].name}>></td>
                            </tr>)}
                    </tbody>
                    <thead>
                        <tr>
                            <th>总计</th>
                        </tr>
                    </thead>
                </table>

            </div>
            
        )
    }
}
export default CurQuantityTable;