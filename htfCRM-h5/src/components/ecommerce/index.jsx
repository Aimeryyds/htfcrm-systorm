import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import SelectBadge from '../widget/selectbadge';
import { List, DatePicker, WhiteSpace } from 'antd-mobile';
import TranslationBlock from './translationblock';
import echarts from 'echarts';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

class ECommerce extends Module{
    constructor(props, context) {
        super(props, context);
        this.state = {
            dealType: 1,   //1申购   2赎回

            TypeSeries: [],             //产品小类

            PurchaseCapital: [],        //申购金额
            RedemptionShares: [],       //赎回份额
            PurchaseCount: [],          //申购笔数
            RedemptionCount: [],        //赎回笔数

            DataDt: moment(new Date()).format('YYYY-MM-DD'),                 //数据日期

            tableData: [],          //分类明细数据

            team: "高净值",        //当前团队
            type: 1,          //客户类型 0是机构，1是个人，2是所有
            managerID: '',      //客户经理
            teamList: [],       //团队数据
            managerList: [],    //客户经理数据
            total: [],
            managerName: '',

            sorted: [-1, -1, -1]

        }
    }

    /**
     * tab切换
     * @param opt
     * @param index
     */
    changeDealType = (opt, index) => {
        this.setState({
            dealType: index+1
        }, ()=>{
            this.getData();
        })
    }

    componentDidMount(){
        document.title = '电商实时申赎交易表';
        document.documentElement.style.backgroundColor='white';

        /**
         * 过了15点 展示为明天
         */
        if(moment(new Date()).format('HH') > 15) {
            this.setState({
                DataDt: moment().add(1, 'days').format('YYYY-MM-DD')
            })
        }

        this.getUserNameRole();

    }

    componentWillUnmount(){
        document.documentElement.style.backgroundColor = '#f6f6f6';
    }

    componentDidUpdate(){
        this.renderChart();
    }

    /**
     * 团队数据
     * @constructor
     */
    getUserNameRole() {
        this.request({                          //先请求当前权限
            api: "GetUserNameRole",              //id在cookie中取
        }, (res) => {
            let roleType = res.data[0].roleType, teamName = res.data[0].teamName, teamList;
            if(roleType == 2 ||  roleType ==3){
                teamList = ['高净值']
            }else if(roleType == 0 || roleType == 1){
                teamList = ["高净值"];
            }else{
                teamList = ["高净值"];
            }
            this.setState({
                teamList,
            });
            this.getManagerList();
        });
    }

    /**
     * 客户经理数据
     */
    getManagerList() {
        //客户经理列表, 列表变动后其他数据都得变
        this.request({
            api: "PurchaseRedemptionGetUserName",
        }, (res) => {
            console.log('--客户经理数据 出参--',res);
            let list = res.data.list || [];
            list.sort((a, b) => {
                    return -a.name.localeCompare(b.name, "zh");
                }
            );
            let _i = list.findIndex((item)=> item.name.indexOf('无管户')>=0);
            let nocust = list.splice(_i, 1);
            list = nocust.concat(list);

            let _b = list.findIndex((item)=> item.name.indexOf('全部')>=0);
            nocust = list.splice(_b, 1);
            list = nocust.concat(list);

            let managerID = nocust[0].id;
            this.setState({
                managerList: list,
                managerID,
                managerName: nocust[0].name
            }, () => {
                this.getData()
            })
        })
    }

    /**
     * 表单数据
     */
    getData(){
        let _searchType;

        /**
         * 客户经理 全部 = 1
         * 客户经理 个人 = 0
         * 客户经理 无管户 = 2
         */
        console.log(this.state.managerName, 'managerName---')
        switch (this.state.managerName) {
            case "全部":
                _searchType = 1;
                break;
            case "无管户":
                _searchType = 2;
                break;
            default:
                _searchType = 0;
        }

        let _params = {
            userId: this.state.managerID,
            type: this.state.type,              //客户类型
            dataTime: this.state.DataDt,              //数据时间
            selectType: this.state.dealType,        //1申购   2赎回
            searchType: _searchType
        };

        console.log('--表单数据 入参--', _params);
        //获取数据
        this.request({
            api:'PurchaseRedemption',
            params: _params
        }, (res) => {
            console.log('--表单数据 出参--',res);
            let data = res.data.data;
            let tableData = [];
            data.TypeSeries.map((item, index) => {
                tableData.push({
                    name: item,
                    val0: data.PurchaseCapital[index],
                    val1: data.RedemptionShares[index],
                    val2: this.state.dealType === 1 ? data.PurchaseCount[index] : data.RedemptionCount[index]
                })
            })

            this.setState({
                TypeSeries: data.TypeSeries,             //产品小类
                PurchaseCapital: data.PurchaseCapital,        //申购金额
                RedemptionShares: data.RedemptionShares,       //赎回份额
                PurchaseCount: data.PurchaseCount,          //申购笔数
                RedemptionCount: data.RedemptionCount,        //赎回笔数
                tableData: tableData,
                total: data.total
            })
        });
    }

    selectJL(val, name) {
        this.setState({ managerID: val, managerName: name }, ()=>this.getData());
    }

    selectTeam(val) {
        this.setState({ team: val }, ()=>this.getData());
    }

    /**
     * 客户类型选择
     * @param val
     */
    selectKH(val) {
        this.setState({ type: val }, ()=>this.getData());
    }

    jumpDetail(TypeSeriesName) {
        this.context.router.push({
            pathname: '/ECommerceDetail',
            query: {
                userId: this.state.managerID,
                type: this.state.type,              //客户类型
                dataTime: this.state.DataDt,              //数据时间
                selectType: this.state.dealType,        //1申购   2赎回
                detailType: TypeSeriesName,
                managerName: this.state.managerName
            }
        })
    }

    /**
     * 排序
     * @param val
     */
    handleSort(index) {

        let { tableData, sorted } = this.state;
        // console.log(index, TypeSeries);
        let _tableData = this.deepClone(tableData),
            _sorted = this.deepClone(sorted);

        if(sorted[index] === -1) {
            _tableData = _tableData.sort((a,b) => b['val' + index] - a['val' + index] );
            _sorted = [-1, -1, -1];
            _sorted[index] = 1
        }
        if(sorted[index] === 1) {
            _tableData = _tableData.sort((a,b) => a['val' + index] - b['val' + index] );
            _sorted[index] = 0
        }
        if(sorted[index] === 0) {
            _sorted[index] = -1
        }

        this.setState({
            tableData: _tableData,
            sorted: _sorted
        })

    }


    renderChart(){
        /**
         * 申购展示金额及笔数
         * 赎回展示份额及笔数
         * @type {*|Function}
         */
        let charts = echarts.init(document.getElementById('myChart'));
        let { TypeSeries, PurchaseCapital, RedemptionShares, PurchaseCount, RedemptionCount, dealType } = this.state;
        let _index = TypeSeries.indexOf('货币');      //图中不显示"货币信息"
        let barDataA, barDataB, barDataAName, unit;
        charts.clear();

        if(dealType === 1) {
            //1申购
            barDataA = PurchaseCapital;
            barDataB = PurchaseCount;
            barDataAName="金额";
            unit = '万元';
        }

        if(dealType === 2) {
            //2赎回
            barDataA = RedemptionShares;
            barDataB = RedemptionCount;
            barDataAName="份额";
            unit = '万份';
        }

        let option = {
            color:['#7CB1F9', '#FA7375'],
            legend: {
                data: [barDataAName, '笔数'],
                bottom: 10
            },
            xAxis:[
                {
                    type:'category',
                    data: TypeSeries.filter((item,index)=>index!==_index),
                    axisLabel:{
                        interval: 0
                    }
                }
            ],
            tooltip:{
                trigger:'axis'
            },

            dataZoom:{
                type: 'inside',
                startValue: 0,
                endValue: 3,
                filterMode:'empty'
            },
            grid:{
                left: '15%',
                right: '15%'
            },
            yAxis:[
                {
                    type:'value',
                    name: barDataAName+'(单位: '+ unit +')',
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
                    name:'笔数（单位：笔）',
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

                }
            ],
            series:[
                {
                    type: 'bar',
                    data: barDataA.filter((item,index)=>index!==_index),
                    name: barDataAName,
                    yAxisIndex: 0
                },
                {
                    type: 'bar',
                    data: barDataB.filter((item,index)=>index!==_index),
                    name: '笔数',
                    yAxisIndex: 1,
                    lineStyle:{
                        color: '#FF8100'
                    },
                    barGap: 0,
                }
            ]


        };
        charts.setOption(option);
    }

    render(){
        let { dealType, DataDt, sorted } = this.state;
        let translations = [{title:'统计时间:', content: '前一天15:00至当日数据时间'}];
        if(dealType == 2){
            translations.push({title:'赎回类型:', content: '强制赎回、赎回、赎回现金宝、现金宝强行赎回、质押赎回还款、单次预约取现、定期预约取现、除了现金宝以外的快取现、快速取现、普通取现'});
        }else{
            translations.push({
                title:'申购类型:',
                content: '保底自动充值、充值、定期不定额充值、定投申购、基金转换、认购、申购、现金宝定期不定额申购、现金宝定投申购、现金宝认购、现金宝申购、自动充值'
            });
        }

        return <div className="ecommerce N_levelAnalyze">
            <WhiteSpace style={{height: '10px'}} className='bg_f6' />

            <WhiteSpace style={{height: '5px'}}/>
            <SelectBadge
                options={['申购', '赎回']}
                selected={dealType-1}
                onChange={this.changeDealType}
                style={{paddingTop: '15px'}}
            />

            <div className="select_tools" style={{marginTop: '5px', marginBottom: '10px'}}>
                <div className="row N_select_tools-Picker">
                    <div className="label">
                        数据时间:
                    </div>
                    <DatePicker
                        mode='date'
                        title="数据时间"
                        value={ new Date( DataDt ) }
                        minDate={ new Date(moment().subtract(10, 'days').format('YYYY-MM-DD')) }
                        maxDate={ new Date() }
                        onChange={date => this.setState({ DataDt: moment(date).format('YYYY-MM-DD') }, ()=>this.getData())}
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </DatePicker>
                </div>

                <div className="row">
                    <div className="label">
                        团队:
                    </div>
                    <div className="list">
                        {
                            this.state.teamList.map((team) => {
                                return (
                                    <div
                                        key={team}
                                        className={this.state.team == team ? "selected border_color_ui color_ui" : 'color666'}
                                        onClick={() => this.selectTeam(team)}
                                        style={{marginRight: '10px'}}
                                    >
                                        {team}
                                    </div>)
                            })
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        客户经理:
                    </div>
                    <div style={{ overflowX: 'auto', lineHieght: '26px' }}>
                        <div className="list">

                            {
                                this.state.managerList.map((item, index) => {
                                    return <div
                                        key={index}
                                        className={this.state.managerID === item.id ? "selected border_color_ui color_ui" : 'color999'}
                                        onClick={() => this.selectJL(item.id, item.name)}
                                        style={{marginRight: '10px'}}
                                    >{item.name}</div>
                                })
                            }

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        客户类型:
                    </div>
                    <div className="list">
                        <div
                            className={this.state.type === 1 ? "selected border_color_ui color_ui" : 'color999'}
                            onClick={() => this.selectKH(1)}
                            style={{marginRight: '10px'}}
                        >
                            个人
                        </div>
                        <div
                            className={this.state.type === 0 ? "selected border_color_ui color_ui" : 'color999'}
                            onClick={() => this.selectKH(0)}>
                            企业
                        </div>
                    </div>
                </div>

            </div>

            <WhiteSpace style={{height: '10px'}} className='bg_f6' />

            <div id='myChart' style={{height: '300px'}}></div>

            <WhiteSpace style={{height: '10px'}} className='bg_f6' />

            <div className='qunatityTable kehumanagerdetail'>
                <WhiteSpace size='lg' />
                <div className="module_title_a">分类明细</div>
                <div style={{overflowX: 'scroll'}}>
                    <table className="cust_table" style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th style={{width: '60px'}}></th>
                            <th className={sorted[0] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(0)}>
                                <div className="ta_r" style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
                                    申购金额(万元)
                                    {
                                        sorted[0] === -1? <img style={{height:'14px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[0] === 0 ?<img style={{height:'14px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'14px'}} src={require('../../resources/images/default_down.png')} alt=""/>)
                                    }
                                    {/*<span
                                        className={sorted[0] === -1 ? "iconfont1 iconpaixumoren" :
                                            (sorted[0] === 0 ? 'iconfont1 ui_color iconpaixumorenshang' : 'iconfont1 ui_color iconpaixumorenxia')}
                                        style={{fontSize: '10px'}}
                                    />*/}
                                </div>
                            </th>
                            <th style={{width: '90px'}} className={sorted[1] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(1)}>
                                <div className="ta_r" style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
                                    赎回份额
                                    {
                                        sorted[1] === -1? <img style={{height:'14px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[1] === 0 ?<img style={{height:'14px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'14px'}} src={require('../../resources/images/default_down.png')} alt=""/>)
                                    }
                                </div>
                            </th>

                            <th  style={{width: '100px'}} className={sorted[2] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(2)}>
                                <div className="ta_r" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    {dealType === 1 ? '申购笔数' : '赎回笔数'}
                                    {
                                        sorted[2] === -1? <img style={{height:'12px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[2] === 0 ?<img style={{height:'12px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'12px'}}src={require('../../resources/images/default_down.png')} alt=""/>)
                                    }
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tableData.map((item, index)=>{
                                return (
                                    <tr key={ index }>
                                        <td>
                                            <div onClick={()=>this.jumpDetail(item.name)} className="ui_color">
                                                { item.name }
                                            </div>

                                        </td>
                                        <td>
                                            <div className="ta_r">
                                                { item.val0 }
                                            </div>

                                        </td>
                                        <td>
                                            <div className="ta_r">
                                                { item.val1 }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ta_r">
                                                { item.val2 }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <td>
                                总计
                            </td>
                            <td>
                                <div className="ta_r">
                                    { this.state.total[0] }
                                </div>
                            </td>
                            <td>
                                <div className="ta_r">
                                    { this.state.total[1] }
                                </div>
                            </td>
                            <td>
                                <div className="ta_r">
                                    { this.state.total[2] }
                                </div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <WhiteSpace size='lg' />

            <TranslationBlock items={translations}/>


        </div>

    }
}
export default ECommerce;