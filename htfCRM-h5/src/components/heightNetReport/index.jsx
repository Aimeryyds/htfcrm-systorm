import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts';
import moment from 'moment';
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

const periodMap = {
    "每日": "0",
    "每周": "1",
    "月度": "2",
    "季度": "3",
    "年度": "4"
};
const typeMap = {
    "高净值客户": "1",
    "有效户": "2"
};
const selectTypeMap = {
    "分布": "1",
    "趋势": "2"
};


class HeightNetReport extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            options_a: ['客户总览', '户均'],
            selected_a: "客户总览",
            options_b: ['高净值客户', '有效户'],
            selected_b: "高净值客户",
            options_c: ['分布', '趋势'],
            selected_c: "分布",
            options_d: ['每日', '每周', '月度', '季度', '年度'],
            selected_d: "每日",

            //高净值客户分布
            "HDistribute": null,
            //高净值客户趋势
            "HTrend": null,
            //有效户分布
            "EDistribute": null,
            //有效户趋势
            "ETrend": null,

        }
    }

    componentDidMount() {
        this.changeTilte("高净值客户报表");
        this.getHeightValueCustomer();


    }

	/**
	 * 获取4中状态的数据
     */
    getHeightValueCustomer() {
        let { selected_a, selected_b, selected_c, selected_d } = this.state;
        let _params={
            type: typeMap[selected_b],                  //1:高净值客户  2:有效户
            selectType: selectTypeMap[selected_c],      //1:分布   2:趋势
            period: periodMap[selected_d],              //0:每日  1:每周  2:月度  3:季度  4:年度
        };
        console.log(_params);
        this.request({
            api: "HeightValueCustomer",
            params: _params,
        }, (res)=>{
            this.setState({
                HDistribute: res.data.HDistribute,
                HTrend: res.data.HTrend,
                EDistribute: res.data.EDistribute,
                ETrend: res.data.ETrend
            }, ()=>{
                this.renderChart();
                this.renderChartB();
                this.renderChartC();
            })
        })
    }

    renderChart() {
        let { HDistribute, HTrend, EDistribute, ETrend, selected_a, selected_b, selected_c, selected_d } = this.state;
        let myChart = echarts.init(document.getElementById('myChart'));
        let option = {};
        myChart.clear();
        option.color = ['#7CB1F9', '#FF9193','#64D5FF','#FBD168','#FF8102', '#2B83F8'];
        option.grid = { left: '15%', right: '15%' };

        if(selected_b === "高净值客户" && selected_c==="分布") {
            //高净值客户、分布
            option.xAxis = {
                type: 'category',
                data: ['本年高净值客户', '历史高净值客户'],
                axisLabel:{
                    color:'#999',
                },
            };
            option.legend = {
                data: [ '事实有效户', '有效客户数', '保有量'],
                bottom: 10
            };
            option.tooltip = {
                trigger:'axis'
            };
            option.yAxis = [{
                type: 'value',
                name: '客户数（单位：户）',
                nameTextStyle:{
                    padding: [0, 0, 0, 100],
                    color: "#999999",
                },
                axisLabel:{
                    color:'#999',
                    rotate: 30
                },
                splitLine:{
                    show: false
                }

            },
                {
                    type:'value',
                    name:'保有量（单位：亿元）',
                    nameTextStyle:{
                        padding: [0, 80, 0, 0],
                        color: "#999999",
                    },
                    splitLine:{
                        show: false
                    },
                    axisLabel:{
                        color:'#999',
                        rotate: -30
                    },
                    minInterval: 1

                }];
            option.series = [{
                name: "保有量",
                data: [ HDistribute.stemeYearProtectHaveMeasure, HDistribute.historyProtectHaveMeasure ],
                type: 'line',
                itemStyle: {
                    color: '#FA7375',
                },
                yAxisIndex: 1
            },{
                name: "事实有效户",
                data: [ HDistribute.stemFactCustomerNumber, HDistribute.historyFactCustomerNumber ],
                type: 'bar',
                itemStyle: {
                    color: '#B5D2F9',
                },
                barWidth: '30%',
                yAxisIndex: 0
            },{
                name: "有效客户数",
                data: [ HDistribute.stemeFfectiveCustomerNumber, HDistribute.historyFfectiveCustomerNumberme ],
                type: 'bar',
                itemStyle: {
                    color: '#7CB1F9',
                },
                barWidth: '30%',
                barGap:0,
                yAxisIndex: 0
            }];
        }

        if(selected_b === "有效户" && selected_c==="分布") {
            //高净值客户、分布
            option.xAxis = {
                type: 'category',
                data: ['百万有效户', '五百万有效户'],
                axisLabel:{
                    color:'#999',
                },
            };
            option.legend = {
                data: [ '客户数', '保有量'],
                bottom: 10
            };
            option.tooltip = {
                trigger:'axis'
            };
            option.yAxis = [{
                type: 'value',
                name: '客户数（单位：户）',
                nameTextStyle:{
                    padding: [0, 0, 0, 100],
                    color: "#999999",
                },
                axisLabel:{
                    color:'#999',
                    rotate: 30
                },
                splitLine:{
                    show: false
                }

            },
                {
                    type:'value',
                    name:'保有量（单位：亿元）',
                    nameTextStyle:{
                        padding: [0, 80, 0, 0],
                        color: "#999999",
                    },
                    splitLine:{
                        show: false
                    },
                    axisLabel:{
                        color:'#999',
                        rotate: -30
                    },
                    minInterval: 1

                }];
            option.series = [{
                name: "保有量",
                data: [ EDistribute.millionProtectHaveMeasure, EDistribute.fiveMillionProtectHaveMeasure ],
                type: 'line',
                itemStyle: {
                    color: '#FA7375',
                },
                yAxisIndex: 1
            },{
                name: "客户数",
                data: [ EDistribute.millionCustomerNumber, EDistribute.fiveMillionCustomerNumber ],
                type: 'bar',
                itemStyle: {
                    color: '#7CB1F9',
                },
                barWidth: '30%',
                yAxisIndex: 0
            }];
        }

        if(selected_b === "高净值客户" && selected_c==="趋势") {
            let xData = [];
            let _dataA = [], _dataB = [],_dataC = [],_dataD = [];
            HTrend.map(item => {
                xData.push(moment(item.time.replace(/-/g, '/')).format('MM-DD'));
                _dataA.push(item.millionCustomerNumber)
                _dataB.push(item.millionProtectHaveMeasure)
                _dataC.push(item.fiveMillionCustomerNumber)
                _dataD.push(item.fiveMillionProtectHaveMeasure)
            });
            option.grid.bottom = '30%';
            option.color = ['#FA7375', '#FBA1A2', '#34C6FF', '#76E0FF'];
            option.xAxis = {
                type: 'category',
                data: xData,
                axisLabel:{
                    color:'#999',
                },
            };
            option.legend = {
                data: [ '百万有效户客户数', '百万有效户保有量', '五百万有效户客户数', '五百万有效户保有量'],
                bottom: 10
            };
            option.tooltip = {
                trigger:'axis'
            };
            option.yAxis = [{
                type: 'value',
                name: '客户数（单位：户）',
                nameTextStyle:{
                    padding: [0, 0, 0, 100],
                    color: "#999999",
                },
                axisLabel:{
                    color:'#999',
                    rotate: 30
                },
                splitLine:{
                    show: false
                }

            },
            {
                type:'value',
                name:'保有量（单位：亿元）',
                nameTextStyle:{
                    padding: [0, 80, 0, 0],
                    color: "#999999",
                },
                splitLine:{
                    show: false
                },
                axisLabel:{
                    color:'#999',
                    rotate: -30
                },
                minInterval: 1

            }];
            option.series = [{
                name: "百万有效户客户数",
                data: _dataA,
                type: 'line',
                yAxisIndex: 0
            },{
                name: "百万有效户保有量",
                data: _dataB,
                type: 'line',
                yAxisIndex: 1
            },{
                name: "五百万有效户客户数",
                data: _dataC,
                type: 'line',
                yAxisIndex: 0
            },{
                name: "五百万有效户保有量",
                data: _dataD,
                type: 'line',
                yAxisIndex: 1
            }]
        }

        if(selected_b === "有效户" && selected_c==="趋势") {
            let xData = [];
            let _dataA = [], _dataB = [],_dataC = [],_dataD = [];
            ETrend.map(item => {
                xData.push(moment(item.time.replace(/-/g, '/')).format('MM-DD'));
                _dataA.push(item.millionCustomerNumber);
                _dataB.push(item.millionProtectHaveMeasure);
                _dataC.push(item.fiveMillionCustomerNumber);
                _dataD.push(item.fiveMillionProtectHaveMeasure);
            });
            option.grid.bottom = '30%';
            option.color = ['#FA7375', '#FBA1A2', '#34C6FF', '#76E0FF'];
            option.xAxis = {
                type: 'category',
                data: xData,
                axisLabel:{
                    color:'#999',
                },
            };
            option.legend = {
                data: [ '百万有效户客户数', '百万有效户保有量', '五百万有效户客户数', '五百万有效户保有量'],
                bottom: 10
            };
            option.tooltip = {
                trigger:'axis'
            };
            option.yAxis = [{
                type: 'value',
                name: '客户数（单位：户）',
                nameTextStyle:{
                    padding: [0, 0, 0, 100],
                    color: "#999999",
                },
                axisLabel:{
                    color:'#999',
                    rotate: 30
                },
                splitLine:{
                    show: false
                }

            },
                {
                    type:'value',
                    name:'保有量（单位：亿元）',
                    nameTextStyle:{
                        padding: [0, 80, 0, 0],
                        color: "#999999",
                    },
                    splitLine:{
                        show: false
                    },
                    axisLabel:{
                        color:'#999',
                        rotate: -30
                    },
                    minInterval: 1

                }];
            option.series = [{
                name: "百万有效户客户数",
                data: _dataA,
                type: 'line',
                yAxisIndex: 0
            },{
                name: "百万有效户保有量",
                data: _dataB,
                type: 'line',
                yAxisIndex: 1
            },{
                name: "五百万有效户客户数",
                data: _dataC,
                type: 'line',
                yAxisIndex: 0
            },{
                name: "五百万有效户保有量",
                data: _dataD,
                type: 'line',
                yAxisIndex: 1
            }]
        }

        myChart.setOption(option);
    }

	/**
	 * 饼图
     */
    renderChartB() {
        let myChart = echarts.init(document.getElementById('myChartB'));
        let innerData = [
            {name: "未呼", value: 1 },
            {name: "已呼", value: 2 },
        ];
        let outData = [
            {name: "未呼", value: 3 },
            {name: "未接通", value: 4 },
            {name: "已接通", value: 5 },
        ];

        let option_a = {
            color:['#7CB1F9', '#FF9193','#64D5FF','#FBD168','#FF8102', '#2B83F8'],
            series: [
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['36%', '36%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{name: '', value: 1, selected:false, itemStyle: {borderColor: '#f6f6f6', borderWidth: 1, color: '#fff'}}]
                },
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['0', '20%'],
                    label: {
                        normal: {
                            show: true,
                            position:'inside',
                            formatter: '{b}',
                            // fontSize: 6
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 90
                        }
                    },
                    data: innerData
                },
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    label: {
                        normal: {
                            position:'outside',
                            formatter: '{b}\n{c}人\n{d}%'
                        }
                    },
                    labelLine: {
                        length: 20,
                        length2: 10
                    },
                    data: outData
                }
            ]
        };
        myChart.setOption(option_a);
    }

	/**
     * 折线图
     */
    renderChartC() {
        let myChart = echarts.init(document.getElementById('myChartC'));
        let option_a = {
            color: ['#7CB1F9', '#FF9193','#64D5FF','#FBD168','#FF8102', '#2B83F8'],
            grid: {left: '15%', right: '10%', bottom: '20%'},
            tooltip: {
                trigger:'axis'
            },
            xAxis: {
                type: 'category',
                data: ['03/01','03/02','03/03','03/04','03/05','03/06','03/07','03/08'],
                axisLabel:{
                    color:'#999',
                },
            },
            yAxis: [{
                type: 'value',
                name: '保有量（单位：亿元）',
                nameTextStyle:{
                    padding: [0, 0, 0, 100],
                    color: "#999999",
                },
                axisLabel:{
                    color:'#999',
                    rotate: 30
                },
                splitLine:{
                    show: false
                }

            }],
            legend: {
                data: [ '专户', '资管', '公募'],
                bottom: 10
            },
            series: [
                {
                    name: "专户",
                    data: [13,23,33,43,53,63,73,83],
                    type: 'line',
                    yAxisIndex: 0
                },
                {
                    name: "资管",
                    data: [11,21,31,41,51,61,71,81],
                    type: 'line',
                    yAxisIndex: 0
                },
                {
                    name: "公募",
                    data: [12,22,32,42,52,62,72,82],
                    type: 'line',
                    yAxisIndex: 0
                }
            ]

        }

        myChart.setOption(option_a);
    }

	/**
     * 总览户均
     * @param item
     * @param index
     */
    onChangeA(item, index) {
        this.setState({
            selected_a: item
        });
    }

	/**
     * 高净值、有效户
     * @param item
     * @param index
     */
    onChangeB(item, index) {
        this.setState({
            selected_b: item
        }, ()=>{
            this.getHeightValueCustomer();
        });
    }

    /**
     * 分布、趋势
     * @param item
     * @param index
     */
    onChangeC(item, index) {
        this.setState({
            selected_c: item
        }, ()=>{
            this.getHeightValueCustomer();
        });
    }

    /**
     * 每日、每周...
     * @param item
     * @param index
     */
    onChangeD(item, index) {
        this.setState({
            selected_d: item
        }, ()=>{
            this.getHeightValueCustomer();
        });
    }

    render() {
        let { options_a, selected_a, options_b, selected_b, options_c, selected_c, options_d, selected_d } = this.state;
        let tableWidth = document.body.clientWidth * 1;

        return <div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            {
                // <div className="htf-segment select-badge">
                //     {
                //         options_a.map((item, index) => {
                //             return <div
                //                 key={index}
                //                 className={["htf-segment-item border_color_ui", selected_a === item ? "bg_ui colorF" : "color_ui"].join(" ")}
                //                 onClick={() =>this.onChangeA(item, index)}
                //             >
                //                 { item }
                //             </div>
                //         })
                //     }
                // </div>  
            }
            

            <Flex style={{borderBottom: '1px solid #f6f6f6', paddingLeft: '10px'}} className="" >
                {
                    options_b.map((item, index)=>{
                        return <div
                            key={index}
                            className={["ml_10 mr_10 fs_14", selected_b === item ? "color_ui" : "color333" ].join(" ")}
                            style={{padding: '.12rem 0 .05rem', textAlign: 'center', lineHeight: '.8'}}
                            onClick={()=>this.onChangeB(item, index)}
                        >
                            <div>{ item }</div>
                            <div
                                className={[selected_b === item && "bg_ui"].join(" ")}
                                style={{width: '.2rem', height: '.04rem', borderRadius: '.02rem', display: "inline-block"}}
                            ></div>
                        </div>
                    })
                }
            </Flex>

            <WhiteSpace style={{height: '15px'}}/>

            <Flex justify="between">
                <div style={{backgroundColor: "#FEF7E9", lineHeight: ".3rem", padding: '0 .15rem', borderRadius: "0 .15rem .15rem 0"}} className="color_ui fs_14">
                    客户总览
                </div>
                <div className="htf-segment select-badge" style={{width: '32%', margin: 0}}>
                    {
                        options_c.map((item, index) => {
                            return <div
                                key={index}
                                className={["htf-segment-item border_color_ui", selected_c === item ? "bg_ui colorF" : "color_ui"].join(" ")}
                                onClick={() =>this.onChangeC(item, index)}
                                style={{ lineHeight: '.26rem'}}
                            >
                                { item }
                            </div>
                        })
                    }
                </div>
            </Flex>

            <div id="myChart" style={{height: '3rem'}}></div>

            <Flex>
                {
                    options_d.map((item, index)=>{
                        return <Flex.Item
                            key={ index }
                            className={["fs_12", selected_d === item ? "color_ui bg_f border_color_ui" : "color999"].join(" ")}
                            style={{
                                textAlign:"center",
                                lineHeight: '.34rem',
                                backgroundColor: selected_d === item ? "#fff" : "#FAFAFA",
                                margin: 0,
                                borderWidth: selected_d === item ? '0 0 1px 0': '0',
                                borderStyle: 'solid'
                            }}
                            onClick={() =>this.onChangeD(item, index)}
                        >
                                { item }
                        </Flex.Item>
                    })
                }
            </Flex>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <WhiteSpace style={{height: '10px'}}/>
            <Flex justify="between">
                <div style={{backgroundColor: "#FEF7E9", lineHeight: ".3rem", padding: '0 .15rem', borderRadius: "0 .15rem .15rem 0"}} className="color_ui fs_14">
                    本年高净值客户
                </div>
            </Flex>

            <div id="myChartB" style={{height: '3rem'}}></div>

            <WhiteSpace style={{height: '1px'}} className="bg_f6"/>
            <Flex style={{textAlign: 'center'}}>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.1rem 0'}}>
                    <div className="fs_14 color666 mb_5">{ this.fmoney('123123', true) }万元</div>
                    <div className="fs_12 color999">公募保有量</div>
                </Flex.Item>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.1rem 0'}}>
                    <div className="fs_14 color666 mb_5">{ this.fmoney('123123', true) }万元</div>
                    <div className="fs_12 color999">专户保有量</div>
                </Flex.Item>
                <Flex.Item style={{borderRight: '1px solid #f6f6f6', padding: '.1rem 0'}}>
                    <div className="fs_14 color666 mb_5">{ this.fmoney('123123', true) }万元</div>
                    <div className="fs_12 color999">资管保有量</div>
                </Flex.Item>
                <Flex.Item style={{ padding: '.1rem 0'}}>
                    <div className="fs_14 color666 mb_5">{ this.fmoney('123123', true) }万元</div>
                    <div className="fs_12 color999">总保有量</div>
                </Flex.Item>
            </Flex>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <WhiteSpace style={{height: '10px'}}/>
            <Flex justify="between">
                <div style={{backgroundColor: "#FEF7E9", lineHeight: ".3rem", padding: '0 .15rem', borderRadius: "0 .15rem .15rem 0"}} className="color_ui fs_14">
                    产品总保有量趋势图
                </div>
            </Flex>

            <div id="myChartC" style={{height: '3rem'}}></div>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <WhiteSpace style={{height: '10px'}}/>
            <div className="module_title_a" style={{marginBottom: '12px'}}>渠道认购明细表</div>

            <div style={{ position: 'relative' }}>
                <div style={{overflowX: 'scroll'}}>

                    <table className="cust_table" style={{ width: tableWidth, tableLayout: 'fixed', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        <thead>
                        <tr>
                            <th>
                                产品名称
                            </th>
                            <th>
                                19-04-17(亿元)
                            </th>
                            <th>
                                上周周五(亿元)
                            </th>
                            <th>
                                增长率
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                123
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                123
                            </td>
                        </tr>

                        <table className="cust_table_sub" style={{ width: tableWidth, tableLayout: 'fixed', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                            <tbody>
                            <tr style={{backgroundColor: "#FEF7E9"}}>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                            </tr>
                            <table className="cust_table_sub_sub" style={{ width: tableWidth, tableLayout: 'fixed', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                                <tbody>
                                <tr style={{backgroundColor: "##F8F7F4"}}>
                                    <td>
                                        123
                                    </td>
                                    <td>
                                        123
                                    </td>
                                    <td>
                                        123
                                    </td>
                                    <td>
                                        123
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <tr style={{backgroundColor: "#FEF7E9"}}>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                            </tr>
                            <tr style={{backgroundColor: "#FEF7E9"}}>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                                <td>
                                    123
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <tr>
                            <td>
                                123
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                123
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <WhiteSpace style={{height: '10px'}}/>

        </div>
    }
}

export default HeightNetReport;