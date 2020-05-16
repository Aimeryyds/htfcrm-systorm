import React from 'react';
import echarts from 'echarts';
import Module from '../../lib/module';
import {WhiteSpace} from 'antd-mobile';
import PageF from './page_f';
let myChart;
class PageE extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            period: 12, //12:近一年，24：近两年
            dates: [], //横坐标
            seriesData: []//系列值
        }
    }
    componentDidMount(){
        myChart = echarts.init(document.getElementById("chart_level"));
        this.renderChart();
        this.getData();
    }
    componentDidUpdate(){
        this.renderChart();
    }
    renderChart(){
        let options = {
            // title: {
            //     text: '等级走势图',
            //     left: 'center',
            //     textStyle: {
            //         fontSize: 16,
            //         fontWeight: 'normal',
            //     },
            //     padding: [10, 0, 0, 0]
            // },
            grid: {
                top: 70,
                left: '6%',
                right: '8%',
                bottom: '5%',
                containLabel: true
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: false},
                axisLabel: {
                    // interval: 0,
                    rotate: 40
                },
                data: this.state.dates
            },
            yAxis: {
                name: '客户等级',
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: false},
                axisLabel: {
                    interval: 0,
                    // rotate: 40
                },
                data: ["普通", "黄金", "白金", "钻石", "财富", "战略"]
            },
            series: [
                {
                    name:'等级趋势',
                    type:'line',
                    stack: '总量',
                    itemStyle: {
                        color: '#5a96e6',
                        normal: {
                            label: {
                                show: true,
                                formatter: "{c}",
                                color: '#5a96e6'
                            },
                            color: '#5a96e6'
                        }
                    },
                    lineStyle: {
                        color: '#5a96e6'
                    },
                    data: this.state.seriesData
                }
            ]
        };
        myChart.setOption(options);
    }
    getData = () => {//获取图表数据
        let  id  = this.props.id;
        
        this.request({
            api:"getLevelChange",
            params: {
                selectedUserIds: id,
                type: this.state.period
			}
        }, (res) => {
            let oridata = res.data, dates = [], seriesData = [];
            for(let item of oridata){
                dates.push(item.date);
                seriesData.push(item.level.slice(0,2));
            }
            this.setState({
                dates,
                seriesData
            })
        })

    }
    changePeriod = (val) => {
        this.setState({
            period: val
        }, this.getData)
    }
    render(){
        return (<div>
            <WhiteSpace size='lg' className="bg_f6"/>
             <div className="htf-segment" style={{ height: "30px", width: "250px", margin: "10px auto" }}>
                <div
                    className={this.state.period === 12 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changePeriod(12)}
                >
                    近一年
                </div>
                <div
                    className={this.state.period === 24 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changePeriod(24)}
                >
                    近两年
                </div>

            </div>
            <div id="chart_level" style={{width: '100%', height: '350px', paddingBottom: '20px'}}></div>
            {/* <PageF id={this.props.id}/> */}
        </div>)
    }
}
export default PageE;