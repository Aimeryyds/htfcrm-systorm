import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class JZList extends Module {
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
        }
    }

    componentDidMount() {
        this.changeTilte("竞争对手列表");
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height: hei
        });
        this.getLeadList();
    }


    getLeadList() {
        this.request({
            api: 'GetCompList',
            params: {
                pageindex: this.state.pageIndex,
                pagesize: 10,
                key: this.state.searchValue
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


            // //返回空对象,代表没有数据
            // if(JSON.stringify(res.data.Entities) == "{}" && this.state.pageIndex > 1) {
            //     this.setState({
            //         hasMore: false
            //     })
            // } else if(this.state.pageIndex === 1 && res.data.totalRecordCount <= 10){
            //     this.handleData(res.data.Entities);
            //     this.setState({
            //         hasMore: false
            //     })
            // } else {
            //     this.handleData(res.data.Entities);
            // }
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

        // if(this.state.pageIndex == 1) {
        //     _listData = Object.assign({}, {}, data)
        // } else {
        //     //直接合并对象,会替换整个对象属性,产生错误
        //     for(let x in data) {
        //         if(listData[x]) {
        //             listData[x] = listData[x].concat(data[x])
        //         } else {
        //             listData[x] = data[x];
        //         }
        //     }
        //     _listData = listData;
        //     // _listData = Object.assign({}, this.state.listData, data)
        // }
		//
        // for(let x in _listData) {
        //     let _arr = [];
        //     _sectionIDs.push(x);
        //     _listData[x].map((item, index) => {
        //         _arr.push(index)
        //     })
        //     _rowIDs.push(_arr);
        // }

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
            this.getLeadList()
        })


    }

    jump(id) {
        this.context.router.push({
            pathname: '/JZListDetail',
            query: {
                id:id
            }
        })
    }



    renderRow = (rowData, sectionID, rowID) => {
        return (
            <WingBlank className="list-row">
                <WhiteSpace size="lg"/>
                <Flex style={{position: 'relative'}}>
                    <Flex.Item onClick={()=>this.jump(rowData[rowID].id)} style={{flex: '4'}}>
                        <div className={[rowData[rowID].mobilephone ? "mb_10" : "mt_5 mb_5"].join(' ')}>
                            <span className="fs_18 color000 mr_10">{rowData[rowID].name}</span>
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
            this.getLeadList();
        })
    }

    render() {

        let { height, listData, oListData, sectionIDs, rowIDs, searchValue, hasMore } = this.state;

        return <div className="N_customer_List">

            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0rem', left: '0', right: '0',zIndex:'999'}}
            >

                <SearchBar
                    value={searchValue}
                    placeholder="竞争对手名称/竞品名称"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getLeadList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getLeadList()) }}
                    onSubmit={this.onSearchSubmit}
                />

            </div>
            <div style={{height: '.5rem'}}></div>
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

export default JZList;


// <div className="fs_12 color999">
//     {rowData[rowID].mobile}
// </div>

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