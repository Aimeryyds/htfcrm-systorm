// let href = "116.62.104.92:85";       //测试
// let href = "https://www.easy-mock.com/mock/5c1cd21574216867c2972d96";       //MOCK
// let href = "http://rest.apizza.net/mock/b3bde311dfa20476b7abf49e2e7e314f"  //apizza
// let href = "/rest/ncrm";       //测试网关
// let href = "/microservice/ncrm";        //正式网关
// let href = "";       //内网
let state = 0;
let hrefArr = [
    "https://www.easy-mock.com/mock/5c1cd21574216867c2972d96",//MOCK
    "",//内网
    "/rest/ncrm",//测试网关
    "/microservice/ncrm"//正式网关

];
let href = hrefArr[state];


let API_LIST = {
    "GetUserInfo": href+'/crm/api/SystemUser/GetUserInfo',                                  //获取用户信息
    "GetVipLevel": href + '/crm/api/OpportunityType/GetVipLevel',                           //获取下拉菜单客户等级
    "GetProducttype": href + "/crm/api/OpportunityType/GetProducttype",                     //获取下拉菜单产品类型
    "GetSource": href + "/crm/api/OpportunityType/GetSource",                               //获取下拉菜单客户来源
    "GetPreference": href + "/crm/api/OpportunityType/GetPreference",                       //获取下拉菜单收益率
    "GetVocation": href + "/crm/api/OpportunityType/GetVocation",                           //获取下拉菜单职业
    "GetIndustry": href + "/crm/api/OpportunityType/GetIndustry",                            //行业类型
    "GetIndustrys": href + "/crm/api/OpportunityType/GetIndustrys",                            //潜客-行业类型
    "GetEducation": href + "/crm/api/OpportunityType/GetEducation",                         //学历下拉
    "GetImportance": href + "/crm/api/OpportunityType/GetImportance",                       //重要性
    "GetServicelevel": href + "/crm/api/OpportunityType/GetServicelevel",                   //服务级别下拉
    "GetIdentitytype": href + "/crm/api/OpportunityType/GetIdentitytype",                   //证件类型
    "GetInvestortype": href + "/crm/api/OpportunityType/GetInvestortype",                   //投资者类型
    "GetInstpropertiy": href + "/crm/api/OpportunityType/GetInstpropertiy",                 //企业性质
    "GetInstpropertiys": href + "/crm/api/OpportunityType/GetInstpropertiys",                 //企业性质
    "GetLeadInsttype": href + "/crm/api/OpportunityType/GetLeadInsttype",                 //机构类型
    "GetUserIndexMenus": href + "/crm/api/Appointment/GetUserIndexMenus",                   //用户权限
    "leadlist":href + "/crm/api/customer/leadlist",			                                //潜客列表
    "GetLeadTypes": href + "/crm/api/Customer/GetLeadTypes",                                //潜客列表-tabs
    "LeadDetail": href + "/crm/api/customer/LeadDetail",                                    //潜客详情

    "customerList": href + "/crm/api/customer/list",                                        //客户列表
    "customerTypes": href + "/crm/api/customer/types",                                      //客户列表-tabs
    "GetCustomerManage": href + "/crm/api/customer/GetCustomerManage",                      //客户列表-客户分类
    "GetCustomerLevel": href + "/crm/api/customer/GetCustomerLevel",                        //客户列表-自有平台实际

    "customerDetail": href + "/crm/api/customer/detail",                                    //客户详情
    "GetCustomerRelations": href + "/crm/api/Customer/GetCustomerRelations",                //客户详情-客户关系
    "GetCustomerPrivilegeLable": href + "/crm/api/Customer/GetCustomerPrivilegeLable",      //客户详情-客户特权标签
    "getCustLevel": href + "/crm/api/Customer/getCustLevel",                                //客户详情-客户级别趋势

    "SanFangDetail": href + "/crm/api/customer/SanFangDetail",                              //客户详情-三方
    "SanFangList": href + "/crm/api/customer/SanFangList",                                  //客户详情-三方-详情列表

    "GetView360AssetDistribute": href + "/crm/api/Customer/GetView360AssetDistribute",      //360-资产分布及一年保有量
    "GetView360AssetIncome": href + "/crm/api/Customer/GetView360AssetIncome",              //360-客户持有产品信息

    "GetContactList": href + "/crm/api/customer/GetContactList",                            //联系人列表
    "GetContactdetail": href + "/crm/api/customer/GetContactdetail",                        //联系人详细信息
    "GetPlatformContactDetail": href + "/crm/api/Customer/GetPlatformContactDetail",        //平台联系人详细信息(客户详情平台联系人跳转)

    "GetFundList": href + "/crm/api/FundList/List",                                         //基金产品列表
    "GetFundDetail": href + "/crm/api/FundDetail/List",                                     //基金产品详情
    "GetFundType": href + "/crm/api/FundList/GetFundType",                                  //基金产品类型

    "OpportunityList":href+'/crm/api/OpportunityList/List',                                 //项目漏斗
    "OpportunityType":href+'/crm/api/OpportunityType/List',                                 //项目列表tabs
    "OpportunityStageList":href+'/crm/api/OpportunityStageList/List',                       //项目列表
    "StageDetailList":href+'/crm/api/OpportunityStageDetail/List',                          //项目详情-所处阶段
    "OpportunityDetailList":href+'/crm/api/OpportunityDetail/List',                         //项目详情-基本信息

    "FundManagersList":href+'/crm/api/customer/FundManagersList',                           //基金经理列表
    "FundManagerDetails":href+'/crm/api/customer/FundManagerDetails',                       //基金经理详情
    "FundManagersInfo":href+'/crm/api/customer/PersonalInformation',                        //基金经理-个人信息

    "GetTodoType":href+"/crm/api/Appointment/GetTypes",                                     //待办tab
    "GetTodoCount":href+"/crm/api/Appointment/GetUnfinishedAppointment",                    //待办数量
    "GetTodoList":href+"/crm/api/Appointment/GetAppointmentList",                           //待办列表
    "GetTodoDetail":href+"/crm/api/Appointment/GetAppointmentDetail",                       //待办事项详情
    "TodoIsFinish":href+'/crm/api/Appointment/SetAppointmentComplete',                      //待办事项的标记提交
    "TodoIsCancel":href+'/crm/api/Appointment/CancelAppointment',                           //待办事项的取消提交

    "GetCampaignList":href+'/crm/api/Campaign/GetCampaignList',                             //活动列表
    "GetCampaignDetail":href+'/crm/api/Campaign/GetCampaignDetail',                         //活动详情

    "ServeList":href+'/crm/api/ServiceList/List',                                                       //接触记录-拜访记录-列表
    "ServeDetail":href+'/crm/api/ServiceDetail/List',                                                   //接触记录-拜访记录-详情

    "QueryMessageRecord": href+"/crm/api/TouchRecord/QueryMessageRecord",                               //接触记录-短信记录-列表
    "QueryMessageRecordDetail": href+"/crm/api/TouchRecord/QueryMessageRecordDetail",                   //接触记录-短信记录-详情

    "QueryEmailRecord": href+"/crm/api/TouchRecord/QueryEmailRecord",                                   //接触记录-邮件记录-列表
    "QueryEmailRecordDetail": href+"/crm/api/TouchRecord/QueryEmailRecordDetail",                       //接触记录-邮件记录-详情

    "QueryPhoneTouchRecord": href+"/crm/api/TouchRecord/QueryPhoneTouchRecord",                         //接触记录-电话记录-列表
    "QueryPhoneTouchRecordDetail": href+"/crm/api/TouchRecord/QueryPhoneTouchRecordDetail",             //接触记录-电话记录-详情

    "InstantMessagingRecord": href+"/crm/api/TouchRecord/InstantMessagingRecord",                       //接触记录-即时通讯列表
    "InstantMessagingDetail": href+"/crm/api/TouchRecord/InstantMessagingDetail",                       //接触记录-即时通讯-详情

    "QueryActivityTouchRecord": href+"/crm/api/TouchRecord/QueryActivityTouchRecord",                   //接触记录-活动记录-列表
    "QueryActivityTouchRecordDetail": href+"/crm/api/TouchRecord/QueryActivityTouchRecordDetail",       //接触记录-活动记录-详情

    "QueryPresentRecord": href+"/crm/api/TouchRecord/QueryPresentRecord",                               //接触记录-礼品记录-列表
    "QueryPresentRecordDetail": href+"/crm/api/TouchRecord/QueryPresentRecordDetail",                   //接触记录-礼品记录-详情

    "GetPersonnelList": href+"/crm/api/Electricity/GetPersonnelList",                                    //接触记录-发送人、操作人

    "customerTrading": href + "/crm/api/Customer/SelectTrade",                                  //交易记录的接口
    "TradingTitle": href + "/crm/api/Customer/TradingTitle",                                  //交易记录模糊查询
    
    "GetView360CustomerProduct": href + "/crm/api/Customer/GetView360CustomerProduct",      //360-获取客户持有产品 (废弃)
    "customerContact": href + "/crm/api/customer/Contact",                                  //拜访记录的接口(废弃)

    // "GetTradingDetail": href + "/crm/api/Customer/GetTradingDetail",                        //交易记录详情(废弃)
    "GetCompList": href + "/crm/api/customer/CompetitorsList",                              //竞争对手列表(废弃)
    "CompetitorsGoodsDetail":href+'/crm/api/customer/CompetitorsGoodsDetail',               //竞品列表(废弃)
    "CompetingGoodsDetails":href+'/crm/api/customer/CompetingGoodsDetails',                 //竞品详情(废弃)
    "CompetitorsRivalDetail":href+'/crm/api/customer/CompetitorsRivalDetail',               //对手详情(废弃)
    "ServeType":href+'/crm/api/ServiceList/GetTypes',                                        //服务管理tab (废弃)

    "PersonalCustomerChange": href + "/crm/api/Customer/PersonalCustomerChange",   //修改个人用户信息
    "OrganizationCustomerChange": href + "/crm/api/Customer/OrganizationCustomerChange", //修改机构用户信息
    "ContactAdd": href + "/crm/api/Customer/ContactAdd", //添加联系人
    "ContactChange": href + "/crm/api/customer/ContactChange",//修改联系人
    "CusConRelatvionDelect": href +"/crm/api/Customer/CusConRelatvionDelect",//联系人删除
    "GetDirectlyBossList":href + "/crm/api/Customer/GetDirectlyBossList",//直属上司模糊查询
    "ContactAdds": href + "/crm/api/Customer/ContactAdds", //机构下新增联系人

    "GetUserName": href + "/crm/api/CustomerReport/GetUserName",  //获取客户经理
    "PurchaseRedemptionGetUserName": href + "/crm/api/PurchaseRedemption/GetUserName",  //获取客户经理
    "CustomerLevelReport": href + "/crm/api/CustomerReport/CustomerLevelReport",  //客户等级人数
    "GetBarList": href + "/crm/api/CustomerReport/GetBarList",  //黄金客户
    "CustomerStockReport": href + "/crm/api/CustomerReport/CustomerStockReport",  //table详情
    "getLevelNumbers": href +"/crm/api/CustomerReport/getLevelNumbers",  //趋势图

    "getLevelChange":  href + "/crm/api/CustomerReport/getLevelChange",                                     //360视图下的等级趋势
    "GetUserNameRole": href + "/crm/api/CustomerReport/GetUserNameRole" ,                                  //客户经理所在团队
    "getManagerLevelNumber": href + "/crm/api/CustomerReport/getManagerLevelNumber",                           //等级分析->barlist
    "GetFpData": href + "/crm/api/Customer/GetCusApportion",                                                 //客户分派->第一个饼图                
    "GetCurCusData": href + "/crm/api/Customer/GetCurLevelDistribution",                                   //客户分派->第二个饼图
    "GetCusRetrun":  href +  "/crm/api/Customer/GetCusRetrun",                                              //客户分派->表格数据 
    "GetCusLoopbackDetail": href + '/crm/api/Customer/GetCusLoopbackDetail',                                  //分派-表格详细
    "GetManagerList": href + "/crm/api/CustomerManager/GetCustomerManagerLists",                               //客户经理模糊查询
    'GetManagerDetail': href + '/crm/api/Customermanager/GetManagerDetail',                                            //客户经理详情
    "GetManagerAssetData": href + '/crm/api/Customermanager/GetManagerAssetData',                                //客户经理资产图数据
    "GetManagerQuantity": href + "/crm/api/Customermanager/GetTotalQuantity",                                        //客户经理保有量
    "GetQuantityTableData": href + '/crm/api/Customermanager/GetQuantityTableData',                                //客户经理保有量表                                                                 //客户经理保有量表格
    "GetManagerCustLevelChange": href + '/crm/api/CustomerReport/getManagerLevelNumber',                            //客户经理所辖客户升降级                                         //客户经理所辖客户什降级
    "GetManagerHighValue": href + "/crm/api/CustomerReport/getGJZNumber",                                  //高净值
    "GetFundFlow": href + "/crm/api/CustomerMoneyFlow/GetMoneyFlow",                                              //资金流向数据
    "GetTotalQuantity": href + "/crm/api/Fund/GetTotalQuantity",                                         //资金流向->总保有量
    "GetLossBack": href +  "/crm/api/Fund/GetLossBack",                                           //流失挽回
    'GetLossBackTable': href + "/crm/api/Fund/GetLossBackTable",                            //流失挽回表格
    'GetManagerQuantityAnalyze': href + '/crm/api/CustomerRetention/CustomerRetention',                        //客户经理保有量分析
    "GetTopTenOwnCustomer": href + '/crm/api/Rank/GetTopTenOwnCustomer',                              //自有三方平台十大客户排名
    "GetUserNameMoney": href + '/crm/api/CustomerReport/GetUserNameMoneys',                        //资金流向客户经理
    "GetManagerLossRank": href + '/crm/api/ManagerRank/GetManagerLossRank',                       //客户经理流失排名
    "GetManagerDeGradation": href + '/crm/api/ManagerRank/GetManagerDeGradation',                     //客户经理降级排名
    "GetCusCurQuantity": href + '/crm/api/CustomerReport/GetCusCurQuantity',                    //客户等级分析当前存量
    "GetCusImport": href + '/crm/api/CustomerReport/GetCusImport',                            //客户等级分析调入表格
    "GetCusOutput": href + '/crm/api/CustomerReport/GetCusOutput',                            //客户等级分析调出表格
    // "GetCusUpgrade": href + '/crm/api/CustomerReport/GetCusUpgrade',                            //客户等级分析升级表格
    // "GetCusLossData": href + '/crm/api/CustomerReport/GetCusLossData',                            //客户等级分析流失表格
    // "GetCusDegrade": href + '/crm/api/CustomerReport/GetCusDegrade',                            //客户等级分析降级表格
    "getIpoList": href + '/crm/api/Ipo/getIpoList',                                                //ipo列表
    "getIPOProduct": href + '/crm/api/Ipo/getIpoProduct',
    'getFundPlatform': href + '/crm/api/Ipo/getFundPlatform',                                      //ipo录入，基金平台下拉框
    'getIPOCompetitor': href + '/crm/api/Ipo/getIPOCompetitor',                                   //ipo录入，竞争对手下拉框
    'SetOwnProduct': href + '/crm/api/Ipo/SetOwnProduct',                                         //我司产品录入
    "SetCompetitorProduct": href + '/crm/api/Ipo/SetCompetitorProduct',                            //竞品录入
    'getVisitPeople': href + '/crm/api/ServiceDetail/getVisitPeople',                       //拜访对象
    'getTheirContacts': href + '/crm/api/ServiceDetail/getTheirContacts',                  //对方联系人
    'getOurStaffs': href + '/crm/api/ServiceDetail/getOurStaffs',                        //我方人员
    'getVisitType': href + '/crm/api/OpportunityType/GetVisitType',                          //拜访类型
    'AddVisitRecord': href + '/crm/api/ServiceDetail/ServiceRecordAdd',                     //拜访新增
    'UpdataVisit': href + '/crm/api/ServiceDetail/UpdataVisit',                        //拜访修改
    'SelectProduct': href + '/crm/api/Ipo/SelectProduct',                                     //根据产品代码获得名称
    'getVisistObject': href + '/crm/api/ServiceDetail/Getvisitobject',                   //拜访对象查询
    'getOurPeopleList': href + '/crm/api/ServiceDetail/Getmanagerlist',                       //我方人员查询
    "PurchaseRedemption": href + '/crm/api/PurchaseRedemption/PurchaseRedemption',                      //电商申购,赎回
    "PurchaseRedemptionDetailed": href + "/crm/api/PurchaseRedemption/PurchaseRedemptionDetailed",      //申购赎回详情

    "GetCusttype": href + '/crm/api/OpportunityType/GetCusttype',                      //潜客详情修改-客户类型
    "GetLeadsource": href + '/crm/api/OpportunityType/GetLeadsource',                      //潜客详情修改-客户来源
    "GetLeadstatus": href + '/crm/api/OpportunityType/GetLeadstatus',                      //潜客详情修改-客户状态
    "GetLeadProducttype1": href + '/crm/api/OpportunityType/GetLeadProducttype1',                      //潜客详情修改-产品类型
    "GetLeadIdentitytype": href + '/crm/api/OpportunityType/GetLeadIdentitytype',                      //潜客详情修改-证件类型
    "GetLeadeducation": href + '/crm/api/OpportunityType/GetLeadeducation',                      //潜客详情修改-学历
    "GetLeadGender": href + '/crm/api/OpportunityType/GetLeadGender',                      //性别
    "SubmitLeadAdd": href + '/crm/api/customer/LeadAdd',                      //潜客新增
    "SubmitLeadChange": href + '/crm/api/customer/LeadChange',                //潜客修改
    "GetThreeVisitAnalyze": href + '/crm/api/Customer/GetVisitData',                      //三方拜访数据分析
    "GetThreeVisitAnalyzeDetail": href + '/crm/api/Customer/GetVisitDataList',                      //三方拜访数据分析


    "GetTabData": href + '/crm/api/getProductJournal/getProductType',                      //产品净值日报-tabs
    "getProductJournals": href + '/crm/api/getProductJournal/getProductJournals',                      //产品净值日报数据
    "GetProductJLIne": href + '/crm/api/getProductJournal/GetProductJLIne',                   //产品净值折线图
    "GetHoldProduct": href + '/crm/api/getProductJournal/GetHoldProduct',                   //产品净值-持有产品查询

    "GetSpecialList": href + '/crm/api/SpecialSalesPlan/GetCampaignlist',                      //专项销售计划列表
    "Getcampigntype": href + '/crm/api/OpportunityType/Getcampigntype',                      //专项销售-计划类型
    "Getcampignstate": href + '/crm/api/OpportunityType/Getcampignstate',                      //专项销售-计划类型
    "GetSpecialDetailA": href + '/crm/api/SpecialSalesPlan/SpecialSalesPlanDetail',                      //专项销售计划详情
    "GetSpecialDetailB": href + '/crm/api/SpecialSalesPlan/RelatedProduts',                      //专项销售计划详情
    "GetSpecialDetailC": href + '/crm/api/SpecialSalesPlan/RelatedActivity',                      //专项销售计划详情

    "GetLevelChangeManager": href + '/crm/api/AttributionAnalysis/GetUserName',                   //升降级客户处理--获取所有客户经理
    "GetLevelChangeList": href + '/crm/api/AttributionAnalysis/getAttributeList',            //升降级客户处理--归因分析列表
    "GetLevelChangeDetail": href + '/crm/api/AttributionAnalysis/getAttributeDetail',        //升降级客户处理--归因分析详细
    "GetMainReason": href + '/crm/api/AttributionAnalysis/getMainReason',                    //升降级客户处理--获取主观原因
    "MainReasonUpdate": href + '/crm/api/AttributionAnalysis/mainReasonUpdate',                  //升降级客户处理--主管原因更新

    "GetIPOAnalysisTabs": href + '/crm/api/MutualRealIPO/GetIpoDimForApp',                    //三方IPO录入分析--tab名称
    "GetIPOColumnChart": href + '/crm/api/MutualRealIPO/GetIPOColumnChart',                   //三方IPO录入分析--竞品排名柱状图
    "GetIPOLineChart": href + '/crm/api/MutualRealIPO/GetIPOLineChart',                       //三方IPO录入分析--时点趋势折线图
    "GetIPOTableChart": href + '/crm/api/MutualRealIPO/GetIPOTableChart',                     //三方IPO录入分析--竞品排名明细表
    "GetChannelDetail": href + '/crm/api/MutualRealIPO/GetChanneldetail',                     //三方IPO录入分析--渠道排名柱状图
    "GetChannelTable": href + '/crm/api/MutualRealIPO/GetChanneltable',                       //三方IPO录入分析--渠道排名明细表 
    "GetChannelName": href + '/crm/api/MutualRealIPO/GetChannelName',                         //三方IPO录入分析--平台名称

    "GetAppEntryConfiguration": href + '/crm/api/HomeEntrance/GetAppEntryConfiguration',                         //crm首页-新应用
    "GetEntranceRecord": href + '/crm/api/HomeEntrance/GetEntranceRecord',                         //crm首页-最近使用记录
    "CreateEntranceRecord": href + '/crm/api/HomeEntrance/CreateEntranceRecord',                   //crm首页-点击提交记录

    "GetKTIList": href +"/crm/api/KTI/GetKTIList",          //KIT列表
    "GetKTIProgress": href +"/crm/api/OpportunityType/GetKTIProgress",      //进度下拉框
    "GetKTIFrequency": href +"/crm/api/OpportunityType/GetKTIFrequency",        //更新频率下拉框
    "GetKTIStatu": href +"/crm/api/OpportunityType/GetKTIStatu",        //状态下拉框
    "GetKTIDetail": href +"/crm/api/KTI/GetKTIDetail",              //KIT详情
    "GetKTIDetailXZR": href +"/crm/api/KTI/GetKTIDetailXZR",            //KIT详情中协作人列表
    "UpdateReject": href +"/crm/api/KTI/UpdateReject",          //驳回按钮调用接口
    "UpdateApprove": href +"/crm/api/KTI/UpdateApprove",        //审批按钮调用接口

    "GetCustGroupList": href + "/crm/api/CustGroup/GetCustGroupList",       //查询客户组列表
    "GetCustGroupBase": href + "/crm/api/CustGroup/GetCustGroupBase",       //查询客户组基本信息
    "GetCustInfo": href + "/crm/api/CustGroup/GetCustInfo",                 //客户组-客户信息

    "HeightValueCustomer": href + "/crm/api/HeightValueCustomer/HeightValueCustomer",       //高净值客户报表柱状图和趋势图

    "KeChuangReport": href + "/crm/api/ExternalCall/KeChuangReport",            //科创版外呼客户分析

    "XianJinBaoGetProductList": href + "/crm/api/XianJinBao/GetProductList",              //现金宝基金列表
    "XianJinBaoGetType": href + "/crm/api/XianJinBao/GetType",                            //现金宝基金类型

};


export default API_LIST;