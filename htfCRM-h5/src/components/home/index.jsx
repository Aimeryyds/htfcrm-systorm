import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WhiteSpace, Flex, Tabs, Modal } from 'antd-mobile';
import EnterIcon from './enterIcon'

const dataMap = {
    "qianke":{
        url: "/QKList",
        icon: "icon_img_qianke",
        name: '潜客'
    },
    "kehu":{
        url: "/SKList",
        icon: "icon_img_kehu",
        name: '客户列表'
    },
    "lianxiren":{
        url: "/LinkMan",
        icon: "icon_img_lianxiren",
        name: '联系人'
    },
    "jingzhengduishou":{
        url: "/JZList",
        icon: "icon_img_jingzhengduishou",
        name: '竞争对手'
    },
    "jijinchanpin":{
        url: "/JJList",
        icon: "icon_img_jijinchanpin",
        name: '产品基础信息'
    },
    "shangjiguanli":{
        url: "/ECommerce",
        icon: "icon_img_shangjiguanli",
        name: '未上线项目'
    },
    "jijinjingli":{
        url: "/ManagerFile",
        icon: "icon_img_jijinjingli",
        name: '基金经理档案'
    },
    "daibanshixiang":{
        url: "/ToDoList",
        icon: "icon_img_daibanshixiang",
        name: '待办事项'
    },
    "shichangyingxiao":{
        url: "/ActivityList",
        icon: "icon_img_shichangyingxiao",
        name: '市场营销活动'
    },
    "baifangjilu":{
        url: "/ServeList",
        icon: "icon_img_baifangjilu",
        name: '拜访记录'
    },
    "kehudengji":{
        url: "/LevelAnalyze",
        icon: "icon_img_kehudengji",
        name: '客户等级'
    },
    "kehufenpai":{
        url: "/Khfp",
        icon: "icon_img_kehufenpai",
        name: '客户分派'
    },
    "kehujingli":{
        url: "/Kehujingli",
        icon: "icon_img_kehujingli",
        name: '客户经理'
    },
    "zijinliuxiangtongji":{
        url: "/FundFlow",
        icon: "icon_img_zijinliuxiangtongji",
        name: '资金流向统计'
    },
    "kehujinglipaiming":{
        url: "/ManagerQuantityA",
        icon: "icon_img_kehujinglipaiming",
        name: '客户经理分析'
    },
    "kehupaiming":{
        url: "/TopTenRank",
        icon: "icon_img_kehupaiming",
        name: '客户排名'
    },
    "liushiwanhui":{
        url: "/LossBack",
        icon: "icon_img_liushiwanhui",
        name: '流失挽回'
    },
    "ipo":{
        url: "/IPOList",
        icon: "icon_img_ipo",
        name: 'IPO录入'
    },
    "shengoushuhui":{
        url: "/ECommerce",
        icon: "icon_img_shengoushuhui",
        name: '电商实时数据'
    },
    "sanfangbaifang":{
        url: "/ThreeVisitA",
        icon: "icon_img_sanfangbaifang",
        name: '三方拜访数据'
    },
    "chanpinjingzhiribao":{
        url: "/NetDaily",
        icon: "icon_img_chanpinjingzhiribao",
        name: '产品净值日报'
    },
    "zhuanxiangxiaoshoujihua":{
        url: "/SpecialSales",
        icon: "icon_img_zhuanxiangxiaoshoujihua",
        name: '专项销售计划'
    },
    "shengjiangjikehu":{
        url: "/LevelChange",
        icon: "icon_img_shengjiangjikehu",
        name: '客户升降级'
    },
    "sanfangipofenxi":{
        url: "/TripartiteIpoAnalysis",
        icon: "icon_img_sanfangipofenxi",
        name: 'IPO录入分析'
    },
    "qiandao":{
        icon: "icon_img_qiandao",
        name: '拜访签到',
        url: ''
    },
    "kti":{
        url: '/KTI',
        icon: "icon_img_shangjiguanli",
        name: 'KTI'
    },
    "waihukehufenxi":{
        url: '/CallOutReport',
        icon: "icon-img-waihukehufenxi",
        name: '外呼客户分析'
    },
};

const filer = {
    "客户分析": ["zijinliuxiangtongji", "kehupaiming", "kehufenpai", "kehudengji", "liushiwanhui", "waihukehufenxi"],
    "BD工作分析": ["kehujinglipaiming"],
    "营销分析": ["sanfangbaifang"],
    "产品分析": ["shengoushuhui", "sanfangipofenxi"],
    "客户管理": ["qianke", "kehu", "lianxiren", "shengjiangjikehu"],
    "团队管理": ["kehujingli"],
    "销售管理": ["jingzhengduishou", "shangjiguanli"],
    "营销管理": ["zhuanxiangxiaoshoujihua", "ipo"],
    "产品管理": ["jijinchanpin", "chanpinjingzhiribao", "jijinjingli"],
    "服务管理": ["baifangjilu" ],
    "工作管理": ["daibanshixiang"],
    "绩效管理": ["kti"]

    // "营销管理": ["shichangyingxiao", "ipo", "zhuanxiangxiaoshoujihua"],
};

class Home extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menusRules: {
                "qianke": false,            //潜客
                "kehu": false,              //客户列表
                "lianxiren": false,         //联系人
                "jingzhengduishou": false,  //竞争对手
                "jijinchanpin": false,      //基金产品管理
                "shangjiguanli": false,     //项目管理
                "jijinjingli": false,       //基金经理档案
                "daibanshixiang": false,    //代办事项
                "shichangyingxiao": false,  //市场营销活动
                "baifangjilu": false,       //拜访记录
                "kehudengji": false,          //客户等级
                "kehufenpai": false,            //客户分派
                'kehujingli': false,        //客户经理
                'zijinliuxiangtongji': false,              //资金流向
                'kehujinglipaiming': false,        //客户经理排名
                'kehupaiming': false,              //客户排名
                'liushiwanhui': false,               //流失挽回
                'ipo': false,                 //ipo
                'qiandao': false,                     //签到
                'shengoushuhui': false,         //电商申购
                'sanfangbaifang': false,         //三方拜访
                'chanpinjingzhiribao': false,       //产品净值日报
                'zhuanxiangxiaoshoujihua': false,     //专项销售计划
                'shengjiangjikehu': false,     //升降级客户
                'sanfangipofenxi': false,      //三方ipo分析,
                'kti': false,
                'waihukehufenxi': false,        //外呼客户分析
            },
            isLoad: false,
            tabFixed: false,        //是否固定tabs
            tabKey: '客户管理',
            bottomHolder: 0,
            tabsData: [],
            newAPPData: [],     //最新应用
            recentData: [],     //最近使用
            stSelected: ""      //管理视图筛选
        }
    }

    componentDidMount() {
        this.changeTilte("CRM首页");
        this.clearTabHistory();
        Promise.all([
            this.GetUserIndexMenus(),       //权限查询
            this.GetNewRecord(),            //最新应用
            this.GetEntranceRecord()        //最近使用记录
        ]).then((res)=>{
            this.handleData(res);
            this.handleScroll(window);  //注意:这里必须执行一次
        });
        window.addEventListener('scroll', this.handleScroll);  //监听滚动事件
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    //当回到首页时,清空所有记录的tab状态
    clearTabHistory() {
        let storage=window.localStorage;
        storage.removeItem('SkListTab');
        storage.removeItem('SkListTabIndex');
        storage.removeItem('SkListLevel');
        storage.removeItem('SkListManage');

        storage.removeItem('QkListTab');
        storage.removeItem('QkListTabIndex');

        storage.removeItem('JJListTab');
        storage.removeItem('JJListTabIndex');

        storage.removeItem('view360Tab');
        storage.removeItem('todoListTab');
        storage.removeItem('JZListTab');
        storage.removeItem('serveListTab');
    }

    handleData(res) {
        let data0 = res[0].data;
        let data1 = res[1].data.list || [];
        let data2 = res[2].data;
        let _menusRules = {};
        data0.map((item, index) => {
            _menusRules[item.Key] = item.Value;
        });
        this.handleTabs(_menusRules);

        // Modal.alert("权限:" + JSON.stringify(data0));
        // Modal.alert("最新:" + JSON.stringify(data1));
        // Modal.alert("最近:" + JSON.stringify(data2));
        // this.appRoleLog(JSON.stringify(data0), JSON.stringify(data1), JSON.stringify(data2));



        this.setState({
            menusRules: _menusRules,
            newAPPData: data1,
            recentData: data2,
            isLoad: true
        })
    }

    handleTabs(data) {
        let _arr = [];
        if(data.zijinliuxiangtongji || data.kehupaiming || data.kehufenpai || data.kehudengji || data.liushiwanhui || data.kehujinglipaiming || data.sanfangbaifang || data.shengoushuhui || data.chanpinjingzhiribao ) {
            _arr.push({title: '管理视图', value:'homeST', key: '管理视图'});
        }
        if(data.qianke || data.kehu || data.lianxiren || data.shengjiangjikehu ) {
            _arr.push({title: '客户管理', value:'homeKH', key: '客户管理'});
        }
        if(data.kehujingli) {
            _arr.push({title: '团队管理', value:'homeTD', key: '团队管理'});
        }
        if(data.jingzhengduishou || data.shangjiguanli ) {
            _arr.push({title: '销售管理', value:'homeXS', key: '销售管理'});
        }
        if(data.shichangyingxiao || data.ipo || data.zhuanxiangxiaoshoujihua ) {
            _arr.push({title: '营销管理', value:'homeYX', key: '营销管理'});
        }
        if(data.jingzhengduishou || data.chanpinjingzhiribao || data.jijinjingli ) {
            _arr.push({title: '产品管理', value:'homeCP', key: '产品管理'});
        }
        if(data.baifangjilu || data.qiandao) {
            _arr.push({title: '服务管理', value:'homeFW', key: '服务管理'});
        }
        if(data.daibanshixiang) {
            _arr.push({title: '工作管理', value:'homeGZ', key: '工作管理'});
        }
        if(data.kti) {
            _arr.push({title: '绩效管理', value:'homeJX', key: '绩效管理'});
        }


        this.setState({
            tabsData: _arr
        })

    }

    //获取用户权限
    GetUserIndexMenus() {
        return this.requestPromise({
            api: 'GetUserIndexMenus',
            hideToast: true
        })
    }

    /**
     * 获取最新应用
     * @constructor
     */
    GetNewRecord() {
        return this.requestPromise({
            api: 'GetAppEntryConfiguration',
            hideToast: true
        })
    }

    /**
     * 最近使用记录
     * @constructor
     */
    GetEntranceRecord() {
        return this.requestPromise({
            api: 'GetEntranceRecord',
            hideToast: true
        })
    }

    /**
     * 点击打点
     * @constructor
     */
    CreateEntranceRecord(id, name) {
        let _params = {
            entranceId: id,
            entranceName: name,   //入口名称
        };
        this.request({
            api: 'CreateEntranceRecord',
            params: _params
        }, ()=>{
            this.signIn();
        })

    }

    signIn() {
        console.log("--签到")
        //签到
        this.request({
            api: 'GetUserInfo',
        }, (res) => {
            let id = res.data.id;
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            
            if (!id) { return; }

            if (isAndroid && window.AndroidHtfPortal.IappSignIn) {
                window.AndroidHtfPortal.IappSignIn(id);
            }
            if (isiOS && window.webkit) {
                window.webkit.messageHandlers.IappSignIn.postMessage(id);
            }
        })
    }
	/**
	 * 浏览器滚动回调
     * @constructor
     */
    handleScroll = (event) => {
        const tabMap = ['管理视图', '客户管理', '团队管理', '销售管理', '营销管理', '产品管理', '服务管理', '工作管理', '绩效管理' ];
        let _tabFixed, _tabKey=tabMap[0], _bottomHolder=0;

        // 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 视窗高度
        const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 页面高度
        // const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 距离页面底部的高度
        // const height = scrollHeight - scrollTop - clientHeight;
        //顶部模块高度
        const homeTOP = document.getElementById('homeTOP') ? document.getElementById('homeTOP').clientHeight : false;
        //管理视图距离顶部高度
        const homeST = document.getElementById('homeST') ? document.getElementById('homeST').offsetTop-43.5 : false;
        //客户管理距离顶部高度
        const homeKH = document.getElementById('homeKH') ? document.getElementById('homeKH').offsetTop-43.5 : false;
        //团队管理距离顶部高度
        const homeTD = document.getElementById('homeTD') ? document.getElementById('homeTD').offsetTop-43.5 : false;
        //销售管理距离顶部高度
        const homeXS = document.getElementById('homeXS') ? document.getElementById('homeXS').offsetTop-43.5 : false;
        //营销管理距离顶部高度
        const homeYX = document.getElementById('homeYX') ? document.getElementById('homeYX').offsetTop-43.5 : false;
        //产品管理距离顶部高度
        const homeCP = document.getElementById('homeCP') ? document.getElementById('homeCP').offsetTop-43.5 : false;
        //服务管理距离顶部高度
        const homeFW = document.getElementById('homeFW') ? document.getElementById('homeFW').offsetTop-43.5 : false;
        //工作管理距离顶部高度
        const homeGZ = document.getElementById('homeGZ') ? document.getElementById('homeGZ').offsetTop-43.5: false;
        //绩效管理距离顶部高度
        const homeJX = document.getElementById('homeJX') ? document.getElementById('homeJX').offsetTop-43.5: false;


        if(scrollTop >= homeTOP) {
            _tabFixed = true;
        } else {
            _tabFixed = false;
        }

        if(scrollTop >= homeKH && scrollTop < homeTD) {
            _tabKey=tabMap[1]
        } else if(scrollTop >= homeTD && scrollTop < homeXS) {
            _tabKey=tabMap[2]
        } else if(scrollTop >= homeXS && scrollTop < homeYX) {
            _tabKey=tabMap[3]
        } else if(scrollTop >= homeYX && scrollTop < homeCP) {
            _tabKey=tabMap[4]
        } else if(scrollTop >= homeCP && scrollTop < homeFW) {
            _tabKey=tabMap[5]
        } else if(scrollTop >= homeFW && scrollTop < homeGZ) {
            _tabKey=tabMap[6]
        } else if(scrollTop >= homeGZ && scrollTop < homeJX) {
            _tabKey=tabMap[7]
        } else if(scrollTop >= homeJX-5) {
            _tabKey=tabMap[8]
        }

        _bottomHolder = clientHeight -  document.getElementsByClassName('homeGrow')[document.getElementsByClassName('homeGrow').length -1].clientHeight -40.5;

        this.setState({
            tabFixed: _tabFixed,
            tabKey: _tabKey,
            bottomHolder: _bottomHolder
        });
    }

    //tabs切换
    tabsChange = (tab, index) => {

        let _top = document.getElementById(tab.value).offsetTop-43;
        // document.body.scrolltop ? (document.body.scrolltop = _top) : (document.documentElement.scrollTop = _top);
        this.setState({
            tabFixed: true,
        }, ()=>{
            window.scrollTo(0,_top);
        })

    }

    /**
     *  管理视图筛选
     **/
    stFilter(name) {
        if(this.state.stSelected===name) {
            this.setState({
                stSelected: ''
            })
        } else {
            this.setState({
                stSelected: name
            })
        }

    }

    // managerJump(){    //客户经理跳转，跳转全判断权限，如果是客户经理就直接跳转到详情页，其他跳转到搜索列表
    //     this.request({
    //         api: 'GetUserNameRole'
    //     }, (res) => {
    //         let roleType = res.roleType;
    //         if(roleType === 0){
    //             this.context.router.push()
    //         }
    //     })
    // }

    render() {
        let { menusRules, isLoad, newAPPData, recentData, stSelected } = this.state;
        let _stSelectedData = [], _allowNewList = [], _allowHistoryList = [], _hasMore=false;
        if(!stSelected) {
            _stSelectedData = _stSelectedData.concat(filer["客户分析"],filer["BD工作分析"],filer["营销分析"],filer["产品分析"])
        } else {
            _stSelectedData = filer[stSelected]
        }
        //只有新应用允许使用权限大于4个时显示更多
        newAPPData.map((item)=>{
            if(menusRules[item.new_AppEntryCode]) {
                _allowNewList.push({
                    new_AppEntryCode: item.new_AppEntryCode,
                    new_AppEntryName: item.new_AppEntryName,
                });
            }
        });
        if(_allowNewList.length > 4) {
            _allowNewList = _allowNewList.slice(0,3);
            _hasMore = true;
        }
        if(_allowNewList.length === 4) {
            _allowNewList = _allowNewList.slice(0,4);
        }

        //最近使用同样需要判断权限
        recentData.map((item)=>{
            if(menusRules[item.new_entrance_id]) {
                _allowHistoryList.push({
                    new_entrance_id: item.new_entrance_id,
                    new_entrance_name: item.new_entrance_name,
                });
            }
        });
        if(_allowHistoryList.length > 8) {
            _allowHistoryList = _allowHistoryList.slice(0,8);
        }

        return <div className="N_home">

            <div id="homeTOP">
                <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
                {
                    _allowNewList.length > 0 &&
                    <div>
                        <WhiteSpace style={{height: '15px'}}/>
                        <Flex style={{paddingLeft: '.15rem', lineHeight: 1, height: '.15rem', overflow: 'hidden'}}>
                            <div style={{fontSize: '.15rem', color: '#333', fontWeight: '200', marginRight: '3px'}}>新应用</div>
                            <div className="iconfont1 iconxinyingyong-jinse home_new-icon"></div>
                        </Flex>
                        <Flex justify="start" wrap='wrap'>
                            {
                                _allowNewList.map((item, index)=>{
                                    return (
                                        <EnterIcon
                                            key={index}
                                            url={ dataMap[item.new_AppEntryCode].url }
                                            icon={ dataMap[item.new_AppEntryCode].icon }
                                            name={ dataMap[item.new_AppEntryCode].name }
                                            id={ item.new_AppEntryCode }
                                            menusRule={ menusRules[item.new_AppEntryCode] }
                                        />
                                    )
                                })
                            }

                            {
                                _hasMore &&
                                <EnterIcon
                                    url={'/NewApp'}
                                    icon={'icon_img_more'}
                                    name={"更多"}
                                    menusRule={ true }
                                />
                            }
                        </Flex>
                        <WhiteSpace style={{height: '5px'}}/>
                        <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
                    </div>
                }

                {
                    _allowHistoryList.length > 0 &&
                        <div>
                            <WhiteSpace style={{height: '15px'}}/>
                            <Flex style={{paddingLeft: '.15rem', lineHeight: 1, height: '.15rem', overflow: 'hidden'}}>
                                <div style={{fontSize: '.15rem', color: '#333', fontWeight: '200'}}>最近使用</div>
                            </Flex>
                            <Flex justify="start" wrap='wrap'>
                                {
                                    _allowHistoryList.map((item, index)=>{
                                        return (
                                            <EnterIcon
                                                key={index}
                                                url={ dataMap[item.new_entrance_id].url }
                                                icon={ dataMap[item.new_entrance_id].icon }
                                                name={ dataMap[item.new_entrance_id].name }
                                                id={ item.new_entrance_id }
                                                menusRule={ menusRules[item.new_entrance_id] }
                                            />
                                        )
                                    })
                                }
                            </Flex>
                            <WhiteSpace style={{height: '5px'}}/>
                            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
                        </div>
                }


            </div>

            <div style={{position: this.state.tabFixed ?'fixed': '', top: '0rem', left: '0', right: '0',zIndex:'999'}}>
                <Tabs
                    tabs={this.state.tabsData}
                    page={this.state.tabKey}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                    onChange={this.tabsChange}
                >
                </Tabs>
            </div>
            { this.state.tabFixed && <div style={{height: '.435rem'}}></div>}


            {/** 管理视图 **/}
            {
                (
                    menusRules.zijinliuxiangtongji ||
                    menusRules.kehupaiming ||
                    menusRules.kehufenpai ||
                    menusRules.kehudengji ||
                    menusRules.liushiwanhui ||
                    menusRules.kehujinglipaiming ||
                    menusRules.sanfangbaifang ||
                    menusRules.shengoushuhui ||
                    menusRules.chanpinjingzhiribao ||
                    menusRules.waihukehufenxi
                ) &&
                <div id="homeST" className="homeGrow">
                    <Flex style={{padding: '.1rem', paddingBottom: '.05rem'}}>
                        {
                            ( menusRules.zijinliuxiangtongji ||
                            menusRules.kehupaiming ||
                            menusRules.kehufenpai ||
                            menusRules.kehudengji ||
                            menusRules.liushiwanhui ||
                            menusRules.waihukehufenxi) &&
                            <div
                                onClick={()=>this.stFilter("客户分析")}
                                className={["st_btn mr_10", this.state.stSelected === "客户分析" && "selected"].join(' ')}
                            >客户分析</div>
                        }
                        {
                            ( menusRules.kehujinglipaiming ) &&
                            <div
                                onClick={()=>this.stFilter("BD工作分析")}
                                className={["st_btn mr_10", this.state.stSelected === "BD工作分析" && "selected"].join(' ')}
                            >BD工作分析</div>
                        }
                        {
                            ( menusRules.sanfangbaifang ) &&
                            <div
                                onClick={()=>this.stFilter("营销分析")}
                                className={["st_btn mr_10", this.state.stSelected === "营销分析" && "selected"].join(' ')}
                            >营销分析</div>
                        }
                        {
                            ( menusRules.shengoushuhui ||
                            menusRules.chanpinjingzhiribao ) &&
                            <div
                                onClick={()=>this.stFilter("产品分析")}
                                className={["st_btn mr_10", this.state.stSelected === "产品分析" && "selected"].join(' ')}
                            >产品分析</div>
                        }
                    </Flex>
                    <Flex justify="start" wrap='wrap'>
                        {
                            _stSelectedData.map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 客户管理 **/
                (
                menusRules.qianke ||
                menusRules.kehu ||
                menusRules.lianxiren ||
                menusRules.shengjiangjikehu
                ) &&
                <div id="homeKH" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>客户管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["客户管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 团队管理 **/
                (menusRules.kehujingli) &&
                <div id="homeTD" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>团队管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["团队管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 销售管理 **/
                (menusRules.jingzhengduishou ||
                menusRules.jijinchanpin ||
                menusRules.shangjiguanli ||
                menusRules.jijinjingli) &&
                <div id="homeXS" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>销售管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["销售管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 营销管理 **/
                (menusRules.ipo ||
                menusRules.zhuanxiangxiaoshoujihua)&&
                <div id="homeYX" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>营销管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["营销管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 产品管理 **/
                (menusRules.jingzhengduishou || menusRules.chanpinjingzhiribao || menusRules.jijinjingli) &&
                <div id="homeCP" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>产品管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["产品管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 服务管理 **/
                (menusRules.baifangjilu ||
                menusRules.qiandao)&&
                <div id="homeFW" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>服务管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            menusRules.qiandao &&
                            <Flex.Item className="module_item">
                                <div
                                    onClick={()=>this.CreateEntranceRecord("qiandao","拜访签到")}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className={["icon-img mb_15", "icon_img_qiandao"].join(' ')}></div>
                                <span className="fs_14 home_text" style={{fontWeight: '200'}}>
                                    拜访签到
                                </span>
                                </div>
                            </Flex.Item>
                        }


                        {
                            filer["服务管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 工作管理 **/
                (menusRules.daibanshixiang) &&
                <div id="homeGZ" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>工作管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["工作管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }

            {
                /** 绩效管理 **/
                (menusRules.kti) &&
                <div id="homeJX" className="homeGrow">
                    <WhiteSpace style={{height: '1px', backgroundColor: '#eee'}}/>
                    <div style={{margin: '.15rem', marginBottom: '.08rem'}}>绩效管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            filer["绩效管理"].map((item, index)=>{
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item].url }
                                        icon={ dataMap[item].icon }
                                        name={ dataMap[item].name }
                                        id={ item }
                                        menusRule={ menusRules[item] }
                                    />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace style={{height: '5px'}}/>
                </div>
            }


            <div style={{height: this.state.bottomHolder+'px'}}></div>

            {
                (
                    !menusRules.qianke &&
                    !menusRules.kehu &&
                    !menusRules.lianxiren &&
                    !menusRules.jingzhengduishou &&
                    !menusRules.jijinchanpin &&
                    !menusRules.shangjiguanli &&
                    !menusRules.jijinjingli&&
                    !menusRules.daibanshixiang &&
                    !menusRules.shichangyingxiao &&
                    !menusRules.baifangjilu &&
                    !menusRules.zijinliuxiangtongji &&
                    !menusRules.kehudengji &&
                    !menusRules.kehufenpai &&
                    !menusRules.ipo &&
                    !menusRules.shengoushuhui &&
                    !menusRules.chanpinjingzhiribao &&
                    !menusRules.zhuanxiangxiaoshoujihua &&
                    !menusRules.shengjiangjikehu &&
                    !menusRules.sanfangipofenxi &&
                    !menusRules.qiandao &&
                    isLoad
                ) &&

                <div style={{position: 'absolute', top: '35%', left: 0, right: 0 }}>
                    <div style={{textAlign: 'center' }}>
                        <img
                            src={require('../../resources/images/zanwuquanxian.png')}
                            style={{width: "1.4rem", height: "1.4rem" }}
                        />
                    </div>
                    <h1 style={{textAlign:'center', fontSize: '15px', fontWeight:'600', margin:'0'}}>暂无访问权限</h1>
                    <div style={{fontSize: '13px', color: '#666', marginTop: '.12rem', textAlign: 'center', color:'#999'  }}>
                        因涉及业务信息的敏感数据
                        <br/>申请访问权限后方可访问
                    </div>
                </div>
            }
            
        </div>
    }
}

export default Home;

//<div style={{color: '#ccc', fontSize: '12px', textAlign: 'center', marginTop: '20px'}}>V 1.0.7</div>
