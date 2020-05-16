//三方拜访数据分析
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { WhiteSpace,Tabs,Flex } from 'antd-mobile';
import SelectBadge from '../widget/selectbadge';
import echarts from 'echarts'
import { format } from 'url';
import moment from 'moment';
import _ from 'lodash';

class TripartiteIpoAnalysis extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dateType: 0,  //0:每日，1：每周，2：每月
            data: {},
            sign: false,

            tabs:[], //tab选项卡名称  
            channelName:[], //三方平台名称
            channelNameSelected:'全部', //所选平台名称
            productid:'',   //所选产品id，
            partiesid:'',   //所选平台id，
            rangeTrend:[{title:'渠道排名'},{title:'竞品排名'},{title:'时点趋势'}],
            rangeTrendSelect:"渠道排名",// 0为渠道排名 1为竞品排名 2为时点趋势
            channelTable:[],    //渠道排名表格数据
            channelDetail:[],   //渠道排名柱状图数据
            IPOColumnChart:[],   //竞品排名柱状图数据
            IPOTableChart:[],   //竞品排名表格数据
            IPOLineChart:[],    //时点趋势折线图数据
            tabsIndex:'',       //tabs的索引
            tabsFundCode:'',    //tabs:对应的产品代码

            columeData:[],     //柱状图数据
            lineData:[],       //折线图数据
            tableData:[],      //表格数据

            lineDate: "",       //时点趋势选择时间

            sorted: [-1],        //如果为0则升序，1则降序,-1初始
            sortedIndex: 1,
        }
    }

    componentDidMount() {
        this.changeTilte('三方IPO实时录入分析');
        this.getTabsName();
        this.getChannelName();
    }

    componentDidUpdate() {
        this.renderChart();
    }
    //获取tab选项卡名称
    getTabsName(){
        this.request({
            api:'GetIPOAnalysisTabs'
        },res=>{
            let _tabs=[]
            res.data.map((item,index)=>{
                let mid={}
                mid.title = item.name,
                mid.id = item.ProductId,
                mid.fundcode = item.fundcode,
                _tabs.push(mid)
            })
            this.setState({
                tabs:_tabs,
                productid:_tabs[0].id,   //默认为第一选项卡
                tabsFundCode:this.props.location.query.fundcode || _tabs[0].fundcode  //默认的tab产品代码
            },()=>{
                let index = _.findIndex(this.state.tabs,(o)=>{
                    return o.fundcode === this.state.tabsFundCode
                })
                this.setState({
                    tabsIndex:index
                },()=>{
                    /* this.getIPOColumnChart();
                    this.getIPOLineChart();
                    this.getIPOTableChart(); */
                    this.getChannelDetail();
                    this.getChannelTable();
                })
            })
        })
    }
    //获取三方平台名称
    getChannelName(){
        this.request({
            api:'GetChannelName'
        },res=>{
            let _channelName = this.state.channelName;
            res.data.list.map((item,index)=>{
                _channelName.push(item);
            })
            this.setState({
                channelName:_channelName,
                channelNameSelected:_channelName[0].name,
                partiesid:_channelName[0].id
            },()=>{/* 
                this.getIPOColumnChart();
                this.getIPOLineChart();
                this.getIPOTableChart(); */
                this.getChannelDetail();
                this.getChannelTable();
            })
        })
    }

    //竞品排名柱状图数据, 需要和table联动
    getIPOColumnChart(){
        let { sorted } = this.state;
        let _sortDirt = 0;
        if(sorted[0] === 1) {
            _sortDirt = 0;
        }
        if(sorted[0] === 0) {
            _sortDirt = 1;
        }
        if(sorted[0] === -1) {
            _sortDirt = 1;
        }
        let _params = {
            productid:this.state.productid, //所选产品id
            partiesid:this.state.partiesid,  //所选平台id
            sortDirt: _sortDirt,  //0正序(小到大)  1倒叙
        };
        console.log(_params)

        this.request({
            api:'GetIPOColumnChart',
            params:_params
        },res=>{
            this.setState({
                IPOColumnChart:res.data
            })
        })
    }

    //竞品排名table数据
    getIPOTableChart(){
        let  _params = {
            productid: this.state.productid, //所选产品id
            partiesid: this.state.partiesid,  //所选平台id
            date: this.state.lineDate
        };
        // console.log(_params);
        this.request({
            api:'GetIPOTableChart',
            params: _params
        },res=>{
            this.setState({
                IPOTableChart:res.data
            })
        })
    }

    //时点趋势折线图数据
    getIPOLineChart() {
        this.request({
            api: 'GetIPOLineChart',
            params: {
                productid: this.state.productid, //所选产品id
                partiesid: this.state.partiesid  //所选平台id
            }
        }, res=>{
            this.setState({
                IPOLineChart:res.data
            })
        })
    }

    //获取渠道排名柱状图数据
    getChannelDetail(){
        this.request({
            api:'GetChannelDetail',
            params:{
                productid:this.state.productid //tabid
            }
        },res=>{
            this.setState({
                channelDetail:res.data,
                columeData : res.data
            })
        })
    }

    //获取渠道排名table数据
    getChannelTable(){
        this.request({
            api:'GetChannelTable',
            params:{
                productid:this.state.productid
            }
        },res=>{
            this.setState({
                channelTable:res.data
            })
        })
    }

    //柱状图/折线图渲染
    renderChart() {
        let { channelDetail, IPOColumnChart, IPOLineChart, rangeTrendSelect } = this.state;
        let chart = echarts.init(document.getElementById('chart'));
        let xData = [], preData = [], nextData = [];
        let option = {};
        rangeTrendSelect !== "时点趋势" && chart.clear();

        option.color = ['#7CB1F9', '#FF9193','#64D5FF','#FBD168','#FF8102', '#2B83F8'];
        option.tooltip = {trigger: 'axis'};
        option.legend = {};
        option.xAxis = {
            type: 'category',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#CCCCCC"
                }
            },
            axisLabel:{
                color: 'black',
                rotate: 0,
                interval: 0
            },
            data: []
        };
        option.yAxis = {
            type: 'value',
            name: '认购金额（单位：万元）',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#CCCCCC"
                }
            },
            nameTextStyle: {
                padding: [0, 0, 0, 70]
            },
        };
        option.series = [
            {
                data: [],
                type: rangeTrendSelect==="时点趋势"?'line':'bar',
                itemStyle: {
                    barBorderRadius: [2, 2, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top'
                },
                barWidth: '30%'
            }
        ];
        option.grid = {
            top: '10%',
            left: '10%',
            bottom: '15%'
        };

        if(rangeTrendSelect === "渠道排名") {
            channelDetail.map((item, index)=> {
                preData.push(item.VALUE);
                xData.push(this.ellipsis(item.NAME, 9));
            });
            option.xAxis.data = xData;
            option.xAxis.axisLabel = {rotate: 35, interval: "auto"};
            option.grid = {left:'10%', top: '15%', height: 'auto'};
            option.series[0].data = preData;
            option.series.length = 1;
        }
        if(rangeTrendSelect === "竞品排名"){
            console.log(xData)
            IPOColumnChart.map((item, index)=>{
                preData.push(item.Amount);
                xData.push(this.ellipsis(item.CompanyName, 9));
            });
            option.xAxis.data = xData;
            option.xAxis.axisLabel = {rotate: 25, interval: "auto"};
            option.grid = {left:'10%', top: '15%', bottom: '25%', height: 'auto'};
            option.series[0].data = preData;
            option.series.length = 1;
        }
        if(rangeTrendSelect==="时点趋势") {
            IPOLineChart.map((item_a, index_a)=>{
                preData[index_a] = [];
                nextData.push(item_a.name);
                item_a.value.map((item_b, index_b)=>{
                    preData[index_a].push(item_b.Amount);
                })
            });
            IPOLineChart[0] && IPOLineChart[0].value.map((item, index)=>{
                let _time = item.time.replace(/-/g, '/')
                xData.push(moment(_time+":00:00").format('MM/DD')+ '\n'+ moment(_time+":00:00").format('HH')+'点');
            });
            option.legend.type = 'scroll';
            option.legend.data = nextData;
            option.legend.bottom = 0;
            option.xAxis.data = xData;
            option.xAxis.axisLabel = {rotate: 0, interval: 1};
            option.xAxis. boundaryGap = false;
            option.grid = {left:'10%',bottom: '25%', top: '5%', height: 'auto'};
            option.series[0].data = preData[0];
            option.series[0].label.show = false;
            option.series[0].name = nextData[0];
            preData.map((item_c, index_c) => {
                (index_c > 0) && (option.series[index_c] = {
                    name: nextData[index_c],
                    data: preData[index_c],
                    type: rangeTrendSelect==="时点趋势"?'line':'bar',
                    itemStyle: {
                        barBorderRadius: [2, 2, 0, 0]
                    },
                    label: {
                        show: false,
                        position: 'top'
                    },
                    barWidth: '30%'
                });
            })
        }

        chart.setOption(option);
        if(rangeTrendSelect === "时点趋势") {
            chart.off("click");
            chart.on("click", (param) => {
                let _time = IPOLineChart[0]["value"][param.dataIndex].time.replace(/-/g, '/');  //去第一组数组指定位置时间
                this.setState({
                    lineDate: moment(_time + ":00:00").format("YYYY-MM-DD HH:mm")
                })
                this.getIPOTableChart();
            });
        }


    }

    //柱状图/折线图数据设置
    setData(){
        if (this.state.channelNameSelected === "全部") {
            this.getIPOLineChart();
            this.getChannelDetail();
            this.getChannelTable();
        } else {
            this.getIPOColumnChart();
            this.getIPOLineChart();
            this.getIPOTableChart();
        }
    }

    //tab切换
    tabsChange = (tab, index) => {
        this.setState({
            productid:tab.id
        },()=>{
            this.setData()
        })
    }
    //三方平台切换
    changeChannelName(tab){
        // console.log(tab)
        this.setState({
            partiesid: tab.id,
            channelNameSelected: tab.name,
            rangeTrendSelect: tab.name ==="全部" ? "渠道排名" : "竞品排名",
            lineDate: "",
        }, () => {
            this.setData()
        })
    }
    //排名趋势切换
    changeRangeName(title){
        this.setState({
            rangeTrendSelect: title,
            lineDate: "",
        },()=>{
            this.getIPOColumnChart();
            this.getIPOLineChart();
            this.getIPOTableChart();
            this.getChannelDetail();
            this.getChannelTable();
        })
    }

    handleSort(val) {
        let _sorted = this.deepClone(this.state.sorted);
        this.setState((preState)=>{
            if(preState.sorted[val] === -1) {
                _sorted=[-1, -1, -1, -1, -1, -1]
                _sorted[val] = 1;
                return {
                    sorted: _sorted,
                    sortedIndex: val
                }
            }
            if(preState.sorted[val] === 1) {
                _sorted[val] = 0;
                return {
                    sorted: _sorted,
                    sortedIndex: val
                }
            }
            if(preState.sorted[val] === 0) {
                _sorted[val] = -1;
                return {
                    sorted: _sorted,
                    sortedIndex: val
                }
            }
        }, ()=>{
            //"竞品排名"中表格排序需要柱状图联动排序
            if(this.state.rangeTrendSelect === "竞品排名"){
                this.getIPOColumnChart()
            }
        });
    }

    render() {
        let { data,channelName,rangeTrend,productid,partiesid,rangeTrendSelect,channelTable,IPOTableChart,channelNameSelected, sorted, sortedIndex } = this.state;
        let _data, _key;
        if(channelNameSelected !== '全部'){
            rangeTrend= [{ title: '竞品排名' }, { title: '时点趋势' }]
        }

        //两组数据参与排序字段不一样
        if(rangeTrendSelect === "渠道排名") {
            _data=channelTable;
            _key="VALUE"
        } else {
            _data=IPOTableChart;
            _key="Amount"
        }
        if(sorted[sortedIndex] === 0) {
            _data = _data.sort((a, b)=> b[_key] - a[_key])
        }
        if(sorted[sortedIndex] === 1) {
            _data = _data.sort((a, b)=> a[_key] -b[_key])
        }


        return (
            <div className="N_levelAnalyze">
                <WhiteSpace size='md' className="bg_f6" />
                <div className="J_auto_tabs">
                    <Tabs
                        tabs={this.state.tabs}
                        onChange={(tab, index) => this.tabsChange(tab, index)}
                        renderTabBar={props => <Tabs.DefaultTabBar  {...props} page={1.8} />}
                    />
                </div>


                <div className="select_tools" style={{marginTop: '.1rem', marginBottom: '.1rem'}}>
                    <div className="row">
                        <div className="label" style={{ paddingLeft: '5px' }}>
                            三方平台:
                    </div>
                        <div style={{ overflowX: 'auto', lineHieght: '26px' }}>
                            <div className="list">
                                {
                                    channelName.map((item, index) => {
                                        return <div
                                            key={index}
                                            className={partiesid === item.id ? "selected border_color_ui color_ui" : 'color666'}
                                            onClick={() => { this.changeChannelName(item) }}
                                        >{item.name}</div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label" style={{paddingLeft:'5px'}}>
                            排名趋势:
                    </div>
                        <div style={{ overflowX: 'auto', lineHieght: '26px' }}>
                            
                            <div className="list">
                                {
                                    rangeTrend.map((item, index) => {
                                        return <div
                                            key={index}
                                            className={rangeTrendSelect === item.title ? "selected border_color_ui color_ui" : 'color666'}
                                            onClick={() => { this.changeRangeName(item.title) }}
                                        >{item.title}</div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                </div>
                    
                <div style={{ position: 'relative' }}>
                    <div id="chart" style={{ height: '280px',marginLeft:'.15rem' }}></div>
                    <WhiteSpace style={{height: '10px'}} />
                </div>

                <WhiteSpace style={{height: '10px'}} className="bg_f6" />
                <WhiteSpace style={{height: '12px'}} size='md' />
                
                <div className="module_title_a" style={{marginBottom:'12px'}}>
                    {channelNameSelected==='全部'? (rangeTrendSelect==="渠道排名"?'渠道认购明细表':'竞品排名明细表'):channelNameSelected+'竞品排名明细表'}
                </div>
                <div className='qunatityTable kehumanagerdetail' style={{ position: 'relative' }}>
                    <div style={{ overflowX: 'scroll' }}>
                        <table className="custom_module_table" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>
                                        {rangeTrendSelect==="渠道排名"?'渠道':'公司'}名称
                                    </th>
                                    {
                                        rangeTrendSelect!=="渠道排名" && <th>竞品名称</th>
                                    }
                                    <th className={sorted[0] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(0)}>
                                        累计认购金额(万元)
                                        <sapn
                                            className={sorted[0] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[0] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                            style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {_data && _data.map((item, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            {rangeTrendSelect === "渠道排名" ? item.NAME : item.CompetitorName}
                                        </td>
                                            {rangeTrendSelect !== "渠道排名" && <td>{item.CompetitorProductName}</td> }
                                        <td>
                                            {
                                                rangeTrendSelect === "渠道排名" ?
                                                this.fmoney(item.VALUE) : this.fmoney(item.Amount)
                                            }
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <WhiteSpace style={{height: '10px'}} />
            </div>
        )
    }

}
export default TripartiteIpoAnalysis;