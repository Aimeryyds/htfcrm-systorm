import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'

import { WingBlank, WhiteSpace, Picker, List } from 'antd-mobile';
const Item = List.Item;
const titleMap = {
    "黄金": "黄金客户(50万-100万)",
    "白金": "白金客户(100万-500万)",
    "钻石": "钻石客户(500万-1000万)",
    "财富": "财富客户(1000万-5000万)",
    "战略": "战略客户(≥5000万)",
    "百万以下有效户": "百万以下有效户",
    "百万有效户": "百万有效户",
    "500万有效户":"500万有效户",
}
class ChartsF extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        this.renderEcharts();
    }
    componentDidUpdate(){
        this.renderEcharts();
    }
    renderEcharts() {
        let { chartsListB, timeIndex } = this.props;
        let myChart = echarts.init(document.getElementById('chartsF_bar'));
        let fillData = [], upData = [], downData=[];
        chartsListB.map((item, index) => {
            if(index === 0) {
                fillData.push(0)
            }
            if(index === 1) {
                fillData.push(chartsListB[0])
            }
            if(index === 2) {
                fillData.push(chartsListB[0] + chartsListB[1] + chartsListB[2])
            }
            if(index === 3) {
                fillData.push(chartsListB[0] + chartsListB[1] + chartsListB[2])
            }
            if(index === 4) {
                fillData.push(chartsListB[0] + chartsListB[1] + chartsListB[2] + chartsListB[3] + chartsListB[4])
            }
            if(index === 5) {
                fillData.push(chartsListB[0] + chartsListB[1] + chartsListB[2] + chartsListB[3] + chartsListB[4])
            }

            if(item>=0) {
                upData.push(item)
            } else {
                upData.push('-')
            }

            if(item<0) {
                downData.push(item*-1)
            } else {
                downData.push('-')
            }
        });

        upData.length = 6
        downData.length = 6;
       let xAxisData;
       switch(timeIndex){
        case 0: xAxisData = ['昨日存量', '调入', '调出', '升级', '流失', '降级', '当前存量']; break;
        case 1:xAxisData = ['上周存量', '调入', '调出', '升级', '流失', '降级', '当前存量']; break;
        case 2:xAxisData = ['上月存量', '调入', '调出', '升级', '流失', '降级', '当前存量']; break;
        case 3:xAxisData = ['上季度存量', '调入', '调出', '升级', '流失', '降级', '当前存量']; break;
        case 4:xAxisData = ['上半年存量', '调入', '调出', '升级', '流失', '降级', '当前存量']; break;
        case 5:xAxisData = ['去年存量', '调入', '调出', '升级', '流失', '降级', '当前存量']; break;
    }

        let options = {
            grid: {
                left:"14%",
                right:"5%",
                top: "20%",
                bottom:"20%",
                containLabel: false,
            },
            xAxis: {
                type: 'category',
                splitLine: {show:false},
                data: xAxisData,
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                    fontSize: 12
                }
            },
            yAxis: {
                name: '保有量(单位:亿)',
                type : 'value'
            },
            series: [
                {
                    name: '辅助',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: fillData,
                    barWidth: "50%"
                },
                {
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        color: '#ffb900'
                    },
                    data: upData
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            formatter: "-{c}",
                        }
                    },
                    itemStyle: {
                        color: '#ffb900'
                    },
                    data: downData
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: "{c}",
                        }
                    },
                    itemStyle: {
                        color: '#2b83f8'
                    },
                    data: ['-','-','-','-','-','-', chartsListB[6]]
                }
            ]
        };

        myChart.setOption(options);
        myChart.off('click');
        myChart.on("click", (param) => {
            this.props.detailTypeChange(param.dataIndex);
        });

    }

    render() {
        let pcikData;
        if(this.props.tabType === 0){
            pcikData = [{label:"黄金", value:"黄金"}, {label:"白金", value:"白金"},{label:"钻石", value:"钻石"},{label:"财富", value:"财富"},{label:"战略", value:"战略"},];
        }else{
            pcikData = [{label:"百万以下有效户", value:"百万以下有效户"},{label:"百万有效户", value:"百万有效户"},{label:"500万有效户", value:"500万有效户"},]
        }
        return <div className="custrend">
            <Picker data={pcikData}  cols={1} extra=" " value={[this.props.level]}onChange={(val)=>{this.props.levelChange(val[0])}}><Item>
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}>
                { titleMap[this.props.level] + "保有量"}<span className="iconfont icon-kgengduo"></span>
            </div>
            </Item></Picker>
            <div id="chartsF_bar" style={{width: '100%', height: '250px'}}></div>
            <WhiteSpace size='lg'/>
        </div>
    }
}

export default ChartsF;