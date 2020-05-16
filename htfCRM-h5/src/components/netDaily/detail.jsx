import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Flex, Grid, ListView, Text, Toast } from 'antd-mobile';
import moment from 'moment';
import echarts from 'echarts'

class NetDailyDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            segmentOptions: ["近1个月", "近3个月", "近6个月", "近1年"],
            segmentSelected: 0,
            chartData: {
                ProductJournalLine: [],
                dayvalue: "0",
                newJournal: "0",
                JournalNow: ""
            },
            tableData: [],
            dataIndex: null,
        }
    }

    componentDidMount() {
        let { name } =this.props.location.query;
        this.changeTilte(name);
        Toast.loading('数据加载中...', 0)
        Promise.all([
            this.GetProductJLInePromise(),
            this.GetHoldProduct()
        ]).then((res)=>{
            Toast.hide()
            this.handleData(res);
        });
    }

    handleData(res) {
        let data0 = res[0].data;
        let data1 = res[1].data;
        this.setState({
            chartData: data0,
            tableData: data1,
        }, ()=>{
            this.renderChart();
        })
    }

	/**
     * 产品净值折线图
     * @constructor
     */
    GetProductJLInePromise() {
        let { id } =this.props.location.query;
        return this.requestPromise({
            api: 'GetProductJLIne',
            params: {
                id: id,
                datetype: this.state.segmentSelected+1
            },
            hideToast: true
        })
    }

    /**
     * 产品净值折线图
     * @constructor
     */
    GetProductJLIne(cb) {
        let { id } =this.props.location.query;
        this.request({
            api: 'GetProductJLIne',
            params: {
                id: id,
                datetype: this.state.segmentSelected+1
            }
        }, (res)=>{
            this.setState({
                chartData: res.data,
            },()=>{
                cb && cb();
            })
        })
    }


	/**
     * 持有产品查询
     * @constructor
     */
    GetHoldProduct() {
        let { id } =this.props.location.query;
        return this.requestPromise({
            api: 'GetHoldProduct',
            params: {
                id: id
            },
            hideToast: true
        })
    }

    renderChart() {
        let { chartData } = this.state;
        let chart = echarts.init(document.getElementById('myChart'));
        let _data = [];
        let _xData = [];
        chartData.ProductJournalLine.map((item)=>{
            _xData.push(item.time);
            _data.push(item.value)
        })
        let option = {
            color: ["#7CB1F9"],
            tooltip: {
                // axisPointer: {
                //     type: 'cross'
                // },
                trigger: 'axis',
                showContent: false
            },
            grid: {
                top: '5%',
                left: '15%',
                bottom: '28%'
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#666"
                    }
                },
                axisLabel:{
                    show: true,
                    color: '666',
                    rotate:40,
                    interval: 'auto'
                },
                data: _xData
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                // axisPointer: {
                //     snap: true
                // },
                axisLine: {
                    lineStyle: {
                        color: "#666"
                    }
                },
                nameTextStyle: {
                    padding: [0, 0, 0, 70]
                },
            },
            series: [
                {
                    data: _data,
                    type: 'line',
                    itemStyle: {
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    label: {
                        show: false,
                        position: 'top'
                    },
                    barWidth: '30%'
                }
            ]

        };

        chart.clear();
        chart.setOption(option);
        chart.off('updateAxisPointer');
        chart.on("updateAxisPointer", (params) => {
            console.log(params)
            this.setState({
                dataIndex: params.dataIndex
            })
        })
    }

    segmentOnChange(opt, index) {
        this.setState({
            segmentSelected: index,
            dataIndex: null
        },()=>{
            this.GetProductJLIne(()=>{
                this.renderChart();
            })
        })
    }

    render() {
        let { chartData, tableData, dataIndex } = this.state;
        let tableWidth = document.body.clientWidth * 1.8;
        let _JournalNow = chartData.JournalNow.replace(/-/g, '/');

        return <div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6" />
            <Flex>
                <Flex.Item style={{borderRight: '1px solid #eee'}}>
                    <div style={{textAlign: 'center'}}>
                        <div className="fs_12 mt_10 mb_10 color666">
                            最新净值({ moment(_JournalNow + " 00:00:00").format("MM-DD") })
                        </div>
                        <div className="fs_14 mb_10">
                            { chartData.dayvalue || "---" }
                        </div>
                    </div>
                </Flex.Item>
                <Flex.Item style={{borderBottom: '1px solid #eee', marginLeft: 0}}>
                    <div style={{textAlign: 'center'}}>
                        <div className="fs_12 mt_10 mb_10 color666">日涨跌幅</div>
                        {
                            chartData.newJournal.replace(/%/g, '')*100 > 0 &&
                            <div className="fs_14 mb_10" style={{color: '#F4333C'}}>
                                { chartData.newJournal || "---" }
                            </div>
                        }
                        {
                            chartData.newJournal.replace(/%/g, '')*100 === 0 &&
                            <div className="fs_14 mb_10" style={{color: '#333333'}}>
                                { chartData.newJournal || "---" }
                            </div>
                        }
                        {
                            chartData.newJournal.replace(/%/g, '')*100 < 0 &&
                            <div className="fs_14 mb_10" style={{color: '#009944'}}>
                                { chartData.newJournal || "---" }
                            </div>
                        }

                    </div>
                </Flex.Item>
            </Flex>

            <WhiteSpace size='md' className="bg_f6" />

            <WhiteSpace style={{height: '15px'}}/>
            <div
                className="color_ui fs_16 bg_ui_2"
                style={{display: 'inline-block', lineHeight: '30px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0'}}
            >
                产品净值曲线
            </div>
            <WhiteSpace style={{height: '10px'}}/>

            <div
                className="fs_12 color999"
                style={{textAlign: 'center',height: '20px', marginBottom: '-10px'}}
            >
                {
                    dataIndex !==null &&
                        <div>
                            { chartData.ProductJournalLine[dataIndex].time }最新净值单位:
                            <Text className="color_ui">{ chartData.ProductJournalLine[dataIndex].value }</Text>
                        </div>


                }
            </div>

            <div id="myChart" style={{height: "220px"}}></div>

            <div className="htf-segment" style={{ height: "30px", width: "300px", margin: "0 auto", fontSize: '.12rem' }}>
                {
                    this.state.segmentOptions.map((opt, index) => {
                        return <div
                            key={index}
                            className={this.state.segmentSelected === index ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                            onClick={() => this.segmentOnChange(opt, index) }
                        >
                            {opt}
                        </div>
                    })
                }
            </div>
            <WhiteSpace style={{height: '10px'}}/>
            <WhiteSpace style={{height: '10px'}} className="bg_f6" />

            <WhiteSpace style={{height: '10px'}}/>
            <div className="module_title_a">
                持有客户信息
            </div>
            <WhiteSpace style={{height: '10px'}}/>

            <div style={{ position: 'relative' }}>
                <div style={{overflowX: 'scroll'}}>

                    <div style={{position: 'absolute', top: '0', left: '0', backgroundColor: '#FFF', width: '151px', overflow: 'hidden'}}>
                        <table className="cust_table" style={{width: tableWidth,tableLayout:'fixed',wordBreak:'break-all',wordWrap:'break-word'}} >
                            <thead>
                            <tr>
                                <th style={{width: '150px',height:'.36rem',padding:'0'}} >
                                    客户名称
                                </th>
                                <th>
                                    份额
                                </th>
                                <th>
                                    市值
                                </th>
                                <th>
                                    盈亏
                                </th>
                                <th>
                                    净值
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tableData.map((item, index)=>{
                                    return <tr key={index}>
                                        <td>
                                            <div
                                                className="color_ui"
                                                onClick={
                                                    ()=>this.context.router.push({
                                                        pathname: "/SKListDetail",
                                                        query: {
                                                            id: item.custid,
                                                            userType: item.userType
                                                        }
                                                    })
                                                }
                                            >
                                                { item.name }
                                            </div>

                                        </td>
                                        <td>
                                            { item.shares }
                                        </td>

                                        <td>
                                            { item.marketvalue }
                                        </td>

                                        <td>
                                            { item.profitloss }
                                        </td>
                                        <td>
                                            { item.netvalue }
                                        </td>

                                    </tr>
                                })
                            }

                            </tbody>
                        </table>
                    </div>

                    <table className="cust_table" style={{ width: tableWidth, tableLayout: 'fixed', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        <thead>
                        <tr>
                            <th style={{width: '150px',height:'.36rem',padding:'0'}} >
                                客户名称
                            </th>

                            <th>
                                份额(份)
                            </th>
                            <th>
                                市值(元)
                            </th>
                            <th>
                                盈亏(元)
                            </th>
                            <th>
                                净值
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tableData.map((item, index)=>{
                                return <tr
                                    key={index}
                                    onClick={
                                        ()=>this.context.router.push({
                                            pathname: "/SKListDetail",
                                            query: {
                                                id: item.custid,
                                                userType: item.userType
                                            }
                                        })
                                    }
                                >
                                    <td>
                                        <div>
                                            { item.name }
                                        </div>

                                    </td>
                                    <td>
                                        { item.shares }
                                    </td>

                                    <td>
                                        { this.fmoney(item.marketvalue) }
                                    </td>

                                    <td>
                                        { this.fmoney(item.profitloss) }
                                    </td>
                                    <td>
                                        { item.netvalue }
                                    </td>

                                </tr>
                            })
                        }

                        </tbody>
                    </table>
                    <WhiteSpace style={{height: '10px'}}/>

                </div>
            </div>

        </div>
    }
}

export default NetDailyDetail;