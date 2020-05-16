import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { WingBlank, Flex, ListView, SearchBar, Tabs,Badge  } from 'antd-mobile';

class ToDoList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabVal: Number(window.localStorage.todoListTab)||0,
            filterBtns:[],
            currentType:-1,
            count:null,
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
        this.changeTilte("待办事项");
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height: hei
        });

        Promise.all([
            this.getTypes(),
            this.getTodoCount(),
        ]).then((res)=>{
            this.setState({
                count:res[1].data.unfinished_count,
            })
        });
    }

    getTypes() {
        this.request({
            api: 'GetTodoType'
        }, (res)=>{
            this.formatTabsData(res.data);
        })
    }

    //处理tabs数据
    formatTabsData(data) {
        let _arr = [];
        for(let x in data) {
            _arr.push({
                title: data[x],
                value: x,
                flag:false,
            })
        }
        this.setState({
            filterBtns: _arr
        }, ()=>{
            this.getTodoList();
        })
    }


    //获取待办事项数量
    getTodoCount(){
        return this.requestPromise({
            api: 'GetTodoCount'
        })
    }

    //获取待办列表
    getTodoList() {
        this.request({
            api: 'GetTodoList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize:10,
                key: this.state.searchValue,
                isFinished:this.state.tabVal-1,
                type:this.state.currentType==-1?-1:this.state.filterBtns[this.state.currentType].value,
            }
        }, (res)=>{
            let {oListData}=this.state;
            console.log(oListData,'oListData')
            if(res.data.Entities.length === 0 &&  this.state.pageIndex > 1 ) {
                this.setState({
                    hasMore: false,
                    isLoading: false
                });
            } else if(this.state.pageIndex === 1){
                if(res.data.TotalRecordCount <= 10){
                    this.setState({
                        hasMore: false,
                        oListData:res.data.Entities,
                    });
                }else{
                    this.setState({
                        oListData:res.data.Entities,
                    });
                }
            } else {
                this.setState({
                    oListData:oListData.concat(res.data.Entities)
                });
            }
            this.setState({
                isLoading: false,
            });
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
            this.getTodoList()
        })


    }

    jump(id) {
        let storage=window.localStorage;
        storage.setItem('todoListTab', this.state.tabVal);
        this.context.router.push({
            pathname: '/TodoListDetail',
            query: {
                id,
                tabVal:this.state.tabVal
            }
        })
    }
    renderRow = (rowData, sectionID, rowID) => {
        return (
            <WingBlank className='todoList-item'>
                <Flex  className="card" onClick={()=>this.jump(rowData.id)} key={rowID} align='center'>
                    <Flex.Item style={{flex: 1.5}}>
                        <div className="img bg_ui_linear">
                            {rowData.type=='提醒'&&<span className="iconfont icon-tixing"></span>}
                            {rowData.type=='审核'&&<span className="iconfont icon-dshenhe"></span>}
                            {rowData.type=='任务'&&<span className="iconfont icon-drenwu"></span>}
                            {rowData.type=='计划'&&<span className="iconfont icon-dbaifangjihua"></span>}
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: 8.5,position:'relative'}}>
                        <div className="title color000 fs_16" style={{width:'70%'}}>
                            {rowData.subject.length>18?rowData.subject.substring(0,18)+'...':(rowData.subject||'----')}
                        </div>
                        <div className="time color999 fs_14" style={{position:'absolute',top:'0',right:0,width:'30%'}}>
                            {rowData.date.substring(0,10)||'---'}
                        </div>
                    </Flex.Item>
                </Flex>
            </WingBlank>
        )

    }

    onEndReached = () => {
        let { isLoading, hasMore } = this.state;
        if (isLoading || !hasMore) {
            return;
        }
        this.setState({
            pageIndex: ++this.state.pageIndex,
            isLoading: true,
        }, ()=>{
            this.getTodoList();
        })
    }

    //tabs
    tabsChange(tab, index) {
        let storage=window.localStorage;
        storage.setItem('todoListTab',index);
        this.setState({
            tabVal: index,
            pageIndex: 1,
            isLoading: false,
            hasMore: true,
        }, ()=>{
            this.getTodoList();
        })
    }

    //未完成tab下类型筛选
    changeFilter(type) {
        if(!this.state.filterBtns[type].flag){
            this.state.filterBtns.map((item,index)=>{
                item.flag=false;
            })
            this.state.filterBtns[type].flag=true;
            this.setState({
                currentType:type,
            }, ()=> {
                this.getTodoList();
            })
        }else{
            this.state.filterBtns[type].flag=false;
            this.setState({
                currentType:-1,
            }, ()=> {
                this.getTodoList();
            })
        }
    }


    render() {
        let { height, oListData, searchValue, count,tabVal,filterBtns,currentType,hasMore } = this.state;

        return <div className="todolist">
            <div className="htf_searchBar_style2"
                 style={{position: 'fixed', top: '0rem', left: '0', right: '0',zIndex:'999'}}
            >

                <SearchBar
                    value={searchValue}
                    placeholder="名称"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getTodoList()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getTodoList()) }}
                    onSubmit={this.onSearchSubmit}
                />

            </div>

            <div style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '0.5rem'}}>
                <Tabs
                    tabs={[
                        {title: <Badge>所有</Badge>, key:0},
                        {title: <Badge text={count}>未完成</Badge>, key:1},
                        {title: <Badge>已完成</Badge>, key:2},
                        {title: <Badge>已取消</Badge>, key:3}
                    ]}
                    page={tabVal}
                    onChange={(tab, index) => this.tabsChange(tab, index) }
                >
                </Tabs>
            </div>
            {
                filterBtns.length!==0&& <div className="module_filter_btns"  >
                    {
                        filterBtns.map((item, index) => {
                            return <div className={["filter_btns", (currentType === index) && 'current'].join(' ')} onClick={()=>this.changeFilter(index)} key={index}>
                                {item.title}
                            </div>
                        })
                    }
                </div>
            }
            <div style={{height: '1.44rem'}}></div>
            {
                (oListData.length == 0 && !hasMore) ?
                    <div ref={el => this.lv = el} style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> :
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={ new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(oListData)}
                        renderRow={this.renderRow}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
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

export default ToDoList;


