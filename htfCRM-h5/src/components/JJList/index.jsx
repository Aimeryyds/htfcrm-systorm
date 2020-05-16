import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, ListView, SearchBar, Tabs } from 'antd-mobile';

class JJList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
            typeData: [],
            tabVal: window.localStorage.JJListTab === "0" ? 0 : (Number(window.localStorage.JJListTab) || -1),
            tabIndex:  Number(window.localStorage.JJListTabIndex) || 0,
        }
    }

    componentDidMount() {
        this.changeTilte("基金产品");
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height: hei
        });
        this.getFundList();
        this.getFundType();
    }


    //获取类型接口
    getFundType() {
        this.request({
            api: 'GetFundType'
        },(res) => {
            let data = res.data;
            let _arr = [{title: '所有', value: '-1'}];
            for(let x in data) {
                _arr.push({
                    title: data[x],
                    value: x
                })
            }

            this.setState({
                typeData: _arr
            })
        })
    }

    //获取基金产品列表数据
    getFundList() {
        this.request({
            api: 'GetFundList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize: 10,
                Key: this.state.searchValue,
                type: this.state.tabVal,
            }
        }, (res)=>{
            if(res.data.Entities.length === 0 &&  this.state.pageIndex > 1 ) {
                this.setState({
                    hasMore: false,
                    isLoading: false
                });
            } else if(this.state.pageIndex === 1 && res.data.TotalRecordCount <= 10){
                this.handleData(res.data.Entities);
                this.setState({
                    hasMore: false
                });
            } else {
                this.handleData(res.data.Entities);
            }
        })
    }

    handleData(Entities) {
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
        })
    }

    onSearch = (val) => {
        this.setState({
            searchValue: val.replace(/(^\s*)|(\s*$)/g, ""),
        })
    }

    onSearchSubmit = () => {
        this.setState({
            pageIndex: 1,
            hasMore: true,
            isLoading: false,
        },()=>{
            this.getFundList()
        })
    }

    jump(id) {
        let { tabVal, tabIndex } = this.state;
        let storage=window.localStorage;
        try {
            storage.setItem('JJListTab', tabVal);
            storage.setItem('JJListTabIndex', tabIndex);
        } catch (e){
            console.log('IOS10 - localStorage无效')
        }
        this.context.router.push({
            pathname: '/JJListDetail',
            query: {
                id
            }
        })
    }


    renderRow = (rowData, sectionID, rowID) => {
        return (
            <WingBlank className="list-row">
                <WhiteSpace size="lg"/>
                <Flex style={{position: 'relative'}}>
                    <Flex.Item onClick={()=>this.jump(rowData[rowID].ID)} style={{flex: '4'}}>
                        <div className={[rowData[rowID].CODE ? "mb_10" : "mt_5 mb_5"].join(' ')}>
                            <span className="fs_18 color000 mr_10">{rowData[rowID].NAME||'----'}</span>
                        </div>
                        <div className="fs_12 color999">
                            {rowData[rowID].CODE||'---'}
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
            this.getFundList();
        })
    }

    tabsChange = (tab, index) => {
        this.setState({
            tabVal: tab.value,
            tabIndex: index
        }, ()=>{
            this.getFundList()
        })
    }


    render() {
        let {  height, listData, oListData, sectionIDs, rowIDs, searchValue, hasMore, typeData, tabIndex } = this.state;

        return <div className="N_customer_List">

            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0rem', left: '0', right: '0',zIndex:'999'}}
            >

                <SearchBar
                    value={searchValue}
                    placeholder="产品名称/基金代码"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getFundList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getFundList()) }}
                    onSubmit={this.onSearchSubmit}
                />

            </div>

            <div style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '.5rem'}}>
                <Tabs
                    tabs={typeData}
                    initialPage={tabIndex}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                    onChange={this.tabsChange}
                >
                </Tabs>
            </div>
            <div style={{height: '.89rem'}}></div>

            {
                (oListData.length == 0 && !hasMore)  ?
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

export default JJList;


// listData:  {
//     "A": [
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         }
//     ],
//         "B": [
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         },
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         }
//     ],
//         "C": [
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         },
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         }
//     ],
//         "D": [
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         },
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         }
//     ],
//         "E": [
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         },
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         }
//     ],
//         "F": [
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         },
//         {
//             name: "滴滴滴",
//             sex: '男',
//             tel: '12312341234'
//         }
//     ]
// },
// sectionIDs: ['A', 'B', 'C', 'D', 'E', 'F'],
//     rowIDs: [[0], [0, 1], [0], [0], [0], [0]],