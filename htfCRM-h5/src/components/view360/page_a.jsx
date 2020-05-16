import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'
import $ from 'jquery'
import { WingBlank, WhiteSpace, Picker, List } from 'antd-mobile';

const recentMap = {
    "近一年盈亏": "recent_12month",
    "近一个月盈亏": "recent_1month",
    "近三个月盈亏": "recent_3month",
    "近半年盈亏": "recent_6month",
    "今年以来盈亏": "recent_ytd",
};
const seasons = [
    {
        label: '近一个月盈亏',
        value: '近一个月盈亏',
    },
    {
        label: '近三个月盈亏',
        value: '近三个月盈亏',
    },
    {
        label: '近半年盈亏',
        value: '近半年盈亏',
    },
    {
        label: '近一年盈亏',
        value: '近一年盈亏',
    },
    {
        label: '今年以来盈亏',
        value: '今年以来盈亏',
    },
];

class PageA extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            asset: [],
            ownership: {},
            incomeloss: [],
            asset_income_info: {
                asset_incomes: []
            },                                      //资产收益、资产汇总
            dataIndex: 0,                           //外层选择数据位置,
            type: 0,                                //1:个人, 2:企业
            selectedSegment: '近一个月盈亏',          //盈亏
            initPage: false,
            sortBy: 2,                              // 0 默认 1 基金份额 2 市值 3 盈亏 4 占比 5 收益率
            sortDirt: '',                           //0 正序 1 逆序
        }
    }

    componentDidMount() {
        this.GetView360AssetDistribute();
        this.GetView360AssetIncome();
    }

    componentWillUnmount() {
        $(".mask_div").remove();
    }


    GetUserInfo() {
        this.request({
            api: 'GetUserInfo'
        }, (res) => {
            let { type } = this.state;
            this.watermark({
                watermark_txt: res.data.name + ' ' + res.data.mobile,
                watermark_rows: type === '1' ? 15 : 10
            });
        })
    }

    GetView360AssetDistribute() {
        this.request({
            api: 'GetView360AssetDistribute',
            params: {
                id: this.props.id
            }
        }, (res) => {
            this.setState({
                asset: res.data.asset_distribute,
                ownership: res.data.recent_year_ownership,
                incomeloss: res.data.recent_incomeloss,
                type: res.data.Type,
                initPage: true
            }, ()=> {
                this.GetUserInfo();
                if(this.state.asset.length === 0) {return;}
                this.renderChart_a();
                this.renderChart_b();
                (res.data.Type === "1") && this.renderChart_c();

            })
        })
    }

    GetView360AssetIncome() {
        let { sortBy, sortDirt } = this.state;
        let params;
        if(sortDirt === '') {
            params = {
                id: this.props.id
            };
        } else {
            params = {
                id: this.props.id,
                sortBy: sortBy,             // 0 默认 1 基金份额 2 市值 3 盈亏 4 占比 5 收益率
                sortDirt: sortDirt,           //0 正序 1 逆序
            };
        }
        this.request({
            api: 'GetView360AssetIncome',
            params: params
        }, (res) => {
            this.setState({
                asset_income_info: res.data,
            })
        })
    }

    sortHandle(by) {
        let { sortBy, sortDirt } = this.state;
        let _sortBy, _sortDirt;
        //点击其他title先取消sortDirt排序方式
        if(sortBy !== by){
            _sortBy = by;
            _sortDirt = 0;
        }
        //点击当前title
        if(sortBy === by){
            _sortBy = by;
            if(sortDirt === ''){
                _sortDirt = 0;
            }
            if(sortDirt === 0){
                _sortDirt = 1;
            }
            if(sortDirt === 1){
                _sortDirt = 0;
            }
        }
        
        this.setState({
            sortDirt: _sortDirt,
            sortBy: _sortBy
        }, ()=>{
            this.GetView360AssetIncome();
        })
    }

    renderChart_a() {
        let { asset, dataIndex } = this.state;
        let myChart_a = echarts.init(document.getElementById('funnelChartA'));
        let ColorArr = ['#fa7375', '#7bb1f9', '#ffd35a','#5a96e6', '#ffb900'];
        let _dataA = [], _dataB = [], _legend=[], i = 0;
        asset.map((item, index) => {
            _dataA[index] = {
                name: item.type1,
                value: item.asset,
                itemStyle: {}
            }
            _dataA[index].itemStyle.color = ColorArr[index];
            _legend.push(item.type1);

            //获取所有字类
            asset[index]['type2s'].map((item_b, index_b) => {
                _dataB.push({
                    name: item_b.type2,
                    value: item_b.asset,
                    itemStyle: {
                        color:ColorArr[i - 5*index]
                    }
                });
                i++;
            });
        });

        console.log(_legend, _dataB, _dataA)

        let option_a = {
            title: {
                text: '资产分布',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal'
                },
            },
            toolbox: {
                show: false
            },
            legend: {
                top: 'bottom',
                data: _legend
            },
            series: [
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['31.8%', '32%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{name: '', value: 1, selected:false, itemStyle: {borderColor: '#e6e6e6', borderWidth: 1, color: '#fff'}}]
                },
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['0', '19%'],
                    label: {
                        normal: {
                            show: false,
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
                            show: false
                        }
                    },
                    data: _dataB
                },
                {
                    name: '预期',
                    type: 'pie',
                    radius: ['36.5%', '50%'],
                    label: {
                        normal: {
                            position:'outside',
                            formatter: '{d}%\n{b}\n{c}万元'
                        }
                    },
                    labelLine: {
                        length: 20,
                        length2: 10
                    },
                    data: _dataA
                }
            ]
        };
        myChart_a.setOption(option_a);
        myChart_a.on("click", (param) => {
            // console.log(param)
            if(param.seriesIndex === 2) {
                _dataB = [];
                asset[param.dataIndex]['type2s'].map((item, index) => {
                    _dataB[index] = {
                        name: item.type2,
                        value: item.asset,
                        itemStyle: {}
                    }
                    _dataB[index].itemStyle.color = ColorArr[index];
                });
                option_a.series[1].data = _dataB;
                myChart_a.setOption(option_a);
            }
        });
    }

    renderChart_b() {
        let { ownership } = this.state;
        let myChart_b = echarts.init(document.getElementById('funnelChartB'));
        // console.log('----',ownership)
        let option_b = {
            title: {
                text: '近一年历史保有量',
                subtext: ownership.recent_year,
                left: 'left',
                top: 5,
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                },
                padding: [0, 0, 0, 20]
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: 100,
                left: '5%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {onZero: false},
                axisLabel: {
                    interval: 0,
                    rotate: 30
                },
                data: ownership.months
            },
            yAxis: {
                name: '单位:万元',
                type: 'value',
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            },
            series: [
                {
                    name:'',
                    type:'line',
                    stack: '总量',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#5a96e6'
                        }, {
                            offset: 1,
                            color: '#5a96e6'
                        }])
                    },
                    lineStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#5a96e6'
                        }, {
                            offset: 1,
                            color: '#5a96e6'
                        }])
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(123, 177, 249, 0.4)'
                        }, {
                            offset: 1,
                            color: 'rgba(123, 177, 249, 0.4)'
                        }])
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            color:'#5a96e6'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:ownership.values
                }
            ]
        };
        myChart_b.setOption(option_b)
    }

    renderChart_c() {
        let { incomeloss, selectedSegment } = this.state;
        let myChart_a = echarts.init(document.getElementById('funnelChartC'));
        let ColorArr = ['#fa7375', '#7bb1f9', '#ffd35a','#5a96e6', '#ffb900'];
        let _data = [], _dataX = [], _dataY_A = [], _dataY_B = [];
        let _rotate = 30, _fontSize=12;

        _data = incomeloss[recentMap[selectedSegment]];
        // console.log(_data)

        _data.map((item, index)=>{
            _dataX.push(item.product);
            if (item.type === "亏损") {
                _dataY_A.push(item.incomeloss);
                _dataY_B.push('-');
            } else {
                _dataY_A.push('-');
                _dataY_B.push(item.incomeloss);
            }
        });

        if(_dataX.length > 5 ) {
            _rotate = 60;
            _fontSize = 10;
        }

        let option_a = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : _dataX,
                    axisLabel: {
                        interval: 0,
                        rotate:_rotate,
                        show: true,
                        fontSize: _fontSize,
                        formatter:function(params) {
                            var newParamsName = "";
                            var paramsNameNumber = params.length;
                            var provideNumber = 5;  //一行显示几个字
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                            if (paramsNameNumber > provideNumber) {
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";
                                    var start = p * provideNumber;
                                    var end = start + provideNumber;
                                    if (p == rowNumber - 1) {
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;
                                }

                            } else {
                                newParamsName = params;
                            }
                            return newParamsName
                        },
                        textStyle: {
                            color: '#6861a6' //文字颜色
                        }

                    },
                }
            ],
            yAxis : [
                {
                    name: '单位:万元',
                    type : 'value',
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    }
                }
            ],
            series : [
                {
                    type:'bar',
                    barWidth: '60%',
                    stack: "总量",
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '亏损\n{c}'
                    },
                    itemStyle: {
                        normal: {
                            barBorderColor: '#7bb1f9',
                            color: '#7bb1f9'
                        }
                    },
                    data:_dataY_A
                },
                {
                    type:'bar',
                    barWidth: '60%',
                    stack: "总量",
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '盈利\n{c}'
                    },
                    itemStyle: {
                        normal: {
                            barBorderColor: '#fa7375',
                            color: '#fa7375'
                        }
                    },
                    data:_dataY_B
                }
            ]
        };
        myChart_a.setOption(option_a)
    }

    changeSegmented = (val) => {
        this.setState({
            selectedSegment: val
        }, ()=>{
            this.renderChart_c();
        })
    }

    render() {
        let { asset, type, selectedSegment, initPage, asset_income_info, sortBy, sortDirt, incomeloss } = this.state;

        return <div>

            {
                (asset.length == 0 && initPage) ?
                    (<div style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div>) :
                    (
                        <div>
                            <WhiteSpace size="lg" className="bg_f6"/>
                            <div id="funnelChartA" style={{height: '340px', margin: '.2rem 0'}}></div>

                            <WhiteSpace size="lg" className="bg_f6"/>
                            <WingBlank size="lg">
                                <WhiteSpace size="lg"/>
                                <div className="fs_16 mb_10">客户持有产品信息</div>

                                <div style={{ position: 'relative' }}>
                                    <div id="tableScrollA" style={{overflowX: 'scroll'}}>

                                        <div style={{position: 'absolute', top: 0, left: 0}}>
                                            <table style={{width: '1.3rem'}} className="custom_module_table">
                                                <thead>
                                                <tr>
                                                    <th style={{width: '1.31rem'}} className='table_column_1'>产品名称</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    asset_income_info.asset_incomes.map((item, index)=>{
                                                        return <tr key={index}>
                                                            <td
                                                                style={{backgroundColor: '#fff', color: '#0366d6'}}
                                                                onClick={()=>{
                                                                    this.context.router.push({
                                                                        pathname: '/JJListDetail',
                                                                        query: {
                                                                            id: item.id
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                { item.name }
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody>

                                                <thead>
                                                <tr>
                                                    <th>汇总</th>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>


                                        <table width="200%" className="custom_module_table">
                                            <thead>
                                            <tr>
                                                <th style={{width: '1.3rem'}} className='table_column_1 icon-jiangxuxu'>产品名称</th>
                                                <th>基金代码</th>
                                                <th>基金份额</th>
                                                <th onClick={()=>this.sortHandle(2)}>
                                                    市值(万元)
                                                    <div style={{display: 'inline-block'}} className="ml_5">
                                                        <span className={[
                                                            'iconfont',
                                                            'icon-jiangxuxu',
                                                            'fs_12',
                                                            sortBy ===2 && sortDirt === 1 && 'color_ui',].join(' ')}
                                                              style={{marginRight: '-6px'}}
                                                        ></span>
                                                        <span className={[
                                                            'iconfont',
                                                            'icon-shengxuxu',
                                                            'fs_12',
                                                            sortBy ===2 && sortDirt === 0 && 'color_ui',].join(' ')}
                                                        ></span>
                                                    </div>
                                                </th>
                                                <th onClick={()=>this.sortHandle(3)}>
                                                    盈亏(万元)
                                                    <div style={{display: 'inline-block'}} className="ml_5">
                                                        <span className={[
                                                            'iconfont',
                                                            'icon-jiangxuxu',
                                                            'fs_12',
                                                            sortBy ===3 && sortDirt === 1 && 'color_ui',].join(' ')}
                                                              style={{marginRight: '-6px'}}
                                                        ></span>
                                                        <span className={[
                                                            'iconfont',
                                                            'icon-shengxuxu',
                                                            'fs_12',
                                                            sortBy ===3 && sortDirt === 0 && 'color_ui',].join(' ')}
                                                        ></span>
                                                    </div>
                                                </th>
                                                <th>基金占比</th>
                                                <th>收益率</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                asset_income_info.asset_incomes.map((item, index)=>{
                                                    return <tr key={index}>
                                                        <td>{ item.name }</td>
                                                        <td>{ item.fundcode }</td>
                                                        <td>{ item.shares }</td>
                                                        <td>{ item.market_value }</td>
                                                        <td>{ item.incomeloss }</td>
                                                        <td>{ item.value_rate }</td>
                                                        <td>{ item.payback }</td>
                                                    </tr>
                                                })
                                            }
                                            </tbody>

                                            <thead>
                                            <tr>
                                                <th>汇总</th>
                                                <th></th>
                                                <th>{ asset_income_info.total_shares}</th>
                                                <th>{ asset_income_info.total_market_value}</th>
                                                <th>{ asset_income_info.total_incomeloss}</th>
                                                <th>{ asset_income_info.total_rate}</th>
                                                <th>{ asset_income_info.total_payback}</th>
                                            </tr>
                                            </thead>
                                        </table>

                                    </div>
                                </div>


                                <WhiteSpace size="lg"/>
                            </WingBlank>

                            {
                                type === "1" &&
                                <div>
                                    <WhiteSpace size="lg" className="bg_f6"/>
                                    <WingBlank>
                                        <WhiteSpace size="lg"/>
                                        <List>
                                            <Picker
                                                data={seasons}
                                                cols={1}
                                                onChange={this.changeSegmented}
                                                extra=" "
                                            >
                                                <List.Item>
                                                    <span className="fs_16">
                                                        { selectedSegment }
                                                    </span>
                                                    <div className="arrow-down ml_5"></div>
                                                </List.Item>
                                            </Picker>
                                        </List>


                                        <div id="funnelChartC" style={{height: '300px'}}></div>
                                        <WhiteSpace size="lg"/>
                                    </WingBlank>
                                </div>
                            }

                            <WhiteSpace size="lg" className="bg_f6"/>

                            <div id="funnelChartB" style={{height: '300px', margin: '.2rem 0'}}></div>
                        </div>
                    )
            }

        </div>
    }
}

export default PageA;

// <div className="am-segment" style={{height: "30px", width: "250px", margin: "30px auto 0"}}>
//     <div
//         className="am-segment-item"
//         style={selectedSegmentIndexC === 0 ? {color: "rgb(255, 255, 255)",  backgroundColor: "rgb(221, 175, 89)", borderColor: "rgb(221, 175, 89)"} : {color: "rgb(221, 175, 89)", backgroundColor: "transparent", borderColor: "rgb(221, 175, 89)"}}
//         onClick={()=>this.changeSegmentedC(0)}
//     >
//         近一个月盈亏
//     </div>
//     <div
//         className="am-segment-item"
//         style={selectedSegmentIndexC === 1 ? {color: "rgb(255, 255, 255)",  backgroundColor: "rgb(221, 175, 89)", borderColor: "rgb(221, 175, 89)"} : {color: "rgb(221, 175, 89)", backgroundColor: "transparent", borderColor: "rgb(221, 175, 89)"}}
//         onClick={()=>this.changeSegmentedC(1)}
//     >
//         近三个月盈亏
//     </div>
// </div>

// <SegmentedControl
//     selectedIndex={selectedSegmentIndexC}
//     values={ ["近一个月盈亏", "近三个月盈亏"] }
//     tintColor={'#DDAF59'}
//     style={{ height: '30px', width: '250px', margin: '30px auto 0' }}
//     onChange={this.changeSegmentedC}
// />