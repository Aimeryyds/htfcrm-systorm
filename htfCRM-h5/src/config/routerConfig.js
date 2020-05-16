import Index from '../containers/Index';                        //入口
import Home from '../containers/home';                          //首页
import NewApp from '../components/home/newApp'           //更多新应用

import SellCharts from '../containers/sellCharts';                        //
import QKList from  '../containers/QKList';                     //潜客列表
import QKListDetail from  '../containers/QKListDetail';         //潜客详情
import SKList from  '../containers/SKList';                     //实客列表
import SKListDetail from  '../containers/SKListDetail';         //实客客户详情
import SKEditDetail from  '../containers/SKEditDetail';         //客户详情-编辑
import View360 from  '../containers/view360';                   //360视图
import TradingDetail from  '../containers/tradingDetail';       //360视图-交易记录明细
import ActivityList from  '../containers/activityList';         //活动列表
import ActivityDetail from  '../containers/activityDetail';     //活动详情
import JZList from  '../containers/JZList';                     //竞争对手及竞品列表
import JZListDetail from  '../containers/JZListDetail';         //竞争对手及竞品详情
import JJList from  '../containers/JJList';                     //基金产品管理列表
import JJListDetail from  '../containers/JJListDetail';         //基金产品管理详情
import JZListDetailPro from  '../containers/JZListDetail_pro';  //竞争对手及竞品详情
import LinkMan from  '../containers/LinkMan';                   //联系人列表
import LinkManDetail from  '../containers/LinkManDetail';       //联系人详情
import LinkManDetail_PT from  '../containers/LinkManDetail_PT'; //联系人详情-平台联系人
import TodoList from  '../containers/todoList';                 //待办事项列表
import TodoListDetail from  '../containers/todoListDetail';     //待办事项详情

import BusinessProject from  '../containers/businessProject';                   //项目漏斗
import BusinessProjectList from  '../containers/businessProjectList';           //初步接触
import BusinessProjectDetail from  '../containers/businessProjectDetail';       //项目详情
import ServeList from  '../containers/serveList';                               //服务管理
import ServeDetail from  '../containers/serveDetail';                           //服务管理详情
import ManagerFile from  '../containers/managerFile';                           //基金经理列表
import ManagerDetail from  '../containers/managerDetail';                       //基金经理详情
import ManagerInfo from  '../containers/managerInfo';                           //基金经理个人简历
import AddLinkMan from '../containers/AddLinkMan';                            //新建联系人
import EditLinkMan from '../containers/editLinkMan';                         //编辑联系人
import LevelAnalyze from '../containers/levelAnalyze';                         //等级分析
import LaDetailTable from '../components/levelAnalyze/table_a';                  //等级分析-详情表
import Khfp from '../containers/khfp';                                        //客户分派
import ManagerList from '../containers/managerList';                            //客户经理
import KeHuManagerDetail from '../containers/kehumanagerdetail';                      //客户经理详情
import FundFlow from '../components/fundflow';                                      //资金流向
import ManagerQA from '../components/manager/managesort';                      //客户经理保有量分析
import TopTen from '../components/toptenrank/index';                        //十大自有平台客户排名
import ManagerCustSearch from '../components/manager/managercustsearch';              //客户经理客户查询
import LossBack from '../components/fundflow/lbindex';                              //流失挽回
import IPOList from '../components/ipo';                                               //ipo列表
import IPOInput from '../components/ipo/ipoinput';                                               //ipo列表
import EditVisit from '../components/serve/edit_visit';                                   //编辑拜访记录

import QKEditDetail from '../components/QKList/edit_detail';                                   //编辑拜访记录
import ThreeVisitA from '../components/manager/threevisitanalyze';             //三方拜访数据分析
import ManageVisitTable from '../components/manager/managevisittable';         //三方拜访数据-客户详情

import ECommerce from '../components/ecommerce';                              //电商实时申赎交易表
import ECommerceDetail from '../components/ecommerce/detailTable';                              //客户申赎信息

import NetDaily from '../components/netDaily';                              //产品净值日报
import NetDailyDetail from '../components/netDaily/detail';                              //产品净值日报
import SpecialSales from '../components/specialSales';                              //专项销售计划
import SpecialDetail from '../containers/specialDetail';                    //专项销售计划-详情
import LevelChange from '../components/levelChange';                        //升降级客户处理
import LevelChangeDetail from '../components/levelChange/details';          //升降级客户处理详细信息
import LevelChangeAnalyze from '../components/levelChange/levelChangeAnalyze'; //升降级主观原因描述

import TripartiteIpoAnalysis from '../components/tripartiteIpoAnalysis'     //三方Ipo录入
import ThirdPartyDocument from '../components/thirdPartyDocument'           //三方档案分析  (未完成)

import KTI from '../components/KTI'           //KTI
import KTIDetail from '../components/KTI/detail'           //KTI

import CustomeGroup from '../components/customeGroup'                           //客户组
import CustomeGroupDetail from '../components/customeGroup/detail'              //客户组-详情
import CustomeGroupSearch from '../components/customeGroup/searchPage'              //客户组-搜索
import CustomeGroupSearchDetail from '../components/customeGroup/searchDetail'              //客户组-搜索结果详情

import HeightNetReport from '../components/heightNetReport'           //高净值客户报表

import CallOutReport from '../components/callOutReport'           //外呼

import ShareProduct from '../components/shareProduct'           //汇聊分享-产品列表
import ShareProductKeHuList from '../components/shareProduct/keHuList'           //汇聊分享-产品列表


let routerConfig = {
    path:'/',
    component: Index,
    indexRoute:{ component: Home },
    childRoutes:[
        { path:'Home', component: Home },
        { path:'NewApp', component: NewApp },
        { path:'QKList', component: QKList },
        { path:'QKListDetail', component: QKListDetail },
        { path:'SKList', component: SKList },
        { path:'SKListDetail', component: SKListDetail },
        { path:'SKEditDetail', component: SKEditDetail },
        { path:'SellCharts', component: SellCharts },
        { path:'View360', component: View360 },
        { path:'TradingDetail', component: TradingDetail },
        { path:'ActivityList', component: ActivityList },
        { path:'ActivityDetail', component: ActivityDetail },
        { path:'JZList', component: JZList },
        { path:'JZListDetail', component: JZListDetail },
        { path:'JJList', component: JJList },
        { path:'JJListDetail', component: JJListDetail },
        { path:'JZListDetailPro', component: JZListDetailPro },
        { path:'LinkMan', component: LinkMan },
        { path:'LinkManDetail', component: LinkManDetail},
        { path:'LinkManDetail_PT', component: LinkManDetail_PT},
        { path:'TodoList', component: TodoList},
        { path:'TodoListDetail', component: TodoListDetail},

        { path:'BusinessProject', component: BusinessProject},
        { path:'BusinessProjectList', component: BusinessProjectList},
        { path:'BusinessProjectDetail', component: BusinessProjectDetail},

        { path:'ServeList', component: ServeList},
        { path:'ServeDetail', component: ServeDetail},
        { path:'ManagerFile', component: ManagerFile},
        { path:'ManagerDetail', component: ManagerDetail},
        { path:'ManagerInfo', component: ManagerInfo},
        { path:'AddLinkMan', component: AddLinkMan},
        { path:'EditLinkMan', component: EditLinkMan},

        { path:'LevelAnalyze', component: LevelAnalyze},
        { path:'Khfp', component: Khfp},
        { path:"Khfptable", component: Khfp},
        { path:"Kehujingli", component: ManagerList},
        { path:"Kehumanagerdetail", component: KeHuManagerDetail},
        { path:"FundFlow", component: FundFlow},
        { path:"ManagerQuantityA", component: ManagerQA},
        { path: 'TopTenRank', component: TopTen},
        { path:'LaDetailtable', component: LaDetailTable},
        { path: 'ManagerCustSearch', component: ManagerCustSearch},
        { path: 'LossBack', component: LossBack},
        { path: 'IPOList', component: IPOList},
        { path: 'IPOInput', component: IPOInput},
        { path: 'EditVisit', component: EditVisit},

        { path: 'QKEditDetail', component: QKEditDetail},

        { path: 'ECommerce', component: ECommerce},
        { path: 'ECommerceDetail', component: ECommerceDetail},

        { path:"ThreeVisitA", component: ThreeVisitA},
        { path:"ManageVisitTable", component: ManageVisitTable},
        { path:"NetDaily", component: NetDaily},
        { path:"NetDailyDetail", component: NetDailyDetail},
        { path:"SpecialSales", component: SpecialSales},
        { path:"SpecialDetail", component: SpecialDetail},
        { path:"LevelChange",component:LevelChange },
        { path:"LevelChangeDetail",component:LevelChangeDetail },
        { path:"LevelChangeAnalyze",component:LevelChangeAnalyze },

        { path: "TripartiteIpoAnalysis", component: TripartiteIpoAnalysis },
        { path: "ThirdPartyDocument", component: ThirdPartyDocument },

        { path: "KTI", component: KTI },
        { path: "KTIDetail", component: KTIDetail },

        { path: "CustomeGroup", component: CustomeGroup },
        { path: "CustomeGroupDetail", component: CustomeGroupDetail },
        { path: "CustomeGroupSearch", component: CustomeGroupSearch },
        { path: "CustomeGroupSearchDetail", component: CustomeGroupSearchDetail },

        { path: "HeightNetReport", component: HeightNetReport },

        { path: "CallOutReport", component: CallOutReport },

        { path: "ShareProduct", component: ShareProduct },
        { path: "ShareProductKeHuList", component: ShareProductKeHuList },
    ]
};

export default routerConfig;

