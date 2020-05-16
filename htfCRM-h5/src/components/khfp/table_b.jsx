import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import {List} from 'antd-mobile';
const Item = List.Item;
class TableB extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            height: 51,
            width: 106,
            zongji: 240
        }
    }
    componentDidMount(){
        let dom = document.getElementById('managerName'),zongji = document.getElementById('zongji').clientWidth, height = dom.clientHeight, width = dom.clientWidth;
        console.log('fp',fpdate);
        this.setState({
            height,
            width,
            zongji,
        })
    }
    shouldComponentUpdate(nextp, nexts){
        if(nextp.data != this.props.data){
            return true;
        }
        if(nexts.zongji == this.state.zongji)
            return false;
        else
            return true;
    }
    componentDidUpdate(){
        let zongji = document.getElementById('zongji').clientWidth;
        this.setState({zongji,});
    }
    render(){

        let data = this.props.data,list = data ? data.list : [], total = data? data.total : [],  height = this.state.height, width = this.state.width;
        console.log('list',list);
        return (<div className="cusRetrun">
            <Item extra={<span>更多详情</span>}  arrow="horizontal" onClick={this.props.showDetail}>客户分派回测情况（客户等级：{this.props.curCusType}）</Item>
            <div style={{position: 'relative'}}>
                <div style={{overflow:"scroll",}}>
                    <table style={{width:"1170px"}} className="custom_module_table">
                        <thead>
                        <tr>
                            <th colSpan='2' rowSpan='2' id="managerName">客户经理</th>
                            <th colSpan='2' rowSpan='2' id='fpdate'>分派日期</th>
                            <th colSpan='2' rowSpan='2'>分派客户数</th>

                            <th colSpan='5'>当前客户等级情况</th>
                            <th colSpan='2' rowSpan='2'>分派时保有量(百万)</th>
                            <th colSpan='2' rowSpan='2'>当前保有量(百万)</th>
                            <th colSpan='2' rowSpan='2'>变化率</th>
                        </tr>
                        <tr>
                            <th>战略</th>
                            <th>财富</th>
                            <th>钻石</th>
                            <th>白金</th>
                            <th>黄金</th>
                            {/* <th>普通</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item, index) => {
                            return (<tr key={item.manager.id + index}>
                                <td colSpan='2'>{item.manager.name}</td>
                                <td colSpan='2'>{item.apportionTime}</td>
                                <td colSpan='2'>{item.apportionNum}</td>
                                <td>{item.curLevelDis[0]}</td>
                                <td>{item.curLevelDis[1]}</td>
                                <td>{item.curLevelDis[2]}</td>
                                <td>{item.curLevelDis[3]}</td>
                                <td>{item.curLevelDis[4]}</td>
                                {/* <td>{item.curLevelDis[5]}</td> */}
                                <td colSpan='2'>{item.preQuantity}</td>
                                <td colSpan='2'>{item.curQuantity}</td>
                                <td colSpan='2'>{item.changeRate}</td>
                            </tr>)
                        })}

                        </tbody>
                        <thead>
                        <tr>
                            <th colSpan="4" id='zongji'>总计</th>
                            <th colSpan="2">{total[0]}</th>
                            <th>{total[1]}</th>
                            <th>{total[2]}</th>
                            <th>{total[3]}</th>
                            <th>{total[4]}</th>
                            <th>{total[5]}</th>
                            {/* <th>{total[6]}</th> */}
                            <th colSpan="2">{total[7]}</th>
                            <th colSpan="2">{total[8]}</th>
                            <th colSpan="2">{total[9]}</th>
                        </tr>
                        </thead>
                    </table>
                    <table className="custom_module_table" style={{position:"absolute", left:0, top: 0, }}>
                        <thead>
                        <tr>
                            <th style={{width: width + 1 + 'px', height:height + 1+'px'}}>
                                客户经理
                            </th>

                        </tr>
                        </thead>
                        <tbody style={{backgroundColor:'white'}}>
                        {list.map((item, index)=>{
                            return (<tr key={item.manager.id + 'rel' + index}>
                                <td  style={{width:'102px'}}>{item.manager.name}</td>

                            </tr>)
                        })}
                        <tr style={{position:'absolute', width: this.state.zongji + 1 +'px'}}>
                            <th style={{width: this.state.zongji+1+'px'}}>总计</th>
                        </tr>
                        </tbody>


                    </table>

                </div>
            </div>
        </div>)
    }
}
export default TableB;