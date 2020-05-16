import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, ListView, SearchBar, Tabs, Toast, Modal } from 'antd-mobile';

class SKList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [{}],
            tabVal: window.localStorage.SkListTab === "0" ? 0 : (Number(window.localStorage.SkListTab) || -1),
            tabIndex: Number(window.localStorage.SkListTabIndex) || 0,
            levelData: [],
            level: window.localStorage.SkListLevel || '',
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
            manageList: [],
            manage: window.localStorage.SkListManage || 0,
            showManage: false
        }

    }


    componentDidMount() {
        this.changeTilte("客户列表");        //TODO
        Promise.all([
            this.getCustomerTypes(),
            this.getCustomerLevelPromise(),
            this.getCustomerListPromise(),
            this.GetCustomerManage()
        ]).then((res)=>{
            this.handleData(res);
            Toast.hide();
        })

    }



    //获取客户分类
    getCustomerTypes() {
        Toast.loading('数据加载中...', 0);
        return this.requestPromise({
            api: 'customerTypes',
            hideToast: true
        })
    }

    //客户等级
    getCustomerLevelPromise() {
        return this.requestPromise({
            api: 'GetCustomerLevel',
            params: {
                type: this.state.tabVal
            },
            hideToast: true
        })
    }

    //获取客户列表
    getCustomerListPromise() {
        return this.requestPromise({
            api: 'customerList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize: 10,
                key: this.state.searchValue,
                type: this.state.tabVal,
                level: this.state.level,      //客户等级
                manage: this.state.manage,
            },
            hideToast: true
        })
    }

    //获取客户管户
    GetCustomerManage() {
        return this.requestPromise({
            api: 'GetCustomerManage',
            hideToast: true
        })
    }

    handleData(res) {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        let data0 = res[0].data;
        let data1 = res[1].data;
        let data2 = res[2].data;
        let data3 = res[3].data;
        let _tabsArr = [{title: '所有', value: "-1"}];
        let _levelArr = [];
        let _manageArr = [];
        let _hasMore = true;
        let _isLoading = false;

        //处理tabs
        for(let x in data0) {
            _tabsArr.push({
                title: data0[x],
                value: x
            })
        }

        //处理level
        for(let x in data1) {
            _levelArr.push({
                name: data1[x],
                value: x
            })
        }

        //处理客户管户
        for(let x in data3) {
            _manageArr.push({
                name: data3[x],
                value: x
            })
        }

        //处理List
        if(data2.Entities.length === 0 &&  this.state.pageIndex > 1 ) {
            _hasMore = false;
            _isLoading = false
        } else if(this.state.pageIndex === 1 && data2.TotalRecordCount <= 10){
            this.handleList(data2.Entities);
            _hasMore = false;
        } else {
            this.handleList(data2.Entities);
        }

        this.setState({
            tabs: _tabsArr,
            levelData: _levelArr,
            hasMore: _hasMore,
            isLoading: _isLoading,
            height: hei,
            manageList: _manageArr

        })

    }

    //获取客户列表
    getCustomerList() {
        this.request({
            api: 'customerList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize: 10,
                key: this.state.searchValue,
                type: this.state.tabVal,
                level: this.state.level,      //客户等级
                manage: this.state.manage
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

    //客户等级
    getCustomerLevel() {
        let _levelArr = [];
        this.request({
            api: 'GetCustomerLevel',
            params: {
                type: this.state.tabVal
            },
            hideToast: true
        }, (res)=>{
            for(let x in res.data) {
                _levelArr.push({
                    name: res.data[x],
                    value: x
                })
            };
            this.setState({
                levelData: _levelArr
            });
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
            })
            _rowIDs.push(_arr);
        });

        this.setState({
            oListData: _oListData,
            listData: _listData,
            sectionIDs: _sectionIDs,
            rowIDs: _rowIDs,
            isLoading: false,
            // height: hei
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
            this.getCustomerList()
        });
    }

    //tabs
    tabsChange(tab, index) {
        this.setState({
            tabVal: tab['value'],
            tabIndex: index,
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
        }, ()=>{
            this.getCustomerLevel();
            this.getCustomerList()
        })
    }

	/**
     * 跳转详情
     * @param id
     * @param type 用户类型 -2:三方 0:机构 1:个人 2:产品  事实客户(机构、个人、产品);
     */
    jump(id, type) {
        //跳转前记录下单签tab位置
        let { tabVal, tabIndex, level, manage } = this.state;
        let storage=window.localStorage;
        try {
            storage.setItem('SkListTab', tabVal);
            storage.setItem('SkListTabIndex', tabIndex);
            storage.setItem('SkListLevel', level);
            storage.setItem('SkListManage', manage);
        } catch (e){
            console.log('IOS10 - localStorage无效')
        }
        this.context.router.push({
            pathname: '/SKListDetail',
            query: {
                id,
                userType: type
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

        if(!tel || !(/^1\d{10}$/.test(tel))) { return; }
        
        if(isAndroid && window.AndroidHtfPortal) {
            window.AndroidHtfPortal.sendText(tel)
        }
        if(isiOS && window.webkit) {
            window.webkit.messageHandlers.sendText.postMessage(tel)
        }
    }

    //汇聊
    sendHuiLiao(id) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(isAndroid) {
            window.AndroidHtfPortal.crmStartComm(id)
        }
        if(isiOS) {
            window.webkit.messageHandlers.crmStartComm.postMessage(id)
        }
    }


    renderRow = (rowData, sectionID, rowID) => {
        let { openTelID, isOpenTel } = this.state;
        return (
            <WingBlank className="list-row">
                <WhiteSpace size="lg"/>
                <Flex style={{position: 'relative'}}>
                    <Flex.Item onClick={()=>this.jump(rowData[rowID].id, rowData[rowID].type)} style={{flex: '4'}}>
                        <div className="mb_10">
                            <span className="fs_18 color000 mr_10">{rowData[rowID].name}</span>
                        </div>
                        <div className="fs_12 color999">
                            {rowData[rowID].telephone}
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: '1'}} onClick={()=> this.openTel(rowData[rowID].id)}>
                        <div
                            className={['iconfont', 'icon-kxialazhankai', (isOpenTel && rowData[rowID].id === openTelID) ? '': 'rotate90'].join(' ')}
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
                            <div className={["iconfont icon-sduanxin mb_5", /^1\d{10}$/.test(rowData[rowID].telephone) ? "color_ui" : "color999",  "fs_18"].join(' ')}></div>
                            <a
                               onClick={()=>this.sendText(rowData[rowID].telephone)}
                               className={[/^1\d{10}$/.test(rowData[rowID].telephone) ? "color333" : "color999"].join(' ')}
                            >
                                短信
                            </a>
                        </Flex.Item>

                        {
							/**
							 * 三方用户不显示汇聊
                             */
                            rowData[rowID].type != -2 &&
                            <Flex.Item style={{textAlign: 'center'}}>
                                <div className={["iconfont icon-huiliao mb_5", (rowData[rowID].no && rowData[rowID].no !== "0") ? "color_ui" : "color999",  "fs_18"].join(' ')}></div>
                                <a
                                    onClick={()=>this.sendHuiLiao(rowData[rowID].no)}
                                    className={[(rowData[rowID].no && rowData[rowID].no !== "0") ? "color333" : "color999"].join(' ')}
                                >
                                    汇聊
                                </a>
                            </Flex.Item>
                        }



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
            this.getCustomerList();
        })

    }

    //客户等级刷选
    changeLevel(val) {
        let { level } = this.state;
        if(level === val) {
            this.setState({
                level: '',
                pageIndex: 1,
                isLoading: false,
                hasMore: true,
            }, ()=> {
                this.getCustomerList();
            })
        } else {
            this.setState({
                level: val,
                pageIndex: 1,
                isLoading: false,
                hasMore: true,
            }, ()=> {
                this.getCustomerList();
            })
        }

    }

    //客户管户选择
    selectManage(val) {
        this.setState({
            manage: val,
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
            showManage: false
        }, ()=> {
            this.getCustomerList();
        })
    }

    closeManage() {
        this.setState({
            showManage: false
        })
    }

    render() {
        let { tabs, tabVal, tabIndex, levelData, level, height, listData, oListData, sectionIDs, rowIDs, searchValue, hasMore, manageList, manage, showManage } = this.state;

        return <div className="N_customer_List">
            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}
            >
                <Flex>
                    <Flex.Item style={{flex: 3}}>
                        <SearchBar
                            value={searchValue}
                            placeholder={ tabVal== '-2' ? '名称/电话号' : "名称/手机号/公司/地址/来源" }
                            onChange={this.onSearch}
                            onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getCustomerList()) }}
                            onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getCustomerList()) }}
                            onSubmit={this.onSearchSubmit}
                        />
                    </Flex.Item>

                    {
                        manageList.length > 0 &&
                        <Flex.Item style={{flex: 1}}>
                            <div className="htf_select" onClick={()=>this.setState({showManage: true})}>
                                <div className="htf_select_content" >
                                    {manageList.map(item => {
                                        if(item.value*1 === manage*1) {
                                            return item.name
                                        }
                                    })}
                                </div>
                            </div>
                        </Flex.Item>
                    }

                </Flex>

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
                levelData.length > 0 &&
                    <div className="module_filter_btns">
                        <div className="color999 fs_12 mb_10 mt_5">自有平台实际(当年)</div>

                        {
                            levelData.map((item, index) => {
                                return <div key={index} className={["filter_btns", (level === item.value) && 'current'].join(' ')} onClick={()=>this.changeLevel(item.value)}>
                                    {item.name}
                                </div>
                            })
                        }

                    </div>
            }


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


            {
                showManage &&
                <div>
                    <div className="am-action-sheet-mask" onClick={()=>this.closeManage()}></div>
                    <div className="am-action-sheet-wrap" onClick={()=>this.closeManage()}>
                        <div className="am-action-sheet am-action-sheet-normal">
                            <div className="am-action-sheet-content">
                                <button className="am-action-sheet-close">
                                    <span className="am-action-sheet-close-x"></span>
                                </button>
                                <div className="am-action-sheet-body">
                                    <div>
                                        <div className="am-action-sheet-button-list">
                                            {manageList.map((item, index)=>{
                                                return  <div
                                                    key={index}
                                                    className="am-action-sheet-button-list-item"
                                                    onClick={()=>this.selectManage(item.value)}
                                                >
                                                    {item.name}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>
    }
}

export default SKList;