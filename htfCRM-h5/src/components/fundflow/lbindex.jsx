import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Tabs, WhiteSpace, List } from 'antd-mobile';
import Zijin from './chara';
import QuantityChart from './chartb';
import SelectBadge from './selectBadge';
import LossBack from './lossback';
import TableA from './custtable';
const Item = List.Item;
//资金流向页面
class FundFlow extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabValue: 0,
            roleType: 4,                  //使用者权限0:客户经理，1.团队主管, 2.副总经理,3,系统管理员, 4,其他
            period: 2,     //0近30天，1近90天
            team: "高净值",               //0自有，1三方
            managerList: [],
            managerID: " ",
            userType: 1,          //客户类型  
            chartData1: {},              //资金流向
            chartData2: {},                  //总保有量
            chartData3: {},                     //流失挽回
            tableData: [],                         //表格数据
            teamList: [],
            selectedDate: "",                     //流失挽回图中选中的日期
        }

    }
    componentDidMount() {
        this.changeTilte('客户流失挽回统计');
        this.getRoleType();
        this.getManagerList();
    }
    getRoleType() {
        this.request({
            api: 'GetUserNameRole'
        }, (res) => {
            let roleType = res.data[0].roleType, team = res.data[0].teamName, teamList = [];
            if(roleType == 2 || roleType == 3){
                teamList = ['高净值'],
                team = '高净值'
            }else if(roleType == 0 || roleType == 1){
                teamList = ["高净值"];
            }
            console.log(roleType);
            this.setState({
                teamList,
            })
        })
    }
    getManagerList() {
        this.request({
            api: 'GetUserNameMoney',
        }, (res) => {
            let list = res.data.list || [];
            list.sort((a, b) => {
                return -a.name.localeCompare(b.name, "zh");
            }
            );
            let nocust = list.findIndex((item)=> item.name.indexOf('无管户')>=0);
            nocust = list.splice(nocust, 1);
            let managerID = nocust[0].id;
            list = nocust.concat(list);
            this.setState({
                managerList: list,
                managerID,
            }, this.getCharData)
        })
    }
    selectJL(val) {
        this.setState({ managerID: val }, this.getCharData);
    }
    selectKH(val) {
        this.setState({ userType: val });
    }
    getCharData() {
        //请求图数据
        let mId = this.state.managerID;
        if (mId == ' ') {
            mId = '';
            let mlist = this.state.managerList;
            for (let i = 0; i < mlist.length; i++) {
                mId += mlist[i].id;
            }
        }
        if (this.state.tabValue === 1) {   //资金流向
            
            // this.request({
            //     api: 'GetFundFlow',
            //     params: {
            //         userId: mId,
            //         type: this.state.period + 1,
            //         userType: 2
            //     }
            // }, (res) => {
            //     this.setState({
            //         chartData1: res.data.data
            //     })
            // });
            // this.request({
            //     api: "GetTotalQuantity",
            //     params: {
            //         userId: mId,
            //         type: this.state.period
            //     }
            // }, (res)=>{
            //     this.setState({
            //         chartData2: res.data
            //     })
            // });
        }else{
            this.request({                 //获取流失挽回数据
                api:'GetLossBack',
                params:{
                    managerId: mId,
                    period: this.state.period,
                }
            }, (res) => {
                this.setState({
                    chartData3: res.data,
                    selectedDate: res.data.dates[0]
                })
            });
            this.getTableData();
            
        }
    }
    getTableData = () => {
        // 获取表格数据
        // this.request({
        //     api:'GetLossBackTable',
        //     params: {
        //         date: this.state.selectedDate
        //     }
        // }, (res) => {
        //     this.setState({ tableData: res.data});
        // });
    }
    chartClick = (params) => {
        //处理柱状图点击
        // this.setState({
        //     selectedDate: params.name
        // }, this.getTableData)
    }
    render() {
        let state = this.state;
        return <div className='fundFlow N_levelAnalyze'>
            <Tabs tabs={[
                { title: "流失挽回", value: 0 },
            //  { title: "资金流向", value: 1 }, 
            ]} onChange={(tab) => {
                this.setState({
                    tabValue: tab.value
                }, this.getCharData)
            }} initialPage={this.state.tabValue} />
            <WhiteSpace size='lg' className='bg_f6' />
            <SelectBadge options={["近30天", "近90天", "近半年", "近一年", "近两年"]} selected={this.state.period} onChange={(title, index) => {
                this.setState({
                    period: index
                }, this.getCharData)
            }} />
            <div className="select_tools">
                <div className="row">
                    <div className="label">
                        团队:
                    </div>
                    <div className="list">{
                        state.teamList.map((team) => {
                            return (<div key={team}
                                className={state.team == team ? "selected border_color_ui color_ui" : 'color666'}
                                 onClick={()=> {this.setState({
                                     team,
                                 })}}>
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
                            {/* <div

                                className={state.managerID === " " ? "selected border_color_ui color_ui" : 'color666'}
                                onClick={() => this.selectJL(" ")}
                            >全部</div> */}
                            {
                                state.managerList.map((item, index) => {
                                    return <div
                                        key={index}
                                        className={state.managerID === item.id ? "selected border_color_ui color_ui" : 'color666'}
                                        onClick={() => this.selectJL(item.id)}
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
                        {/* <div
                            className={state.userType === 0 ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={() => this.selectKH(0)}>
                            全部
                        </div> */}
                        <div
                            className={state.userType === 1 ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={() => this.selectKH(1)}>
                            个人
                        </div>
                        {/* <div
                            className={state.userType === 2 ? "selected border_color_ui color_ui " : 'color666 '}
                            onClick={() => this.selectKH(2)}>
                            机构
                        </div> */}
                    </div>
                </div>
            </div>
            {
                // this.state.tabValue === 1 && <div><Zijin data={state.chartData1} />
                // <WhiteSpace size='lg' className="bg_f6"/>
                // <QuantityChart data={state.chartData2} />
                // </div> 
            }
            {
                this.state.tabValue === 0 && <div><LossBack data={state.chartData3} chartClick={this.chartClick}/>
                <div className="kehumanagerdetail">
            {/* <Item style={{marginLeft: '15px'}}><span className="sideBadge"> </span> 流失挽回客户详情({this.state.selectedDate})</Item> */}
            </div>
            {/* <TableA data={this.state.tableData} /> */}
                </div>
            }
            
        </div>
    }
}
export default FundFlow;