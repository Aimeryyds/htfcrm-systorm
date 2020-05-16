import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'
import moment from 'moment';
import FixedButtom from '../widget/fixedbutton';
import { WingBlank, WhiteSpace, Flex, Grid, Button, ListView, SearchBar,Tabs, Drawer, List, Tag, Calendar } from 'antd-mobile';
import FixedButton from '../widget/fixedbutton';

const dateFormat = 'YYYY-MM-DD';
const placeholderMap = {
    "a": "拜访对象名称/拜访主题",
    "b": "客户名称/短信内容",
    "c": "邮件标题",
    "d": "任务名称/服务内容",
    // "e": "消息内容",
    "f": "活动标题/活动内容",
    "g": "礼品名称/礼品内容"
};

class ServeList extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            height: document.documentElement.clientHeight-93.5,
            // initialPage: Number(window.localStorage.serveListTab)|| 0,
            tabs: [
                {title: '拜访记录', value: "a", key: 'a'},
                {title: '短信记录', value: "b", key: 'b'},
                {title: '邮件记录', value: "c", key: 'c'},
                {title: '电话记录', value: "d", key: 'd'},
                // {title: '即时通讯', value: "e", key: 'e'},
                {title: '活动记录', value: "f", key: 'f'},
                {title: '礼品记录', value: "g", key: 'g'}
            ],
            tabVal: window.localStorage.serveListTab || "a",      //tabs值

            pageIndex: 1,
            totalNumber: 0,     //总数量
            isLoading: false,
            hasMore: true,
            drawerOpenA: false,      //第一层筛选抽屉
            drawerOpenB: false,      //第二层发送人抽屉
            calendarShow: false,        //日期选择器显示

            startdate: '',          //开始时间
            enddate: '',            //结束时间
            startdate2: '',          //开始时间-第二组时间
            enddate2: '',            //结束时间-第二组时间
            dateType: 0,            //0:第一组时间 1:第二组时间

            listData: [],           //列表数据
            searchContent: '',      //搜索框内容

            nameKey: '',            //操作人、发送人搜索入参
            personnelList: [],       //操作人、发送人
            creator: '',        //发送人ID
            creatorName: '',        //发送人名字
            creator2: '',        //发送人ID-第二组
            creatorName2: '',        //发送人名字-第二组
            personneType: 0,            //0:第一组 1:第二组

            optname: '',        //活动来源
            calltype: '',       //呼叫方向
            status: '',         //发送状态
            calloutcontent: ''  //外呼类型


        }
    }

    componentDidMount() {
        this.changeTilte("接触记录");
        this.getDataHandle();
    }
    componentWillUnmount(){
        window.localStorage.setItem('serveListTab', this.state.tabVal);
    }

	/**
     * 更具tabs决定去请求什么数据
     * tabVal为tab位置
     * 目前隐藏即时通讯(5),5之后向前移动一位
     */
    getDataHandle() {
        let { tabVal } = this.state;
        switch (tabVal) {
            case "a":
                this.getDataList1();
                break;
            case "b":
                this.getDataList2();
                break;
            case "c":
                this.getDataList3();
                break;
            case "d":
                this.getDataList4();
                break;
            case "e":
                this.getDataList5();
                break;
            case "f":
                this.getDataList6();
                break;
            case "g":
                this.getDataList7();
                break;
        }
    }

	/**
     * 处理拜访记录数据
     * @param Entities
     */
    handleDataList1(data) {
        let  _data=[];
        for(let x of data){
            _data.push({
                id: x["ID"],
                name: x['OBJECTNAME']
            })
        }
        _data = this.state.listData.concat(_data);
        return _data;
    }

    /**
     * 获取拜访记录-列表
     */
    getDataList1() {
        let {urltype, managerid} = this.props.location.query; 
        urltype = urltype || 1;
        this.request({
            api:'ServeList',
            params: {
                pageIndex: this.state.pageIndex,
                pageSize: 18,
                Key: this.state.searchContent,
                custno: this.props.location.query.no || '',
                urltype,
                managerid,
                // type: "1",
            }
        }, (res)=>{
            console.log(res);
            this.setState({
                totalNumber:res.data.TotalRecordCount,
                listData: this.handleDataList1(res.data.Entities),
                isLoading: false,
                hasMore: res.data.Entities.length < 18 ? false : true
            })
        })
    }

    /**
     * 获取短信记录
     */
    getDataList2() {
        this.request({
            api:'QueryMessageRecord',
            params: {
                custname: this.state.searchContent,     //客户名称
                content: this.state.searchContent,      //短信内容
                creator: this.state.creatorName,        //发送人
                spstatus: this.state.status,           //发送状态
                startdate: this.state.startdate,          //开始时间
                enddate: this.state.enddate,            //结束时间
                pageSize: 10,
                toPage: this.state.pageIndex,
                custno: this.props.location.query.no || '',
            }
        }, (res)=>{
            let data = res.data;
            this.setState({
                totalNumber: data.pageInfo.totalNumber,
                listData: this.handleData(data.data),
                isLoading: false,
                hasMore: (JSON.stringify(data.data) === "{}") ? false : true
            })
        })
    }

    /**
     * 获取邮件记录
     */
    getDataList3() {
        console.log(this.state.status)
        this.request({
            api:'QueryEmailRecord',
            params: {
                topic: this.state.searchContent,
                brokername: this.state.creatorName, //发送人
                status: this.state.status,  //发送状态
                startdate: this.state.startdate,          //开始时间
                enddate: this.state.enddate,            //结束时间
                pageSize: 10,
                toPage: this.state.pageIndex,
                accotype: '1',          //收件人类型
                acco: this.props.location.query.no || '',
            }
        }, (res)=>{
            let data = res.data;
            this.setState({
                totalNumber: data.pageInfo.totalNumber,
                listData: this.handleData(data.data),
                isLoading: false,
                hasMore: (JSON.stringify(data.data) === "{}") ? false : true
            })
        })
    }

    /**
     * 获取电话记录
     */
    getDataList4() {
        this.request({
            api:'QueryPhoneTouchRecord',
            params: {
                taskname: this.state.searchContent,     //任务名称
                content: this.state.searchContent,      //服务名称
                agentname: this.state.creatorName,      //操作人员
                calloutcontent: this.state.calloutcontent,     //外呼类型
                calltype: this.state.calltype,       //呼叫方向
                startdate: this.state.startdate,      //开始时间
                enddate: this.state.enddate,        //结束时间
                pageSize: 10,
                toPage: this.state.pageIndex,
                searchtype: '1',
                custno: this.props.location.query.no || ''
            }
        }, (res)=>{
            let data = res.data;
            this.setState({
                totalNumber:data.totalNumber,
                listData: this.handleData(data.data),
                isLoading: false,
                hasMore: data.data.length <= 10 ? false : true
            })
        })
    }

    /**
     * 获取即时通讯
     */
    getDataList5() {
        this.request({
            api:'InstantMessagingRecord',
            type: 'post',
            params: {
                from: this.state.startdate,       //开始时间, 开始时间距离结束时间不得超过３０天
                to: this.state.enddate,         //结束时间
                // content: this.state.searchContent,     //消息内容
                customNo: this.props.location.query.no || ''
            }
        }, (res)=>{
            this.setState({
                totalNumber: res.data.length,
                listData: res.data,
                isLoading: false,
                hasMore: false
            })
        })
    }

    /**
     * 获取活动记录
     */
    getDataList6() {
        this.request({
            api:'QueryActivityTouchRecord',
            params: {
                caption: this.state.searchContent,        //活动标题
                content: this.state.searchContent,        //活动内容
                contactor: this.state.creatorName,      //联系人姓名
                optname: this.state.optname,     //活动来源
                creator: this.state.creatorName2,       //创建人

                startdate4Start: this.state.startdate,      //活动开始日期-s
                enddate4start: this.state.enddate,        //活动开始日期-2

                startdate4end: this.state.startdate2,      //活动结束日期-s
                enddate4end: this.state.enddate2,        //活动结束日期-e

                pageSize: 10,
                toPage: this.state.pageIndex,
                searchtype: '1',
                custno: this.props.location.query.no || '',
            }
        }, (res)=>{
            let data = res.data;
            this.setState({
                totalNumber:data.totalNumber || 0,
                listData: this.handleData(data.data),
                isLoading: false,
                hasMore: data.data.length <= 10 ? false : true
            })
        })
    }

    /**
     * 获取礼品记录
     */
    getDataList7() {
        this.request({
            api:'QueryPresentRecord',
            params: {
                sender: this.state.creatorName,     //发送人
                recipient: this.state.creatorName2,      //接收人
                pageSize: 10,
                toPage: this.state.pageIndex,
                presentname: this.state.searchContent,
                custno: this.props.location.query.no || '',
                searchtype: 1
            }
        }, (res)=>{
            let data = res.data;
            this.setState({
                totalNumber: data.totalNumber || 0,
                listData: this.handleData(data.data),
                isLoading: false,
                hasMore: data.data.length <= 10 ? false : true,
            })
        })
    }

	/**
     * 发送人、操作人实时搜索
     */
    getPersonnelList() {
        this.request({
            api: 'GetPersonnelList',
            params: {
                nameKey: this.state.nameKey
            }
        }, (res)=>{
            this.setState({
                personnelList: res.data
            })
        })
    }

	/**
     * 返回数据处理
     * @param data
     * @returns {Array}
     */
    handleData(data) {
        let { pageIndex } = this.state;
        let _data = [];
        if(JSON.stringify(data.data) === "{}") {
            _data = this.state.listData;
        } else {
            _data = this.state.listData.concat(data);
        }
        return _data;
    }

	/**
     * 搜索框文字输入
     * @param e
     */
    searchChange = (e) => {
        this.setState({
            searchContent: e.target.value.trim(),
            pageIndex: 1,
            listData: []
        }, () => {
            this.getDataHandle();
        })
    }

	/**
     * 搜索框提交
     */
    searchSubmit = (event) => {
        event.preventDefault();     //阻止from提交时跳转页面
        this.setState({
            pageIndex: 1,
            listData: []
        }, () => {
            this.getDataHandle();
        })

    }

	/**
     * 操作人、发送人搜索
     * @param e
     */
    nameKeyChange = (e) => {
        this.setState({
            nameKey: e.target.value
        }, ()=>{
            this.getPersonnelList();
        })
    }

	/**
     * 操作人、联系人选择
     * @param id
     */
    selectedNameKey(id, name) {
        let { personneType } = this.state;
        if(personneType === 1) {
            this.setState({
                creator2: id,
                creatorName2: name,
                drawerOpenB: false
            })
        } else {
            this.setState({
                creator: id,
                creatorName: name,
                drawerOpenB: false
            })
        }

    }

	/**
     * 跳转详情页
     * @param id
     */
    jump(id, type, obj) {
        let storage = window.localStorage;
        if(type === '5') {
            let _data = JSON.stringify(id);
            //即时通讯通讯消息通过缓存带入详情,需要在返回的时候清楚下缓存
            storage.setItem('serveMessageDetail', _data);
            this.context.router.push({
                pathname: '/ServeDetail',
                query: {
                    type: type
                }
            })
        } else {
            this.context.router.push({
                pathname: '/ServeDetail',
                query: {
                    id,
                    type: type,
                    address: obj.address
                }
            })
        }

    }

	/**
     * 滑动到最底部后被触发
     * @returns {boolean}
     */
    onEndReached = () => {
        if(!this.state.hasMore){ return false; }
        this.setState({
            pageIndex: ++this.state.pageIndex,
            isLoading: true,
        }, ()=>{
            this.getDataHandle()
        })

    }

	/**
     * tabs切换
     * 并且在缓存中记录当前tabs位置
     */
    tabsChange(tab, index) {
        let storage=window.localStorage;
        storage.setItem('serveListTab', tab['value']);
        //即时通讯默认时间区域为30天
        this.setState({
            tabVal: tab['value'],
            pageIndex: 1,
            totalNumber: 0,     //总数量
            isLoading: true,
            hasMore: true,
            drawerOpenA: false,      //第一层筛选抽屉
            drawerOpenB: false,      //第二层发送人抽屉
            calendarShow: false,        //日期选择器显示

            spstatus: '',           //发送状态

            startdate: tab['value'] === 'e' ? moment().subtract(30, 'days').format('YYYY-MM-DD') : '',          //开始时间
            enddate: tab['value'] === 'e' ? moment().subtract(0, 'days').format('YYYY-MM-DD') : '',            //结束时间
            startdate2: '',          //开始时间-第二组时间
            enddate2: '',            //结束时间-第二组时间
            dateType: 0,            //0:第一组时间 1:第二组时间

            listData: [],           //列表数据
            searchContent: '',      //搜索框内容

            nameKey: '',            //操作人、发送人搜索入参
            personnelList: [],       //操作人、发送人
            creator: '',        //发送人ID
            creatorName: '',        //发送人名字
            creator2: '',        //发送人ID-第二组
            creatorName2: '',        //发送人名字-第二组
            personneType: 0,            //0:第一组 1:第二组

            optname: '',        //活动来源
            calltype: '',       //呼叫方向
            status: '',         //发送状态
            calloutcontent: ''  //外呼类型
        }, ()=>{
            this.getDataHandle();
        })
    }

	/**
     * 筛选-打开
     */
    openFilterHandle() {
        this.setState({
            drawerOpenA: true
        })
    }

    /**
     * 筛选-关闭
     */
    closeFilterHandle() {
        this.setState({
            drawerOpenA: false,
            pageIndex: 1,
            isLoading: true,
            hasMore: true,
            listData: []
        }, ()=>{
            this.getDataHandle();
        })
    }

	/**
     * 筛选-重置
     */
    resetFilterHandle() {
        this.setState({
            nameKey: '',
            startdate: '',          //开始时间
            enddate: '',            //结束时间
            startdate2: '',          //开始时间-第二组时间
            enddate2: '',            //结束时间-第二组时间
            creator: '',        //发送人ID
            creatorName: '',        //发送人名字
            creator2: '',        //发送人ID-第二组
            creatorName2: '',        //发送人名字-第二组
            optname: '',        //活动来源,
            calltype: '',       //呼叫方向
            status: '',         //发送状态
            calloutcontent: '',  //外呼类型
        })
    }

	/**
     * 更多发送人-打开或者关闭
     */
    moreSender(type) {
        this.setState({
            drawerOpenB: !this.state.drawerOpenB,
            personneType: type
        }, ()=>{
            this.getPersonnelList();
        })
    }

    /**
     * 触发发送时间选择
     * type: 0:第一组时间 1:第二组时间
     */
    sendDateHandle(type) {
        this.setState({
            calendarShow: !this.state.calendarShow,
            dateType: type
        })
    }

    /**
     * 关闭日期选择器
     */
    onCancelCalendar = () => {
        this.setState({
            calendarShow: !this.state.calendarShow
        })
    }

    /**
     * 日期选择器确认
     */
    onConfirmCalendar = (s, e) => {
        if(this.state.dateType === 0) {
            this.setState({
                calendarShow: !this.state.calendarShow,
                startdate: moment(s).format(dateFormat),
                enddate: moment(e).format(dateFormat)
            })
        }
        if(this.state.dateType === 1) {
            this.setState({
                calendarShow: !this.state.calendarShow,
                startdate2: moment(s).format(dateFormat),
                enddate2: moment(e).format(dateFormat)
            })
        }

    }

    /**
     *  列表渲染
     */
    renderRow = (rowData, sectionID, rowID) => {
        let { tabVal } = this.state;
        console.log(rowData);
        if(tabVal === "a") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData.id, "1", rowData)}>
                        <Flex>
                            <Flex.Item>
                                <span className="fs_16 color333">
                                    { rowData.name ||'----' }
                                </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

        if(tabVal === "b") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData.serialno, "2", rowData)}>
                        <Flex className="mb_10">
                            <Flex.Item>
                            <span className="fs_16 color333">
                                { rowData.custname||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r">
                            <span className="fs_12 color_ui">
                                { rowData.spstatus === "0" ? "成功" : '失败' }
                            </span>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 3}}>
                            <span className="fs_12 color999">
                                发送人:
                                { rowData.brokername ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item style={{flex: 3}}>
                            <span className="fs_12 color999">
                                优先级:
                                { rowData.prioritystr ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r" style={{flex: 4}}>
                            <span className="fs_12 color999">
                                { rowData.senddate ||'----' }
                            </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

        if(tabVal === "c") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData.id,  "3", rowData)}>
                        <Flex className="mb_10">
                            <Flex.Item>
                            <span className="fs_16 color333">
                                { rowData.topic||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r">
                            <span className="fs_12 color_ui">
                                { rowData.status }
                            </span>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 3}}>
                            <span className="fs_12 color999">
                                发送人:
                                { rowData.usercode ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item style={{flex: 3}}>
                            <span className="fs_12 color999">
                                优先级:
                                { rowData.prioritystr ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r" style={{flex: 4}}>
                            <span className="fs_12 color999">
                                { rowData.senddate ||'----' }
                            </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

        if(tabVal === "d") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData.serialno, "4", rowData)}>
                        <Flex className="mb_10">
                            <Flex.Item>
                            <span className="fs_16 color333">
                                { rowData.taskname ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r">
                            <span className="fs_12 color_ui">
                                { rowData.calltype === "1" ? "去电" : "来电" }
                            </span>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}>
                            <span className="fs_12 color999">
                                操作人员:
                                { rowData.agentname ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item style={{flex: 1}}>
                            <span className="fs_12 color999">
                                外呼类型:
                                { rowData.calloutcontent ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r" style={{flex: 1}}>
                            <span className="fs_12 color999">
                                { rowData.date ||'----' }
                            </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

        if(tabVal === "e") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData, "5", rowData)}>
                        <Flex className="mb_10">
                            <Flex.Item>
                                <span className="fs_16 color333">
                                    { rowData.content ||'---' }
                                </span>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 3}}>
                                <span className="fs_12 color999">
                                    发送人:
                                    { rowData.fromName ||'---' }
                                </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r" style={{flex: 4}}>
                                <span className="fs_12 color999">
                                    { moment(rowData.sendtime).format('YYYY/MM/DD') ||  '---' }
                                </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

        if(tabVal === "f") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData.serialno, "6", rowData)}>
                        <Flex className="mb_10">
                            <Flex.Item>
                                <span className="fs_16 color333">
                                    { rowData.caption ||'----' }
                                </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r">
                                <span className="fs_12 color_ui">
                                    { rowData.optname }
                                </span>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}>
                                <span className="fs_12 color999">
                                    联系人姓名:
                                    { rowData.contactor ||'----' }
                                </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r" style={{flex: 1}}>
                                <span className="fs_12 color999">
                                    创建人:
                                    { rowData.creator ||'----' }
                                </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

        if(tabVal === "g") {
            return (
                <WingBlank className="list-row" key={rowID} style={{borderBottom: '1px solid #f6f6f6'}}>
                    <WhiteSpace size="lg"/>
                    <div onClick={()=>this.jump(rowData.serialno, "7", rowData)}>
                        <Flex className="mb_10">
                            <Flex.Item>
                                <span className="fs_16 color333">
                                    { rowData.presentname||'----' }
                                </span>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 3}}>
                            <span className="fs_12 color999">
                                接收人:
                                { rowData.recipient ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item style={{flex: 3}}>
                            <span className="fs_12 color999">
                                发送人:
                                { rowData.sender ||'----' }
                            </span>
                            </Flex.Item>
                            <Flex.Item className="ta_r" style={{flex: 4}}>
                            <span className="fs_12 color999">
                                { rowData.senddate ||'----' }
                            </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }

    }


    render() {
        let state = this.state;
        let now = new Date();

        const sidebar_a = (
            <div>
                {
                    (state.tabVal === "b" || state.tabVal === "c" || state.tabVal === "g") &&
                    <div>
                        <h4 className="ml_10">发送人</h4>
                        <div style={{margin: '0 .1rem'}}>
                            <div className="htf_select_a" onClick={()=>this.moreSender(0)}>
                                { state.creatorName }
                            </div>
                        </div>
                    </div>
                }

                {
                    (state.tabVal === "d") &&
                    <div>
                        <h4 className="ml_10">操作人员</h4>
                        <div style={{margin: '0 .1rem'}}>
                            <div className="htf_select_a" onClick={()=>this.moreSender(0)}>
                                { state.creatorName }
                            </div>
                        </div>
                    </div>
                }

                {
                    (state.tabVal === "f") &&
                    <div>
                        <h4 className="ml_10">联系人姓名</h4>
                        <div style={{margin: '0 .1rem'}}>
                            <div className="htf_select_a" onClick={()=>this.moreSender(0)}>
                                { state.creatorName }
                            </div>
                        </div>
                    </div>
                }

                {
                    (state.tabVal === "b" ) &&
                    <div>
                        <h4 className="ml_10">发送状态</h4>
                        <Tag
                            className="ml_10"
                            selected={state.status === "0"}
                            onChange={()=>{
                                this.setState({
                                    status: "0"
                                })
                            }}
                        >成功</Tag>
                        <Tag
                            selected={state.status === "1"}
                            onChange={()=>{
                                this.setState({
                                    status: "1"
                                })
                            }}
                            className="ml_10"
                        >失败</Tag>
                    </div>
                }

                {
                    ( state.tabVal === "c") &&
                    <div>
                        <h4 className="ml_10">发送状态</h4>
                        <Tag
                            className="ml_10"
                            selected={state.status === "0"}
                            onChange={()=>{
                                this.setState({
                                    status: "0"
                                })
                            }}
                        >未发送</Tag>
                        <Tag
                            selected={state.status === "1"}
                            onChange={()=>{
                                this.setState({
                                    status: "1"
                                })
                            }}
                            className="ml_10"
                        >发送成功</Tag>
                        <Tag
                            selected={state.status === "2"}
                            onChange={()=>{
                                this.setState({
                                    status: "2"
                                })
                            }}
                            className="ml_10"
                        >发送失败</Tag>
                    </div>
                }

                {
                    (state.tabVal === "d") &&
                    <div>
                        <h4 className="ml_10">外呼类型</h4>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "常规外呼"}
                            onChange={()=>{this.setState({calloutcontent: "常规外呼"})}}
                        >常规外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "新基金外呼"}
                            onChange={()=>{this.setState({calloutcontent: "新基金外呼"})}}
                        >新基金外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "持续营销外呼"}
                            onChange={()=>{this.setState({calloutcontent: "持续营销外呼"})}}
                        >持续营销外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "其他专项外呼"}
                            onChange={()=>{this.setState({calloutcontent: "其他专项外呼"})}}
                        >其他专项外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "渠道外呼"}
                            onChange={()=>{this.setState({calloutcontent: "渠道外呼"})}}
                        >渠道外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "VIP外呼"}
                            onChange={()=>{this.setState({calloutcontent: "VIP外呼"})}}
                        >VIP外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "专户外呼"}
                            onChange={()=>{this.setState({calloutcontent: "专户外呼"})}}
                        >专户外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "投资者适当性管理"}
                            onChange={()=>{this.setState({calloutcontent: "投资者适当性管理"})}}
                        >投资者适当性管理</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "直销外呼"}
                            onChange={()=>{this.setState({calloutcontent: "直销外呼"})}}
                        >直销外呼</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "外呼接听"}
                            onChange={()=>{this.setState({calloutcontent: "外呼接听"})}}
                        >外呼接听</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "客户营销"}
                            onChange={()=>{this.setState({calloutcontent: "客户营销"})}}
                        >客户营销</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "现金宝主动服务"}
                            onChange={()=>{this.setState({calloutcontent: "现金宝主动服务"})}}
                        >现金宝主动服务</Tag>
                        <Tag
                            className="ml_10 mb_10"
                            selected={state.calloutcontent === "定投外呼"}
                            onChange={()=>{this.setState({calloutcontent: "定投外呼"})}}
                        >定投外呼</Tag>


                        <h4 className="ml_10">呼叫方向</h4>
                        <Tag
                            className="ml_10"
                            selected={state.calltype === "0"}
                            onChange={()=>{
                                this.setState({
                                    calltype: "0"
                                })
                            }}
                        >来电</Tag>
                        <Tag
                            className="ml_10"
                            selected={state.calltype === "1"}
                            onChange={()=>{
                                this.setState({
                                    calltype: "1"
                                })
                            }}
                        >去电</Tag>
                    </div>
                }

                {
                    (state.tabVal === "f") &&
                    <div>
                        <h4 className="ml_10">活动来源</h4>
                        <Tag
                            className="ml_10"
                            selected={state.optname === "日常活动"}
                            onChange={()=>{
                                this.setState({
                                    optname: "日常活动"
                                })
                            }}
                        >
                            日常活动
                        </Tag>
                        <Tag
                            className="ml_10"
                            selected={state.optname === "营销活动"}
                            onChange={()=>{
                                this.setState({
                                    optname: "营销活动"
                                })
                            }}
                        >
                            营销活动
                        </Tag>
                    </div>
                }

                {
                    (state.tabVal === "f") &&
                    <div>
                        <h4 className="ml_10">创建人</h4>
                        <div style={{margin: '0 .1rem'}}>
                            <div className="htf_select_a" onClick={()=>this.moreSender(1)}>
                                { state.creatorName2 }
                            </div>
                        </div>
                    </div>
                }

                {
                    (state.tabVal === "g") &&
                    <div>
                        <h4 className="ml_10">接收人</h4>
                        <div style={{margin: '0 .1rem'}}>
                            <div className="htf_select_a" onClick={()=>this.moreSender(1)}>
                                { state.creatorName2 }
                            </div>
                        </div>
                    </div>
                }

                {
                    (state.tabVal === "b" || state.tabVal === "c" || state.tabVal === "d" || state.tabVal === "e") &&
                    <div>
                        <h4 className="ml_10">发送日期</h4>
                        <div className="htf_calendar-range ml_10">
                            <div className="left-range" onClick={()=>this.sendDateHandle(0)}>
                                { state.startdate || '开始时间' }
                            </div>
                            <div className="left-text">至</div>
                            <div className="right-range" onClick={()=>this.sendDateHandle(0)}>
                                { state.enddate || '结束时间' }
                            </div>
                        </div>
                    </div>
                }

                {
                    (state.tabVal === "f" ) &&
                    <div>
                        <h4 className="ml_10">活动开始时间</h4>
                        <div className="htf_calendar-range ml_10">
                            <div className="left-range" onClick={()=>this.sendDateHandle(0)}>
                                { state.startdate || '开始时间' }
                            </div>
                            <div className="left-text">至</div>
                            <div className="right-range" onClick={()=>this.sendDateHandle(0)}>
                                { state.enddate || '结束时间' }
                            </div>
                        </div>

                        <h4 className="ml_10">活动结束时间</h4>
                        <div className="htf_calendar-range ml_10">
                            <div className="left-range" onClick={()=>this.sendDateHandle(1)}>
                                { state.startdate2 || '开始时间' }
                            </div>
                            <div className="left-text">至</div>
                            <div className="right-range" onClick={()=>this.sendDateHandle(1)}>
                                { state.enddate2 || '结束时间' }
                            </div>
                        </div>
                    </div>
                }

                <Flex style={{position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: '40px'}}>
                    <Flex.Item style={{flex: 1}}>
                        <div
                            className="ta_c color666"
                            style={{background: '#f6f6f6'}}
                            onClick={()=>this.resetFilterHandle()}
                        >
                            重置
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: 1, marginLeft: 0}}>
                        <div
                            className="ta_c colorF"
                            style={{background: '#108ee9'}}
                            onClick={()=>this.closeFilterHandle()}
                        >
                            确认
                        </div>
                    </Flex.Item>
                </Flex>

            </div>
        );

        const sidebar_b = (
            <div>
                <div className="htf_searchBar_filter">
                    <div className="search-wrap">
                        <span className="search-synthetic-ph-icon"></span>
                        <form onSubmit={this.searchSubmit}>
                            <input
                                className="search-input"
                                type="text"
                                onChange={this.nameKeyChange}
                                value={state.nameKey}
                            />
                        </form>
                    </div>
                </div>
                <List>
                    {state.personnelList.map((i, index) => {
                        if (index === 0) {
                            return (<List.Item onClick={()=>this.selectedNameKey(i.id, i.username)} key={index} multipleLine >{i.username}</List.Item>);
                        }
                        return (<List.Item onClick={()=>this.selectedNameKey(i.id, i.username)} key={index} >{i.username}</List.Item>);
                    })}
                </List>
            </div>
        );

        return <div className="N_customer_List">

            {/** 更多发送人2层抽屉 **/}
            <Drawer
                className="my-drawer-b"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                sidebar={sidebar_b}
                sidebarStyle={{zIndex: 1003, width: '80%', backgroundColor: '#fff'}}
                overlayStyle={{zIndex: 1002}}
                dragHandleStyle={{width: 0}}
                position="right"
                open={state.drawerOpenB}
                onOpenChange={()=>this.moreSender()}
            >

                {/** 筛选抽屉 **/}
                <Drawer
                    className="my-drawer-a"
                    style={{ minHeight: document.documentElement.clientHeight, position: 'relative' }}
                    enableDragHandle
                    sidebar={sidebar_a}
                    sidebarStyle={{zIndex: 1001, width: '80%', backgroundColor: '#fff'}}
                    overlayStyle={{zIndex: 1000}}
                    dragHandleStyle={{width: 0}}
                    position="right"
                    open={state.drawerOpenA}
                    onOpenChange={()=>this.closeFilterHandle()}
                >

                    <div style={{position: 'fixed', zIndex: '999', left: '0', right: '0', top: '0'}}>
                        <Tabs
                            tabs={state.tabs}
                            initialPage={state.tabVal}
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                            onChange={(tab, index) => this.tabsChange(tab, index) }
                        >
                        </Tabs>
                    </div>

                    <div className="htf_searchBar_filter"
                         style={{position: 'fixed', top: '43.5px', left: '0', right: '0',zIndex:'999'}}
                    >
                        <div className="search-wrap">
                            <span className="search-synthetic-ph-icon"></span>
                            <form onSubmit={this.searchSubmit}>
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder={placeholderMap[state.tabVal]}
                                    onChange={this.searchChange}
                                    value={state.searchContent}
                                />
                            </form>
                            {
                                (state.tabVal !== "a") &&
                                <div
                                    className={["search-filter", (state.spstatus || state.startdate || state.startdate2 || state.creatorName || state.creatorName2 || state.optname || state.calltype || state.status || state.calloutcontent) && 'isSelected'].join(' ')}
                                    onClick={()=>this.openFilterHandle()}
                                >
                                    <span className="sl">| </span>
                                    <span className="sr">筛选</span>
                                </div>
                            }

                        </div>
                    </div>


                    <div style={{height: '93.5px'}}></div>

                    {
                        /**
                         * 列表数据展示
                         */
                        (state.totalNumber == 0 && !state.hasMore)  ?
                            <div ref={el => this.lv = el} style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> :
                            <ListView
                                ref={el => this.lv = el}
                                dataSource={
                                    new ListView.DataSource({
                                        rowHasChanged: (row1, row2) => row1 !== row2
                                    }).cloneWithRows(state.listData)
                                }
                                renderRow={this.renderRow}
                                scrollRenderAheadDistance={500}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={10}
                                initialListSize={18}
                                renderFooter={() => (<div style={{ textAlign: 'center' }}>
                                    {this.state.isLoading ? '加载中...' : ''}
                                    {!this.state.hasMore && '没有更多了'}
                                </div>)}
                                style={{
                                    height: state.height,
                                    overflow: 'auto'
                                }}
                            />

                    }

                </Drawer>

            </Drawer>


            <Calendar
                visible={state.calendarShow}
                onCancel={this.onCancelCalendar}
                onConfirm={this.onConfirmCalendar}
                defaultDate={now}
                maxDate={new Date(+now)}
                style={{zIndex: 1010, position: 'relative'}}
            />
            { state.tabVal == 'a' && <FixedButton onClick={() => {this.context.router.push({
                pathname:'EditVisit',
                query:{
                    type: 0,
                }
            })}} position={{right:' 5%', bottom:'5%'}} imageClass='add-button'/>}
        </div>
    }
}

export default ServeList;

