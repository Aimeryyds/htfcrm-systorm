import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import ReactDOM from 'react-dom';
import { WhiteSpace, Flex, ListView, Drawer, Text, Toast } from 'antd-mobile';

class ShareProduct extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            oListData:[],
            listData: [],
            typeData: [],
            type: "",
            searchVal: "",
            drawerOpen: false,
            selectOpen: false,
            selectedProductId: "",
            selectedProduct: null,    //已选完整数据
            height: document.documentElement.clientHeight,
        }
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei
        });
        this.changeTilte("产品分享");
        this.getXianJinBaoGetProductList();
        this.getXianJinBaoGetType();
    }

	/**
     * 获取产品类表
     */
    getXianJinBaoGetProductList() {
        let _params = {
            type: this.state.type
        };
        console.log(_params);
        this.request({
            api: "XianJinBaoGetProductList",
            params: _params
        }, (res)=>{
            console.log(res)
            this.setState({
                listData: res.data.fundInfos,
                oListData: res.data.fundInfos
            })
        })
    }

    /**
     * 获取产品类型
     */
    getXianJinBaoGetType() {
        this.request({
            api: "XianJinBaoGetType",
            hideToast: true
        }, (res)=>{
            let _data = [];
            for(let x in res.data) {
                _data.push({
                    key: x,
                    value: res.data[x]
                })
            }
            this.setState({
                typeData: _data
            })
        })
    }

    /**
     * 产品类型,记录key值
     * @param key
     */
    onChangeType(key) {
        this.setState({
            type: key
        })
    }

	/**
     * 关闭筛选,并请求数据
     */
    closeFilterHandle() {
        this.setState({
            drawerOpen: false,
        }, ()=>{
            this.getXianJinBaoGetProductList();
        })
    }

	/**
     * 重置筛选条件
     */
    resetFilterHandle() {
        this.setState({
            type: ""
        })
    }

	/**
     * 打开筛选
     */
    openFilterHandle() {
        this.setState({
            drawerOpen: true
        })
    }

	/**
     * 搜索输入
     * @param val
     */
    onChangeSearch(val) {
        this.setState({
            searchVal: val.trim()
        }, ()=>{
            this.filterData();
        })
    }

	/**
     * 搜索提交,不请求数据,前端搜索
     * @param event
     */
    searchSubmit(event) {
        event.preventDefault()||(event.returnValue=false);//阻止表单提交的页面刷新行为
        this.filterData();
    }

	/**
     * 前端搜索处理
     */
    filterData() {
        let { searchVal, listData, oListData } = this.state;
        let _listData = oListData.filter((item)=> (item.fundName + item.fundId ).indexOf(searchVal) > -1);
        this.setState({
            listData: _listData,
        })
    }

    /**
     * 匹配搜索结果高亮
     */
    formatName(name) {
        let { searchVal } = this.state;
        let _arr = name.toString().split("");
        _arr.map((item, index)=>{
            if(searchVal.indexOf(item) > -1) {
                _arr[index] = <Text key={index} className="color_ui">{item}</Text>
            }
        });
        return _arr
    }

	/**
     * 触发选择
     */
    handleSelect() {
        this.setState({
            selectOpen: true
        })
    }
    /**
     * 关闭选择
     */
    closeSelect() {
        this.setState({
            selectOpen: false
        })
    }

	/**
     * 发送至汇聊
     */
    sendHuiLiao() {
        let { selectedProductId } = this.state;
        if(selectedProductId) {
            this.context.router.push({
                pathname: '/ShareProductKeHuList',
                query: {
                    id: selectedProductId
                }
            });
        }
    }

	/**
     * 选择数据,单选
     */
    selectProduct(fundId, rowData) {
        let { selectOpen, oListData } = this.state;
        //只允许编辑状态下选择
        if(selectOpen) {
            this.setState({
                selectedProductId: fundId,
                selectedProduct: rowData
            })
        }

    }

    renderRow = (rowData, sectionID, rowID) => {
        let { selectOpen, selectedProductId } = this.state;
        return (
            <Flex align="start" style={{padding: '.15rem',borderBottom: '1px solid #f5f5f5'}} onClick={()=>this.selectProduct(rowData.fundId, rowData)}>
                {
                    selectOpen && <div
                        className={["iconfont1", selectedProductId === rowData.fundId ? "iconradiobtnsel color_ui" : "iconradiobtn colorC", "fs_16 mr_5"].join(' ')}
                    ></div>
                }
                <div style={{flex: 1}}>
                    <Flex justify="between" className="mb_10">
                        <div className="color333 fs_16" style={{width: '2.5rem', overflow: 'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}} >
                            { this.formatName(rowData.fundName) }({ this.formatName(rowData.fundId) })
                        </div>
                        <div className="color_ui fs_14">
                            · { rowData.fundStatusName }
                        </div>
                    </Flex>
                    <Flex justify="between">
                        <div className="color999 fs_14" >
                            { rowData.fundTypeDisplayName }
                        </div>
                        <div className="color999 fs_14">
                            风险级别：{ rowData.fundRiskLevelName }
                        </div>
                    </Flex>
                </div>
            </Flex>
        )

    }

    render() {
        let { listData, typeData, type, searchVal, drawerOpen, selectOpen, height, selectedProductId, selectedProduct } = this.state;
        const sidebar_a = (
            <div>
                <div className="mb_15 mt_15 fs_12 color666" style={{marginLeft: '8px'}}>产品类型</div>
                <Flex justify="start" wrap='wrap' className="htf_flex_3 htf_drawer_tag">
                    {
                        typeData.map((item, index)=>{
                            return <Flex.Item key={index}>
                                <div className={["drawer_tag", item.key === type && "selected"].join(" ")} onClick={()=>this.onChangeType(item.key)}>
                                    { item.value }
                                </div>
                            </Flex.Item>
                        })
                    }
                </Flex>

                <Flex style={{position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: '50px'}}>
                    <Flex.Item style={{flex: 1}}>
                        <div
                            className="ta_c fs_16 color666"
                            style={{background: '#f6f6f6'}}
                            onClick={()=>this.resetFilterHandle()}
                        >
                            重置
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: 1, marginLeft: 0}}>
                        <div
                            className="ta_c fs_16 colorF bg_ui"
                            onClick={()=>this.closeFilterHandle()}
                        >
                            确认
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        );

        return <div>
            <Drawer
                className="my-drawer-a"
                style={{ minHeight: document.documentElement.clientHeight, position: 'relative' }}
                enableDragHandle
                sidebar={sidebar_a}
                sidebarStyle={{zIndex: 1001, width: '80%', backgroundColor: '#fff'}}
                overlayStyle={{zIndex: 1000}}
                dragHandleStyle={{width: 0}}
                position="right"
                open={ drawerOpen }
                onOpenChange={()=>this.closeFilterHandle()}
            >

                <Flex className="htf_searchBar_filter2" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                    <Flex.Item className="search-input-wrap">
                        <span className="search-synthetic-ph-icon"></span>
                        <form onSubmit={(event) => this.searchSubmit(event)}>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="基金名称/ 基金代码"
                                onChange={ (e)=>this.onChangeSearch(e.target.value) }
                                value={ searchVal }
                            />
                        </form>
                    </Flex.Item>

                    <Flex.Item style={{marginLeft: '15px'}}>
                        <Flex
                            className={["search-filter", type && 'isSelected'].join(' ')}
                            onClick={()=>this.openFilterHandle()}
                        >
                            <Text className={["sr"].join(" ")}>筛选</Text>
                            <div className="sr_icon ml_5 iconfont1 iconshaixuan-meiyoutiaojian"></div>
                        </Flex>
                    </Flex.Item>
                </Flex>

                {
                    selectedProduct && <div style={{position: 'fixed', top: '50px', left: '0', right: '0',zIndex:'999', backgroundColor: '#fff'}}>
                        <div style={{lineHeight: '20px', paddingLeft: '.1rem'}} className="bg_f6 fs_12 color999">已选择产品</div>
                        { this.renderRow(selectedProduct) }
                    </div>
                }

                {
                    selectedProduct && <div style={{height: '95px'}}></div>
                }

                <div style={{height: '50px'}}></div>
                <WhiteSpace style={{height: '10px'}} className="bg_f6"/>


                {
                    (listData.length == 0) ?
                        <div ref={el => this.lv = el} style={{ textAlign: 'center', padding: '2rem 0' }}>没有相关数据</div> :
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(listData)}
                            renderRow={this.renderRow}
                            scrollRenderAheadDistance={500}
                            onEndReachedThreshold={100}
                            renderFooter={() => (<div style={{ textAlign: 'center' }}>
                                没有更多了
                            </div>)}
                            style={{
                                height: height,
                                overflow: 'auto'
                            }}
                        />
                }

                {
                    !selectOpen && <div
                        className="bg_ui"
                        style={{width:'.5rem', height: '.5rem', borderRadius: '50%', position: 'fixed', bottom: '.26rem', right: '.26rem', textAlign: 'center', lineHeight: '.5rem'}}
                        onClick={()=>this.handleSelect()}
                    >
                        <div className="iconfont1 iconbianji fs_24 colorF"></div>
                    </div>
                }

                {
                    selectOpen && <Flex style={{position: 'fixed', bottom: 0, left: 0, right: 0, lineHeight: '50px'}}>
                        <Flex.Item style={{flex: 1}}>
                            <div
                                className="ta_c fs_16 color666"
                                style={{background: '#f6f6f6'}}
                                onClick={()=>this.closeSelect()}
                            >
                                取消
                            </div>
                        </Flex.Item>
                        <Flex.Item style={{flex: 1, marginLeft: 0}}>
                            <div
                                className={["ta_c fs_16 colorF", selectedProductId ? "bg_ui" : "bg_cc"].join(' ')}
                                onClick={()=>this.sendHuiLiao()}
                            >
                                发送至汇聊
                            </div>
                        </Flex.Item>
                    </Flex>
                }

            </Drawer>
        </div>
    }
}

export default ShareProduct;