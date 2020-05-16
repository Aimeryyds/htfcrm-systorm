import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, ListView, SearchBar, Tabs, Toast,Button } from 'antd-mobile';

class QKList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [{}],
            tabVal: window.localStorage.QkListTab === "0" ? 0 : (Number(window.localStorage.QkListTab) || -1),
            tabIndex:  Number(window.localStorage.QkListTabIndex) || 0,
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
        this.changeTilte("潜客列表");
        Promise.all([
            this.getLeadTypes(),
            this.getLeadListPromise()
        ]).then((res)=>{
            this.handleData(res);
            Toast.hide();
        })
    }

    getLeadTypes() {
        Toast.loading('数据加载中...', 0);
        return this.requestPromise({
            api: 'GetLeadTypes',
            hideToast: true
        })
    }

    //获取潜客列表
    getLeadListPromise() {
        return this.requestPromise({
            api: 'leadlist',
            params: {
                pageindex: this.state.pageIndex,
                pagesize: 10,
                key: this.state.searchValue,
                type: this.state.tabVal,
                potentialBegin: this.state.potentialBegin,
                potentialEnd: this.state.potentialEnd
            },
            hideToast: true
        })
    }

    handleData(res) {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        let data0 = res[0].data;
        let data1 = res[1].data;
        let _tabsArr = [{title: '所有', value: "-1"}];
        let _hasMore = true;
        let _isLoading = false;

        //处理tabs
        for(let x in data0) {
            _tabsArr.push({
                title: data0[x],
                value: x
            })
        }

        //处理List
        if(data1.Entities.length === 0 &&  this.state.pageIndex > 1 ) {
            _hasMore = false;
            _isLoading = false
        } else if(this.state.pageIndex === 1 && data1.TotalRecordCount <= 10){
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


    //获取潜客列表
    getLeadList() {
        this.request({
            api: 'leadlist',
            params: {
                pageindex: this.state.pageIndex,
                pagesize: 10,
                key: this.state.searchValue,
                type: this.state.tabVal,
                potentialBegin: this.state.potentialBegin,
                potentialEnd: this.state.potentialEnd
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
        // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop- 50;
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
            });
            _rowIDs.push(_arr);
        });

        this.setState({
            oListData: _oListData,
            listData: _listData,
            sectionIDs: _sectionIDs,
            rowIDs: _rowIDs,
            isLoading: false,
            // height: hei
        });
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
        }, () => {
            this.getLeadList()
        });
    }

    jump(leadid) {
        let { tabVal, tabIndex } = this.state;
        let storage=window.localStorage;
        try {
            storage.setItem('QkListTab', tabVal);
            storage.setItem('QkListTabIndex', tabIndex);
        } catch (e){
            console.log('IOS10 - localStorage无效')
        }


        this.context.router.push({
            pathname: '/QKListDetail',
            query: {
                leadid
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

    //打电话
    callPhone(tel) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(!tel) { return; }

        if(isAndroid && window.AndroidHtfPortal) {
            window.AndroidHtfPortal.callPhone(tel)
        }
        if(isiOS && window.webkit) {
            window.webkit.messageHandlers.callPhone.postMessage(tel)
        }
    }

    //发邮件
    sendEmail(tel) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(!tel) { return; }

        if(isAndroid && window.AndroidHtfPortal) {
            window.AndroidHtfPortal.sendEmail(tel)
        }
        if(isiOS && window.webkit) {
            window.webkit.messageHandlers.sendEmail.postMessage(tel)
        }
    }

    //短信
    sendText(tel) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(!tel) { return; }

        if(isAndroid && window.AndroidHtfPortal) {
            window.AndroidHtfPortal.sendText(tel)
        }
        if(isiOS && window.webkit) {
            window.webkit.messageHandlers.sendText.postMessage(tel)
        }
    }

    renderRow = (rowData, sectionID, rowID) => {
        let { openTelID, isOpenTel } = this.state;
        return (
            <WingBlank className="list-row">
                <WhiteSpace size="lg"/>
                <Flex style={{position: 'relative'}}>
                    <Flex.Item onClick={()=>this.jump(rowData[rowID].leadid)} style={{flex: '4'}}>
                        <div className={[rowData[rowID].mobilephone ? "mb_10" : "mt_5 mb_5"].join(' ')}>
                            <span className="fs_18 color000 mr_10">{rowData[rowID].name}</span>
                        </div>
                        <div className="fs_12 color999">
                            {rowData[rowID].mobilephone}
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: '1'}} onClick={()=> this.openTel(rowData[rowID].leadid)}>
                        <div
                            className={['iconfont', 'icon-kxialazhankai', (isOpenTel && rowData[rowID].leadid=== openTelID) ? '': 'rotate90'].join(' ')}
                            style={{position: 'absolute', right: '.2rem', top: '50%', marginTop: '-.08rem'}}
                        ></div>
                    </Flex.Item>
                </Flex>

                {   (isOpenTel && rowData[rowID].leadid === openTelID)&&
                <Flex style={{backgroundColor: '#f5f5f5', padding: '.1rem 0'}} className="mt_10">
                    <Flex.Item style={{textAlign: 'center'}}>
                        <div className={["iconfont icon-kdianhua mb_5", rowData[rowID].mobilephone ? "color_ui" : "color999", "fs_18"].join(' ')}></div>
                        <a
                           onClick={()=>this.callPhone(rowData[rowID].mobilephone)}
                           className={[rowData[rowID].mobilephone ? "color333" : "color999"].join(' ')}
                        >
                            通话
                        </a>
                    </Flex.Item>
                    <Flex.Item style={{textAlign: 'center'}}>
                        <div className={["iconfont icon-syouxiang mb_5", rowData[rowID].email ? "color_ui" : "color999"].join(' ')}></div>
                        <a
                           onClick={()=>this.sendEmail(rowData[rowID].email)}
                           className={[rowData[rowID].email ? "color333" : "color999"].join(' ')}
                        >
                            邮件
                        </a>
                    </Flex.Item>
                    <Flex.Item style={{textAlign: 'center'}}>
                        <div className={["iconfont icon-sduanxin mb_5", rowData[rowID].mobilephone ? "color_ui" : "color999",  "fs_18"].join(' ')}></div>
                        <a
                            onClick={()=>this.sendText(rowData[rowID].mobilephone)}
                            className={[rowData[rowID].mobilephone ? "color333" : "color999"].join(' ')}
                        >
                            短信
                        </a>
                    </Flex.Item>
                </Flex>
                }

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

    //tabs
    tabsChange(tab, index) {
        this.setState({
            tabVal: tab['value'],
            tabIndex: index,
            pageIndex: 1,
            potentialBegin: '',
            potentialEnd: '',
            isLoading: false,
            hasMore: true,
        }, ()=>{
            this.getLeadList();
        })
    }

    //个人tab下金额筛选
    changeFilter(begin, end) {
        let { potentialBegin } = this.state;
        if(begin === potentialBegin) {
            this.setState({
                pageIndex: 1,
                potentialBegin: '',
                potentialEnd: '',
                isLoading: false,
                hasMore: true,
            }, ()=> {
                this.getLeadList();
            })
        } else {
            this.setState({
                pageIndex: 1,
                potentialBegin:begin,
                potentialEnd: end,
                isLoading: false,
                hasMore: true,
            }, ()=> {
                this.getLeadList();
            })
        }
    }

    render() {
        let { tabs, height, listData, oListData, sectionIDs, rowIDs, searchValue, hasMore, potentialBegin, tabVal, tabIndex } = this.state;

        return <div className="">

            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}
            >

                <SearchBar
                    value={searchValue}
                    placeholder="名称/手机号/公司/地址/来源"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getLeadList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getLeadList()) }}
                    onSubmit={this.onSearchSubmit}
                />

            </div>

            <div style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '.5rem'}}>
                <Tabs
                    tabs={tabs}
                    initialPage={tabIndex}
                    onChange={(tab, index) => this.tabsChange(tab, index) }
                >
                </Tabs>
            </div>

            <div style={{height: '.89rem'}}></div>

            {
                tabVal == 1 &&
                <div className="module_filter_btns">
                    <div className="color999 fs_12 mb_10 mt_5">潜在资产量</div>

                    <div className={["filter_btns", (potentialBegin === 0) && 'current'].join(' ')} onClick={()=>this.changeFilter(0, 100)}>
                        0-100万
                    </div>
                    <div className={["filter_btns", (potentialBegin === 100) && 'current'].join(' ')} onClick={()=>this.changeFilter(100, 300)}>
                        100-300万
                    </div>
                    <div className={["filter_btns", (potentialBegin === 300) && 'current'].join(' ')} onClick={()=>this.changeFilter(300, 500)}>
                        300-500万
                    </div>
                    <div className={["filter_btns", (potentialBegin === 500) && 'current'].join(' ')} onClick={()=>this.changeFilter(500, -1)}>
                        500万以上
                    </div>
                </div>
            }


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
                        onEndReachedThreshold={50}
                        renderFooter={() => (<div style={{ textAlign: 'center' }}>
                          {this.state.isLoading ? '加载中...' : ''}
                          {!this.state.hasMore && '没有更多了'}
                        </div>)}
                    />
            }
            <Button className="addButton" onClick={() => {
                this.context.router.push({
                    pathname: '/QKEditDetail',
                    query: {
                        userType: tabVal=='2'?'0':tabVal
                    }
                })}} ></Button>

        </div>
    }
}

export default QKList;


//<span className="fs_10 color999">{rowData[rowID].sex}</span>

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