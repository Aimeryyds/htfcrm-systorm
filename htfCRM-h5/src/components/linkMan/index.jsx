import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, ListView, SearchBar, Button } from 'antd-mobile';

class LinkMan extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            height: document.documentElement.clientHeight,
            listData: {},
            oListData: [],      //原生数据
            sectionIDs: [],
            rowIDs: [],
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
            openTelID: null,
            isOpenTel: false,

            searchValue: ''
        }
    }

    componentDidMount() {
        this.changeTilte("联系人列表");
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height: hei
        });
        this.getLeadList();
    }

    //获取联系人列表
    getLeadList() {
        this.request({
            api: 'GetContactList',
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


    jump(id) {
        this.context.router.push({
            pathname: '/LinkManDetail',
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
                    <Flex.Item onClick={()=>this.jump(rowData[rowID].id)} style={{flex: '4'}}>
                        <div className={[rowData[rowID].company ? "mb_10" : "mt_5 mb_5"].join(' ')}>
                            <span className="fs_18 color000 mr_10">{rowData[rowID].name}</span>
                            <span className="fs_12 color999">{rowData[rowID].sex}</span>
                        </div>
                        <div className="fs_12 color999">
                            {rowData[rowID].company}
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: '1'}} onClick={()=> this.openTel(rowData[rowID].id)}>
                        <div
                            className={['iconfont', 'icon-kxialazhankai', (isOpenTel && rowData[rowID].id=== openTelID) ? '': 'rotate90'].join(' ')}
                            style={{position: 'absolute', right: '.2rem', top: '50%', marginTop: '-.08rem'}}
                        ></div>
                    </Flex.Item>
                </Flex>

                {   (isOpenTel && rowData[rowID].id === openTelID)&&
                <Flex style={{backgroundColor: '#f5f5f5', padding: '.1rem 0'}} className="mt_10">
                    <Flex.Item style={{textAlign: 'center'}}>
                        <div className={["iconfont icon-kdianhua mb_5", rowData[rowID].telephone ? "color_ui" : "color999", "fs_18"].join(' ')}></div>
                        <a
                           onClick={()=>this.callPhone(rowData[rowID].telephone)}
                           className={[rowData[rowID].telephone ? "color333" : "color999"].join(' ')}
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
                        <div className={["iconfont icon-sduanxin mb_5", rowData[rowID].telephone ? "color_ui" : "color999",  "fs_18"].join(' ')}></div>
                        <a
                           onClick={()=>this.sendText(rowData[rowID].telephone)}
                           className={[rowData[rowID].telephone ? "color333" : "color999"].join(' ')}
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



    render() {

        let {  height, listData, oListData, sectionIDs, rowIDs, hasMore, searchValue } = this.state;

        return <div className="N_customer_List">

            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}
            >
                <SearchBar
                    value={searchValue}
                    placeholder="姓名/公司名称"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getLeadList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getLeadList()) }}
                    onSubmit={this.onSearchSubmit}
                />
            </div>
            <div style={{height: '0.5rem'}}></div>

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
            <Button className="addButton" onClick={() => {this.context.router.push({pathname: '/AddLinkMan'})}} ></Button>


        </div>
    }
}

export default LinkMan;


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