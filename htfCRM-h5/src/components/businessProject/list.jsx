import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'
import $ from "jquery"

import { WingBlank, WhiteSpace, Flex, ListView, SearchBar, Tabs, Toast } from 'antd-mobile';

class BusinessProjectList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [{}],
            tabVal: window.localStorage && window.localStorage.businessListTab || "-1",
            height: document.documentElement.clientHeight,
            searchValue: '',
            listData: {},
            oListData: [],      //原生数据
            sectionIDs: [],
            rowIDs: [],
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
            openTelID: null,
            isOpenTel: false,

            potentialBegin: '',     //潜在资金量起始量(单位：万元)
            potentialEnd: '',        //潜在资金量终止量(单位：万元)
        }
    }


    componentDidMount() {
        this.changeTilte(this.props.location.query.STAGE);
        $('.N_my_title .name').html(this.props.location.query.STAGE)

        Promise.all([
            this.OpportunityType(),
            this.OpportunityStageListPromise()
        ]).then((res)=>{
            this.handleData(res);
            Toast.hide();
        });

    }

    //获取类型
    OpportunityType() {
        Toast.loading('数据加载中...', 0);
        return this.requestPromise({
            api: 'OpportunityType',
            hideToast: true
        })
    }

    //获取列表
    OpportunityStageListPromise() {
        return this.requestPromise({
            api: 'OpportunityStageList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize: 10,
                key: this.state.searchValue,
                type: this.state.tabVal,
                stageid: this.props.location.query.id
            },
            hideToast: true
        })
    }

    handleData(res) {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        let data0 = res[0].data;
        let data1 = res[1].data;
        let _tabsArr = [{title: '所有', value: "-1", key:"-1"},];
        let _hasMore = true;
        let _isLoading = false;

        //处理tabs
        for (let x in data0) {
            _tabsArr.push({
                title: data0[x],
                value: x,
                key: x
            })
        }

        //处理List
        if (data1.Entities.length === 0 && this.state.pageIndex > 1) {
            _hasMore = false;
            _isLoading = false
        } else if (this.state.pageIndex === 1 && data1.TotalRecordCount <= 10) {
            this.handleList(data1.Entities);
            _hasMore = false;
        } else {
            this.handleList(data1.Entities);
        }

        this.setState({
            tabs: _tabsArr,
            hasMore: _hasMore,
            isLoading: _isLoading,
            height: hei
        })

    }


    //获取列表
    OpportunityStageList() {
        this.request({
            api: 'OpportunityStageList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize: 10,
                key: this.state.searchValue,
                type: this.state.tabVal,
                stageid: this.props.location.query.id
            }
        }, (res)=>{
            if(res.data.Entities.length === 0 &&  this.state.pageIndex > 1 ) {
                this.setState({
                    hasMore: false,
                    isLoading: false
                });
            } else if(this.state.pageIndex === 1 && res.data.TotalRecordCount <= 10){
                this.handleList(res.data.Entities);
                this.setState({
                    hasMore: false
                });
            } else {
                this.handleList(res.data.Entities);
            }
        })
    }

    handleList(Entities) {
        let { oListData, listData, pageIndex } = this.state;
        let _sectionIDs = [], _rowIDs=[], _oListData;
        let _listData = {};

        if(pageIndex == 1) {
            _oListData = Entities;
        } else {
            if(oListData[oListData.length - 1].Key === Entities[0].Key) {
                oListData[oListData.length - 1].Value =  oListData[oListData.length - 1].Value.concat(Entities[0].Value);
                Entities.shift();
            }
            _oListData = oListData.concat(Entities)
        }

        _oListData.map((item, index) => {
            let _arr = [];
            _listData[item.Key] = item.Value;
            _sectionIDs.push(item.Key);
            item.Value.map((item_a, index_a)=>{
                _arr.push(index_a);
            })
            _rowIDs.push(_arr);
        });

        this.setState({
            oListData: _oListData,
            listData: _listData,
            sectionIDs: _sectionIDs,
            rowIDs: _rowIDs,
            isLoading: false
        });

    }

    onSearch = (val) => {
        this.setState({
            searchValue: val.replace(/(^\s*)|(\s*$)/g, "")
        })
    }

    onSearchSubmit = () => {
        this.setState({
            pageIndex: 1,
            hasMore: true,
        }, () => {
            this.OpportunityStageList()
        });
    }

    jump(id) {
        let { tabVal } = this.state;
        let storage=window.localStorage;
        try {
            storage.setItem('businessListTab', tabVal);
        } catch (e){
            console.log('IOS10 - localStorage无效')
        }


        this.context.router.push({
            pathname: '/BusinessProjectDetail',
            query: {
                id
            }
        })
    }

    openTel(id) {
        let { openTelID, isOpenTel } = this.state;
        if(id === openTelID) {
            this.setState({
                openTelID: id,
                isOpenTel: !this.state.isOpenTel
            })
        } else {
            this.setState({
                openTelID: id,
                isOpenTel: true
            })
        }
    }

    renderRow = (rowData, sectionID, rowID) => {
        let { openTelID, isOpenTel } = this.state;
        return (
            <WingBlank className="list-row">
                <WhiteSpace size="lg"/>
                <Flex style={{position: 'relative'}}>
                    <Flex.Item onClick={()=>this.jump(rowData[rowID].ID)}>
                        <div className={[rowData[rowID].mobilephone ? "mb_10" : "mt_5 mb_5"].join(' ')}>
                            <span className="fs_18 color000 mr_10">{rowData[rowID].NAME}</span>
                        </div>
                        <div className="fs_12 color999"
                             style={{backgroundColor: '#f6f6f6', padding: '0 .1rem', lineHeight: '.22rem', borderRadius: '.11rem', display: 'inline-block'}}
                        >
                            {rowData[rowID].SOURCE}
                        </div>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
            </WingBlank>
        )

    }

    renderSectionWrapper = (sectionID) => {
        return (
            <div key={'w'+sectionID}>
            </div>
        )
    }

    renderSectionHeader = (sectionID) => {
        return (
            <div key={'h'+sectionID}>{sectionID}</div>
        )
    }

    onEndReached = () => {
        this.setState({
            pageIndex: ++this.state.pageIndex,
            isLoading: true,
        }, ()=>{
            this.OpportunityStageList();
        })

    }

    //tabs
    tabsChange(tab, index) {
        this.setState({
            tabVal: tab['value'],
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
        }, ()=>{
            this.OpportunityStageList();
        })
    }

    render() {
        let { tabs, height, listData, oListData, sectionIDs, rowIDs, searchValue, hasMore, tabVal } = this.state;

        return <div className="">

            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0', left: '0', right: '0'}}
            >
                <SearchBar
                    value={searchValue}
                    placeholder="项目名称"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.OpportunityStageList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.OpportunityStageList()) }}
                    onSubmit={this.onSearchSubmit}
                />
            </div>
            <div style={{height: '.56rem'}}></div>


            <Tabs
                tabs={tabs}
                initialPage={ tabVal }
                onChange={(tab, index) => this.tabsChange(tab, index) }
            >
            </Tabs>


            {
                (oListData.length == 0 && !hasMore) ?
                    <div ref={el => this.lv = el} style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> :
                    <ListView.IndexedList
                        ref={el => this.lv = el}
                        dataSource={
                    new ListView.DataSource({
                        getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID],
                        getSectionHeaderData: (dataBlob, sectionID) => sectionID,
                        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                        rowHasChanged: (row1, row2) => row1 !== row2}
                    ).cloneWithRowsAndSections(
                        listData,
                        sectionIDs,
                        rowIDs
                    )
                }
                        style={{
                  height: height,
                  overflow: 'auto'
                }}
                        quickSearchBarStyle={{
                  top: 30,
                  fontSize: 14,
                  backgroundColor: '#ccc',
                  zIndex: 10,
                  display: 'none'
                }}
                        renderRow={this.renderRow}
                        renderSectionWrapper={this.renderSectionWrapper}
                        renderSectionHeader={this.renderSectionHeader}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                        renderFooter={() => (<div style={{ textAlign: 'center' }}>
                          {this.state.isLoading ? '加载中...' : ''}
                          {!this.state.hasMore && '没有更多了'}
                        </div>)}
                    />
            }

        </div>
    }
}

export default BusinessProjectList;
