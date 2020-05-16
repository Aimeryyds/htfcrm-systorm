import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts';
import Tips from '../manager/tips';
class ChartA extends Module{
    componentDidMount(){
        this.renderChart();
    }
    componentDidUpdate(){
        this.renderChart();
    }
    renderChart(){
        let data = this.props.data, x = data.custName || [], y = data.data || [], chart = echarts.init(document.getElementById('toptenchart')), ids = data.accountid || [],  type = this.props.type, yName = '';
        console.log(data);
        
        if(type == 0){
            yName = '十大个人用户保有量(百万)';
        }else{
            yName = '十大企业用户保有量(百万)';
        }
        let option = {
            color:["#7BB1F9"],
            // legend:{
            //     data: ['保有量（百万）'],
            //     show: true,
            //     left: 'center',
            //     bottom: '5%'
            // },
            grid:{
                bottom:'40%',
                left: '12%'
            },
            dataZoom:[{
                type: 'inside',
                throttle: '50',
                minValueSpan:8,
                start:-5,
                end:50,
                filterMode: 'empty'
            }],
            tooltip:{
                trigger: 'axis'
            },
            xAxis:{
                type:'category',
                data: x,
                axisLabel: {
                    rotate: -60,
                    interval: 0,
                }
            },
            yAxis: {
                name: yName,
                type: 'value',
                nameTextStyle: {
                    padding: [0,0,0,100]
                },
                splitLine:{
                    show: false
                }

            },
            series:[
                {
                    name:'保有量（百万）',
                    type: 'bar',
                    data: y,
                    label:{
                        show: true,
                        position: 'top',
                        color: 'black'
                        
                    },
                    barWidth: '50%',
                    emphasis:{
                        itemStyle:{
                            color: '#2B83F8'
                        }
                    },
                    

                }
            ]
        }
        chart.off('click');
        chart.on('click', (params) =>{
            let index = params.dataIndex;
            this.context.router.push({
                pathname: 'View360',
                query: {
                    id: ids[index],
                    name: params.name,
                    userType: this.props.userType
                }
            })
        })
        chart.setOption(option);

    }
    render(){
        return(<div style={{position: 'relative'}}>
            <div id='toptenchart' style={{height: "400px"}}>
                
            </div>
            <Tips style={{position: 'absolute', top: '300px', width: '100%'}}/>
            </div>
        )
    }
}

export default ChartA;