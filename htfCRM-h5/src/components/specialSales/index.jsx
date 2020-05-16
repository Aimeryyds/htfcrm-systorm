import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import ReactDOM from 'react-dom'
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar,Drawer,Tag } from 'antd-mobile';

class SpecialSales extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            height: document.documentElement.clientHeight,
            searchValue: '',
            isLoading: false,
            hasMore: true,
            refreshing: true,
            pageIndex: 1,
            pageSize: 10,
            listData: [],               //数据
            isReload: false,
            statusIndex:'',
            typeIndex:'',
            planTypeS:[],
            planStateS:[],
            drawerOpenA: false,      //第一层筛选抽屉
        }
    }

    componentDidMount() {
        this.changeTilte("专项销售计划");
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.getType();
        this.getState();
        this.setState({
            height:hei
        }, ()=>{
            this.getCampaignlist();
        });

    }

    getType(){
        this.request({
            api: 'Getcampigntype',
        }, (res) => {
            this.setState({
                planTypeS:this.objToArr(res.data)
            });
        })
    }

    getState(){
        this.request({
            api: 'Getcampignstate',
        }, (res) => {
            this.setState({
                planStateS:this.objToArr(res.data)
            });
        })
    }

    objToArr(obj) {
        let _datas= [];
        for(let x in obj) {
            _datas.push({value: obj[x],key:x})
        };
        return _datas;
    }

    getCampaignlist() {
        let {pageSize,pageIndex,searchValue,statusIndex,typeIndex,listData}=this.state;
        console.log(pageSize,pageIndex,searchValue,statusIndex,typeIndex)
        this.request({
            api: 'GetSpecialList',
            params: {
                pageSize:pageSize,
                pageIndex:pageIndex,
                key:searchValue||'',
                state:statusIndex||'',
                type:typeIndex||''
            }
        }, (res) => {
            let _data;
            let _hasMore = true;
            if(pageIndex === 1) {
                _data = res.data?res.data:[];
            } else {
                _data = listData.concat(res.data||[]);
            }

            if(res.data.length === 0) {
                _hasMore = false;
            }

            this.setState({
                listData: _data,
                isLoading: false,
                hasMore: _hasMore,
                refreshing: false,
                isReload: false
            });
        })
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                <WhiteSpace size="md"/>
                <div onClick={()=>
                    this.context.router.push({
                        pathname: '/SpecialDetail',
                        query: {
                            title:rowData.name,
                            id:rowData.id
                        }
                    })}>
                    <div className="salePlan_item">
                        <div className="title">
                            <div className="left_title">
                                {rowData.istemplate==='True'&&<div className='laber colorF bg_ui fs_12'>模板</div>}
                                <div className='name fs_16 color000'>{rowData.name||'----'}</div>
                            </div>
                            <div className="right_state color_ui">
                                <span className='bg_ui'></span>
                                {rowData.state||'----'}
                            </div>
                        </div>
                        <div className="other_info color999 fs_14">
                            <div className="sale_type">
                                {rowData.type||'----'}
                            </div>
                            <div className="create_person">
                                创建人:{rowData.createdby||'----'}
                            </div>
                            <div className="create_time">
                                {rowData.datetime||'----'}
                            </div>
                        </div>

                    </div>
                </div>
                <WhiteSpace size="md"/>
            </WingBlank>
        )
    }

    onEndReached = () => {
        this.setState({
            pageIndex: ++this.state.pageIndex,
            isLoading: true,
        }, ()=>{
            this.getCampaignlist();
        })
    }

    /**
     * 筛选-打开
     */
    openFilterHandle() {
        this.setState({
            drawerOpenA: true
        })
    }

    /**
     * 筛选-关闭
     */
    closeFilterHandle() {
        this.setState({
            drawerOpenA: false,
            pageIndex: 1,
            isLoading: true,
            hasMore: true,
            listData: []
        }, ()=>{
            this.getCampaignlist();
        })
    }

    /**
     * 筛选-重置
     */
    resetFilterHandle() {
        this.setState({
            statusIndex:'',
            typeIndex:''
        })
    }
    searchChange = (e) => {
        this.setState({
            searchValue: e.target.value.trim(),
            pageIndex: 1,
            listData: []
        }, () => {
            this.getCampaignlist();
        })
    }

    /**
     * 搜索框提交
     */
    searchSubmit = (event) => {
        event.preventDefault();
        this.setState({
            pageIndex: 1,
            listData: []
        }, () => {
            this.getCampaignlist();
        })
    }

    render() {

        let state = this.state;
        const sidebar_a = (
            <div>
                <div style={{borderBottom:'1px solid #eeeeee'}}>
                    <div className="ml_10 color666 fs_12" style={{lineHeight:'0.5rem'}}>计划状态</div>
                    {
                        state.planStateS.map((item,index)=>{
                            return (<Tag
                                className="Drawer_show_css ml_10"
                                style={{marginBottom:'0.1rem'}}
                                key={index}
                                selected={state.statusIndex === item.key}
                                onChange={()=>{
                                    let _index=item.key===state.statusIndex?'':item.key;
                                    this.setState({
                                        statusIndex: _index
                                    })
                                }}
                            >{item.value}</Tag>)
                        })
                    }
                </div>
                <div>
                    <div className="ml_10 color666 fs_12" style={{lineHeight:'0.5rem'}}>计划类型</div>
                    {
                        state.planTypeS.map((item,index)=>{
                            return (<Tag
                                className="Drawer_show_css ml_10"
                                style={{marginBottom:'0.1rem'}}
                                key={index}
                                selected={state.typeIndex === item.key}
                                onChange={()=>{
                                    let _index=item.key===state.typeIndex?'':item.key;
                                    this.setState({
                                        typeIndex: _index
                                    })
                                }}
                            >{item.value}</Tag>)
                        })
                    }
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
                            className="ta_c colorF bg_ui"
                            onClick={()=>this.closeFilterHandle()}
                        >
                            确认
                        </div>
                    </Flex.Item>
                </Flex>

            </div>
        );


        return <div className="specialSales_contain">
            <Drawer
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                sidebarStyle={{zIndex: 1003, width: '80%', backgroundColor: '#fff'}}
                sidebar={sidebar_a}
                open={state.drawerOpenA}
                onOpenChange={()=>this.closeFilterHandle()}
                position="right"
            >
                <div className="New_htf_search_box" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                    <div className="New_htf_searchBar_filter">
                        <div className="search-wrap">
                            <span className="search-synthetic-ph-icon"></span>
                            <form onSubmit={this.searchSubmit}>
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder='主题'
                                    onChange={this.searchChange}
                                    value={state.searchValue}
                                />
                            </form>
                        </div>
                    </div>
                    <div
                        className={["search-filter", (state.statusIndex || state.typeIndex) && 'isSelected'].join(' ')}
                        onClick={()=>this.openFilterHandle()}
                    >
                        <span className="sr">筛选</span>&nbsp;
                        <span className={["iconfont1 fs_12 iconshaixuan-youtiaojian", (state.statusIndex || state.typeIndex) ? 'color_ui':'colorb3'].join(' ')}></span>
                    </div>

                </div>


                <div style={{height: '.6rem'}}></div>
                {
                    (state.listData.length == 0 && !state.hasMore)  ?
                        <div ref={el => this.lv = el} style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> : <ListView
                            ref={el => this.lv = el}
                            dataSource={
                                new ListView.DataSource({
                                    rowHasChanged: (row1, row2) => row1 !== row2
                                }).cloneWithRows(state.listData)
                            }
                            renderRow={this.renderRow}
                            scrollRenderAheadDistance={500}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={10}
                            initialListSize={18}
                            renderFooter={() => (<div style={{ textAlign: 'center' }}>
                                {state.isLoading ? '加载中...' : ''}
                                {!state.hasMore && '没有更多了'}
                            </div>)}
                            style={{
                                height: state.height,
                                overflow: 'auto'
                            }}
                        />
                }

            </Drawer>
        </div>
    }
}

export default SpecialSales;