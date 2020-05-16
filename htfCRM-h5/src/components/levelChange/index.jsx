import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Module from '../../lib/module';
import moment from 'moment';
import { Tabs, WhiteSpace,SearchBar,Badge,ListView,WingBlank,Flex,List,Calendar, Modal,Button } from 'antd-mobile';
import { type } from 'os';


class LevelChange extends Module {
    constructor(props, context) {
        super(props, context);
        this.state={
            tabStatus: '待处理',       //默认"待处理",提交中文
            listData:[],            //列表数据
            oListData:[],       //原生数据
            managerList: [],    //客户经理数据
            startTime: moment().subtract(1, 'days').format('YYYY/MM/DD'),      //开始时间
            endTime: moment().format('YYYY/MM/DD'),        //结束时间
            sysuserid: '',      //客户经理id
            key: '',            //模糊查询筛选字段
            height: document.documentElement.clientHeight,
            managerListShow: false,
            minDate: moment('2005/08/24').format('YYYY/MM/DD'),      //
            sysuserName: '',      //客户经理name
            isChangeDateStyle:false,   //筛选日期样式是否改变    false不变  true改变
            isChangeManagerStyle:false, //筛选客户经理样式       false不变  true改变
            hasMore:true,
            date: moment().format('YYYY/MM/DD'),
            calendarShow:false,
            result:'',                 //true 可以选择客户经理选项  false  不可选择客户经理选项 
            pageIndex:1,
            changeManagerArrowDir: false, //false 向下 true 向上
            changeCalendarArrowDir: false  //false 向下 true 向上
        }
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei
        });

		/**
         * 先查询用户经理
         * result:true 允许修改客户经理,进入时查询全部
         * result:false  不允许客户修改,进入时显示返回数据list第一条数据
         */
        this.getLevelChangeManager((res)=>{
            //判断跳转入口  0为代办事项入口
            if (this.props.location.query.currentId === '0') {
                this.setState({
                    startTime: moment(res.data.startTime).format('YYYY/MM/DD'),
                    endTime: moment(res.data.endTime).format('YYYY/MM/DD')
                })
            }
        });
    }

    /**
     * 客户经理数据
     **/
    getLevelChangeManager(cb){
        this.request({
            api:'GetLevelChangeManager'
        },(res)=>{
            console.log(res)
            this.setState({
                managerList: res.data.list,
                result: res.data.result,
                sysuserName: res.data.list[0].name,
                sysuserid: res.data.list[0].id
            }, ()=>{
                this.getLevelChangeTodo(cb);
            })
        })
    }
    
    /**
     * 获取list数据
     **/
    getLevelChangeTodo(cb){
        let _params = {
            appointmentid: this.props.location.query.appointmentid || '',              //待办事项id(string)
            startTime: this.state.startTime,                  //开始时间（string）
            endTime: this.state.endTime,                    //结束时间(string)
            sysuserid: this.state.sysuserid,                  //客户经理id(string) 默认值为空字符串，如果归因分析页面客户经理可以筛选，则传入客户经理id。如果不可筛选，后端代码从待办中获取负责人id
            key: this.state.key,                    //模糊查询筛选字段(string)  默认值为空字符串
            changeState: this.state.tabStatus,            //状态筛选(string)  默认值：待处理
            currentId: this.props.location.query.currentId || '22',                  //当前页面筛选客户经理查询列表(string) 默认值为0：从待办页面跳转到列表。如果为其它值，则从当前页面筛选客户经理查询
        };
        console.log('入参---》', _params);
        this.request({
            api: 'GetLevelChangeList',
            params:_params
        },(res)=>{
            console.log('-=-=', res)
            this.changeTilte(res.data.list[0] ? (res.data.list[0].ownerName ? `升降级客户处理(${res.data.list[0].ownerName})` : `升降级客户处理`) : `升降级客户处理`)
            this.setState({
                listData: res.data.list,
                oListData: res.data.list
            },()=>{
                cb && cb(res);
            })
        })
        
    }



    //tab切换
    handletabChange = (a) =>{
        this.setState({
            tabStatus: a.key
        }, ()=>{
            this.getLevelChangeTodo()
        });
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div style={{padding: '.15rem',borderBottom: '1px solid #f5f5f5'}} onClick={() => this.jump(rowData.id)}>
                <Flex justify="between" className="mb_10">
                    <div className="color333 fs_16" style={{width: '2.5rem', overflow: 'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}} >
                        {rowData.title}
                    </div>
                    <div className="color_ui fs_16">
                        · {rowData.changeType}
                    </div>
                </Flex>
                <Flex justify="between">
                    <div className="color999 fs_14" >
                        {rowData.changeState}
                    </div>
                    <div className="color999 fs_14">
                        {rowData.changeDate}
                    </div>
                </Flex>
            </div>
        )
    }

    onEndReached = () => {
    }

    jump(id) {
        console.log(id);
        this.context.router.push({
            pathname: '/LevelChangeDetail',
            query:{
                id
            }
        })
    }

    getCalendar(){
        this.setState({
            calendarShow:true,
            isChangeDateStyle: true,
            changeCalendarArrowDir:true
        })
    }

    onCancel(){
        this.setState({
            calendarShow:false,
            changeCalendarArrowDir: false
        })
    }

    //时间选择确认
    onConfirm(startDate,endDate){
        this.setState({
            calendarShow:false,
            changeCalendarArrowDir: false,
            startTime:moment(startDate).format('YYYY/MM/DD'),
            endTime:moment(endDate).format('YYYY/MM/DD')
        }, ()=>{
            this.getLevelChangeTodo()
        })
    }

    //客户经理选择框
    handleShowManager(){
        if(!this.state.result){return ;}
        this.setState((preState) => {
            return {
                managerListShow: !preState.managerListShow,
                isChangeManagerStyle: true,
                changeManagerArrowDir: !preState.changeManagerArrowDir 
            }
        })
    }

    //客户经理选择
    handleManagerSelected(id, name) {
        this.setState({
            managerListShow: false,
            sysuserid: id,
            sysuserName: name
        }, ()=>{
            this.getLevelChangeTodo()
        })
    }

    render() {
       let { oListData, hasMore, height, date, listData, managerList, result, key } = this.state
        return <div>

            <div className="htf_searchBar_style3" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                <SearchBar
                    placeholder="客户名称"
                    onChange={ (val)=>this.setState({key: val}) }
                    onClear={() => { this.setState({key: ''}, ()=>this.getLevelChangeTodo())} }
                    onCancel={() => { this.setState({key: ''}, ()=>this.getLevelChangeTodo())} }
                    onSubmit={ () => this.getLevelChangeTodo() }
                />
            </div>

            <div style={{ position: 'fixed', zIndex: '999', left: '0', right: '0', top: '51px', borderTop: '1px solid #ddd' }}>
                <Tabs
                    initialPage={2}
                    tabs={[
                        { title: <Badge>全部</Badge>, value:'全部', key: '全部' },
                        { title: <Badge>已处理</Badge>, value:'已处理', key: '已处理' },
                        { title: <Badge>待处理</Badge>, value:'待处理', key:'待处理' }
                    ]}
                    onChange={this.handletabChange}
                >
                </Tabs>
            </div>

            <div style={{height: '93.5px'}}></div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            <Flex style={{borderBottom: '1px solid #f6f6f6', padding: '.1rem 0', lineHeight: '.2rem'}}>
                <Flex.Item style={{flex: 1}}>
                    <div style={{position: 'relative'}}>
                        <div className={["ta_c",  this.state.isChangeManagerStyle ? "color_ui": 'color999'].join(' ')} onClick={()=>{this.handleShowManager()}}>
                            <span>{this.state.sysuserName || "客户经理"}</span>
                            <span className={["iconfont1", this.state.changeManagerArrowDir ? "iconzhankai" : "iconyoushaixuanxiang","fs_12"].join(' ')} style={{paddingLeft:'2px'}}></span>
                        </div>

                        {
                            this.state.managerListShow &&
                            <div style={{position:'absolute', top:'.31rem', left: 0, height: document.documentElement.clientHeight, width: document.documentElement.clientWidth, zIndex: 999}}>
                                <Flex justify="start" wrap='wrap'  style={{position: 'relative', zIndex: 1001, backgroundColor: '#fff', padding: '12px 7px'}}>
                                    {
                                        managerList.map((item, index)=>{
                                            return <Flex.Item key={index} style={{flexGrow: 0, flexBasis:"25%", marginLeft: '0'}}>
                                                <div
                                                    className={[item.id === this.state.sysuserid ? 'color_ui' : 'color333', "fs_12" ].join(' ')}
                                                    onClick={()=>this.handleManagerSelected(item.id, item.name)}
                                                    style={{
                                                    lineHeight: '38px',
                                                    backgroundColor: item.id === this.state.sysuserid ? '#fdf7ea' : '#eee',
                                                    textAlign: 'center',
                                                    margin: '.05rem'
                                                    }}>

                                                    {item.name}
                                                </div>
                                            </Flex.Item>
                                        })
                                    }
                                </Flex>
                                <div
                                    onClick={()=>this.setState({managerListShow: false})}
                                    style={{position: 'absolute', top:0, left: 0, right: 0, bottom:0, backgroundColor: 'rgba(0,0,0,.4)', zIndex: 1000,}}></div>
                            </div>
                        }

                    </div>
                </Flex.Item>

                <Flex.Item style={{flex: 2}}>
                    <div className={["ta_c", this.state.isChangeDateStyle ? "color_ui" : 'color999'].join(' ')} onClick={()=>{this.getCalendar()}}>
                        <span>{this.state.startTime}-{this.state.endTime}</span>
                        <span className={["iconfont1", this.state.changeCalendarArrowDir ? "iconzhankai" : "iconyoushaixuanxiang", "fs_12"].join(' ')} style={{ paddingLeft: '2px' }}></span>
                    </div>
                </Flex.Item>
            </Flex>
            
            {
                (oListData.length == 0 && !hasMore) ?
                    <div ref={el => this.lv = el} style={{ textAlign: 'center', padding: '2rem 0' }}>没有相关数据</div> :
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(listData)}
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
            
            <div className="HTF_calendar">

                <Calendar
                    visible={this.state.calendarShow}
                    onCancel={()=>{this.onCancel()}}
                    onConfirm={(startDate,endDate)=>{this.onConfirm(startDate,endDate)}}
                    minDate={new Date(this.state.minDate)}
                    maxDate={new Date()}
                    /* renderHeader = {()=>{return <WingBlank>
                        <Flex style={{padding:'7px 0'}}>
                            <Flex.Item style={{textAlign:"left"}}>x</Flex.Item>
                            <Flex.Item style={{textAlign:'center'}}>日期选择</Flex.Item>
                            <Flex.Item style={{textAlign:'right'}}>清除</Flex.Item>
                        </Flex>
                    </WingBlank>}} */
                />
            </div>

        </div>
    }
}

export default LevelChange;