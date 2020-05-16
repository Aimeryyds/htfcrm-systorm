import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WhiteSpace, Flex, Tabs } from 'antd-mobile';
import EnterIcon from './enterIcon'

const dataMap = {
    "qianke":{
        url: "/QKList",
        icon: "icon-img-qianke_shouye"
    },
    "kehu":{
        url: "/SKList",
        icon: "icon-img-kehuliebiao_shouye"
    },
    "lianxiren":{
        url: "/LinkMan",
        icon: "icon-img-lianxiren_shouye"
    },
    "jingzhengduishou":{
        url: "/JZList",
        icon: "icon-img-jingzhengduishou_shouye"
    },
    "jijinchanpin":{
        url: "/JJList",
        icon: "icon-img-jijinchanpinguanli_shouye"
    },
    "shangjiguanli":{
        url: "/ECommerce",
        icon: "icon-img-shangjiguanli_shouye"
    },
    "jijinjingli":{
        url: "/ManagerFile",
        icon: "icon-img-jijinjinglidangan_shouye"
    },
    "daibanshixiang":{
        url: "/ToDoList",
        icon: "icon-img-daibanshixiang_shouye"
    },
    "shichangyingxiao":{
        url: "/ActivityList",
        icon: "icon-img-shichangyinxiaohuodong_shouye"
    },
    "baifangjilu":{
        url: "/ServeList",
        icon: "icon-img-baifangjilu_shouye"
    },
    "kehudengji":{
        url: "/LevelAnalyze",
        icon: "icon-img-kehudengji"
    },
    "kehufenpai":{
        url: "/Khfp",
        icon: "icon-img-guanxirenxinxi"
    },
    "kehujingli":{
        url: "/Kehujingli",
        icon: "icon-img-kehujingli_shouye"
    },
    "zijinliuxiangtongji":{
        url: "/FundFlow",
        icon: "icon-img-zijinliuxiang_shouye"
    },
    "kehujinglipaiming":{
        url: "/ManagerQuantityA",
        icon: "icon-img-kehujinglipaiming_shouye"
    },
    "kehupaiming":{
        url: "/TopTenRank",
        icon: "icon-img-kehupaiming_shouye"
    },
    "liushiwanhui":{
        url: "/LossBack",
        icon: "icon-img-liushiwanhui"
    },
    "ipo":{
        url: "/IPOList",
        icon: "icon-img-ipo"
    },
    "shengoushuhui":{
        url: "/ECommerce",
        icon: "icon-img-shangjiguanli_shouye"
    },
    "sanfangbaifang":{
        url: "/ThreeVisitA",
        icon: "icon-img-qiandao"
    },
    "chanpinjingzhiribao":{
        url: "/NetDaily",
        icon: "icon-img-shangjiguanli_shouye"
    },
    "zhuanxiangxiaoshoujihua":{
        url: "/SpecialSales",
        icon: "icon-img-shangjiguanli_shouye"
    },
    "shengjiangjikehu":{
        url: "/LevelChange",
        icon: "icon-img-lianxiren_shouye"
    },
    "sanfangipofenxi":{
        url: "/TripartiteIpoAnalysis",
        icon: "icon-img-shangjiguanli_shouye"
    },
    "qiandao":{
        icon: "icon-img-qiandao"
    },
}

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
                'sanfangipofenxi': false,      //三方ipo分析
            },
            isLoad: false,
            tabFixed: false,        //是否固定tabs
            tabKey: '客户管理',
            bottomHolder: 0,
            tabsData: [],
            newAPPData: [],     //最新应用
            recentData: [],     //最近使用
        }
    }

    componentDidMount() {
        this.changeTilte("CRM首页");  //TODO
        this.clearTabHistory();
        Promise.all([
            this.GetUserIndexMenus(),       //权限查询
            this.GetNewRecord(),            //最新应用
            this.GetEntranceRecord()        //最近使用记录
        ]).then((res)=>{
            this.handleData(res);
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
        let data1 = res[1].data;
        let data2 = res[2].data;
        let _menusRules = {};
        data0.map((item, index) => {
            _menusRules[item.Key] = item.Value;
        });
        this.handleTabs(_menusRules);
        this.setState({
            menusRules: _menusRules,
            newAPPData: data1,
            recentData: data2,
            isLoad: true
        })
    }

    handleTabs(data) {
        let _arr = [];
        if(data.qianke || data.kehu || data.lianxiren) {
            _arr.push({title: '客户管理', value:'homeKH', key: '客户管理'});
        }
        if(data.kehujingli) {
            _arr.push({title: '团队管理', value:'homeTD', key: '团队管理'});
        }
        if(data.jingzhengduishou || data.jijinchanpin || data.shangjiguanli || data.jijinjingli) {
            _arr.push({title: '销售管理', value:'homeXS', key: '销售管理'});
        }
        if(data.daibanshixiang) {
            _arr.push({title: '工作管理', value:'homeGZ', key: '工作管理'});
        }
        if(data.shichangyingxiao||data.ipo) {
            _arr.push({title: '营销管理', value:'homeYX', key: '营销管理'});
        }
        if(data.baifangjilu||data.qiandao) {
            _arr.push({title: '服务管理', value:'homeFW', key: '服务管理'});
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
            api: 'GetNewRecord',
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
    CreateEntranceRecord() {
        this.request({
            api: 'CreateEntranceRecord'
        })
    }

    signIn() {
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
        const tabMap = ['客户管理', '团队管理', '销售管理', '工作管理', '营销管理', '服务管理'];
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
        //客户管理距离顶部高度
        const homeKH = document.getElementById('homeKH') ? document.getElementById('homeKH').offsetTop-43.5 : false;
        //团队管理距离顶部高度
        const homeTD = document.getElementById('homeTD') ? document.getElementById('homeTD').offsetTop-43.5 : false;
        //销售管理距离顶部高度
        const homeXS = document.getElementById('homeXS') ? document.getElementById('homeXS').offsetTop-43.5 : false;
        //工作管理距离顶部高度
        const homeGZ = document.getElementById('homeGZ') ? document.getElementById('homeGZ').offsetTop-43.5: false;
        //营销管理距离顶部高度
        const homeYX = document.getElementById('homeYX') ? document.getElementById('homeYX').offsetTop-43.5 : false;
        //服务管理距离顶部高度
        const homeFW = document.getElementById('homeFW') ? document.getElementById('homeFW').offsetTop-43.5 : false;


        if(scrollTop >= homeTOP) {
            _tabFixed = true;
        } else {
            _tabFixed = false;
        }

        if(scrollTop >= homeTD && scrollTop < homeXS) {
            _tabKey=tabMap[1]
        } else if(scrollTop >= homeXS && scrollTop < homeGZ) {
            _tabKey=tabMap[2]
        } else if(scrollTop >= homeGZ && scrollTop < homeYX) {
            _tabKey=tabMap[3]
        } else if(scrollTop >= homeYX && scrollTop < homeFW - 5) {
            _tabKey=tabMap[4]
        } else if(scrollTop >= homeFW-5) {
            _tabKey=tabMap[5]
        }

        _bottomHolder = clientHeight -  document.getElementById('homeFW').clientHeight -43.5;

        console.log(_tabFixed, _tabKey, _bottomHolder, '----');
        this.setState({
            tabFixed: _tabFixed,
            tabKey: _tabKey,
            bottomHolder: _bottomHolder
        });
    }

    //tabs切换
    tabsChange = (tab, index) => {
        console.log(tab, index)
        let _top = document.getElementById(tab.value).offsetTop-43;
        // document.body.scrolltop ? (document.body.scrolltop = _top) : (document.documentElement.scrollTop = _top);
        window.scrollTo(0,_top);
        // console.log(_top)
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
        let { menusRules, isLoad, newAPPData, recentData } = this.state;

        return <div className="N_home">

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
            <WhiteSpace style={{height: '15px'}}/>
            <Flex style={{paddingLeft: '.15rem', lineHeight: 1, height: '.15rem', overflow: 'hidden'}}>
                <div style={{fontSize: '.15rem', color: '#333', fontWeight: '200'}}>新应用</div>
                <div className="iconfont1 iconxinyingyong-jinse home_new-icon"></div>
            </Flex>
            <Flex justify="start" wrap='wrap'>
                {
                    newAPPData.map((item, index)=>{
                        if(newAPPData.length <= 4) {
                            return (
                                <EnterIcon
                                    key={index}
                                    url={ dataMap[item.new_entrance_id].url }
                                    icon={ dataMap[item.new_entrance_id].icon }
                                    name={ item.new_entrance_name }
                                />
                            )
                        }
                        if(newAPPData.length > 4) {
                            if(index < 3) {
                                return (
                                    <EnterIcon
                                        key={index}
                                        url={ dataMap[item.new_entrance_id].url }
                                        icon={ dataMap[item.new_entrance_id].icon }
                                        name={ item.new_entrance_name }
                                    />
                                )
                            }
                            if(index === 3) {
                                return <EnterIcon key={index} url={'/NewApp'} icon={'icon-img-shangjiguanli_shouye'} name={"更多"} rule={ true } />
                            }
                        }

                    })
                }
            </Flex>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>
            <WhiteSpace style={{height: '15px'}}/>
            <Flex style={{paddingLeft: '.15rem', lineHeight: 1, height: '.15rem', overflow: 'hidden'}}>
                <div style={{fontSize: '.15rem', color: '#333', fontWeight: '200'}}>最近使用</div>
            </Flex>
            <Flex justify="start" wrap='wrap'>
                {
                    newAPPData.map((item, index)=>{
                        return (
                            <EnterIcon
                                key={index}
                                url={ dataMap[item.new_entrance_id].url }
                                icon={ dataMap[item.new_entrance_id].icon }
                                name={ item.new_entrance_name }
                            />
                        )
                    })
                }
            </Flex>

            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>



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











            <div>
                <WhiteSpace style={{height: '15px'}}/>
                <Flex style={{paddingLeft: '.15rem', lineHeight: 1, height: '.15rem', overflow: 'hidden'}}>
                    <div style={{fontSize: '.15rem', color: '#333', fontWeight: '200'}}>新应用</div>
                    <div className="iconfont1 iconxinyingyong-jinse home_new-icon"></div>
                </Flex>
                <Flex justify="start" wrap='wrap'>
                    <EnterIcon url={'/QKList'} icon={'icon-img-qianke_shouye'} name={"潜客"} rule={ menusRules.qianke } />
                    <EnterIcon url={'/SKList'} icon={'icon-img-kehuliebiao_shouye'} name={"客户列表"} rule={ menusRules.kehu } />
                    <EnterIcon url={'/LinkMan'} icon={'icon-img-lianxiren_shouye'} name={"联系人"} rule={ menusRules.lianxiren } />
                    <EnterIcon url={'/JZList'} icon={'icon-img-jingzhengduishou_shouye'} name={"竞争对手"} rule={ menusRules.jingzhengduishou } />
                    <EnterIcon url={'/JJList'} icon={'icon-img-jijinchanpinguanli_shouye'} name={"基金产品管理"} rule={ menusRules.jijinchanpin } />
                    <EnterIcon url={'/ECommerce'} icon={'icon-img-shangjiguanli_shouye'} name={"电商实时数据"} rule={ menusRules.shangjiguanli } />
                    <EnterIcon url={'/ManagerFile'} icon={'icon-img-jijinjinglidangan_shouye'} name={"基金经理档案"} rule={ menusRules.jijinjingli } />
                    <EnterIcon url={'/ToDoList'} icon={'icon-img-daibanshixiang_shouye'} name={"待办事项"} rule={ menusRules.daibanshixiang } />
                    <EnterIcon url={'/ActivityList'} icon={'icon-img-shichangyinxiaohuodong_shouye'} name={"市场营销活动"} rule={ menusRules.shichangyingxiao } />
                    <EnterIcon url={'/ServeList'} icon={'icon-img-baifangjilu_shouye'} name={"拜访记录"} rule={ menusRules.baifangjilu } />
                    <EnterIcon url={'/LevelAnalyze'} icon={'icon-img-kehudengji'} name={"客户等级"} rule={ menusRules.kehudengji } />
                    <EnterIcon url={'/Khfp'} icon={'icon-img-guanxirenxinxi'} name={"客户分派"} rule={ menusRules.kehufenpai } />
                    <EnterIcon url={'/Kehujingli'} icon={'icon-img-kehujingli_shouye'} name={"客户经理"} rule={ menusRules.kehujingli } />
                    <EnterIcon url={'/FundFlow'} icon={'icon-img-zijinliuxiang_shouye'} name={"资金流向统计"} rule={ menusRules.zijinliuxiangtongji } />
                    <EnterIcon url={'/ManagerQuantityA'} icon={'icon-img-kehujinglipaiming_shouye'} name={"客户经理分析"} rule={ menusRules.kehujinglipaiming } />
                    <EnterIcon url={'/TopTenRank'} icon={'icon-img-kehupaiming_shouye'} name={"客户排名"} rule={ menusRules.kehupaiming } />
                    <EnterIcon url={'/LossBack'} icon={'icon-img-liushiwanhui'} name={"流失挽回"} rule={ menusRules.liushiwanhui } />
                    <EnterIcon url={'/IPOList'} icon={'icon-img-ipo'} name={"IPO录入"} rule={ menusRules.ipo } />
                    <EnterIcon url={'/ECommerce'} icon={'icon-img-shangjiguanli_shouye'} name={"电商实时数据"} rule={ menusRules.shengoushuhui } />
                    <EnterIcon url={'/ThreeVisitA'} icon={'icon-img-qiandao'} name={"三方拜访数据"} rule={ menusRules.sanfangbaifang } />
                    <EnterIcon url={'/NetDaily'} icon={'icon-img-shangjiguanli_shouye'} name={"产品净值日报"} rule={ menusRules.chanpinjingzhiribao } />
                    <EnterIcon url={'/SpecialSales'} icon={'icon-img-shangjiguanli_shouye'} name={"专项销售计划"} rule={ menusRules.zhuanxiangxiaoshoujihua } />
                    <EnterIcon url={'/LevelChange'} icon={'icon-img-lianxiren_shouye'} name={"客户升降级"} rule={ menusRules.shengjiangjikehu } />
                    <EnterIcon url={'/TripartiteIpoAnalysis'} icon={'icon-img-shangjiguanli_shouye'} name={"IPO录入分析"} rule={ menusRules.sanfangipofenxi } />
                    <EnterIcon url={'/NewApp'} icon={'icon-img-shangjiguanli_shouye'} name={"更多"} rule={ true } />
                    <EnterIcon icon={'icon-img-qiandao'} name={"拜访签到"} rule={ true } signIn={()=>{this.signIn()}} />
                </Flex>
            </div>





            <div id="homeTOP">
                <WhiteSpace size="lg" className="bg_f6"/>
                { 
                    (
                    menusRules.kehujinglipaiming ||
                    menusRules.zijinliuxiangtongji ||
                    menusRules.kehupaiming ||
                    menusRules.kehufenpai ||
                    menusRules.kehudengji ||
                    menusRules.liushiwanhui ||
                    menusRules.shengoushuhui ||
                    menusRules.sanfangbaifang ||
                    menusRules.chanpinjingzhiribao ||
                    menusRules.sanfangipofenxi
                    ) &&

                    <div style={{position:'relative'}}>
                        <div
                            style={{width:'164px', height:'38px', backgroundSize:'cover', position:'absolute', left:'50%',marginLeft:'-82px',top:'-15px' }}
                            className='yibiaopan'
                        ></div>
                        <Flex justify="start" wrap='wrap' style={{paddingTop:'20px', paddingBottom:'20px'}}>
                            {
                                menusRules.kehujinglipaiming &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                      <div
                                          onClick={()=>this.jump('/ManagerQuantityA')}
                                          style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                      >
                                          <div className="icon-img icon-img-kehujinglipaiming_shouye mb_15"></div>
                                          <span className="fs_14">客户经理分析</span>
                                      </div>
                                  </Flex.Item>
                            }
                            {
                                menusRules.zijinliuxiangtongji &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/FundFlow')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-zijinliuxiang_shouye mb_15"></div>
                                        <span className="fs_14">资金流向统计</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.kehupaiming &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%",marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/TopTenRank')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-kehupaiming_shouye mb_15"></div>
                                        <span className="fs_14">客户排名</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.kehufenpai &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/Khfp')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-guanxirenxinxi mb_15"></div>
                                        <span className="fs_14">客户分派</span>
                                    </div>
                                </Flex.Item>
                            }

                            {
                                menusRules.kehudengji &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%",marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/LevelAnalyze')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-kehudengji mb_15"></div>
                                        <span className="fs_14" >客户等级</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.liushiwanhui &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/LossBack')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-liushiwanhui mb_15"></div>
                                        <span className="fs_14" >流失挽回</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.shengoushuhui &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/ECommerce')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-shangjiguanli_shouye mb_15"></div>
                                        <span className="fs_14" >电商实时数据</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.sanfangbaifang&&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/ThreeVisitA')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-qiandao mb_15"></div>
                                        <span className="fs_14" >三方拜访数据</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.chanpinjingzhiribao &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                    <div
                                        onClick={()=>this.jump('/NetDaily')}
                                        style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                    >
                                        <div className="icon-img icon-img-shangjiguanli_shouye mb_15"></div>
                                        <span className="fs_14" >产品净值日报</span>
                                    </div>
                                </Flex.Item>
                            }
                            {
                                menusRules.sanfangipofenxi &&
                                <Flex.Item style={{ flexGrow: 0, flexBasis: "25%", marginTop: '0.1rem' }}>
                                    <div
                                        onClick={() => this.jump('/TripartiteIpoAnalysis')}
                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <div className="icon-img icon-img-shangjiguanli_shouye mb_15"></div>
                                        <span className="fs_14" >IPO录入分析</span>
                                    </div>
                                </Flex.Item>
                            }
                        </Flex>
                    </div>
                }
                <WhiteSpace size="lg" className="bg_f6"/>
            </div>


            <div>
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
            </div>


            {/** 客户管理 **/}
            {
                (menusRules.qianke || menusRules.kehu || menusRules.lianxiren || menusRules.shengjiangjikehu) &&
                <div id="homeKH">
                    <WhiteSpace size="lg"/>
                    <div className="module_title_a">客户管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            menusRules.qianke &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%"}}>
                                <div
                                    onClick={()=>this.jump('/QKList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-qianke_shouye mb_15"></div>
                                    <span className="fs_14">潜客</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.kehu &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%"}}> 
                                <div
                                    onClick={()=>this.jump('/SKList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-kehuliebiao_shouye mb_15"></div>
                                    <span className="fs_14">客户列表</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.lianxiren &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%"}}>
                                <div
                                    onClick={()=>this.jump('/LinkMan')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-lianxiren_shouye mb_15"></div>
                                    <span className="fs_14">联系人</span>
                                </div>
                            </Flex.Item>

                        }
                        {
                            menusRules.shengjiangjikehu &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis: "25%" }}>
                                <div
                                    onClick={() => this.jump('/LevelChange')}
                                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <div className="icon-img icon-img-lianxiren_shouye mb_15"></div>
                                    <span className="fs_14">客户升降级</span>
                                </div>
                            </Flex.Item>
                        }
                </Flex>
                <WhiteSpace size="lg" />
                </div>
            }

            {/** 团队管理 **/}
            <WhiteSpace size="lg" className="bg_f6"/>
            { 
                (menusRules.kehujingli) &&
                <div id="homeTD">
                    <WhiteSpace size="lg"/>
                    <div className="module_title_a">团队管理</div>
                    <Flex>
                        {
                            menusRules.kehujingli &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%"}}>
                                <div
                                    onClick={()=>this.jump('/Kehujingli')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-kehujingli_shouye mb_15"></div>
                                    <span className="fs_14">客户经理</span>
                                </div>
                            </Flex.Item>
                        }
                    </Flex>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg" className="bg_f6"/>
                </div>
            }

            {/** 销售管理 **/}
            {
                (menusRules.jingzhengduishou || menusRules.jijinchanpin || menusRules.shangjiguanli || menusRules.jijinjingli) &&
                <div id="homeXS">
                    <WhiteSpace size="lg"/>
                    <div className="module_title_a">销售管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                            menusRules.jingzhengduishou &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/JZList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-jingzhengduishou_shouye mb_15"></div>
                                    <span className="fs_14">竞争对手</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.jijinchanpin &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/JJList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-jijinchanpinguanli_shouye mb_15"></div>
                                    <span className="fs_14">基金产品管理</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.shangjiguanli &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/BusinessProject')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-shangjiguanli_shouye mb_15"></div>
                                    <span className="fs_14">未上线项目</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.jijinjingli &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/ManagerFile')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-jijinjinglidangan_shouye mb_15"></div>
                                    <span className="fs_14">基金经理档案</span>
                                </div>
                            </Flex.Item>
                        }
                    </Flex>



                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg" className="bg_f6"/>
                </div>
            }

            {/** 工作管理 **/}
            {
                menusRules.daibanshixiang &&
                <div id="homeGZ">
                    <WhiteSpace size="lg"/>
                    <div className="module_title_a">工作管理</div>
                    <Flex>
                        <Flex.Item>
                            <div
                                onClick={()=>this.jump('/ToDoList')}
                                style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                            >
                                <div className="icon-img icon-img-daibanshixiang_shouye mb_15"></div>
                                <span className="fs_14">待办事项</span>
                            </div>
                        </Flex.Item>
                        <Flex.Item/>
                        <Flex.Item/>
                        <Flex.Item/>
                    </Flex>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg" className="bg_f6"/>
                </div>
            }

            {/** 营销管理 **/}
            {
                (menusRules.shichangyingxiao || menusRules.ipo || menusRules.zhuanxiangxiaoshoujihua)&&
                <div id="homeYX">
                    <WhiteSpace size="lg"/>
                    <div className="module_title_a">营销管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {/*{
                            menusRules.shichangyingxiao&&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/ActivityList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-shichangyinxiaohuodong_shouye mb_15"></div>
                                    <span className="fs_14">市场营销活动</span>
                                </div>
                            </Flex.Item>
                        }*/}

                        {
                            menusRules.ipo &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/IPOList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-ipo mb_15"></div>
                                    <span className="fs_14" >IPO录入</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.zhuanxiangxiaoshoujihua&&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/SpecialSales')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-shangjiguanli_shouye mb_15"></div>
                                    <span className="fs_14" >
                                        专项销售计划
                                    </span>
                                </div>
                            </Flex.Item>
                        }

                    </Flex>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg" className="bg_f6"/>
                </div>
            }

            {/** 服务管理 **/}
            {
                (menusRules.baifangjilu || menusRules.qiandao)&&
                <div id="homeFW">
                    <WhiteSpace size="lg"/>
                    <div className="module_title_a">服务管理</div>
                    <Flex justify="start" wrap='wrap'>
                        {
                                // menusRules.qiandao &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                            <div
                                    onClick={() => {this.signIn()}}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-qiandao mb_15"></div>
                                    <span className="fs_14">拜访签到</span>
                                </div>
                            </Flex.Item>
                        }
                        {
                            menusRules.baifangjilu &&
                            <Flex.Item style={{ flexGrow: 0, flexBasis:"25%", marginTop:'0.1rem'}}>
                                <div
                                    onClick={()=>this.jump('/ServeList')}
                                    style={{display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}
                                >
                                    <div className="icon-img icon-img-baifangjilu_shouye mb_15"></div>
                                    <span className="fs_14">拜访记录</span>
                                </div>
                            </Flex.Item>
                        }
                    </Flex>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg" className="bg_f6"/>
                </div>
            }

            {/** 底部占位 **/}
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
