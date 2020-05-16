//客户经理管辖的客户升降级
import React from 'react';
import Module from '../../lib/module'
import echarts from 'echarts';

class ChartUpDown extends Module{
    componentDidMount(){
        this.renderChart();
    }
    componentDidUpdate(){
        this.renderChart();
    }
  
    renderChart(){
        let len = this.props.upLevel.length, xAxisData = [];
        for(let i = 0; i < len; i++){
            xAxisData.push('data' + i);
        }
        let myChart = echarts.init(document.getElementById('chartUpDown'));
        let option = {
           
            legend:{
                data:["升级", "降级"],
                bottom: 10
            },
            xAxis: {
               show: false, 
               data:xAxisData,
               axisLine:{
                   show:false
               },
               
            },
            yAxis:{
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                }
            },
            series:[{
                type:'bar',
                name:"升级",
                data: this.props.upLevel,
                itemStyle:{
                    color:"#dbac55"
                },
                label:{
                    show:true,
                    position: 'top',
                    
                }
            },
            {
                type: 'bar',
                name: '降级',
                data: this.props.downLevel,
                itemStyle:{
                    color:"#b4b4b4"
                },
                label:{
                    show:true,
                    position: 'bottom'
                }
            }
            ]
        };
        myChart.setOption(option);
    }
    render(){
           return (<div id="chartUpDown" style={{height: "350px"}}></div>)
        
    }
}
export default ChartUpDown;