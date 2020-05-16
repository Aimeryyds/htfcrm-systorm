import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar, List } from 'antd-mobile';

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

class NewApp extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            newAPPData: [],
            menusRules: {
                "qianke": false,            //潜客
                "kehu": false,              //客户列表
                "lianxiren": false,         //联系人
                "jingzhengduishou": false,  //竞争对手
                "jijinchanpin": false,      //产品基础信息（原基金产品管理）
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
                'qiandao': false,                     //拜访签到
                'shengoushuhui': false,         //电商申购
                'sanfangbaifang': false,         //三方拜访
                'chanpinjingzhiribao': false,       //产品净值日报
                'zhuanxiangxiaoshoujihua': false,     //专项销售计划
                'shengjiangjikehu': false,     //升降级客户
                'sanfangipofenxi': false,      //三方ipo分析
                'kti': false,
                'waihukehufenxi': false,        //外呼客户分析
            },
        }
    }

    componentDidMount() {
        this.changeTilte("新应用");
        this.GetNewRecord();
        Promise.all([
            this.GetUserIndexMenus(),
            this.GetNewRecord()
        ]).then((res)=>{
            let data0 = res[0].data;
            let data1 = res[1].data.list;
            let _menusRules=[];
            data0.map((item, index) => {
                _menusRules[item.Key] = item.Value;
            });
            this.setState({
                menusRules: _menusRules,
                newAPPData: data1,
            })
        })
    }

    /**
     * 点击打点
     * @constructor
     */
    CreateEntranceRecord(id, name) {
        if(id){
            let _params = {
                entranceId: id,
                entranceName: name,   //入口名称
            };
            this.request({
                api: 'CreateEntranceRecord',
                params: _params
            }, ()=>{
                this.jump(id);
            })
        } else {
            this.jump(id);
        }

    }

    jump(id) {
        if(id === "qiandao") {
            this.signIn();
            return;
        }
        this.context.router.push({
            pathname: dataMap[id].url
        })
    }

    signIn() {
        //拜访签到
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
     * 获取最新应用
     * @constructor
     */
    GetNewRecord() {
        return this.requestPromise({
            api: 'GetAppEntryConfiguration',
            hideToast: true
        })
    }

    //获取用户权限
    GetUserIndexMenus() {
        return this.requestPromise({
            api: 'GetUserIndexMenus',
            hideToast: true
        })
    }

    render() {
        return <List>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
            {
                this.state.newAPPData.map((item, index)=>{
                    if(this.state.menusRules[item.new_AppEntryCode]) {
                        return (
                            <List.Item
                                key={index}
                                multipleLine
                                onClick={() => this.CreateEntranceRecord(item.new_AppEntryCode, dataMap[item.new_AppEntryCode].name)}
                            >
                                <Flex>
                                    <div
                                        className={["icon-img mr_10", dataMap[item.new_AppEntryCode].icon].join(' ')}
                                        style={{width: '.27rem', height: '.27rem'}}
                                    ></div>
                                    <div className="fs_14 color333" style={{fontWeight: '200'}}>
                                        { dataMap[item.new_AppEntryCode].name }
                                    </div>
                                </Flex>

                            </List.Item>
                        )
                    }
                })
            }

        </List>
    }
}

export default NewApp;