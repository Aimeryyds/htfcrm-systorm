import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';

import { Tabs, WhiteSpace, } from 'antd-mobile';

import ChartsA from './charts_a'
import ChartsB from './charts_b'
import ChartsC from './charts_c'
import ChartsD from './charts_d'
import ChartsE from './charts_E'
import ChartsF from './charts_f'
import TableA from './table_a'

class LevelAnalyze extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            managerList: [],            //客户经理数据
            managerID: '',              //选中的客户经理
            selectedSegmentIndex: 2,    //顶部时间区间
            chartsListA: null,          //趋势图
            chartsListB: null,          //各个会员趋势详情图
            chartsListC: null,          //客户等级人数-趋势(折线)
            chartsListD: null,          //客户等级保有量-趋势(bar)
            chartsListE: null,          //客户等级保有量-趋势(折线)
            chartsListF: null,          //保有量图4
            tableList: [],              //各个会员趋势详情-表单
            totalList: null,            //各个会员趋势详情-表单汇总

            selectedTD: '',           //团队
            userType: 1,             //客户类型永远是个人客户
            chartsType: 0,              //0:分布, 1:趋势

            level: '战略',                //选取的客户等级
            detailType: 0,                      //0-5,上月存量，调入，调出，升级，流失，降级，当前存量
            tableSearchVal: '',
            tabValue: 0,                  //tab值
            roleType: -1,                  //使用者权限0:客户经理，1.团队主管, 2.副总经理,3,系统管理员, 4,其他，-1默认
        }

    }

    componentDidMount() {
        this.changeTilte("客户等级分析");
        // let reqList = ['GetUserName', 'CustomerLevelReport', 'getLevelNumbers', 'GetBarList', 'CustomerStockReport'];
        // // let reqList = ['CustomerStockReport'];
        // let paramsList = [
        //     { selectedTD: this.state.selectedTD },
        //     {
        //         selectedTD: this.state.selectedTD,      //团队
        //         managerID: this.state.managerID,        //客户经理id
        //         userType: this.state.userType,          //客户类型
        //         selectedSegmentIndex: this.state.selectedSegmentIndex,      //时间区域
        //     },
        //     {
        //         selectedTD: this.state.selectedTD,      //团队
        //         managerID: this.state.managerID,        //客户经理id
        //         userType: this.state.userType,          //客户类型
        //         selectedSegmentIndex: this.state.selectedSegmentIndex,      //时间区域
        //     },
        //     {
        //         selectedTD: this.state.selectedTD,      //团队
        //         managerID: this.state.managerID,        //客户经理id
        //         userType: this.state.userType,          //客户类型
        //         selectedSegmentIndex: this.state.selectedSegmentIndex,      //时间区域
        //         level: this.state.level
        //     },
        //     {
        //         selectedTD: this.state.selectedTD,      //团队
        //         managerID: this.state.managerID,        //客户经理id
        //         userType: this.state.userType,          //客户类型
        //         selectedSegmentIndex: this.state.selectedSegmentIndex,      //时间区域
        //         level: this.state.level,
        //         detailType: this.state.detailType,
        //         tableSearchVal: this.state.tableSearchVal
        //     }

        // ]
        // let reqListFn = [];
        // reqListFn.push(
        //     ...reqList.map((apiName, index) => this.requestPromise({//获取各下拉菜单信息
        //         api: apiName,
        //         params: paramsList[index]
        //     }))
        // );
        // Promise.all(reqListFn).then((res) => {
        //     this.setState({
        //         managerList: res[0].data.list,
        //         managerID: res[0].data.list[0] ? res[0].data.list[0].id : "",
        //         chartsListA: res[1].data,
        //         chartsListC: res[2].data,
        //         chartsListB: res[3].data.barList,
        //         tableList: res[4].data.Rows,
        //         totalList: res[4].data.total[0] || {},
        //     }, ()=>{
        //         this.getCustomerLevelReport();
        //         this.getLevelNumber();
        //         this.getBarList();
        //         this.getCustomerStockReport();
        //     })
        // });

        //现在客户经理没有全部一栏了，所有得先请求到客户经理，才能请求其他数据
        this.request({                          //先请求当前权限
            api: "GetUserNameRole",              //id在cookie中取
        }, (res) => {
            let roleType = res.data[0].roleType, teamName = res.data[0].teamName;
            this.setState({
                roleType,
                selectedTD: teamName
            });
            this.requestPromise({
                api: "GetUserName",
            }).then((res) => {
                let list = res.data.list;
                list.sort((a, b) => {
                    return -a.name.localeCompare(b.name, "zh");
                }
                );
                this.setState({
                    managerList: list,
                    managerID: " "
                }, ()=>{
                    // this.getCustomerLevelReport();
                    this.getLevelNumber();
                    this.getBarList();
                    this.getCustomerStockReport();
                })
            })
        });
       
    }
	/**
     *  获取客户经理
     */
    getUserName() {
        this.request({
            api: 'GetUserName',
        }, (res) => {
            this.setState({
                managerList: res.data.list,
                managerID:  " "
            })
        })
    }

    /**
     * 客户等级人数-分布(柱状)
     * @returns {*}
     */
    // getCustomerLevelReport() {
    //     let managerId = this.state.managerID, list = this.state.managerList, userId;
    //     if(list.length <= 0)
    //         userId = "";
    //     if(managerId === " "){
    //         userId = list[0].id;
    //         for(let i = 1; i < list.length; i++){
    //             userId += "," + list[i].id;
    //         }
                
    //     }else{
    //         userId = managerId;
    //     }
    //     this.request({
    //         api: 'CustomerLevelReport',
    //         params: {
    //             rankType: this.state.tabValue,      //tab
    //             userId,                             //客户经理id
    //             custType: this.state.userType,          //客户类型
    //             type: this.state.selectedSegmentIndex,      //时间区域
    //             iscustowin: 0,
    //         }
    //     }, (res) => {
    //         this.setState({
    //             chartsListA: res.data
    //         });
    //         this.request({//保有量数据
    //             api: 'CustomerLevelReport',
    //             params: {
    //                 rankType: this.state.tabValue,      //tab
    //                 userId,        //客户经理id
    //                 custType: this.state.userType,          //客户类型
    //                 type: this.state.selectedSegmentIndex,      //时间区域
    //                 iscustowin: 1,
    //             }
    //         }, (res) => {
    //             this.setState({
    //                 chartsListD: res.data
    //             })
    
    //         });
    //     });
        
    // }

	/**
     *  客户等级人数-趋势(折线)
     */
    getLevelNumber() {
        let managerId = this.state.managerID, list = this.state.managerList, userId;
        if(list.length <= 0)
            userId = "";
        if(managerId === " "){
            userId = list[0].id;
            for(let i = 1; i < list.length; i++){
                userId += "," + list[i].id;
            }
                
        }else{
            userId = managerId;
        }
        this.request({
            api: 'getLevelNumbers',
            params: {
                selectType: this.state.tabValue,      //tab值
                selectedUserIds: userId,        //客户经理id
                custType: this.state.userType,          //客户类型
                type: this.state.selectedSegmentIndex,      //时间区域
                iscustowin: 0
            }
        }, (res) => {
            let list = res.data.list, keyMaps, chartAdata = {lastMonth: [], thisMonth: []};
            if(this.state.tabValue === 0){
                keyMaps = ['HJ', "BJ", "ZS","CF", "ZL"];
            }else{
                keyMaps = ['BWX', 'BW','WBW'];
            }
            for(let key of keyMaps){
                let len = list[key].length;
                chartAdata.lastMonth.push(list[key][len-2]);
                chartAdata.thisMonth.push(list[key][len - 1]);
            }
            this.setState({
                chartsListA: chartAdata,
                chartsListC: res.data
            });
            this.request({
                api: 'getLevelNumbers',
                params: {
                    selectType: this.state.tabValue,      //tab值
                    selectedUserIds: userId,             //客户经理id
                    custType: this.state.userType,          //客户类型
                    type: this.state.selectedSegmentIndex,      //时间区域
                    iscustowin: 1                            //请求保有量
                }
            }, (res) => {
                let list = res.data.list, keyMaps, chartDdata = {lastMonth: [], thisMonth: []};
            if(this.state.tabValue === 0){
                keyMaps = ['HJ', "BJ", "ZS","CF", "ZL"];
            }else{
                keyMaps = ['BWX', 'BW','WBW'];
            }
            for(let key of keyMaps){
                let len = list[key].length;
                chartDdata.lastMonth.push(list[key][len-2]);
                chartDdata.thisMonth.push(list[key][len - 1]);
            }
                this.setState({
                    chartsListD: chartDdata,
                    chartsListE: res.data
                })
    
            });

        });
        
    }

    /**
     * 各个会员趋势详情图
     * @returns {*}
     */
    getBarList() {
        let managerId = this.state.managerID, list = this.state.managerList, userId;
        if(list.length <= 0)
            userId = "";
        if(managerId === " "){
            userId = list[0].id;
            for(let i = 1; i < list.length; i++){
                userId += "," + list[i].id;
            }
                
        }else{
            userId = managerId;
        }
        let curRank;
        if(this.state.tabValue === 0){
            switch(this.state.level){
                case "白金": curRank = 2; break;
                case "钻石": curRank = 3; break;
                case "财富": curRank = 4; break;
                case "战略": curRank = 5; break;
                default: curRank = 1;
            }
        }else{
            switch(this.state.level){
                case "百万有效户": curRank = 7; break;
                case "500万有效户": curRank = 8; break;
                default: curRank = 6;
            }
        }
        this.request({
            api: 'GetBarList',
            params: {
                selectedUserIds: userId,        //客户经理id
                custType: this.state.userType,          //客户类型
                type: this.state.selectedSegmentIndex,      //时间区域
                rankType: curRank,
                iscustowin: 0,
            }
        }, (res) => {
            this.setState({
                chartsListB: res.data.barList,
            })
            this.request({
                api: 'GetBarList',
                params: {
                    selectedUserIds: userId,        //客户经理id
                    custType: this.state.userType,          //客户类型
                    type: this.state.selectedSegmentIndex,      //时间区域
                    rankType: curRank,
                    iscustowin: 1,                              //保有量
                }
            }, (res) => {
                this.setState({
                    chartsListF: res.data.barList,
                })
    
            });
        });
        
    }

	/**
     * 各个会员趋势详情-表单
     * @returns {*}
     */
    getCustomerStockReport() {
        // this.request({
        //     api: 'CustomerStockReport',
        //     params: {
        //         selectedTD: this.state.selectedTD,      //团队
        //         managerID: this.state.managerID,        //客户经理id
        //         userType: this.state.userType,          //客户类型
        //         selectedSegmentIndex: this.state.selectedSegmentIndex,      //时间区域
        //         level: this.state.level,
        //         detailType: this.state.detailType,
        //         tableSearchVal: this.state.tableSearchVal
        //     }
        // }, (res) => {
        //     this.setState({
        //         tableList: res.data.Rows,
        //         totalList: res.data.total[0] || {}
        //     })

        // })
    }

	/**
	 * 时间区域
     * 客户经理不会变化,无需重置条件
     * @param index
     */
    changeSegmented(index) {
        this.setState({
            selectedSegmentIndex: index
        }, () => {
            // this.getCustomerLevelReport();
            this.getLevelNumber();
            this.getBarList();
            this.getCustomerStockReport();
        })
    }

    /**
     * 团队选择
     * @param val
     */
    selectTD(val) {
        this.setState({
            selectedTD: val,
            managerID: ' ',  //团队切换时需重置客户经理及客户类型
            userType: 1
        }, () => {
            this.getUserName();
            // this.getCustomerLevelReport();
            this.getLevelNumber();
            this.getBarList();
            this.getCustomerStockReport();
        })
    }

    /**
     * 客户经理选择
     * @param val
     */
    selectJL(val) {
        this.setState({
            managerID: val
        }, () => {
            // this.getCustomerLevelReport();
            this.getLevelNumber();
            this.getBarList();
            this.getCustomerStockReport();
        })
    }

    /**
     * 客户类型选择
     * @param val
     */
    selectKH(val) {
        this.setState({
            userType: val
        }, () => {
            // this.getCustomerLevelReport();
            this.getLevelNumber();
            this.getBarList();
            this.getCustomerStockReport();
        })
    }

    //分布or趋势
    changeChartsType(val) {
        this.setState({
            chartsType: val
        })
    }

	/**
     * 等级分类(柱形)选择后
     */
    levelChange(val) {
        this.setState({
            level: val
        }, () => {
            this.getBarList();
            this.getCustomerStockReport();
        })
    }

	/**
     *  客户存量类型选择,跳转到流失降级表
     */
    detailTypeChange(val) {
        this.setState({
            detailType: val
        }, () => {
            let managerId = this.state.managerID, list = this.state.managerList, userId;
        if(list.length <= 0)
            userId = "";
        if(managerId === " "){
            userId = list[0].id;
            for(let i = 1; i < list.length; i++){
                userId += "," + list[i].id;
            }
                
        }else{
            userId = managerId;
        }
            this.context.router.push({
                pathname: 'LaDetailtable',
                query:{
                    tableType: this.state.detailType,
                    custLevel: this.state.level,
                    period: this.state.selectedSegmentIndex,
                    mId: userId,
                    userType: this.state.userType
                }
            })
        })
    }

    onSearchTable(val) {
        this.setState({
            tableSearchVal: val
        })
    }
    onSearchSubmitTable() {
        this.getCustomerStockReport();
    }

    onSearchCancel() {
        this.setState({
            tableSearchVal: ''
        }, () => {
            this.getCustomerStockReport();
        })
    }
    tabsChange = (tab, index) => {
        this.setState({
            tabValue: index,
            level:  index === 1 ? "500万有效户" : "战略"
        }, ()=>{
            this.getLevelNumber();
            this.getBarList();
            // this.getCustomerLevelReport();
            this.getCustomerStockReport();
        })
    }

    render() {
        let state = this.state;
        if(state.roleType < 0){
            return <div></div>
        }
        return <div className="N_levelAnalyze">
            <Tabs tabs={[{ title: '服务客户等级', value: '0' }, { title: '保有量客户等级', value: '1' }]}
                onChange={(tab, index) => this.tabsChange(tab, index)} />
            
            <WhiteSpace size="lg" className="bg_f6" />

            <div className="htf-segment" style={{ height: "30px", width: "250px", margin: "10px auto" }}>
                <div
                    className={state.selectedSegmentIndex === 0 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeSegmented(0)}
                >
                    每日
                </div>
                <div
                    className={state.selectedSegmentIndex === 1 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeSegmented(1)}
                >
                    每周
                </div>
                <div
                    className={state.selectedSegmentIndex === 2 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeSegmented(2)}
                >
                    月度
                </div>
                <div
                    className={state.selectedSegmentIndex === 3 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeSegmented(3)}
                >
                    季度
                </div>
                <div
                    className={state.selectedSegmentIndex === 4 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui "}
                    // /*onClick={() => this.changeSegmented(4)*/}
                >
                    半年
                </div>
                <div
                    className={state.selectedSegmentIndex === 5 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui "}
                    // onClick={() => this.changeSegmented(5)}
                >
                    年度
                </div>
            </div>

            <div className="select_tools">
                <div className="row">
                    <div className="label">
                        团队:
                    </div>
                    <div className="list">
                        {/* <div
                            className={state.selectedTD === '全部' ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={() => this.selectTD('全部')}>
                            全部
                        </div> */}
                        <div
                            className={state.selectedTD == '高净值' ? "selected border_color_ui color_ui" : 'color666'}
                            >
                            高净值
                        </div>
                        {/* <div
                            className={state.selectedTD == '三方' ? "selected border_color_ui color_ui" : 'color666 '}
                            >
                            三方
                        </div> */}
                        {/* <div
                            className={ state.selectedTD === '自有大众' ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={()=>this.selectTD('自有大众')}>
                            自有大众
                        </div> */}
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        客户经理:
                    </div>
                    <div style={{ overflowX: 'auto', lineHieght: '26px' }}>
                        <div className="list">
                        <div
                                        
                                        className={state.managerID === " " ? "selected border_color_ui color_ui" : 'color666'}
                                        onClick={() => this.selectJL(" ")}
                                    >全部</div>
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
                            className={state.userType === '' ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={() => this.selectKH('')}>
                            全部
                        </div> */}
                        <div
                            className={state.userType === 1 ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={() => this.selectKH(1)}>
                            个人
                        </div>
                       
                        <div
                            className={ state.userType === 2 ? "selected border_color_ui color_ui " : 'color666 ' }
                            >
                            机构
                        </div>
                    </div>
                </div>
            </div>
            <WhiteSpace size='lg' className="bg_f6"/>
            {
                state.chartsListA &&
                <div className="htf-segment" style={{ height: "30px", width: "100px", margin: "10px 20px -20px 0", float: 'right', position: 'relative', zIndex: 1 }}>
                    <div
                        className={state.chartsType === 0 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                        onClick={() => this.changeChartsType(0)}
                    >
                        分布
                    </div>
                    <div
                        className={state.chartsType === 1 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                        onClick={() => this.changeChartsType(1)}
                    >
                        趋势
                    </div>
                </div>
            }
                   

            {
                state.chartsListA && state.chartsType === 0  &&
                
                   
                    <div><ChartsA timeIndex={this.state.selectedSegmentIndex} chartsListA={state.chartsListA} levelChange={this.levelChange.bind(this)} tabType={this.state.tabValue} /> <WhiteSpace size='lg' className="bg_f6 l2"/></div>}

                    { state.chartsListD && state.chartsType === 0  &&
                    <ChartsD timeIndex={this.state.selectedSegmentIndex} chartsListA={state.chartsListD} levelChange={this.levelChange.bind(this)} tabType={this.state.tabValue} />
                
            }

            {
                state.chartsListC && state.chartsType === 1 && 
                
                   <div> <ChartsC chartsListC={state.chartsListC} tabType={this.state.tabValue} peroid={this.state.selectedSegmentIndex}/>
                    <WhiteSpace size='lg' className="bg_f6"/></div>}

                    {  state.chartsListE && state.chartsType === 1 &&
                    <ChartsE chartsListC={state.chartsListE} tabType={this.state.tabValue} peroid={this.state.selectedSegmentIndex}/>
                
            }

            <WhiteSpace size="lg" className="bg_f6" />

            {
                state.chartsListB && 
                <ChartsB chartsListB={state.chartsListB} level={this.state.level} detailTypeChange={this.detailTypeChange.bind(this)}tabType={this.state.tabValue} levelChange={this.levelChange.bind(this)} timeIndex={this.state.selectedSegmentIndex}/>
            }
            <WhiteSpace size='lg' className="bg_f6"/>

            {
                state.chartsListF && 
                <ChartsF chartsListB={state.chartsListF} level={this.state.level} detailTypeChange={this.detailTypeChange.bind(this)}tabType={this.state.tabValue} levelChange={this.levelChange.bind(this)} timeIndex={this.state.selectedSegmentIndex}/>
            }
                
            

            <WhiteSpace size="lg" className="bg_f6" />

            
        </div>
    }
}

export default LevelAnalyze;