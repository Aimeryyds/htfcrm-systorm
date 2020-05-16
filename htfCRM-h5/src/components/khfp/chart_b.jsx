import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'


class ChartB extends Module{
    componentDidMount() {
        this.renderEcharts();
    }
    componentDidUpdate(){
        this.renderEcharts();
    }

    renderEcharts(){
        let data = this.props.data, curCusType = this.props.curCusType, oridata = [
            {value:0, name:'战略', itemStyle:{
                color:"#ff8100"
            }},
            {value:0, name:'财富',itemStyle:{
                color:"#ffae00"
            }},
            {value:0, name:'钻石',itemStyle:{
                color:"#fac957"
            }},
            {value:0, name:'白金',itemStyle:{
                color:"#fadc89"
            }},
            {value:0, name:'黄金',itemStyle:{
                color:"#faebbb"
            }},
        ], allZero = true;
        oridata = oridata.filter((item) => {
            return item.name != curCusType;
        })
        oridata = oridata.reverse();
        for(let i = 0; i < data.length; i++){
            if(data[i] != 0)
                allZero = false
            oridata[i].value = data[i];
        }
        let myChart = echarts.init(document.getElementById("Pie_b"));
        let options = {
            title:{
                text:`原${this.props.curCusType}客户数\n${this.props.cusNum}人`,
                left:'center',
                top: 'middle',
                textStyle:{
                    color: "#999",
                    fontFamily: 'PingFangSC-Regular',
                    fontWeight: '400'
                }
            },
            legend: {
                bottom:0,
                
                data:['战略','财富','钻石','白金','黄金']
            },
            
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['40%', '55%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            color:'black',
                            fontSize: 10,
                            fontWeight:'normal',
                            formatter:(val) => {
                                if(val.value == 0 && !allZero)
                                    return ''
                                return `${val.value}人 ${val.percent}%`
                            }
                        },
                       
                    },
                   
                    labelLine:{
                        show:false,
                        length:10,
                        length2:10
                    },
                    data: oridata
                },
                 {type:'pie',
                    name:"fake",
                    radius:["34%", "35%"],
                    data:[{value:1, itemStyle:{
                        color:"#e6e6e6"
                    }}],
                    labelLine:{
                        show:false,
                        length:10,
                        length2:10
                    },}
            ]
        }
        myChart.setOption(options);
    }
    render(){
        return <div id="Pie_b" style={{width: '100%', height: '350px', paddingBottom: '20px'}}></div>
    }
    
}
export default ChartB;