import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class CustomeGroup extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchVal: "",
            pageIndex: 1,
            listData: [],

            hasMore: true,
            loading: false,
            height: document.documentElement.clientHeight,
        }
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei
        });
        this.changeTilte("客户组");
        this.getList();
    }

	/**
     * 获取类表数据
     */
    getList() {
        let { searchVal, pageIndex, listData } = this.state;
        let _hasMore = true, _listData = this.deepClone(listData);
        let _params={
            type: searchVal,
            pageIndex: pageIndex,
            pageSize: 10
        };
        console.log(_params);
        this.request({
            api: "GetCustGroupList",
            params: _params,
        },(res)=>{
            let data = res.data;
            console.log(data);
            if(pageIndex === 1) {
                _listData = data;
                if(data.length < 10) {
                    _hasMore=false;
                }
            } else {
                if(data.length < 10) {
                    _hasMore=false;
                    _listData = _listData.concat(data);
                }
                if(data.length === 10) {
                    _listData = _listData.concat(data);
                }
            }

            this.setState({
                listData: _listData,
                loading: false,
                hasMore: _hasMore
            })
        })
    }

    onEndReached = () =>{
        if(!this.state.loading && this.state.hasMore) {
            this.setState((preState)=> {
                return {
                    pageIndex: ++preState.pageIndex,
                    loading: true,
                }
            }, ()=>{
                this.getList();
            })
        }
    }

    searchSubmit() {
        this.setState({
            pageIndex: 1,
        }, ()=>{
            this.getList();
        });
    }

    jump(id, name) {
        this.context.router.push({
            pathname: '/CustomeGroupDetail',
            query: {
                id,
                name
            }
        })
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div style={{padding: '.15rem',borderBottom: '1px solid #f5f5f5'}} onClick={() => this.jump(rowData.id, rowData.name)}>
                <div className="fs_16 color333 mb_10">
                    { rowData.name }
                </div>
                <div className="fs_12 color999">
                    创建时间：{ rowData.createdon }
                </div>
            </div>
        )
    }

    render() {
        let { searchVal, listData, hasMore, loading, height } = this.state;

        return <div>
            <div className="htf_searchBar_style3" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                <SearchBar
                    value={ searchVal }
                    placeholder="客户组名称"
                    onChange={ (val)=>this.setState({searchVal: val}) }
                    onClear={() => { this.setState({searchVal: ''}, ()=>this.searchSubmit())} }
                    onCancel={() => { this.setState({searchVal: ''}, ()=>this.searchSubmit())} }
                    onSubmit={ () => this.searchSubmit() }
                />
            </div>

            <div style={{height: '50px'}}></div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            {
                (listData.length == 0 && !hasMore) ?
                    <div ref={el => this.lv = el} style={{ textAlign: 'center', padding: '2rem 0' }}>没有相关数据</div> :
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(listData)}
                        renderRow={this.renderRow}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={100}
                        renderFooter={() => (<div style={{ textAlign: 'center' }}>
                            {this.state.isLoading ? '加载中...' : ''}
                            {!this.state.hasMore && '没有更多了'}
                        </div>)}
                        style={{
                            height: height,
                            overflow: 'auto'
                        }}
                    />
            }

        </div>
    }
}

export default CustomeGroup;