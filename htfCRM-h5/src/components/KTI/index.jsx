import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Module from '../../lib/module'
import { WhiteSpace, Flex, ListView, SearchBar, Text, Drawer, Toast } from 'antd-mobile';

class KTI extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: [],
            progressData: [],
            frequencyData: [],
            stateData: [],
            progressSelected: "",
            frequencySelected: "",
            stateSelected: "",
            searchValue:"",

            drawerOpen: false,
            hasMore: true,
            isLoading: false,
            height: document.documentElement.clientHeight,
            pageIndex:1,

        }
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.changeTilte("KTI");
        this.setState({
            height:hei
        });
        Toast.loading('数据加载中...', 0);
        this.getKTIList(()=>{
            Promise.all([
                this.getKTIProgressPromise(),
                this.getKTIFrequencyPromise(),
                this.getKTIStatuPromise()
            ]).then((res)=>{
                Toast.hide();
                this.handleData(res);
            })
        })

    }

    /**
     * 获取列表数据
     */
    getKTIList(cb) {
        let { pageIndex, listData, progressSelected, frequencySelected, stateSelected, searchValue } = this.state;
        let _hasMore = true, _listData = this.deepClone(listData);
        let _params={
            pageIndex: pageIndex,
            pageSize: 10,
            name: searchValue,
            progress: progressSelected,
            frequency: frequencySelected,
            stu: stateSelected
        };
        console.log(_params)
        this.request({
            api: "GetKTIList",
            hideToast: cb && true,
            params: _params
        }, (res)=>{
            let data = res.data;
            console.log(data, pageIndex)
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
                hasMore: _hasMore,
                listData: _listData,
                isLoading: false,
            })
            cb && cb();
        })
    }

    /**
     * 获取进度下拉框数据
     */
    getKTIProgressPromise() {
        return this.requestPromise({
            api: "GetKTIProgress",
            hideToast: true
        })
    }

    /**
     * 获取更新频率下拉框数据
     */
    getKTIFrequencyPromise() {
        return this.requestPromise({
            api: "GetKTIFrequency",
            hideToast: true
        })
    }
    /**
     * 获取状态下拉框数据
     */
    getKTIStatuPromise() {
        return this.requestPromise({
            api: "GetKTIStatu",
            hideToast: true
        })
    }

    handleData(res) {
        let data0 = res[0].data;
        let data1 = res[1].data;
        let data2 = res[2].data;
        let _progressData = [], _frequencyData=[], _stateData=[];
        for(let x in data0) {
            _progressData.push({
                key: x,
                value: data0[x]
            })
        }
        for(let x in data1) {
            _frequencyData.push({
                key: x,
                value: data1[x]
            })
        }
        for(let x in data2) {
            _stateData.push({
                key: x,
                value: data2[x]
            })
        }
        this.setState({
            progressData: _progressData,
            frequencyData: _frequencyData,
            stateData: _stateData
        })
    }

    closeFilterHandle() {
        this.setState({
            drawerOpen: false,
            pageIndex: 1,
        }, ()=>{
            this.getKTIList();
        })
    }

    resetFilterHandle() {
        this.setState({
            progressSelected: "",
            frequencySelected: "",
        })
    }

    openFilterHandle() {
        this.setState({
            drawerOpen: true
        })
    }

	/**
     * 进度选择,记录key值
     * @param key
     */
    onChangeProgress(key) {
        this.setState({
            progressSelected: key
        })
    }

    /**
     * 更新频率,记录key值
     * @param key
     */
    onChangeFrequency(key) {
        this.setState({
            frequencySelected: key
        })
    }

    /**
     * 更新频率,记录key值
     * @param key
     */
    onChangeState(key) {
        this.setState({
            stateSelected: key
        })
    }

    onEndReached = () => {
        console.log('-----')
        if(!this.state.isLoading) {
            this.setState({
                pageIndex: ++this.state.pageIndex,
                isLoading: true,
            }, ()=>{
                this.getKTIList();
            })
        }
    }

    onChangeSearch(val) {
        this.setState({
            searchValue: val.trim()
        })
    }

    searchSubmit(event) {
        event.preventDefault()||(event.returnValue=false);//阻止表单提交的页面刷新行为
        this.setState({
            pageIndex: 1,
        }, ()=>{
            this.getKTIList();
        });
    }

    jump(id) {
        this.context.router.push({
            pathname: '/KTIDetail',
            query: {
                id
            }
        })
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div style={{padding: '.15rem',borderBottom: '1px solid #f5f5f5'}} onClick={() => this.jump(rowData.id)}>
                <Flex justify="between" className="mb_10">
                    <div className="color333 fs_16" style={{width: '2.5rem', overflow: 'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}} >
                        {rowData.name}
                    </div>
                    <div className="color_ui fs_14">
                        · 进度 : {rowData.progress}
                    </div>
                </Flex>
                <Flex justify="between">
                    <div className="color999 fs_14" >
                        更新频率：{rowData.frequency}
                    </div>
                    <div className="color999 fs_14">
                        负责人：{rowData.ownerName}
                    </div>
                </Flex>
            </div>
        )

    }

    render() {
        const { listData, progressData, frequencyData, stateData, progressSelected, frequencySelected, stateSelected, hasMore, isLoading, height, searchValue } = this.state;
        const sidebar_a = (
            <div>
                <div className="mb_15 mt_15 fs_12 color666" style={{marginLeft: '8px'}}>进度</div>
                <Flex justify="start" wrap='wrap' className="htf_flex_3 htf_drawer_tag">
                    {
                        progressData.map((item, index)=>{
                            return <Flex.Item key={index}>
                                <div className={["drawer_tag", item.key===progressSelected && "selected"].join(" ")} onClick={()=>this.onChangeProgress(item.key)}>
                                    { item.value }
                                </div>
                            </Flex.Item>
                        })
                    }
                </Flex>

                <WhiteSpace style={{height: '1px'}} className="bg_f6 mb_15"/>

                <div className="mb_15 mt_15 fs_12 color666" style={{marginLeft: '8px'}}>更新频率</div>
                <Flex justify="start" wrap='wrap' className="htf_flex_3 htf_drawer_tag">
                    {
                        frequencyData.map((item, index)=>{
                            return <Flex.Item key={index}>
                                <div className={["drawer_tag", item.key===frequencySelected && "selected"].join(" ")} onClick={()=>this.onChangeFrequency(item.key)}>
                                    { item.value }
                                </div>
                            </Flex.Item>
                        })
                    }
                </Flex>

                <div className="mb_15 mt_15 fs_12 color666" style={{marginLeft: '8px'}}>状态</div>
                <Flex justify="start" wrap='wrap' className="htf_flex_3 htf_drawer_tag">
                    {
                        stateData.map((item, index)=>{
                            return <Flex.Item key={index}>
                                <div className={["drawer_tag", item.key===stateSelected && "selected"].join(" ")} onClick={()=>this.onChangeState(item.key)}>
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
                open={this.state.drawerOpen}
                onOpenChange={()=>this.closeFilterHandle()}
            >

                <Flex className="htf_searchBar_filter2" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                    <Flex.Item className="search-input-wrap">
                        <span className="search-synthetic-ph-icon"></span>
                        <form onSubmit={(event) => this.searchSubmit(event)}>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="KTI名称"
                                onChange={ (e)=>this.onChangeSearch(e.target.value) }
                                value={ searchValue }
                            />
                        </form>
                    </Flex.Item>

                    <Flex.Item style={{marginLeft: '15px'}}>
                        <Flex
                            className={["search-filter", (progressSelected || frequencySelected) &&'isSelected'].join(' ')}
                            onClick={()=>this.openFilterHandle()}
                        >
                            <Text className={["sr"].join(" ")}>筛选</Text>
                            <div className="sr_icon ml_5 iconfont1 iconshaixuan-meiyoutiaojian"></div>
                        </Flex>
                    </Flex.Item>
                </Flex>

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
                                {isLoading ? '加载中...' : ''}
                                {!hasMore && '没有更多了'}
                            </div>)}
                            style={{
                                height: height,
                                overflow: 'auto'
                            }}
                        />
                }

            </Drawer>

        </div>
    }
}

export default KTI;