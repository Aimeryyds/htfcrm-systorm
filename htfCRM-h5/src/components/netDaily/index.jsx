import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar, Tabs, Toast, Drawer, Tag } from 'antd-mobile';

class NetDaily extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchValue: '',        //搜索值
            tabs: [],
            tabKey: '',
            tabName: '',
            tableData: [],
            originalTableData: [],
            moneyType: 1, //资产类别类型      //1--公募  2--电商专户   3--非电商专户  4--汇添利系列
            sorted: [-1, 0, -1, -1, -1, -1],        //如果为0则升序，1则降序,-1初始
            sortedIndex: 1,
            drawerOpen: false,
            categoryType: '',      //资产类别
        }
    }

    componentDidMount() {
        this.changeTilte("产品净值日报");
        this.getTabData(); //优先请求tabs数据,拿到入参后请求table数据
    }

    /**
     * 获取tabs数据
     */
    getTabData() {
        this.request({
            api: 'GetTabData'
        }, (res)=>{
            let _tabs = [];
            res.data.map((item)=>{
                _tabs.push({
                    title: item.name,
                    value: item.id,
                    key: item.id
                })
            });
            this.setState({
                tabs: _tabs,
                tabKey: _tabs[0].key,
                tabName: _tabs[0].title,
            }, ()=>{
                this.getProductJournals();
            })

        })
    }

	/**
     * 获取tables数据
     */
    getProductJournals() {
        let _params = {
            moneyType: this.state.moneyType,
            categoryType: this.state.categoryType,         //资产类别
        };
        this.request({
            api: 'getProductJournals',
            params: _params
        }, (res)=>{
            this.setState({
                tableData: res.data,
                originalTableData: res.data
            })
        })
    }

	/**
     * 搜索
     * @param val
     */
    onSearch = (val) => {
        this.setState({
            searchValue: val.replace(/(^\s*)|(\s*$)/g, ""),
        },()=>{
            this.handleSubmit()
        })
    };

    tabsChange = (tab, val) => {
        let { searchValue, originalTableData } = this.state;
        let _originalTableData = this.deepClone(originalTableData);
        let _moneyType;
        if(tab.title === '公募'){
            _moneyType=1;
        }else if(tab.title === '电商专户'){
            _moneyType=2
        }else if(tab.title === '非电商专户') {
            _moneyType=3
        }else{
            return ;
        };
        this.setState({
            sorted: [-1, 0, -1, -1, -1, -1],
            tableData: _originalTableData,
            tabKey: tab.key,
            tabName: tab.title,
            moneyType: _moneyType,
            categoryType: "",
            searchValue: ""
        }, ()=>{
            this.getProductJournals();
        })
    };

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
        });
    }

	/**
     * 前端模糊搜索
     */
    handleSubmit() {
        let { searchValue, originalTableData } = this.state;
        let _originalTableData = this.deepClone(originalTableData);
        let _tableData = _originalTableData.filter((item)=>{
            return (
                (item.name.indexOf(searchValue) > -1) ||
                (item.fundcode.indexOf(searchValue) > -1)
            )
        });
        this.setState({
            sorted: [-1, 0, -1, -1, -1, -1],
            tableData: _tableData
        })
    }

    openFilterHandle() {
        this.setState({
            drawerOpen: true
        })
    }

    closeFilterHandle() {
        this.setState({
            drawerOpen: false
        }, ()=>{
            this.getProductJournals();
        });
    }

    resetFilterHandle() {
        this.setState({
            categoryType: ""
        })
    }

    render() {
        let { sorted, tableData, sortedIndex, tabName, drawerOpen, categoryType } = this.state;
        let _keys = ['journal', 'DailyGain', 'MonthlyIncrease', 'AnnualGain1','AnnualGain2', 'moneyType']
        let tableWidth = document.body.clientWidth * 2;
        //5:对中文排序
        if(sortedIndex === 5) {
            if(sorted[sortedIndex] === 0) {
                tableData.sort((a, b) => a[_keys[sortedIndex]].localeCompare(b[_keys[sortedIndex]],"zh"))
            }
            if(sorted[sortedIndex] === 1) {
                tableData.sort((a, b) => b[_keys[sortedIndex]].localeCompare(a[_keys[sortedIndex]],"zh"))
            }

        } else {
            if(sorted[sortedIndex] === 0) {
                tableData = tableData.sort((a, b)=> b[_keys[sortedIndex]] - a[_keys[sortedIndex]])
            }
            if(sorted[sortedIndex] === 1) {
                tableData = tableData.sort((a, b)=> a[_keys[sortedIndex]] -b[_keys[sortedIndex]])
            }
        }

        const sidebar_a = (
            <div>
                <h4 className="ml_10">资产类别</h4>
                <Tag
                    className="ml_10"
                    selected={ categoryType === "2" }
                    onChange={(state)=>{
                        this.setState({
                            categoryType: state ? "2" : ""
                        })
                    }}
                >一对多</Tag>
                <Tag
                    className="ml_10"
                    selected={ categoryType === "3" }
                    onChange={(state)=>{
                        this.setState({
                            categoryType:  state ? "3" : ""
                        })
                    }}
                >一对一</Tag>

                <Flex style={{position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: '40px'}}>
                    <Flex.Item style={{flex: 1}}>
                        <div
                            className="ta_c color666"
                            style={{background: '#f6f6f6'}}
                            onClick={()=>this.resetFilterHandle()}
                        >
                            重置
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: 1, marginLeft: 0}}>
                        <div
                            className="ta_c colorF"
                            style={{background: '#108ee9'}}
                            onClick={()=>this.closeFilterHandle()}
                        >
                            确认
                        </div>
                    </Flex.Item>
                </Flex>

            </div>
        );


        return <div className="HTF_netDaily">
            <Drawer
                className="my-drawer-a"
                style={{ minHeight: document.documentElement.clientHeight, position: 'relative' }}
                enableDragHandle
                sidebar={sidebar_a}
                sidebarStyle={{zIndex: 1001, width: '80%', backgroundColor: '#fff'}}
                overlayStyle={{zIndex: 1000}}
                dragHandleStyle={{width: 0}}
                position="right"
                open={drawerOpen}
                onOpenChange={()=>this.closeFilterHandle()}
            >

            {
                (tabName === "电商专户"  || tabName === "非电商专户" ) &&
                <div className="htf_searchBar_filter"
                     style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999', backgroundColor: "#fff"}}
                >
                    <div className="search-wrap" style={{backgroundColor: "#f6f6f6"}}>
                        <span className="search-synthetic-ph-icon"></span>
                        <form onSubmit={(event) => {event.preventDefault()||(event.returnValue=false); this.handleSubmit();}}>
                            <input
                                className="search-input"
                                style={{backgroundColor: "#f6f6f6"}}
                                type="text"
                                placeholder="产品名称/产品代码"
                                onChange={ (e)=>this.onSearch(e.target.value) }
                                value={this.state.searchValue}
                            />
                        </form>

                        <div
                            className={["search-filter", categoryType && 'isSelected'].join(' ')}
                            onClick={()=>this.openFilterHandle()}
                        >
                            <span className="sl">| </span>
                            <span className="sr">筛选</span>
                        </div>


                    </div>
                </div>
            }

            {
                (tabName !== "电商专户"  && tabName !== "非电商专户" ) &&
                <div className="htf_searchBar_style3"
                     style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}
                >
                    <SearchBar
                        value={ this.state.searchValue }
                        placeholder="产品名称/产品代码"
                        onChange={ this.onSearch }
                        onClear={() => { this.setState({searchValue: '', tableData: this.state.originalTableData})} }
                        onCancel={() => { this.setState({searchValue: '', tableData: this.state.originalTableData})} }
                        onSubmit={ () => this.handleSubmit() }
                    />
                </div>
            }

            <div style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '.5rem',color:'#333'}}>
                <WhiteSpace style={{height: '1px'}} className="bg_f6" />
                {
                    this.state.tabKey && <Tabs
                        tabs={ this.state.tabs }
                        page={ this.state.tabKey }
                        onChange={ (tab, val) => this.tabsChange(tab, val) }
                        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                    >
                    </Tabs>
                }
            </div>
            
            <div style={{height: '.945rem'}}></div>

           <WhiteSpace style={{height: '10px'}} className="bg_f6" />

            <div style={{ position: 'relative' }}>
                <div style={{overflowX: 'scroll'}}>

                    <div style={{position: 'absolute', top: '0', left: '0', backgroundColor: '#FFF', width: '151px', overflow: 'hidden'}}>
                        <table className="cust_table" style={{width: tableWidth,tableLayout:'fixed',wordBreak:'break-all',wordWrap:'break-word'}} >
                            <thead>
                                <tr>
                                    <th style={{ width: '150px',height:'.36rem',padding:'0' }} >
                                        产品名称
                                    </th>
                                    <th>
                                        产品代码
                                    </th>
                                    <th className={sorted[0] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(0)}>
                                        最新产品净值
                                        <sapn
                                            className={sorted[0] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[0] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                            style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                        />
                                    </th>
                                    {
                                        (tabName !== '公募') &&
                                        <th>
                                            资产类别
                                        </th>
                                    }
                                    {
                                        this.state.moneyType === 1 ? (<th className={sorted[1] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(1)}>
                                            日涨幅
                                            <sapn
                                                className={sorted[1] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[1] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                                style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                            />
                                        </th>) : <th>产品成立日期</th>
                                    }
                                    {
                                        this.state.moneyType === 1 ? <th className={sorted[2] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(2)}>
                                            月涨幅
                                         <sapn
                                                className={sorted[2] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[2] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                                style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                            />
                                        </th> : <th>产品到期日期</th>
                                    }
                                    {
                                        this.state.moneyType === 1 &&
                                        <th className={sorted[3] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(3)}>
                                            最近一年涨幅
                                            <sapn
                                                className={sorted[3] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[3] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                                style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                            />
                                        </th>
                                    }
                                    {
                                        this.state.moneyType === 1 &&
                                        <th className={sorted[4] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(4)}>
                                            今年以来涨幅
                                            <sapn
                                                className={sorted[4] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[4] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                                style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                            />
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((item, index) => {
                                        return <tr key={index} >
                                            <td>
                                                <div
                                                    className="color_ui"
                                                    onClick={
                                                        ()=>this.context.router.push({
                                                            pathname: "/NetDailyDetail",
                                                            query: {
                                                                id: item.id,
                                                                name: item.name
                                                            }
                                                        })
                                                    }>
                                                    {item.name}
                                                </div>

                                            </td>
                                            <td>
                                                {item.fundcode}
                                            </td>

                                            <td>
                                                {item.journal}<br />
                                                <span className="color999" style={{ fontSize: '.11rem' }}>{item.date}</span>
                                            </td>
                                            {
                                                (tabName !== '公募') &&
                                                <td>
                                                    {item.moneyType}
                                                </td>
                                            }
                                            <td>
                                                {Number(item.DailyGain).toFixed(2) + '%' || item.startTime || item.createdate}
                                            </td>
                                            <td>
                                                {Number(item.MonthlyIncrease).toFixed(2) + '%' || item.endTime || item.endcontractedate}
                                            </td>
                                            {this.state.moneyType === 1 &&
                                                <td>
                                                    {Number(item.AnnualGain1).toFixed(2) + '%'}
                                                </td>
                                            }
                                            {this.state.moneyType === 1 &&
                                                <td>
                                                    {Number(item.AnnualGain2).toFixed(2) + '%'}
                                                </td>
                                            }
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
                                产品名称
                            </th>
                            <th>
                                产品代码
                            </th>
                            
                            <th className={sorted[0] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(0)}>
                                最新产品净值
                                <sapn
                                    className={sorted[0] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[0] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                    style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                />
                            </th>
                            {
                                (tabName !== '公募') &&
                                <th className={sorted[5] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(5)}>
                                    资产类别
                                    <sapn
                                        className={sorted[5] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[5] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                        style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                    />
                                </th>
                            }
                            {
                                this.state.moneyType === 1 ? <th className={sorted[1] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(1)}>
                                    日涨幅
                                    <sapn
                                            className={sorted[1] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[1] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                            style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                        />
                                </th> : <th>产品成立日期</th>
                            }
                            {
                                this.state.moneyType === 1 ? <th className={sorted[2] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(2)}>
                                    月涨幅
                                <sapn
                                            className={sorted[2] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[2] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                            style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                        />
                                </th> : <th>产品到期日期</th>
                            }
                            { this.state.moneyType===1&&
                            <th className={sorted[3] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(3)}>
                                最近一年涨幅
                                <sapn
                                        className={sorted[3] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[3] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                        style={{ width: '8px', height: '10px', display: 'inline-block', marginLeft: ' 2px' }}
                                    />
                            </th>
                            }
                            { this.state.moneyType === 1 &&
                            <th className={sorted[4] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(4)}>
                                今年以来涨幅
                            <sapn
                                    className={sorted[4] === -1 ? "icon-img icon-img-morenpaixu" : (sorted[4] === 0 ? 'icon-img ui_color icon-img-jiangxu' : 'icon-img ui_color icon-img-shengxu ')}
                                    style={{ width: '8px', height: '10px', display: 'inline-block',marginLeft:' 2px' }}
                                />
                            </th>
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tableData.map((item, index) => {
                                return <tr
                                    key={index}
                                    onClick={
                                        ()=>this.context.router.push({
                                            pathname: "/NetDailyDetail",
                                            query: {
                                                id: item.id,
                                                name: item.name
                                            }
                                        })
                                    }
                                >
                                    <td >
                                        {item.name} 
                                    </td>
                                    <td>
                                        {item.fundcode}
                                    </td>
                                    
                                    <td>
                                        {item.journal}<br />
                                        <span className="color999" style={{fontSize:'.11rem'}}>{item.date}</span>
                                    </td>
                                    {
                                        (tabName !== '公募') &&
                                        <td>
                                            {item.moneyType}
                                        </td>
                                    }
                                    <td>
                                        {item.DailyGain?(Number(item.DailyGain).toFixed(2) + '%'): item.startTime || item.createdate}
                                    </td>
                                    <td>
                                        {item.MonthlyIncrease?(Number(item.MonthlyIncrease).toFixed(2) + '%'): item.endTime || item.endcontractedate}
                                    </td>
                                    { this.state.moneyType === 1 &&
                                    <td>
                                        {Number(item.AnnualGain1).toFixed(2) + '%'}
                                    </td>
                                    }
                                    {this.state.moneyType === 1 &&
                                        <td>
                                            {Number(item.AnnualGain2).toFixed(2)+'%'}
                                        </td>
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>


                </div>
            </div>

           
           </Drawer>
        </div>
    }
}

export default NetDaily;