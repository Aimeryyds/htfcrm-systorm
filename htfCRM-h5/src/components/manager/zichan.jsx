import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import echarts from 'echarts';
import { WhiteSpace, List } from 'antd-mobile';
const Item = List.Item;
class Asset extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            data: [[],[]],  //左到右分别为权益，固收，货币，其他，一对多，公募
        }
    }
    componentDidMount(){
        this.getData();
        this.renderChart();

    }
    componentDidUpdate(){
        this.renderChart();
    }
    getData = () => {
        this.request({
            api: 'GetManagerAssetData',
            params: {
                id: this.props.id                 //基金经理的id
            }
        }, (res) => {
            this.setState({
                data: res.data
            })
        });
    }
    renderChart(){
        let myChart = echarts.init(document.getElementById('assetChart')), {data} = this.state,  innerData = data[1] || [], outerData = data[0] || [], names = [];
        for(let i = 0; i < outerData.length; i++){
            names.push(outerData[i].name);
        }
        let colors = ['#7BB1F9', '#F8C741', '#5A96E6', '#FF9193', '#64D5FF','#FBD168','#FF8102','#2B83F8'], colorIndex = 0;
        let option = {
            color:['#7BB1F9', '#FE5C5F', '#5A96E6', '#F8C741', '#FE5C5F', '#5A96E6', '#FF9193', '#64D5FF','#FBD168','#FF8102','#2B83F8'],
            legend: {
                data: names,
                left: 'center',
                bottom: 10
            },
            tooltip:{
                trigger: 'item',
                formatter(params){
                    let money = parseFloat(params.value).toFixed(2);
                    return params.marker + money + '万';
                }
            },
            series: [
                {
                    type:'pie',
                    radius: [0, '27%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: innerData
                },
                {
                    type:'pie',
                    radius: ['45%', '60%'],
                    label: {
                        normal:{
                            formatter: function(params){
                                return parseFloat(params.value).toFixed(2) + '万\n' + params.percent + '%'; 
                            }
                        }
                    },
                    labelLine: {
                        normal:{
                            show: true,
                            length: 10,
                            length2: 5
                        },
                        
                    },
                    itemStyle:{
                        color: (params) => {
                            if(params.name == '公募')
                                return '#fe5c5e';
                            if(params.name == '一对多')
                                return "#5A96E6";
                            else
                                return colors[colorIndex++ % 8]
                        }
                    },
                    avoidLabelOverlap: true,
                    data: outerData,
                },
                {
                    type:'pie',
                    radius: ['40%', '40.5%'],
                    data: [{value:1}],
                    label:{
                        show:false
                    },
                    itemStyle:{
                        color:"#e6e6e6"
                    }
                }
            ]
        }
        myChart.setOption(option);

    }
    render(){
        let { data } = this.state, innerData = data[1] || [], total = 0;
        for(let i=0; i < innerData.length; i++){
            total += innerData[i].value;
        }
        return (
            <div className='asset'>
                <div id='assetChart' style={{height: '290px'}}>

                </div>
                <WhiteSpace size='lg' className='bg_f6'/>
                <List>
                    {
                        innerData.map((item, index) => <Item extra={parseFloat(item.value).toFixed(2) + '万元'} key={index}>
                            {item.name + '(' + (total !== 0 ? (item.value/total * 100).toFixed(2):0)}%)
                        </Item>)
                    }
                    {/* <Item extra={`${data[0]}万元`}>
                        权益（{total !== 0 ? (data[0] / total * 100) .toFixed(2):0} %）
                    </Item>
                    <Item extra={`${data[1]}万元`}>
                        固收（{total !== 0 ? (data[1] / total * 100) .toFixed(2):0} %）
                    </Item>
                    <Item extra={`${data[2]}万元`}>
                        货币（{total !== 0 ? (data[2] / total * 100) .toFixed(2):0} %）
                    </Item>
                    <Item extra={`${data[3]}万元`}>
                        其他（{total !== 0 ? (data[3] / total * 100) .toFixed(2):0} %）
                    </Item> */}
                </List>
            </div>
        )
    }
}
export default Asset;