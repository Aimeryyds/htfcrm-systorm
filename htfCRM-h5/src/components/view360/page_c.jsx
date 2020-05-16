import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'
import moment from 'moment';

import { WingBlank, WhiteSpace, Drawer, Flex, Tag, ListView, SearchBar, Calendar, List } from 'antd-mobile';
import Moment from 'moment'
import $ from 'jquery'
const dateFormat = 'YYYY-MM-DD';

class PageC extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            begindate: '',
            enddate: '',
            searchValue: '',
            pageIndex: 1,
            listData: [],
            drawerOpen: false,
            calendarShow: false,
            confirm_status: '',
            initPage: false,
            showMateTitle: false,       //是否显示模糊匹配框
            mateTitleDatas: [],         //匹配中数据
            mateTitleHeight: document.documentElement.clientHeight - 250,


            height: document.documentElement.clientHeight - 150,
            isLoading: false,
            hasMore: true,
            refreshing: true,
        }
    }

    componentDidMount() {
        this.getCustomerTrading()
    }

    getCustomerTrading() {
        this.request({
            api:'customerTrading',
            params: {
                id: this.props.id,
                PageIndex: this.state.pageIndex,
                PageSize: 10,
                key: this.state.searchValue,
                begindate: this.state.begindate,
                enddate: this.state.enddate,
                confirm_status: this.state.confirm_status
            }
        }, (res)=>{
            this.setState({
                listData: res.data,
                initPage: false
            })
        })
    }

	/**
     * 模糊匹配
     */
    getTradingTitle() {
        this.request({
            api: 'TradingTitle',
            params: {
                // id: this.props.id,
                key: this.state.searchValue
            },
            hideToast: true
        }, (res)=>{
            this.setState({
                mateTitleDatas: res.data,         //匹配中数据
            })
        })
    }

	/**
     * 选中匹配中数据
     */
    chanegKey(name) {
        this.setState({
            searchValue: name,
            showMateTitle: false
        }, ()=>{
            this.getCustomerTrading();
        })
    }

    /**
     * 搜索框文字输入
     * @param e
     */
    searchChange = (e) => {
        this.setState({
            searchValue: e.target.value,
            showMateTitle: e.target.value ? true : false
        }, ()=>{
            this.getTradingTitle();
        })
    }


    /**
     * 筛选-打开
     */
    openFilterHandle() {
        this.setState({
            drawerOpen: true
        })
    }

    /**
     * 筛选-关闭
     */
    closeFilterHandle() {
        this.setState({
            drawerOpen: false,
            pageIndex: 1,
            listData: []
        }, ()=>{
            this.getCustomerTrading();
        })
    }

    /**
     * 触发发送时间选择
     */
    sendDateHandle() {
        this.setState({
            calendarShow: !this.state.calendarShow
        })
    }
    /**
     * 关闭日期选择器
     */
    onCancelCalendar = () => {
        this.setState({
            calendarShow: !this.state.calendarShow
        })
    }

    /**
     * 日期选择器确认
     */
    onConfirmCalendar = (s, e) => {
        this.setState({
            calendarShow: !this.state.calendarShow,
            begindate: moment(s).format(dateFormat),
            enddate: moment(e).format(dateFormat)
        })
    }

    /**
     * 筛选-重置
     */
    resetFilterHandle() {
        this.setState({
            begindate: '',
            enddate: '',
            confirm_status: '',
        })
    }





    render() {
        let { listData, searchValue, initPage } = this.state;
        let state = this.state;
        let now = new Date();

        const sidebar = (
            <div>
                <div>
                    <h4 className="ml_10">确认状态</h4>
                    <Tag
                        className="ml_10"
                        selected={state.confirm_status === 1}
                        onChange={()=>{
                                this.setState({
                                    confirm_status: 1
                                })
                            }}
                    >成功</Tag>
                    <Tag
                        selected={state.confirm_status === 0}
                        onChange={()=>{
                                this.setState({
                                    confirm_status: 0
                                })
                            }}
                        className="ml_10"
                    >失败</Tag>
                </div>

                <div>
                    <h4 className="ml_10">确认时间</h4>
                    <div className="htf_calendar-range ml_10">
                        <div className="left-range" onClick={()=>this.sendDateHandle()}>
                            { state.begindate || '开始时间' }
                        </div>
                        <div className="left-text">至</div>
                        <div className="right-range" onClick={()=>this.sendDateHandle()}>
                            { state.enddate || '结束时间' }
                        </div>
                    </div>

                </div>


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

        return <div className="Page_C">

            <Drawer
                className="my-drawer-b"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                sidebar={sidebar}
                sidebarStyle={{zIndex: 1003, width: '80%', backgroundColor: '#fff'}}
                overlayStyle={{zIndex: 1002}}
                dragHandleStyle={{width: 0}}
                position="right"
                open={this.state.drawerOpen}
                onOpenChange={()=>this.closeFilterHandle()}
            >

                <div className="htf_searchBar_filter"
                     style={{position: 'fixed', top: '43.5px', left: '0', right: '0',zIndex:'999'}}
                >
                    <div className="search-wrap">
                        <span className="search-synthetic-ph-icon"></span>
                        <form onSubmit={this.searchSubmit}>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="基金名称/业务类型"
                                onChange={this.searchChange}
                                value={state.searchValue}
                            />
                        </form>

                        <div
                            className={["search-filter", ( state.begindate || state.confirm_status ) && 'isSelected' ].join(' ')}
                            onClick={()=>this.openFilterHandle()}
                        >
                            <span className="sl">| </span>
                            <span className="sr">筛选</span>
                        </div>

                    </div>
                </div>
                <div style={{height: '93.5px'}}></div>

            {
                (listData.length == 0 && initPage) ?  <div style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> :
                    <WingBlank size="lg">
                        <WhiteSpace size="lg"/>

                        <div style={{ position: 'relative' }}>
                            <div id="tableScrollA" style={{overflowX: 'scroll'}}>

                                <div style={{position: 'absolute', top: 0, left: 0}}>
                                    <table style={{width: '202px'}} className="custom_module_table">
                                        <thead>
                                        <tr>
                                            <th style={{width: '101px'}} className='table_column_1'>基金名称</th>
                                            <th style={{width: '101px'}} className='table_column_1'>基金账号</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            listData.map((item, index)=>{
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
                                                    <td style={{backgroundColor: '#fff'}}>{ item.bk_fundaccount }</td>
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>


                                <table width="400%" className="custom_module_table">
                                    <thead>
                                    <tr>
                                        <th style={{width: '100px'}}>基金名称</th>
                                        <th style={{width: '100px'}}>基金账号</th>
                                        <th>交易账号</th>
                                        <th>业务类型</th>
                                        <th>申请金额</th>
                                        <th>确认金额</th>
                                        <th>申请份额</th>
                                        <th>确认份额申请日期</th>
                                        <th>确认日期</th>
                                        <th>确认状态</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        listData.map((item, index)=>{
                                            return <tr key={index}>
                                                <td>{ item.name }</td>
                                                <td>{ item.bk_fundaccount }</td>
                                                <td>{ item.tradeaccount }</td>
                                                <td>{ item.trade_type }</td>
                                                <td>{ item.reqamt }</td>
                                                <td>{ item.amount }</td>
                                                <td>{ item.reqshares }</td>
                                                <td>{ item.applyDate }</td>
                                                <td>{ item.confirmDate }</td>
                                                <td>{ item.confirm_status }</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>

                            </div>
                        </div>


                        <WhiteSpace size="lg"/>
                    </WingBlank>
            }

            </Drawer>

            <Calendar
                visible={state.calendarShow}
                onCancel={this.onCancelCalendar}
                onConfirm={this.onConfirmCalendar}
                defaultDate={now}
                maxDate={new Date(+now)}
                style={{zIndex: 1010, position: 'relative'}}
            />

            {
                state.showMateTitle &&
                <div
                    style={{position: 'fixed', top: '93.5px', left: '0', right: '0', bottom: 0, zIndex:'1000', backgroundColor: 'rgba(0,0,0,.2)'}}>
                    <List style={{maxHeight: state.mateTitleHeight+'px', overflowY: 'auto'}}>
                        {
                            state.mateTitleDatas.map((item, index)=>{
                                return <List.Item key={index} onClick={()=>this.chanegKey(item.NAME)}>
                                        { item.NAME }
                                </List.Item>
                            })
                        }
                    </List>
                </div>
            }


        </div>
    }
}

export default PageC;

// onEndReached = () => {
//     this.setState({
//         pageIndex: ++this.state.pageIndex,
//         isLoading: true
//     }, ()=>{
//         this.getCustomerTrading()
//     })
// }

// jumpDetail(id) {
//     //跳转前记录下单签tab位置
//     let { initialPage } = this.state;
//     let storage=window.localStorage;
//     storage.setItem('view360Tab', 2);
//
//     this.context.router.push({
//         pathname: '/TradingDetail',
//         query: {
//             trade_id: id,
//             id: this.props.id
//         }
//     })
// }

// renderRow(rowData, sectionID, rowI) {
//     return (
//         <Flex className={["module_a", rowData.trade_status === "成功" ? 'module_a-success' : 'module_a-fail'].join(' ')} onClick={()=>this.jumpDetail(rowData.trade_id)}>
//             <Flex.Item className="mt" style={{flex: 1.2}}>
//                 <div className="fs_16 color000 mt_10 mb_10">
//                     { rowData.trade_status || '---' }
//                 </div>
//                 <div className="fs_12 color666 mb_10">
//                     {rowData.product_type || '---'}
//                 </div>
//             </Flex.Item>
//             <Flex.Item className="mc" style={{flex: 4}}>
//                 <div className="fs_16 color000 mb_10">{ rowData.product_name || '---' }</div>
//                 <div className="fs_12 color999">业务类型:{ rowData.Buy_sell || '---' }</div>
//             </Flex.Item>
//             <Flex.Item className="mr" style={{flex: 1, textAlign: 'center'}}>
//                 <div className="iconfont icon-kgengduo color999"></div>
//             </Flex.Item>
//         </Flex>
//     )
// }

// {
//     (listData.length == 0 && initPage) ?
//         <div style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> :
//         <ListView
//             ref={el => this.lv = el}
//             dataSource={new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(listData)}
//             renderFooter={() => (<div style={{textAlign: 'center' }}>
//                       {this.state.isLoading ? '加载中...' : ''}
//                       {this.state.hasMore ? '' : '没有更多了'}
//                     </div>)}
//             renderRow={this.renderRow.bind(this)}
//             style={{
//                       height: this.state.height,
//                       overflow: 'auto',
//                     }}
//             pageSize={4}
//             scrollRenderAheadDistance={500}
//             onEndReached={this.onEndReached}
//             onEndReachedThreshold={10}
//         />
// }
//
// <div className="N_Calendar">
//     <Calendar
//         title="请选择时间"
//         visible={this.state.showCalendar}
//         onCancel={() => this.setState({showCalendar: false})}
//         onConfirm={this.onConfirmCalendar}
//         defaultDate={new Date()}
//     />
// </div>

//<div className="fs_16 color000">{ rowData.Transaction_amount || '---' }万元</div>
// <SearchBar
//     value={begindate && (begindate + ' - ' + enddate)}
//     placeholder="基金名称"
//     onClear={() => this.onClearSearch()}
//     onCancel={() => this.onClearSearch()}
//     onFocus={()=>this.searchFocus()}
// />