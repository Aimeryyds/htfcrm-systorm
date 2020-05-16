//客户经理管辖的客户升降机
import React from 'react';
import Module from '../../lib/module'
import Chart from './chartupdown';
import {WhiteSpace, Picker, List} from 'antd-mobile';
const Item = List.Item;
const map = {"1": "近30天", "3": "近90天", "6":"近半年", "12":"近一年", '24':"近两年"};
const CusItem = ({onClick, extra, children}) => {
    return (<div onClick={onClick} style={{marginLeft:"10px", fontWeight:"bold"}}>
        {children} {extra}
    </div>)
}
class PageF extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            upLevel: [],
            downLevel: [],
            periodType: 1, // 1近30天，3，近90天， 6，近半年， 12，近一年 , 24两年
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        this.request({
            api:"getManagerLevelNumber",
            params:{
                type: this.state.periodType
            }
        }, (res) => {
            let down = res.data.downlevel;
            for(let x in down){
                down[x] = -down[x];
            }
            this.setState({
                upLevel: res.data.uplevel,
                downLevel: down
            })
        })
    }
    changePeriod = (val)=>{
        this.setState({
            periodType: val[0]
        }, this.getData)
    }
    render(){
        return <div><WhiteSpace className="bg_f6"/>
        <h2 style={{textAlign:"center"}}>客户经理管辖的客户升降级统计</h2>
        <Picker data={[{label: "近30天", value: 1}, {label: "近90天", value: 3},{label: "近半年", value: 6}, {label: "近一年", value: 12}, {label:"近两年", value: 24} ]} onChange={ this.changePeriod } cols={1} extra={<span className="iconfont icon-xiangxia"></span>}>
        <CusItem>{map[this.state.periodType]}</CusItem>
        </Picker>
        
       <Chart upLevel={this.state.upLevel} downLevel={this.state.downLevel}/>
       </div>
    }
}
export default PageF;