import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'
import { WhiteSpace, Flex, ListView, SearchBar, Tabs, Toast, Modal } from 'antd-mobile';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

const onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
        e.preventDefault();
    }
}

class ShareProductKeHuList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [{}],
            tabVal: "0",
            tabIndex: 0,
            levelData: [],
            level: '',
            height: document.documentElement.clientHeight,
            searchValue: '',
            listData: {},
            oListData: [],      //原生数据
            sectionIDs: [],
            rowIDs: [],
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
            selectedProductId: [],
            selectedProduct: [],
            modal: false
        }

    }

    componentDidMount() {
        this.changeTilte("客户列表");
        Toast.loading('数据加载中...', 0);
        Promise.all([
            this.getCustomerTypes(),
            this.getCustomerLevelPromise(),
            this.getCustomerListPromise()
        ]).then((res)=>{
            this.handleData(res);
            Toast.hide();
        })

    }

	/**
     * 获取客户分类
     * @returns {*}
     */
    getCustomerTypes() {
        return this.requestPromise({
            api: 'customerTypes',
            hideToast: true
        })
    }
    /**
     * 客户等级
     * @returns {*}
     */
    getCustomerLevelPromise() {
        return this.requestPromise({
            api: 'GetCustomerLevel',
            params: {
                type: this.state.tabVal
            },
            hideToast: true
        })
    }
    /**
     * 获取客户列表
     * @returns {*}
     */
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

	/**
     * 处理返回数据
     * @param res
     */
    handleData(res) {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        let data0 = res[0].data;
        let data1 = res[1].data;
        let data2 = res[2].data;
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
            height: hei

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
        if(!this.state.isLoading) {
            this.setState({
                pageIndex: ++this.state.pageIndex,
                isLoading: true,
            }, ()=>{
                this.getCustomerList();
            })
        }
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

    /**
     * 选择数据,多选
     */
    selectProduct(id, rowData) {
        let { selectedProductId, selectedProduct } = this.state;
        let _selectedProductId = this.deepClone(selectedProductId);
        let _selectedProduct = this.deepClone(selectedProduct);
        let index = selectedProductId.indexOf(id);
        if(index > -1) {
            _selectedProductId.splice(index, 1)
            _selectedProduct.splice(index, 1);
        } else {
            _selectedProductId.push(id);
            _selectedProduct.push(rowData);
        }

        this.setState({
            selectedProductId: _selectedProductId,
            selectedProduct: _selectedProduct
        })

    }

    sendHuiLiao() {

    }

    renderRow = (rowData, sectionID, rowID) => {
        let { selectedProductId } = this.state;
        return (
            <div className="list-row">
                <WhiteSpace style={{height: '.1rem'}}/>
                <Flex align="start" style={{paddingLeft: '.15rem'}} onClick={()=>this.selectProduct(rowData[rowID].id, rowData[rowID])}>
                    <div
                        className={["iconfont1", selectedProductId.indexOf(rowData[rowID].id) > -1 ? "iconcheckboxsel color_ui" : "iconradiobtn colorC", "fs_16 mr_5"].join(' ')}
                    ></div>
                    <div onClick={()=>this.jump(rowData[rowID].id, rowData[rowID].type)}>
                        <div className="mb_10">
                            <span className="fs_16 color000 mr_10">
                                {rowData[rowID].name}
                            </span>
                        </div>
                        <div className="fs_12 color999">
                            {rowData[rowID].telephone}
                        </div>
                    </div>
                </Flex>

                <WhiteSpace style={{height: '.1rem'}}/>
            </div>
        )
    }

    render() {
        let { tabs, tabVal, tabIndex, levelData, level, height, listData, oListData, sectionIDs, rowIDs, searchValue, hasMore, selectedProductId, selectedProduct } = this.state;

        return <div className="N_customer_List">
            <div className="htf_searchBar_style3"
                 style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}
            >
                <SearchBar
                    value={searchValue}
                    placeholder={ tabVal== '-2' ? '名称/电话号' : "名称/手机号/公司/地址/来源" }
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getCustomerList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getCustomerList()) }}
                    onSubmit={this.onSearchSubmit}
                />

            </div>

            <div style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '50px'}}>
                <WhiteSpace className="bg_f6" style={{height: '10px'}} />
                <Tabs
                    tabs={tabs}
                    initialPage={tabIndex}
                    onChange={(tab, index) => this.tabsChange(tab, index) }
                >
                </Tabs>
            </div>

            {
                levelData.length > 0 &&
                <div className="module_filter_btns bg_f6" style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '103.5px'}}>
                    <div className="color999 fs_12 mb_5 mt_5">自有平台实际(当年)</div>
                    {
                        levelData.map((item, index) => {
                            return <div key={index} className={["filter_btns", (level === item.value) && 'current'].join(' ')} onClick={()=>this.changeLevel(item.value)}>
                                {item.name}
                            </div>
                        })
                    }
                </div>
            }

            <div style={{height: '170.5px'}}></div>



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

            <Flex style={{position: 'fixed', bottom: 0, left: 0, right: 0, lineHeight: '50px'}}>
                <Flex.Item style={{flex: 1}}>
                    <div
                        className="ta_c fs_16 color666"
                        style={{background: '#f6f6f6'}}
                        onClick={()=>this.context.router.goBack()}
                    >
                        取消
                    </div>
                </Flex.Item>
                <Flex.Item style={{flex: 1, marginLeft: 0}}>
                    <div
                        className={["ta_c fs_16 colorF", selectedProductId.length>0 ? "bg_ui" : "bg_cc"].join(' ')}
                        onClick={()=>{ selectedProductId.length>0 && this.setState({modal: true}) } }
                    >
                        发送
                    </div>
                </Flex.Item>
            </Flex>

            <Modal
                visible={this.state.modal}
                transparent
                maskClosable={false}
                onClose={()=>{this.setState({modal: false})}}
                title="是否确认发送?"
                footer={[
                { text: '取消', onPress: () => { this.setState({modal: false}) } },
                { text: '确认', onPress: () => { this.setState({modal: false}) } }
                ]}
                wrapProps={{ onTouchStart: onWrapTouchStart }}
            >
                {
                    selectedProduct.map((item, index)=>{
                        return <div>{item.name}</div>
                    })
                }
            </Modal>


        </div>
    }
}

export default ShareProductKeHuList;