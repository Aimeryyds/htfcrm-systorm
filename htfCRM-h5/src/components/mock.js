/*
 * @Author: Thomas Ji 
 * @Date: 2019-02-15 09:31:23 
 * @Last Modified by: Thomas Ji
 * @Last Modified time: 2019-03-13 09:16:12
 */
import Mock from 'mockjs';
const mRandom = Mock.Random;
//mock数据

function getParams(opt, type) {
    if(type == 'get')
    {
        let re = /\?.*$/, url = opt.url;
        let match = re.exec(url);
        if (match) {
            match = match[0];
        }
        else
            match = '';
        return match.split('&');
    }else{
        let body = opt.body|| '';
        body = body.split('&');
        return body.map(item => decodeURIComponent(item));
    }

}
Mock.mock(/SystemUser\/GetUserInfo/, 'get', function(opt){
    return {
        data:{
            "isSanfang": "1",
            "mobile": "1234",
            "name": mRandom.cname(),
            "isGaojingzhi": true,
            'id': mRandom.guid(),
        }
    }
});

Mock.mock(/customer\/LeadAdd/, 'post', function(opt){
    return {
        "code": "200",
        "msg":"Success",
        "data":""
    }
});
Mock.mock(/customer\/LeadChange/, 'post', function(opt){
    return {
        "code": "200",
        "msg":"Success",
        "data":""
    }
});

Mock.mock(/customer\/LeadChange/, 'post', function(opt){
    return {
        "code": "200",
        "msg":"Success",
        "data":""
    }
});
Mock.mock(/Appointment\/GetUserIndexMenus/, 'get', function (opt) {   //首页权限
    return {
        "code": "200",
        "msg": "Success",
        "data": [
            {
                "Key": "qianke",
                "Value": true
            },
            {
                "Key": "kehu",
                "Value": true
            },
            {
                "Key": "lianxiren",
                "Value": true
            },
            {
                "Key": "jingzhengduishou",
                "Value": true
            },
            {
                "Key": "jijinchanpin",
                "Value": true
            },
            {
                "Key": "shangjiguanli",
                "Value": true
            },
            {
                "Key": "jijinjingli",
                "Value": true
            },
            {
                "Key": "daibanshixiang",
                "Value": true
            },
            {
                "Key": "shichangyingxiao",
                "Value": true
            },
            {
                "Key": "baifangjilu",
                "Value": true
            },
            {
                "Key": "kehudengji",
                "Value": true
            },
            {
                "Key": "kehufenpai",
                "Value": true
            },
            {
                "Key": "kehujingli",
                "Value": true
            },
            {
                "Key": "zijinliuxiangtongji",
                "Value": true
            },
            {
                "Key": "kehujinglipaiming",
                "Value": true
            },
            {
                "Key": "kehupaiming",
                "Value": true
            },
            {
                "Key": "liushiwanhui",
                "Value": true
            },
            {
                Key:'ipo',
                Value: true
            },
            {
                Key:'zhuanxiangxiaoshoujihua',
                Value: true
            },
            {
                Key:'qiandao',
                Value: true
            },
            {
                Key:'shengoushuhui',
                Value: true
            },
            {
                Key:'sanfangbaifang',
                Value: true
            },{
                Key:'chanpinjingzhiribao',
                Value: true
            },
            {
                Key:'zhuanxiangxiaoshoujihua',
                Value: true
            },
            {
                Key:'shengjiangjikehu',
                Value: true
            },
            {
                Key:'sanfangipofenxi',
                Value: true
            },
            {
                Key:'kti',
                Value: true
            },
            {
                Key:'waihukehufenxi',
                Value: true
            }
        ]
    }
    // return {data: []};
})
Mock.mock(/GetMoneyFlow/, 'get', function (opt) {//资金流向，高净值客户资金流向
    console.log(opt);
    if (/type=5/.test(opt.url)) {

        return {
            "code": "200",
            "meg": "mock",
            "data": {
                "data": {
                    "Inflows": [                                      //流入
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                    ],
                    "Outflows": [                                          //流出
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                    ],
                    "NetWorth": [
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                    ],
                    "NoInflows": [                           //无管户流入
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                    ],
                    "NoOutflows": [
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                    ],
                    "IncludeNoManager": true,                            //是否包含无管户
                    "DateSeries": [                                           //日期
                        "2017年第2季度",
                        "2017年第3季度",
                        "2017年第4季度",
                        "2018年第5季度",
                        "2018年第6季度",
                        "2018年第3季度",
                        "2018年第9季度",
                        "2019年第3季度"
                    ]
                }
            }
        }
    } else {
        return {
            "code": "200",
            "meg": "mock",
            "data": {
                "data": {
                    "Inflows": [                                      //流入
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                    ],
                    "Outflows": [                                          //流出
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                        mRandom.integer(-10000, 0),
                    ],
                    "NetWorth": [
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                        mRandom.integer(0, 10000),
                    ],
                    "NoInflows": [                           //无管户流入

                    ],
                    "NoOutflows": [

                    ],
                    "IncludeNoManager": false,                            //是否包含无管户
                    "DateSeries": [                                           //日期
                        "2017年第2季度",
                        "2017年第3季度",
                        "2017年第4季度",
                        "2018年第5季度",
                        "2018年第6季度",
                        "2018年第3季度",
                        "2018年第9季度",
                        "2019年第3季度"
                    ]
                }
            }
        }
    }
})

Mock.mock(/CustomerReport\/GetUserNameRole/, 'get', {
    "data": [{
        "roleName": "HTF-高净值-团队主管",
        "roleType": "1",
        "teamName": "高净值",
        "userName": "李卓洵"
    }]
})

Mock.mock(/CustomerReport\/GetUserNameMoneys/, 'get', function (opt) {
    console.log('usernamemoney', getParams(opt));
    let list = [];
    for (let i = 0; i < 10; i++) {
        list.push({
            "id": mRandom.guid(),
            "name": mRandom.cname()
        })
    }
    list.push({ name: '全部非无管户', id: 134 })
    return ({ data: { list, } });
})
Mock.mock(/CustomerReport\/GetUserName/, 'get', function (opt) {//获取客户经理
    let list = [];
    for (let i = 0; i < 10; i++) {
        list.push({
            "id": mRandom.guid(),
            "name": mRandom.cname()
        })
    }
    return ({ data: { list, } })
})
Mock.mock(/PurchaseRedemption\/GetUserName/, 'get', function (opt) {//获取客户经理
    let list = [];
    for (let i = 0; i < 10; i++) {
        list.push({
            "id": mRandom.guid(),
            "name": mRandom.cname()
        })
    }
    list.push({ name: '无管户', id: 134 });
    list.push({ name: '全部', id: 2232 });
    return ({ data: { list, } })
})


Mock.mock(/Fund\/GetTotalQuantity/, 'get', function (opt) {          //资金流向总保有量
    console.log(opt);
    let dates = [], quantity = [];
    for (let i = 0; i < 15; i++) {
        dates.push(mRandom.date('yyyy-MM-dd'));
        quantity.push(mRandom.integer(0, 100000));
    }
    return {
        data: {
            dates,
            quantity
        }
    }
})

Mock.mock(/Fund\/GetLossBack\?/, 'get', function () {
    let dates = [], netLoss = [], netBack = [], unNetLoss = [], unNetBack = [];
    for (let i = 0; i < 10; i++) {
        dates.push(mRandom.date('yyyy-mm'));
        netLoss.push(mRandom.integer(0, 100000));
        unNetLoss.push(mRandom.integer(0, 100000));
        netBack.push(mRandom.integer(0, 100000));
        unNetBack.push(mRandom.integer(0, 100000));
    }
    return {
        data: {
            dates, netLoss, netBack, unNetLoss, unNetBack
        }
    };
})

Mock.mock(/Fund\/GetLossBackTable/, 'get', function () {
    let data = [];
    for (let i = 0; i < 3; i++) {
        let cur = [];
        cur.push({ name: mRandom.cname(), id: mRandom.guid() });
        for (let j = 0; j < 9; j++) {
            cur.push(mRandom.integer(0, 10000));
        }
        data.push(cur);
    }
    return { data };
})
Mock.mock(/CustomerRetention\/CustomerRetention\?/, 'get', function (opt) {  //客户经理保有量分析
    let data = [];
    console.log(getParams(opt));
    for (let i = 0; i < 12; i++) {
        let cur = [];
        cur.push({ name: mRandom.cname(), id: mRandom.guid() });
        for (let j = 0; j < 4; j++) {
            cur.push(mRandom.integer(0, 1000));
        }
        data.push(cur);
    }
    return { data: { list: data, date: mRandom.date('yyyy-MM-dd') } };
})

Mock.mock(/Customer\/GetCusApportion/, 'get', function (opt) {  //客户分派->分派客户数
    let flag = mRandom.boolean();
    let data = [];

    for (let i = 0; i < 5; i++) {
        data.push(mRandom.integer(0, 50));
    }
    if (flag) {
        return {
            "code": "200",
            "msg": "Success",
            "data": {
                "data": data //从左到右，依次战略到黄金数
            }
        }
    } else {
        return {
            "code": "200",
            "msg": "Success",
            "data": {
                "data": [] //从左到右，依次战略到黄金数
            }
        }
    }

})

Mock.mock(/Customer\/GetCurLevelDistribution/, 'get', function (opt) {    //客户分派->现有等级分布
    console.log(getParams(opt));
    let data = [];
    for (let i = 0; i < 4; i++) {
        data.push(mRandom.integer(0, 50));
    }
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "data": [1, 1, 1, 1] //从左到右，依次等级从低到高
        }
    }
})

Mock.mock(/Customer\/GetCusRetrun/, 'get', function (opt) {
    console.log(getParams(opt));
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            list: [
                {
                    manager: { id: 123, name: "李卓洵" },
                    apportionTime: "2019-1-01",  //分派日期
                    apportionNum: 3,                //客户数
                    curLevelDis: [1, 1, 1, 0, 0, 0],  //从左到右黄金到战略
                    preQuantity: 100,                //分派时保有量单位百万
                    curQuantity: 100,              //当前保有量
                    changeRate: '0.0%',          //变化率

                },
                {
                    manager: { id: 124, name: "姚佳妮" },
                    apportionTime: "2019-1-01",
                    apportionNum: 3,
                    curLevelDis: [1, 1, 1, 0, 0, 0],  //从左到右黄金到战略
                    preQuantity: 100,                //分派时保有量单位百万
                    curQuantity: 100,              //当前保有量
                    changeRate: '0.0%',          //变化率
                },
            ],
            total: [
                6, 2, 2, 2, 0, 0, 0, 200, 200, "0%"
            ] // 总计从左到右分别为   分派用户数， 黄金到战略
        }
    }
})

Mock.mock(/Customer\/GetCusLoopbackDetail/, 'get', function (opt) {            //客户分派详情表
    console.log('详情表', getParams(opt));
    let flag = mRandom.boolean();
    if (1) {
        return {

            "code": "200",
            "msg": "Success",
            "data":
                [
                    {
                        "DateTime": "2018-10-12",//分派时间
                        "MangerId": "2b2ea62c-b2d6-e811-a12c-005056aeb9d5",//经理id
                        "ManagerName": "李卓洵",//经理姓名
                        "list": [
                            {
                                "level": "普通",//客户等级
                                "apportionNums": 2,//分派客户数
                                "ZhanLueCount": 4, //战略客户数
                                "CaiFuCount": 5, //财富客户数
                                "ZuanShiCount": 6,//钻石客户数
                                "BaiJinCount": 7,//白金。。。
                                "HuangJinCount": 8, //黄金。。。
                                "PuTongCount": 8, //普通。。。
                                "preQuantity": "67999", //分派时保有量
                                "curQuantity": "7868", //当前保有量
                                "changeRate": "0.89"//变化率
                            },
                            {
                                "level": "钻石",
                                "apportionNums": 12,
                                "ZhanLueCount": 14,
                                "CaiFuCount": 51,
                                "ZuanShiCount": 16,
                                "BaiJinCount": 27,
                                "HuangJinCount": 81,
                                "PuTongCount": 18,
                                "preQuantity": "673999",
                                "curQuantity": "781268",
                                "changeRate": "0.29"
                            }
                        ]
                    },
                    {
                        "DateTime": "2018-11-12",
                        "MangerId": "2b2ea62c-b2d6-e811-a12c-005056aeb9d6",
                        "ManagerName": "姚加",
                        "list": [
                            {
                                "level": "普通",
                                "apportionNums": 2,
                                "ZhanLueCount": 4,
                                "CaiFuCount": 5,
                                "ZuanShiCount": 6,
                                "BaiJinCount": 7,
                                "HuangJinCount": 8,
                                "PuTongCount": 8,
                                "preQuantity": "67999",
                                "curQuantity": "7868",
                                "changeRate": "0.89"
                            },
                            {
                                "level": "钻石",
                                "apportionNums": 12,
                                "ZhanLueCount": 14,
                                "CaiFuCount": 51,
                                "ZuanShiCount": 16,
                                "BaiJinCount": 27,
                                "HuangJinCount": 81,
                                "PuTongCount": 18,
                                "preQuantity": "673999",
                                "curQuantity": "781268",
                                "changeRate": "0.29"
                            }
                        ]
                    },
                    {
                        "DateTime": "2018-11-12",
                        "MangerId": "2b2ea62c-b2d6-e811-a12c-005056aeb9d7",
                        "ManagerName": "姚加",
                        "list": [
                            {
                                "level": "普通",
                                "apportionNums": 2,
                                "ZhanLueCount": 4,
                                "CaiFuCount": 5,
                                "ZuanShiCount": 6,
                                "BaiJinCount": 7,
                                "HuangJinCount": 8,
                                "PuTongCount": 8,
                                "preQuantity": "67999",
                                "curQuantity": "7868",
                                "changeRate": "0.89"
                            },
                            {
                                "level": "钻石",
                                "apportionNums": 12,
                                "ZhanLueCount": 14,
                                "CaiFuCount": 51,
                                "ZuanShiCount": 16,
                                "BaiJinCount": 27,
                                "HuangJinCount": 81,
                                "PuTongCount": 18,
                                "preQuantity": "673999",
                                "curQuantity": "781268",
                                "changeRate": "0.29"
                            }
                        ]
                    },
                    {
                        "DateTime": "2018-11-12",
                        "MangerId": "2b2ea62c-b2d6-e811-a12c-005056aeb9d8",
                        "ManagerName": "姚加",
                        "list": [
                            {
                                "level": "普通",
                                "apportionNums": 2,
                                "ZhanLueCount": 4,
                                "CaiFuCount": 5,
                                "ZuanShiCount": 6,
                                "BaiJinCount": 7,
                                "HuangJinCount": 8,
                                "PuTongCount": 8,
                                "preQuantity": "67999",
                                "curQuantity": "7868",
                                "changeRate": "0.89"
                            },
                            {
                                "level": "钻石",
                                "apportionNums": 12,
                                "ZhanLueCount": 14,
                                "CaiFuCount": 51,
                                "ZuanShiCount": 16,
                                "BaiJinCount": 27,
                                "HuangJinCount": 81,
                                "PuTongCount": 18,
                                "preQuantity": "673999",
                                "curQuantity": "781268",
                                "changeRate": "0.29"
                            }
                        ]
                    },
                    {
                        "DateTime": "2018-11-12",
                        "MangerId": "2b2ea62c-b2d6-e811-a12c-005056aeb9d9",
                        "ManagerName": "姚加",
                        "list": [
                            {
                                "level": "普通",
                                "apportionNums": 2,
                                "ZhanLueCount": 4,
                                "CaiFuCount": 5,
                                "ZuanShiCount": 6,
                                "BaiJinCount": 7,
                                "HuangJinCount": 8,
                                "PuTongCount": 8,
                                "preQuantity": "67999",
                                "curQuantity": "7868",
                                "changeRate": "0.89"
                            },
                            {
                                "level": "钻石",
                                "apportionNums": 12,
                                "ZhanLueCount": 14,
                                "CaiFuCount": 51,
                                "ZuanShiCount": 16,
                                "BaiJinCount": 27,
                                "HuangJinCount": 81,
                                "PuTongCount": 18,
                                "preQuantity": "673999",
                                "curQuantity": "781268",
                                "changeRate": "0.29"
                            }
                        ]
                    },
                ]


            // "code":"200",
            // "msg":"Success",
            // "data":{
            //        list:[
            //         {
            //            manager: {id: 123, name: "李卓洵"},
            //            apportionTime: "2019-1-01",  //分派日期
            //            apportionNums: [1,1,1,1,1,1],                //分派客户数左到右战略到普通
            //            curLevelDis: [
            //                [1,1,1,1,1,1,],                   //分派时为战略客户当前的等级分布，左到右：战略到普通
            //                [1,1,1,1,1,1,],                   //分派时为财富...
            //                [1,1,1,1,1,1,],                   //分派时为钻石....
            //                [1,1,1,1,1,1,],                   //....
            //                [1,1,1,1,1,1,],
            //                [1,1,1,1,1,1,],
            //            ],  //从左到右黄金到战略
            //            preQuantity: [100,100,100,100, 100, 100],                //转化时保有量单位百万,战略到普通
            //            curQuantity: [100,100,100,100, 100, 100],               //当前保有量 战略到普通
            //            changeRate:   ["0.0%", "0.0%","0.0%","0.0%","-2.0%","0.0%",]          //变化率 战略到普通

            //        },
            //         {
            //            manager: {id: 124, name: "姚佳妮"},
            //            apportionTime: "2019-1-01",  //分派日期
            //            apportionNums: [1,1,1,1,1,1],                //分派客户数左到右战略到普通
            //            curLevelDis: [
            //                [1,1,1,1,1,1,],                   //分派时为战略客户当前的等级分布，左到右：战略到普通
            //                [1,1,1,1,1,1,],                   //分派时为财富...
            //                [1,1,1,1,1,1,],                   //分派时为钻石....
            //                [1,1,1,1,1,1,],                   //....
            //                [1,1,1,1,1,1,],
            //                [1,1,1,1,1,1,],
            //            ],  //从左到右黄金到战略
            //            preQuantity: [100,100,100,100, 100, 100],                //转化时保有量单位百万,战略到普通
            //            curQuantity: [100,100,100,100, 100, 100],               //当前保有量 战略到普通
            //            changeRate:   ["0.0%", "0.0%","0.0%","0.0%","0.0%","0.0%",]          //变化率 战略到普通
            //        },
            //         {
            //            manager: {id: 124, name: "姚佳妮"},
            //            apportionTime: "2019-1-01",  //分派日期
            //            apportionNums: [1,1,1,1,1,1],                //分派客户数左到右战略到普通
            //            curLevelDis: [
            //                [1,1,1,1,1,1,],                   //分派时为战略客户当前的等级分布，左到右：战略到普通
            //                [1,1,1,1,1,1,],                   //分派时为财富...
            //                [1,1,1,1,1,1,],                   //分派时为钻石....
            //                [1,1,1,1,1,1,],                   //....
            //                [1,1,1,1,1,1,],
            //                [1,1,1,1,1,1,],
            //            ],  //从左到右黄金到战略
            //            preQuantity: [100,100,100,100, 100, 100],                //转化时保有量单位百万,战略到普通
            //            curQuantity: [100,100,100,100, 100, 100],               //当前保有量 战略到普通
            //            changeRate:   ["0.0%", "0.0%","0.0%","0.0%","0.0%","0.0%",]          //变化率 战略到普通
            //        },
            //         {
            //            manager: {id: 124, name: "姚佳妮"},
            //            apportionTime: "2019-1-01",  //分派日期
            //            apportionNums: [1,1,1,1,1,1],                //分派客户数左到右战略到普通
            //            curLevelDis: [
            //                [1,1,1,1,1,1,],                   //分派时为战略客户当前的等级分布，左到右：战略到普通
            //                [1,1,1,1,1,1,],                   //分派时为财富...
            //                [1,1,1,1,1,1,],                   //分派时为钻石....
            //                [1,1,1,1,1,1,],                   //....
            //                [1,1,1,1,1,1,],
            //                [1,1,1,1,1,1,],
            //            ],  //从左到右黄金到战略
            //            preQuantity: [100,100,100,100, 100, 100],                //转化时保有量单位百万,战略到普通
            //            curQuantity: [100,100,100,100, 100, 100],               //当前保有量 战略到普通
            //            changeRate:   ["0.0%", "0.0%","0.0%","0.0%","0.0%","0.0%",]          //变化率 战略到普通
            //        },
            //         {
            //            manager: {id: 124, name: "姚佳妮"},
            //            apportionTime: "2019-1-01",  //分派日期
            //            apportionNums: [1,1,1,1,1,1],                //分派客户数左到右战略到普通
            //            curLevelDis: [
            //                [1,1,1,1,1,1,],                   //分派时为战略客户当前的等级分布，左到右：战略到普通
            //                [1,1,1,1,1,1,],                   //分派时为财富...
            //                [1,1,1,1,1,1,],                   //分派时为钻石....
            //                [1,1,1,1,1,1,],                   //....
            //                [1,1,1,1,1,1,],
            //                [1,1,1,1,1,1,],
            //            ],  //从左到右黄金到战略
            //            preQuantity: [100,100,100,100, 100, 100],                //转化时保有量单位百万,战略到普通
            //            curQuantity: [100,100,100,100, 100, 100],               //当前保有量 战略到普通
            //            changeRate:   ["0.0%", "0.0%","0.0%","0.0%","0.0%","0.0%",]          //变化率 战略到普通
            //        },
            //        ],

        }
    }
    else {
        return {
            data: {
                list: []
            }
        }
    }

})

Mock.mock(/Rank\/GetTopTenOwnCustomer/, 'get', function (opt) {    //自有三方平台十大客户排名
    console.log('GetTopTenOwnCustomer', getParams(opt));
    let names = [], data = [], accountid = [];
    for (let i = 0; i < 10; i++) {
        names.push(mRandom.cname());
        data.push(mRandom.integer(0, 500));
        accountid.push(mRandom.guid());
    }
    names[9] = ('很长很长很长很长很长的公司名字');

    return {
        data: {
            custName: names,
            data,
            accountid
        }
    };
})
Mock.mock(/CustomerReport\/getManagerLevelNumber/, 'get', function (opt) {
    let time = [], uplevel = [], downlevel = [];
    for (let i = 0; i < 8; i++) {
        time.push(mRandom.date('yyyy-MM-dd'));
        uplevel.push(mRandom.integer(0, 50));
        downlevel.push(mRandom.integer(-50, 0));
    }
    return {
        data: {
            time, uplevel, downlevel
        }
    }
})
Mock.mock(/CustomerReport\/getGJZNumber/, 'get', function (apt) {                  //高净值客户整体升降级统计
    return {
        "data": {
            'time': ['2019-1-23', '2019-1-24', '2019-1-25', '2019-1-26', '2019-1-27',],
            'uplevel': ["5", "3", "2", "1", "5"],
            'downlevel': [-1, -2, -3, -4, -5],
            'NoChange': [1, 2, 4, 5, 500000]
        }
    }
})

Mock.mock(/Customermanager\/GetQuantityTableData/, 'get', function (opt) {          //客户经理保有量表格
    return {
        "code": "200",
        "meg": "Success",
        "data": [{
            "name": '李先生',
            'custnum': '123', //客户编号
            'curquantity': 5000, //现有保有量
            'province': '浙江省',
            'city': '杭州',
            'mobile': '123445', //电话
            'id': 123 //客户的id,跳转传参用
        },
            {
                "name": '张先生',
                'custnum': '124',
                'curquantity': 5000,
                'province': '浙江省',
                'city': '杭州',
                'mobile': '123445',
                'id': 124
            },
            {
                "name": '李先生',
                'custnum': '125',
                'curquantity': 5000,
                'province': '浙江省',
                'city': '杭州',
                'mobile': '123445',
                'id': 125
            },
            {
                "name": '李先生',
                'custnum': '126',
                'curquantity': 5000,
                'province': '浙江省',
                'city': '杭州',
                'mobile': '123445',
                'id': 126
            },

        ]
    }
})

Mock.mock(/Customermanager\/GetTotalQuantity/, 'get', function (opt) {           //客户经理保有量图
    return {
        "data": [0,10,8,27,1,6]
    }
})

Mock.mock(/Manager\/GetManagerAssetData/, 'get', function (opt) {
    let data = [];
    data[0] = [], data[1] = [];
    for (let i = 0; i < 6; i++) {
        data[0].push({
            name: mRandom.cname(),
            value: mRandom.integer(0, 50)
        });
        data[1].push({
            name: mRandom.cname(),
            value: mRandom.integer(0, 50)
        })
    }
    return {
        "data": data
    }
})
Mock.mock(/ManagerRank\/GetManagerLossRank/, 'get', function (opt) {    //客户经理排名，流失排名
    let names = [], originCustNum = [], lossNum = [], lossRate = [], num = mRandom.integer(5, 15);
    for (let i = 0; i < num; i++) {
        names.push(mRandom.cname());
        originCustNum.push(mRandom.integer(0, 50));
        lossNum.push(mRandom.integer(0, 50));
        lossRate.push(mRandom.integer(0, 50));
    }
    return {
        data: {
            names,
            originCustNum,
            lossNum,
            lossRate,
            date: mRandom.date('yyyy-MM-dd')
        }
    }
})
Mock.mock(/ManagerRank\/GetManagerDeGradation/, 'get', function (opt) {    //客户经理排名，降级率排名
    let names = [], originCustNum = [], degradationNum = [], degradRate = [], num = mRandom.integer(5, 15);
    for (let i = 0; i < num; i++) {
        names.push(mRandom.cname());
        originCustNum.push(mRandom.integer(0, 50));
        degradationNum.push(mRandom.integer(0, 50));
        degradRate.push(mRandom.integer(0, 50));
    }
    return {
        data: {
            names,
            originCustNum,
            degradationNum,
            degradRate,
            date: mRandom.date('yyyy-MM-dd')
        }
    }
})
Mock.mock(/CustomerReport\/GetCusCurQuantity/, 'get', function (opt) {//客户等级分析，当前存量

    let data = [], length = mRandom.integer(0, 30), total = [];
    for (let j = 0; j < length; j++) {
        let cur = [];
        cur.push({ id: mRandom.guid(), name: mRandom.cname(), custType: mRandom.integer(0, 3) });
        for (let i = 0; i < 14; i++) {
            cur.push(mRandom.integer(0, 100))
        }
        data.push(cur)
    }
    for(let i = 0; i < 14; i++){
        total.push(mRandom.integer(100,100000));
    }
    return {
        data: {
            list: data,
            total,
        }
    }
});
Mock.mock(/CustomerReport\/GetCusImport/, 'get', function(opt){  //客户等级分析，调入调出
    let data = [], length = mRandom.integer(0, 30);
    for (let j = 0; j < length; j++) {
        let cur = [];
        cur.push({ id: mRandom.guid(), name: mRandom.cname(), custType: mRandom.integer(0, 3) });
        for (let i = 0; i < 1; i++) {
            cur.push(mRandom.integer(0, 100))
        }
        data.push(cur)
    }
    return {
        data: {
            list: data,
            total: [123]
        }
    }
});
Mock.mock(/CustomerReport\/GetCusOutput/, 'get', function(opt){           //等级分析，升降级表格
    let data = [], length = mRandom.integer(0, 30);
    for (let j = 0; j < length; j++) {
        let cur = [];
        cur.push({ id: mRandom.guid(), name: mRandom.cname(), custType: mRandom.integer(0, 3) });
        for (let i = 0; i < 6; i++) {
            cur.push(mRandom.integer(0, 100))
        }
        data.push(cur)
    }
    return {
        data: {
            list: data,
            total: [1,2,3,4,5,6]
        }
    }
})
Mock.mock(/CustomerManager\/GetCustomerManagerLists/, 'get', function (opt) {//客户经理列表
    // let params = getParams(opt), key, flag = mRandom.boolean();
    // key = params.find((item) => item.indexOf('key') > -1).split('=')[1];
    let flag = mRandom.boolean();
    let key = '';
    if (key == 'none') {
        return {
            data: {

                "Key": "*",
                "value": []

            }
        }
    }
    let data = [];
    if(flag){
        return {data: {

            "Key": "*",
            "value": []

        }
        }
    }
    for (let i = 0; i < 20; i++) {
        data.push({ id: mRandom.guid(), name: mRandom.cname(), 'team': '高净值' });
    }
    return {
        data: {
            "Key": "*",
            "value": data
        }
    }
})

Mock.mock(/Customermanager\/GetManagerAssetData/, 'get', function (opt) {//客户经理资产
    let outter = mRandom.integer(1, 3), inner = mRandom.integer(1, 6), data = [], cur = [];
    console.log('客户经理资产',getParams(opt))
    for (let i = 0; i < outter; i++) {
        cur.push({ name: mRandom.cname(), value: mRandom.float(0, 1000) });
    }
    data.push([{name: '公募', value: 10}, {name: '一对多', value: 20}]);
    cur = [];
    for (let i = 0; i < inner; i++) {
        cur.push({ name: mRandom.cname(), value: mRandom.float(0, 1000) });
    }
    data.push(cur);
    return { data };
    // return {
    //     data: [[{name:'d', value: 101417312.14},], [
    //         {'name':'空', value: 58896118.81},
    //         {'name':'固收', value: 119408228.88},
    //         {'name':'空', value: 71681923.99},
    //         {'name':'空', value: 59226085.25},
    //     ]]
    // }
})

Mock.mock(/Customermanager\/GetManagerDetail/, 'get', function (opt) {  //客户经理详情
    return {
        data: {
            holdthehighestproduct: "现金宝",
            holdthehighestproductcapiat: mRandom.float(1, 9999, 0, 99),
            name: mRandom.cname(),
            number: mRandom.integer(0, 100),
            team: '高净值',
            totalownership: mRandom.float(1, 99999, 0, 99)
        }
    }
})

Mock.mock(/Customermanager\/GetQuantityTableData/, 'get', function (opt) {//客户经理保有量表格
    console.log(opt);
    let data = [], len = mRandom.integer(1, 20);
    for (let i = 0; i < len; i++) {
        data.push({
            name: mRandom.csentence(),
            custnum: mRandom.integer(1, 100),
            province: '浙江省',
            city: '杭州',
            mobile: 123456,
            id: mRandom.guid(),
            curquantity: mRandom.integer(1, 10000)
        })
    }
    return { data };
})

Mock.mock(/Ipo\/getIpoList/, 'get', function(opt){                          //ipo列表
    let  len = mRandom.integer(1,5);
    let cur = {}, len1 = mRandom.integer(2,10);
    cur.productName = mRandom.ctitle();
    cur.code = mRandom.integer(10000,99999);
    cur.productid = mRandom.guid();
    cur.list = [];
    for(let j = 0; j < len1; j++){
        cur.list.push({
            "date": mRandom.date('yyyy-MM-dd MM:hh'),//数据日期
            "time": '11:22',//时间
            "code": mRandom.integer(100000,999999),//产品代码
            "amount": mRandom.float(10000,999999,2,2),//认购金额
            "productid": "c03de79f-ad04-4714-9db1-000040f33cfb",//产品id
            "productName": mRandom.cname(),//产品名称
            "partiesName":"平台1平台1平台1平台1"//三方平台

        })

    }
    return {data:cur}
})
Mock.mock(/Ipo\/getFundPlatform/, 'get', function(opt){           //基金平台
    let data = [], len = mRandom.integer(3, 5);
    for(let i = 0; i < len; i++){
        data.push({label: mRandom.cname(), value: i,new_partiesid:mRandom.guid()});
    }
    return {
        data,
    }
})
Mock.mock(/Ipo\/getIPOCompetitor/, 'get', function(opt){
    let data = [], len = mRandom.integer(3, 5);
    for(let i=0; i < len; i++){
        data.push({label: mRandom.cname(), value: i, competitorid: mRandom.guid()});
    }
    return {
        data,
    }
});
Mock.mock(/Ipo\/SetOwnProduct/, 'get', function(opt){
    console.log(getParams(opt, 'get'));
    return {
        code: 200
    }
})
Mock.mock(/Ipo\/SetCompetitorProduct/, 'post', function(opt){
    console.log(getParams(opt, 'get'));
    return {
        code: 200
    }
});
Mock.mock(/Ipo\/getIpoProduct/, 'get', function(opt){
    let data = [], len = mRandom.integer(1, 20);
    for(let i = 0; i < len; i++){
        data.push({
            endtime: '2019-11-20',
            name: mRandom.cname(),
            new_fundcode: mRandom.integer(100000, 999999),
            productid: mRandom.guid(),
        })
    }
    return {data}
})
Mock.mock(/Appointment\/GetAppointmentDetail/, 'get', function(opt){    //代办事项
    let data = {
        "code":"200","msg":"Success",
        "data":{
            "id":"1",
            "type":"类型1",
            "date":"2019/01/07",
            // "subject":"主题1升降级",
            "subject":"111",
            "desc":"说明",
            "begin_time":"2019/01/07 14:49",
            "end_time":"2019/01/07 14:49",
            "about":"是的撒多",
            "is_finished":"False",
            "is_delayed":"False",
            "is_approved":"False",
            "result":"",
            "is_canceled":"False",
            "newsubject":"升降级",
            "newtype":"代办大类",
            "createdby":"创建者",
            "location":"地点",
            // 'LogicalName':'account',
            'LogicalName':'new_blocktrade',
            'LogicalNameId':'123'
        }
    };

    return data;
})

Mock.mock(/ServiceList\/List/, 'get', function(opt){
    let data = [];
    for(let i =0; i < 18;i++){
        data.push({ID:mRandom.guid(), OBJECTNAME:mRandom.cname()})
    }
    return {
        data:{
            Entities:data
        }
    }
    // return {
    //     "code": "200",
    //     "msg": "Success",
    //     "data": {
    //       "Entities": [{
    //         "LogicalName": "task",
    //         "Id": "c03de59f-ad04-4714-9db1-000040f39cfb",
    //         "Attributes": [{
    //             "Key": "taskid",
    //             "Value": "c03de59f-ad04-4714-9db1-000040f33c7b"
    //           },
    //           {
    //             "Key": "OBJECTNAME",
    //             "Value": "A程建国"
    //           },
    //           {
    //             "Key": "taskid",
    //             "Value": "c03de59f-ad04-4714-9db1-000040f33c7b"
    //           },
    //           {
    //             "Key": "OBJECTNAME",
    //             "Value": "赵果儿"
    //           }
    //         ],
    //         "EntityState": null,
    //         "FormattedValues": [{
    //           "Key": "new_sex",
    //           "Value": "女"
    //         }],
    //         "RelatedEntities": [],
    //         "RowVersion": "2254668",
    //         "KeyAttributes": []
    //       }],
    //       "TotalRecordCount": "8"
    //     }
    //   }
})

Mock.mock(/ServiceDetail\/List/, 'get', function(opt){    //拜访记录详情
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "ACTIVITYDATE": "2018-09-23",
            "ADDRESS": "上海市",
            "contactperson": "张先生、李先生",
            "CONTENT": "拜访内容",
            "OVISITTYPE": "实地拜访",
            "PACCOUNT": "XXX基金公司",
            "PACCOUNTID": "XXX基金公司",
            "PRODUCT": "蓝天基金",
            "QUESTION": "拜访问题",
            "SUBJECT": "拜访主题",
            "SUGGEST": "拜访意见",
            "TASKID": "",
            "USERID": "赵先生",
            "VISITENDTIME": "2018-09-23 00:00",
            "VISITSTARTTIME": "2018-09-23 00:00",
            "VISITTYPE": "实地拜访",
            "activityState": mRandom.cname(),
            "createdon": null,
            "description": null,
            "GTcontent": mRandom.paragraph(),
            "followInfos": [
                {
                    "COORDINATOR": "林先生",
                    "CREATEDDATE": "1018-08-10",
                    "FOLLOWCONTENT": "跟踪内容",
                    "NEWNAME": "回访客户",
                    "SUPERVISOR": "晨先生",
                    "UNDERTAKER": "丁先生"
                }
            ],
            "manager": null,
            "priority": '高',
            "product": null,
            "responsiblePerson": null,
            "subject": null,
            'isowner': true
        }
    };
})

// Mock.mock(/ServiceList\/List/, 'get', function(opt){  //拜访记录列表

//     return {
//         "code": "200",
//         "msg": "Success",
//         "data": {
//           "Entities": [{
//             "LogicalName": "task",
//             "Id": "c03de59f-ad04-4714-9db1-000040f39cfb",
//             "Attributes": [{
//                 "Key": "taskid",
//                 "Value": "c03de59f-ad04-4714-9db1-000040f33c7b"
//               },
//               {
//                 "Key": "OBJECTNAME",
//                 "Value": "A程建国"
//               },
//               {
//                 "Key": "taskid",
//                 "Value": "c03de59f-ad04-4714-9db1-000040f33c7b"
//               },
//               {
//                 "Key": "OBJECTNAME",
//                 "Value": "赵果儿"
//               }
//             ],
//             "EntityState": null,
//             "FormattedValues": [{
//               "Key": "new_sex",
//               "Value": "女"
//             }],
//             "RelatedEntities": [],
//             "RowVersion": "2254668",
//             "KeyAttributes": []
//           }],
//           "TotalRecordCount": "8"
//         }
//       }
// });

Mock.mock(/Appointment\/GetAppointmentList/, 'get', function(opt){   //代办事项列表
    return {"code":"200","msg":"Success","data":{"Entities":[{"id":"1","subject":"主题1","desc":"说明","date":"2019/01/07","is_delayed":"False","type":"类型1"},{"id":"2","subject":"主题2","desc":"说明","date":"2019/01/07","is_delayed":"True","type":"类型2"},{"id":"3","subject":"主题3","desc":"说明","date":"2019/01/07","is_delayed":"False","type":"类型3"},{"id":"4","subject":"主题4","desc":"说明","date":"2019/01/07","is_delayed":"True","type":"类型4"},{"id":"5","subject":"主题5","desc":"说明","date":"2019/01/07","is_delayed":"False","type":"类型5"},{"id":"6","subject":"主题6","desc":"说明","date":"2019/01/07","is_delayed":"True","type":"类型6"},{"id":"7","subject":"主题7","desc":"说明","date":"2019/01/07","is_delayed":"False","type":"类型7"},{"id":"8","subject":"主题8","desc":"说明","date":"2019/01/07","is_delayed":"True","type":"类型8"},{"id":"9","subject":"主题9","desc":"说明","date":"2019/01/07","is_delayed":"False","type":"类型9"},{"id":"10","subject":"主题10","desc":"说明","date":"2019/01/07","is_delayed":"True","type":"类型10"}],"TotalRecordCount":"10"}}
});
Mock.mock(/customer\/detail/, 'get', function(opt){
    return {"code":"200","msg":"Success","data":{"Depth":{"current":200,"currentquantity":"900元","highesthistoricalreserves":"900元","reserves":"1000","inst_propertiy":null,"instrepr_name":null,"investor_type":null,"new_character":"","new_communicate_type":"","new_hobby":"","new_o_vocation":"","new_preference_product":["理财30天A——3%","理财30天B——2.94%"],"new_relate_account":"","new_source":"","preference_producttype_rate":null,"sh_sec_acc":null,"sz_sec_acc":null,"productrate":"5-10","producttype":"债券型"},"IDNumber":"","Subscription":{"new_srv_account":false,"new_srv_email":true,"new_srv_mail":true,"new_srv_sms":true,"new_srv_wechat":true},"age":"","bid_inst":"","birth":"","contact":{"address":null,"addressb":null,"email":null,"fax":null,"mobile":"13498823376","phone":"13498823376","post":null,"website":null},"custtype":"个人客户","industryType":"金融业","instrepr_nm":"","ismanager":"true","level":"钻石客户","m_identityType":"","manager":{"headpic":"","jobtitle":"客户经理","managers":"共享、客户、经理","name":"张晓松"},"managers":null,"name":"冯刚","no":"","other":{"bid_inst":"","identityno":"","identitytype":"","industry":"","inst_property":"","instrepr_nm":"","regist_capital":"","remark":"12313"},"p_identityType":"","primaryContact":{"name":"王大锤","id":"1"},"primaryContacts":[{"name":"王二锤","contactid":"32e"},{"name":"王三锤","contactid":"3e"}],"regist_capital":"","remark":"","sex":"","tags":[],"wtrtype":"基金公司"}}
})

Mock.mock(/Customer\/GetCustomerPrivileg/, 'get', function(opt){
    return {"code":"200","msg":"Success","data":{"data":[{"name":"PVT"}]}}
});
Mock.mock(/Customer\/GetCustomerRelation/, 'get', function(opt){   //客户关系
    return {"code":"200","msg":"Success","data":[{"nameid":"123","name":"张伟","parentname":"陈晓勇","parentnameid":"","relations1":"朋友","relations2":""},{"nameid":"321","name":"吴海平","parentname":"陈晓勇","parentnameid":"","relations1":"父子","relations2":""}]}
});
Mock.mock(/ustomer\/GetCustomerManage/, 'get', function(opt){
    return {"code":"200","msg":"Success","data":{"0":"我的客户","1":"有管户客户","2":"无管户客户","-1":"所有客户"}}
})

// Mock.mock(/ServiceDetail\/getVisitPeople/, 'get', function(opt){  //拜访对象下拉框
//     let len = mRandom.integer(2, 10), data = [];
//     for(let i = 0; i < len; i++){
//         data.push({
//             label: mRandom.cname(),
//             value: i
//         })
//     }
//     return {data};
// })
// Mock.mock(/ServiceDetail\/getTheirContacts/, 'get', function(opt){  //对方联系人下拉框
//     let len = mRandom.integer(2, 10), data = [];
//     for(let i = 0; i < len; i++){
//         data.push({
//             label: mRandom.cname(),
//             value: i
//         })
//     }
//     return {data};
// })
// Mock.mock(/ServiceDetail\/getOurStaffs/, 'get', function(opt){  //我方人员下拉框
//     let len = mRandom.integer(2, 10), data = [];
//     for(let i = 0; i < len; i++){
//         data.push({
//             label: mRandom.cname(),
//             value: i
//         })
//     }
//     return {data};
// })
Mock.mock(/OpportunityType\/GetVisitType/, 'get', function(opt){    //拜访类型
    let data = {'0':'实地拜访'}, len = mRandom.integer(2,5);
    for(let i = 0; i < len; i++){
        data[i + 1] = mRandom.cname();
    }
    return { data };
    // return {
    //     data: {
    //         '0':'新基金',
    //         '1':'其他'
    //     }
    // }
});

Mock.mock(/ServiceDetail\/Getvisitobject/, 'get', function(opt){   //拜访对象列表
    console.log(getParams(opt,'get'));
    let data=[];
    for(let i = 0; i < 20; i++){
        data.push({
            id: mRandom.guid(),
            name: mRandom.cname(),
            phone: mRandom.integer(10000000, 999999999)
        })
    }
    return {
        data,
    }
})
Mock.mock(/ServiceDetail\/Getmanagerlist/, 'get', function(opt){//我方人员列表
    let data=[];
    for(let i = 0; i < 20; i++){
        data.push({
            id: mRandom.guid(),
            name: mRandom.cname(),
            phone: mRandom.integer(10000000, 999999999)
        })
    }
    return {
        data,
    }
})


Mock.mock(/Ipo\/SelectProduct/, 'get', function(opt){ //ipo 代码匹配名称
    let flag = mRandom.boolean();
    if(flag)
        return {data: [{name:mRandom.cname(), productid:mRandom.guid(),competitorId:mRandom.guid(), competitorName: mRandom.cname()}]};
    else{
        return {data: []};
    }
})
Mock.mock(/Ipo\/SetCompetitorProduct/, 'get', function(opt){
    console.log(getParams(opt,'get'));
    return {};
})
Mock.mock(/ServiceDetail\/ServiceRecordAdd/, 'post', function(opt){ //拜访新增
    console.log(getParams(opt, 'post'));
    return {
        data: {
            id: mRandom.guid()
        }
    };
})
Mock.mock(/ServiceDetail\/UpdataVisit/, 'post', function(opt){   //拜访修改
    console.log(getParams(opt, 'post'));
    return {};
});
Mock.mock(/Ecommerce\/GetSubscribeData/, 'get', function(opt){

    let xLables = ['强制赎回','赎回','赎回现金宝','现金宝强行赎回','质押赎回还款','单次预约取现','定期预约取现','除了现金宝以外的快取现','快速取现','普通取现'];
    let shares = [], nums = [];
    for(let i = 0; i < 10; i++){
        shares.push(mRandom.integer(100,1000));
        nums.push(mRandom.integer(100,10000));
    }
    return {
        data:{
            xLables,
            shares,
            nums
        }
    }
})
Mock.mock(/Ecommerce\/GetRedemptionData/, 'get', function(opt){
    let xLables = ['保底自动充值', '充值', '定期不定额充值', '定投申购', '基金转换', '认购', '申购', '现金宝定期不定额申购', '现金宝定投申购', '现金宝认购', '现金宝申购', '自动充值'];
    let shares = [], nums = [];
    for(let i = 0; i < 12; i++){
        shares.push(mRandom.integer(100,1000));
        nums.push(mRandom.integer(100,10000));
    }
    return {
        data:{
            xLables,
            shares,
            nums
        }
    }
});

Mock.mock(/PurchaseRedemption\/PurchaseRedemptionDetailed/, 'get', function(opt){
    return {
        "code": "200",
        "msg": "Success",
        "data": [{
            "manager": "李卓洵",//客户经理
            "name": "陈丹燕",//客户名称
            "amount": "62863",//申购金额
            "DataDt": "2019-03-11",//交易时间
            "accountid":"客户id",//客户id
            "pname":"产品名称",//产品名称
            "type":"业务类型"//业务类型
        },
            {
                "manager": "姚嘉妮",
                "name": "陈丹燕",
                "amount": "6363",
                "DataDt": "2019-03-11",
                "accountid":"客户id",
                "pname":"产品名称",
                "type":"业务类型"
            }
        ]
    }
});

Mock.mock(/PurchaseRedemption\/PurchaseRedemption/, 'get', function(opt){
    /*let PurchaseCapital = [], PurchaseCount = [], RedemptionShares = [], RedemptionCount = [];
     for(let i = 0; i < 4; i++){
     PurchaseCapital.push(mRandom.integer(0,1000));
     PurchaseCount.push(mRandom.integer(0,1000));
     RedemptionShares.push(mRandom.integer(0,1000));
     RedemptionCount.push(mRandom.integer(0,1000));
     }
     return {
     data:{

     data:{
     TypeSeries: ['固收', '货币', '权益', '其他'],
     PurchaseCapital,
     PurchaseCount,
     RedemptionShares,
     RedemptionCount,
     DataDt: "2019-03-11T09:31:20.6415582+8:00"
     }
     }
     }*/
    let PurchaseCapital = [mRandom.integer(100,1000), mRandom.integer(100,1000), mRandom.integer(100,1000), mRandom.integer(100,1000)]
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "code": 1,
            "error": null,
            "data": {
                "TypeSeries": ["权益", "债券", "货币", "其他"],
                "PurchaseCapital": [33, 33, 33, 333],
                "PurchaseCount": [11, 11, 11, 111],
                "RedemptionShares": [44, 44, 44, 444],
                "RedemptionCount": [22, 22, 22, 222],
                "DataDt": "2019-03-11 09:31",
                "PurchaseDetails10": [],
                "PurchaseDetails20": [],
                "PurchaseDetails30": [],
                "PurchaseDetails40": [],
                "RedemptionDetails10": [],
                "RedemptionDetails20": [],
                "RedemptionDetails30": [],
                "RedemptionDetails40": [],
                "total":[
                    "1.00",//申购金额（总计1）
                    "2.00",//赎回份额（总计2）
                    "3.00",//笔数（总计3）
                ]
            },
            "u": ""
        }
    }
});



Mock.mock(/OpportunityType\/GetLeadsource/, 'get', function(opt){
    return {
        data:{
            "0":"无",
            "1":"报纸",
            "2":"广告"
        }
    }
});

Mock.mock(/OpportunityType\/GetLeadGender/, 'get', function(opt){
    return {
        data:{
            "0":"男",
            "1":"女",
            "2":"其他"
        }
    }
});

Mock.mock(/OpportunityType\/GetCusttype/, 'get', function(opt){
    return {
        data:{
            "1":"个人",
            "0":"机构/企业",
            "3":"三方平台"
        }
    }
});

Mock.mock(/OpportunityType\/GetIndustrys/, 'get', function(opt){
    return {
        data:{
            "0":"基金",
            "1":"银行",

        }
    }
});
Mock.mock(/OpportunityType\/GetInstpropertiys/, 'get', function(opt){
    return {
        data:{
            "0":"金融机构",
            "1":"保险机构",

        }
    }
});


Mock.mock(/OpportunityType\/GetLeadstatus/, 'get', function(opt){
    return {
        data:{
            "0":"潜在",
            "1":"事实"
        }
    }
});

Mock.mock(/OpportunityType\/GetLeadProducttype1/, 'get', function(opt){
    return {
        data:{
            "0":"公募基金",
            "1":"一对多专户"
        }
    }
});

Mock.mock(/OpportunityType\/GetLeadIdentitytype/, 'get', function(opt){
    return {
        data:{
            "0":"身份证",
            "1":"中国护照"
        }
    }
});

Mock.mock(/OpportunityType\/GetLeadeducation/, 'get', function(opt){
    return {
        data:{
            "0":"小学",
            "1":"初中"
        }
    }
});

Mock.mock(/OpportunityType\/GetInstpropertiy/, 'get', function(opt){
    return {
        data:{
            "0":"金融机构",
            "1":"保险机构"
        }
    }
});


Mock.mock(/OpportunityType\/GetLeadInsttype/, 'get', function(opt){
    return {
        data:{
            "0":"保险公司",
            "1":"基金公司"
        }
    }
})

﻿Mock.mock(/customer\/LeadDetail/, 'get', function(opt){
    return {
        data:{
            "EntityA":{
                "custno":"",
                "name":"A1",
                "sex":"男"
            },
            "EntityB":{
                "age":'34',
                "edtion":'小学',
                "birthday":"1988-11-11",
                "customerManager":"",
                "leadsourcecode":"广告",
                "new_o_identitytype":"身份证",
                "new_zz_sfzhm":"360822198609284091",
                "owner":"胡德本",
                "potentialresources":"1,000,001元",
                "targetproducttype01":"公募基金",
                "targetproducttype02":"公募基金",
                "targetproducttype03":"公募基金",
                "status": "",
                "industry": "基金",
                "createdon":'2019-1-15',
                "isowner":true,
                // "remark":'备注1'
            },
            "EntityC":{
                "address1_composite":"",
                "emailaddress1":"heyw @kaimh.com",
                "mobilephone":"12312341234",
                "telephone1":"12312341234",
                "modifiedon":'2019-3-10',
                "regist_capital":'1,000,001元'

            },
            "EntityD":{
                "company_name":"工作单位名称1",
                "jobtitle":"财务副总裁",
                "officetel1":"12312341234",
                "officetel2":"12312341234",
                "workingaddress":"工作单位地址1",
                "remark":'备注2'
            },
            "EntityE":{
                "SMS":"False",
                "mail":"False",
                "wechat":"False"
            },
            "Type":"1",//后台经过处理的,1个人，2机构，3三方
            "Types":'0'//客户类型：1个人，0机构，3三方
        }
    }
});


Mock.mock(/Customer\/GetVisitData\?/, 'get', function (opt) {  //三方拜访数据分析
    // let data = [[{name:'cm01',id:'1'},0,0],[{name:'林红池',id:'2'},0,0],[{name:'刘琳',id:'3'},0,0],[{name:'杨溪萌',id:'4'},0,0],[{name:'范焱锋',id:'5'},0,0],[{name:'付钢',id:'6'},0,0],[{name:'叶俊嘉',id:'7'},0,0],[{name:'赵向第',id:'8'},5,5],[{name:'潘继钻',id:'9'},4,4],[{name:'褚思琪',id:'10'},26,26],[{name:'赵立林',id:'11'},0,0]];
    let data=[];
    for (let i = 0; i < 12; i++) {
        let cur = [];
        cur.push({ name: mRandom.cname(), id: mRandom.guid() });
        for (let j = 0; j < 2; j++) {
            cur.push(mRandom.integer(0, 1000));
        }
        data.push(cur);
    }
    return { data: { list: data, date: mRandom.date('yyyy-MM-dd') } };
})

Mock.mock(/Customer\/GetVisitDataList\?/, 'get', function (opt) {  //三方拜访数据详情
    return {
        "code":"200",
        "msg":"Success",
        "data":{
            "list":[
                [
                    {
                        "name":"炸++",    //负责人
                        "id":"123",               //负责人id
                    },
                    '2019-02-14上海市 待补充拜访记录',  //拜访主题
                    "拜访方式",  //拜访方式
                    "拜访开始时间",  //拜访开始时间
                    "拜访对象",  //拜访对象
                    "cFA3DD55-Cf1e-81e1-91A4-B1Cd2CB2fA25"
                ],
                [
                    {
                        "name":"",    //负责人
                        "id":"",               //负责人id
                    },
                    '2019-02-14上海市 待补充拜访记录',  //拜访主题
                    "拜访方式",  //拜访方式
                    "拜访开始时间",  //拜访开始时间
                    "拜访对象",  //拜访对象
                    "cFA3DD55-Cf1e-81e1-91A4-B1Cd2CB2fA25"
                ]

            ],
            'date':'2019-1-1'
        }
    }
})

Mock.mock(/HomeEntrance\/GetAppEntryConfiguration/, 'get', function (opt) {     //最新
    return {
        "code":"200",
        "msg":"Success",
        "data":{
            "list": [
                {
                    "CreatedOn":"2019/03/05 21：11：22",     //时间
                    "new_AppEntryCode":"shengjiangjikehu",     //入口id
                    "new_AppEntryName":"客户升降级",     //入口名称
                },
                {
                    "CreatedOn":"2019/03/05 21：11：22",     //时间
                    "new_AppEntryCode":"shengjiangjikehu",     //入口id
                    "new_AppEntryName":"客户升降级",     //入口名称
                },
                {
                    "CreatedOn":"2019/03/05 21：11：22",     //时间
                    "new_AppEntryCode":"shengjiangjikehu",     //入口id
                    "new_AppEntryName":"客户升降级",     //入口名称
                },
                {
                    "CreatedOn":"2019/03/05 21：11：22",     //时间
                    "new_AppEntryCode":"shengjiangjikehu",     //入口id
                    "new_AppEntryName":"客户升降级",     //入口名称
                },
                {
                    "CreatedOn":"2019/03/05 21：11：22",     //时间
                    "new_AppEntryCode":"shengjiangjikehu",     //入口id
                    "new_AppEntryName":"客户升降级",     //入口名称
                }
            ]
        }

    }
})

Mock.mock(/HomeEntrance\/GetEntranceRecord/, 'get', function (opt) {  //最近
    return {
        "code":"200",
        "msg":"Success",
        "data":[
            {
                "new_entrance_id":"qianke",     //入口id
                "new_entrance_name":"潜客",     //入口名字
                "new_entrance_time":"2019/03/05 21：11：22",     //时间
                "new_systemuserid":"171515654fdcx151156153055",     //客户经理id
            },
            {
                "new_entrance_id":"kehu",     //入口id
                "new_entrance_name":"客户列表",     //入口名字
                "new_entrance_time":"2019/03/05 21：11：22",     //时间
                "new_systemuserid":"171515654fdcx151156153055",     //客户经理id
            },
            {
                "new_entrance_id":"lianxiren",     //入口id
                "new_entrance_name":"联系人",     //入口名字
                "new_entrance_time":"2019/03/05 21：11：22",     //时间
                "new_systemuserid":"171515654fdcx151156153055",     //客户经理id
            },
            {
                "new_entrance_id":"qiandao",     //入口id
                "new_entrance_name":"联系人",     //入口名字
                "new_entrance_time":"2019/03/05 21：11：22",     //时间
                "new_systemuserid":"171515654fdcx151156153055",     //客户经理id
            }
        ]

    }
})

Mock.mock(/HomeEntrance\/CreateEntranceRecord/, 'get', function (opt) {  //三方拜访数据详情
    return {
        "code":"200",
        "msg":"Success",
        "data":{}
    }
})

Mock.mock(/getProductJournal\/getProductType/, 'get', function(opt){
    return {
        data:[{
            "id": "11",
            "name": "公募"
        }, {
            "id": "22",
            "name": "电商专户"
        }, {
            "id": "33",
            "name": "非电商专户"
        }, {
            "id": "44",
            "name": "汇添利系列"
        }]
    }
});

Mock.mock(/getProductJournal\/getProductJournals/, 'get', function(opt){

    if(/moneyType=1/.test(opt.url)){
        return {
            code: '200',
            data: [{
                "name": "产品名称1",//产品名称
                "fundcode": "110023",//产品代码
                "journal": "0.312",//最新产品净值
                "date": "2019-3-21",//最新净值日期
                "DailyGain": "1.122",//日涨幅
                "MonthlyIncrease": "2.422",//月涨幅
                "AnnualGain1": "3.022",//最近一年涨幅
                "AnnualGain2": "3.522",//今年以来涨幅
                "id": 1111
            },
            {
                "name": "产品名称2",
                "fundcode": "110423",
                "moneyType": "一对多专户",
                "journal": "0.232",
                "date": "2019-3-21",
                "DailyGain": "1.422",
                "MonthlyIncrease": "1.322",
                "AnnualGain1": "2.11",
                "AnnualGain2": "0.412",
                "id": 2222
            }
            ]
        }
    }else if(/moneyType=2/.test(opt.url)){
        return {
            data: [
                {
                    "name": "产品名称2",
                    "fundcode": "110024",
                    "moneyType": "三对一",
                    "journal": "0.4512",
                    "date": "2019-3-25",
                    "startTime": "2019-2-2",
                    "endTime": "2050-10-1"
                }, {
                    "name": "产品名称1",//产品名称
                    "fundcode": "110023",//产品代码
                    "moneyType": "一对一",//资产类别
                    "journal": "0.312",//最新产品净值
                    "date": "2019-3-21",//最新净值日期
                    "startTime": "2019-3-2",//产品成立日期(计息开始日)
                    "endTime": "2090-12-1"//产品到期日期(计息结束日)
                }, {
                    "name": "产品名称2",
                    "fundcode": "110024",
                    "moneyType": "二对一",
                    "journal": "0.4512",
                    "date": "2019-3-25",
                    "startTime": "2019-2-2",
                    "endTime": "2050-10-1"
                }
            ]
        }
    }else if(/moneyType=3/.test(opt.url)){
        return {
            data: [{
                "name": "产品名称1",//产品名称
                "fundcode": "110023",//产品代码
                "moneyType": "一对一",//资产类别
                "journal": "0.816",//最新产品净值
                "date": "2019-3-21",//最新净值日期
                "createdate": "2019-3-2",//产品成立日期
                "endcontractedate": "2090-12-1"//产品到期日期
            },
            {
                "name": "产品名称2",
                "fundcode": "110024",
                "moneyType": "一对多",
                "journal": "0.5112",
                "date": "2019-3-25",
                "createdate": "2015-12-12",
                "endcontractedate": "2020-10-12"
            }
            ]
        }
    }
});
Mock.mock(/SpecialSalesPlan\/GetCampaignlist/, 'get', function(opt){
    return {
        data:[
            {
                "createdby":"system",
                "datetime":"2019-03-22",
                "id":"8530cbe4-084a-e911-a12f-005056aeb9d5",
                "istemplate":'True',
                "name":"测试是否发布成功测试是否发布成功测试是否发布成功测试是否发布成功测试是否发布成功测试是否发布成功",
                "state":"草稿",
                "type":"其他"
            },
            {
                "createdby":"system",
                "datetime":"2019-03-22",
                "id":"8530cbe4-084a-e911-a12f-005056aeb9d5",
                "istemplate":'False',
                "name":"测试是否发布成功",
                "state":"草稿",
                "type":"其他"
            }
        ]
    }
});

Mock.mock(/OpportunityType\/Getcampigntype/, 'get', function(opt){
    return {
        "data":{
            "0":"一类型",
            "1":"二类型",
            "2":"三类型",
            "3":"四类型",

        }
    }
});
Mock.mock(/OpportunityType\/Getcampignstate/, 'get', function(opt){
    return {
        "data":{
            "0":"一状态",
            "1":"二状态",
            "2":"三状态",
            "3":"四状态",

        }
    }
});

Mock.mock(/SpecialSalesPlan\/SpecialSalesPlanDetail/, 'get', function(opt){
    return {
        "code":"200",
        "msg":"seccuss",
        "data":{
            "Base":{
                "objective":"长假",
                "istemplate":"否",
                "ownerid":"crmadmin名",
                "isowner":"true",
                "codename":"MCA201903210001",
                "campaignid":"ec061ac0-cd4d-e911-a12f-005056aeb9d5",
                "responsible_personid":"43061ac0-ff53-e911-7766-005056aeb9d5"
            },
            "pla":{
                "proposedstart":"2019/03/15 08:30",
                "proposedend":"2019/03/16 08:30",
                "actualtime":"2019/03/15 08:30",
                "actualendtime":"2019/03/16 08:30",
                "targetindexid":"下单客户数",
                "targetindex":"12432434-2345-3223-5553-121412244456",
                "conservativetarget":"666.77",
                "advancedtarget":"887.65",
                "actualvalue":"",
                "budgetcost":"999.00",
                "actualcost":"9.00"
            },
            "sale":{
                "xsjhName":"计划明天放个长假",
                "highworth":"是",
                "threeparty":"是",
                "ownoublic":"是",
                "activitytype":"类型",
                "activitystate":"状态",
                "describle":"没有备注"
            }

        }
    }

});

Mock.mock(/SpecialSalesPlan\/RelatedProduts/, 'get', function(opt){
    return {
        "data":[
            {
                "fundcode":"23551",
                "investtarget":"1",
                "issuedate":"2019/2/1",
                "issueenddate":"2010/2/3",
                "managerName":"张三",
                "openstartdate":"2019/01/10 12:00",
                "openenddtate":"2019/01/10",
                "productName":"脑白金",
                "productid":"43061ac0-ff53-e911-7766-005056aeb9d5",
                "productnumber":"S1255",
                "statecode":"0"
            },
            {
                "fundcode":"23551",
                "investtarget":"1",
                "issuedate":"2019/2/1",
                "issueenddate":"2010/2/3",
                "managerName":"张三",
                "openstartdate":"2019/01/10 12:00",
                "openenddtate":"2019/01/10",
                "productName":"脑白金",
                "productid":"43061ac0-ff53-e911-7766-005056aeb9d5",
                "productnumber":"S1255",
                "statecode":"0"
            }
        ]
    }

});

Mock.mock(/SpecialSalesPlan\/RelatedActivity/, 'get', function(opt){
    return {
        "data":[
            {
                "activityName":"WMK-测试撒啊",
                "campaignactivityid":"43061ac0-ff53-e911-7766-005056aeb9d5",
                "activityState":"已完成",
                "activityOwnerid":"李卓洵",
                "scheduledstart":"2019/01/01",
                "scheduledend":"2019/01/10"
            },
            {
                "activityName":"WMK-测试撒啊",
                "campaignactivityid":"43061ac0-ff53-e911-7766-005056aeb9d5",
                "activityState":"已完成",
                "activityOwnerid":"李卓洵",
                "scheduledstart":"2019/01/01",
                "scheduledend":"2019/01/10"
            }
        ]
    }

});



Mock.mock(/AttributionAnalysis\/GetUserName/, 'get', function (opt) {
    return {
        data:{
            "list": [{
                "id": "8530cbe4-084a-e911-a12f-005056aeb9d5",
                "name": "张三"
            }, {
                "id": "3330cbe4-084a-e911-a12f-005056aeb9d5",
                "name": "李四"
            },{
                "id": "8530cbe4-084a-e911-a12f-005056aeb9d5",
                "name": "张三"
            }, {
                "id": "3330cbe4-084a-e911-a12f-005056aeb9d5",
                "name": "李四"
            },{
                "id": "8530cbe4-084a-e911-a12f-005056aeb9d5",
                "name": "张三"
            }, {
                "id": "3330cbe4-084a-e911-a12f-005056aeb9d5",
                "name": "李四"
            }],
            "result": true
        }
    }
});

Mock.mock(/AttributionAnalysis\/getAttributeList/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"seccuss",
        "data":{
            "startTime": "2019-10-11",
            "endTime":'2019-11-11',
            "list": [
                {
                    "id": "c03de79f-ad04-4714-9db1-000040f33cfb",//主键，用于跳转归因详细页面
                    "title": "方旦(白金->黄金2018-10-30)",//主题
                    "ownerName": "李卓洵",//负责人
                    "changeType": "降级",//等级变更类型
                    "changeDate": "2018-10-30",//变更日期
                    "changeState": "待处理", //状态筛选

                }, {
                    "id": "c03de79f-ad04-4714-9db1-000040f33cfb",
                    "title": "方旦(白金->黄金2018-10-30)",
                    "ownerName": "李卓洵",
                    "changeType": "降级",
                    "changeDate": "2018-10-30",
                    "changeState": "待处理",
                    "startTime": "2019-11-11",
                    "endTime": '2019-11-11'
                }, {
                    "id": "c03de79f-ad04-4714-9db1-000040f33cfb",
                    "title": "方旦(白金->黄金2018-10-30)",
                    "ownerName": "李卓洵",
                    "changeType": "降级",
                    "changeDate": "2018-10-30",
                    "changeState": "待处理",
                    "startTime": "2019-11-11",
                    "endTime": '2019-11-11'
                }
            ]

        }
    }
});

Mock.mock(/AttributionAnalysis\/getAttributeDetail/, 'get', function (opt) {
    return {
        data:[
            {
                "id": '1222',
                "date": '2019-03-12 10:30',
                "cusId": "c03de79f-ad04-4714-9db1-000040f33cfb",//客户id，用于跳转客户详情
                "cusName": "方旦",//客户名称
                "changeType": "等级变更类型",//等级变更类型
                "nowLevel": "客户当前等级",//客户当前等级
                "cusType": "客户类型",//客户类型
                "beforeLevel": "变更前等级",//变更前等级
                "afterLevel": "变更后等级",//变更后等级
                "beforeBaoYouLiang": "变更前保有量",//变更前保有量
                "afterBaoYouLiang": "现有保有量",//现有保有量
                "beforeMoney": "变更前份额",//变更前份额
                "afterMoney": "现有份额",//现有份额
                "SecondReason": "客观原因",//客观原因
                "SecondReasonDesc": "客观原因描述",//客观原因描述
                "mainReason": "主观原因",//主观原因
                "mainReasonDesc": "主观原因描述"//主观原因描述
            }
        ]
    }
});

Mock.mock(/AttributionAnalysis\/getMainReason/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": [{
            "id": "c03de79f-ad04-4714-9db1-000040f33cfb",//主观原因id
            "name": "急需用钱"//主观原因名称
        },
        {
            "id": "c48de79f-ad04-4714-9db1-000040f33cfb",
            "name": "其它"
        },
        {
            "id": "c03re79f-ad04-4714-9db1-000040f33cfb",
            "name": "主观用钱"
        }
        ]
    }
});

Mock.mock(/AttributionAnalysis\/mainReasonUpdate/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": []
    }
});

Mock.mock(/MutualRealIPO\/GetIpoDimForApp/,'get',function(opt) {
    return {
            "code": "200",
            "msg": "Success",
            "data": [
                {
                    "name": "信用纯债IPO",           //IPO产品名称
                    "ProductId": "536be19c-6d49-e911-al2f-005056aeb9d5", //产品id
                    "fundcode": "000009" //产品代码
                },
                {
                    "name": "A信用纯债IPO",           //IPO产品名称
                    "ProductId": "536be19c-6d49-e911-al2f-005056aeb9d4", //产品id
                    "fundcode": "000009" //产品代码
                },
                {
                    "name": "A信用纯债IPO",           //IPO产品名称
                    "ProductId": "536be19c-6d49-e911-al2f-005056aeb9d4", //产品id
                    "fundcode": "000009" //产品代码
                },
                {
                    "name": "A信用纯债IPO",           //IPO产品名称
                    "ProductId": "536be19c-6d49-e911-al2f-005056aeb9d4", //产品id
                    "fundcode": "000009" //产品代码
                },
                {
                    "name": "A信用纯债IPO",           //IPO产品名称
                    "ProductId": "536be19c-6d49-e911-al2f-005056aeb9d4", //产品id
                    "fundcode": "000009" //产品代码
                },
                {
                    "name": "A信用纯债IPO",           //IPO产品名称
                    "ProductId": "536be19c-6d49-e911-al2f-005056aeb9d4", //产品id
                    "fundcode": "000009" //产品代码
                }
            ]
    }
})
//竞品排名柱状图
Mock.mock(/MutualRealIPO\/GetIPOColumnChart/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": [
            {
                "Amount": "682.54",//累计认购金额
                "CompanyName": "南方基金管理有限"//公司
            },
            {
                "Amount": "682.54",//累计认购金额
                "CompanyName": "南方基金管理有限公司南方基金管理有限公司"//公司
            }
        ]
    }
})
//时点趋势折线图
Mock.mock(/MutualRealIPO\/GetIPOLineChart/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": [
            {
                name: "回房间收到货福建省电话1",
                value: [
                    {
                        "Amount": "1.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 10"//时间
                    },
                    {
                        "Amount": "1.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 12"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 14"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 16"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 18"//时间
                    },
                    {
                        "Amount": "1.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 10"//时间
                    },
                    {
                        "Amount": "1.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 12"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 14"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 16"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 18"//时间
                    }
                ]
            },
            {
                name: "加对方考虑交水电费看见2",
                value: [
                    {
                        "Amount": "2.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 10"//时间
                    },
                    {
                        "Amount": "2.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 12"//时间
                    },
                    {
                        "Amount": "2.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 14"//时间
                    },
                    {
                        "Amount": "2.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 16"//时间
                    },
                    {
                        "Amount": "2.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 18"//时间
                    },
                    {
                        "Amount": "2.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 10"//时间
                    },
                    {
                        "Amount": "2.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 12"//时间
                    },
                    {
                        "Amount": "2.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 14"//时间
                    },
                    {
                        "Amount": "2.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 16"//时间
                    },
                    {
                        "Amount": "2.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 18"//时间
                    }
                ]
            },
            {
                name: "回房间收到货福建省电话3",
                value: [
                    {
                        "Amount": "3.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 10"//时间
                    },
                    {
                        "Amount": "3.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 12"//时间
                    },
                    {
                        "Amount": "0.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 14"//时间
                    },
                    {
                        "Amount": "3.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 16"//时间
                    },
                    {
                        "Amount": "3.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 18"//时间
                    },
                    {
                        "Amount": "3.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 10"//时间
                    },
                    {
                        "Amount": "3.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 12"//时间
                    },
                    {
                        "Amount": "3.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 14"//时间
                    },
                    {
                        "Amount": "3.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 16"//时间
                    },
                    {
                        "Amount": "3.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 18"//时间
                    }
                ]
            },
            {
                name: "加对方考虑交水电费看4",
                value: [
                    {
                        "Amount": "4.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 10"//时间
                    },
                    {
                        "Amount": "4.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 12"//时间
                    },
                    {
                        "Amount": "4.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 14"//时间
                    },
                    {
                        "Amount": "1.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 16"//时间
                    },
                    {
                        "Amount": "4.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 18"//时间
                    },
                    {
                        "Amount": "4.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 10"//时间
                    },
                    {
                        "Amount": "4.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 12"//时间
                    },
                    {
                        "Amount": "4.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 14"//时间
                    },
                    {
                        "Amount": "4.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 16"//时间
                    },
                    {
                        "Amount": "4.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 18"//时间
                    }
                ]
            },
            {
                name: "加对方考虑交水电费看见5",
                value: [
                    {
                        "Amount": "5.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 10"//时间
                    },
                    {
                        "Amount": "5.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 12"//时间
                    },
                    {
                        "Amount": "5.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 14"//时间
                    },
                    {
                        "Amount": "5.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 16"//时间
                    },
                    {
                        "Amount": "5.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-4 18"//时间
                    },
                    {
                        "Amount": "5.01",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 10"//时间
                    },
                    {
                        "Amount": "1.54",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 12"//时间
                    },
                    {
                        "Amount": "5.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 14"//时间
                    },
                    {
                        "Amount": "5.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 16"//时间
                    },
                    {
                        "Amount": "5.34",//累计认购金额
                        "CompanyName": "南方基金管理有限公司",//公司
                        "time": "2019-4-5 18"//时间
                    }
                ]
            }
        ]
    }
})
//竞品排名表格数据
Mock.mock(/MutualRealIPO\/GetIPOTableChart/, 'get', function (opt) {
    return {
            "code": "200",
            "msg": "Success",
            "data": [
                {
                    "Amount": "682.54",//累计认购金额
                    "CompetitorProductName": "富国医疗保健行业混合",//竞品名称
                    "CompetitorName": "覆土康"//公司

                },
                {
                    "Amount": "111682.54",//累计认购金额
                    "CompetitorProductName": "富国医疗保健行业混合",//竞品名称
                    "CompetitorName": "汇添富"//公司
                }
            ]
    }
})
//渠道排名柱状图
Mock.mock(/MutualRealIPO\/GetChanneldetail/, 'get', function (opt) {
    return {
            "code": "200",
            "msg": "Success",
            "data": [
                {
                    "NAME": "123",
                    "VALUE": "0.22"
                }, {
                    "NAME": "TEST3",
                    "VALUE": "0.11"
                }, {
                    "NAME": "测试三方平台01",
                    "VALUE": "0.01"
                }
            ]
    }
})
//渠道排名表格
Mock.mock(/MutualRealIPO\/GetChanneltable/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": [
            {
                "NAME": "121",
                "VALUE": "0.22"
            }, {
                "NAME": "TEST3",
                "VALUE": "0.11"
            }, {
                "NAME": "测试三方平台01",
                "VALUE": "0.01"
            }
        ]
    }
})

Mock.mock(/MutualRealIPO\/GetChannelName/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "list" : [
                {
                    "id": "7085f6e6-25db-e811-a12c-005056aeb9d4",
                    "name": "全部"
                },
                {
                    "id": "7085f6e6-25db-e811-a12c-005056aeb9d5",
                    "name": "123"
                }, {
                    "id": "a00edf6f-25db-e811-a12c-005056aeb9d6",
                    "name": "test3"
                }
            ]
        }
    }
})


Mock.mock(/getProductJournal\/GetProductJLIne/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"Success",
        "data":{
            "ProductJournalLine":[
                {
                    "time":"2019-03-30",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"2"
                },
                {
                    "time":"2019-03-28",
                    "value":"3"
                },
                {
                    "time":"2019-03-30",
                    "value":"4"
                },
                {
                    "time":"2019-03-29",
                    "value":"5"
                },
                {
                    "time":"2019-03-28",
                    "value":"6"
                },
                {
                    "time":"2019-03-30",
                    "value":"7"
                },
                {
                    "time":"2019-03-29",
                    "value":"8"
                },
                {
                    "time":"2019-03-28",
                    "value":"9"
                },
                {
                    "time":"2019-03-30",
                    "value":"10"
                },
                {
                    "time":"2019-03-29",
                    "value":"11"
                },
                {
                    "time":"2019-03-28",
                    "value":"12"
                },
                {
                    "time":"2019-03-30",
                    "value":"13"
                },
                {
                    "time":"2019-03-29",
                    "value":"14"
                },
                {
                    "time":"2019-03-28",
                    "value":"15"
                },
                {
                    "time":"2019-03-30",
                    "value":"16"
                },
                {
                    "time":"2019-03-29",
                    "value":"17"
                },
                {
                    "time":"2019-03-28",
                    "value":"18"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                },
                {
                    "time":"2019-03-30",
                    "value":"2"
                },
                {
                    "time":"2019-03-29",
                    "value":"3"
                },
                {
                    "time":"2019-03-28",
                    "value":"1"
                }
            ],
            "dayvalue":"100",//最新净值
            "newJournal":"0.65%",//日涨跌幅
            "JournalNow":"2019-03-30"//最新净值日期

        }

    }
})

Mock.mock(/getProductJournal\/GetHoldProduct/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": [{
            "custid": "d290c5a4-2b05-4918-a863-a3cc0f1dc2a0",
            "marketvalue": "0.4",
            "name": "田进",
            "netvalue": "1",
            "profitloss": "0",
            "shares": "0.4"
        },
            {
                "custid": "255060a3-2020-4441-b8e5-43c084f5211d",
                "marketvalue": "111317.42",
                "name": "李少鹏",
                "netvalue": "1",
                "profitloss": "0",
                "shares": "317.42"
            },
            {
                "custid": "97eecb45-eb0a-4ed5-b2c4-6424a074f42d",
                "marketvalue": "0.01",
                "name": "张建磊",
                "netvalue": "1",
                "profitloss": "0",
                "shares": "0.01"
            }
        ]
    }
})

Mock.mock(/KTI\/GetKTIList/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"Success",
        "data":[
            {
                "frequency":"双周",//更新频率
                "name":"测试",//名称
                "ownerName":"李卓洵",//负责人
                "progress":"20%",//进度
                "id":'1111'
            },{
                "frequency":"双周",
                "name":"测试",
                "ownerName":"李卓洵",
                "progress":"20%",//进度
                "id":'2222'
            },
            {
                "frequency":"双周",//更新频率
                "name":"测试",//名称
                "ownerName":"李卓洵",//负责人
                "progress":"20%",//进度
                "id":'333'
            },{
                "frequency":"双周",
                "name":"测试",
                "ownerName":"李卓洵",
                "progress":"20%"
            },
            {
                "frequency":"双周",//更新频率
                "name":"测试",//名称
                "ownerName":"李卓洵",//负责人
                "progress":"20%"//进度
            },{
                "frequency":"双周",
                "name":"测试",
                "ownerName":"李卓洵",
                "progress":"20%"
            },
            {
                "frequency":"双周",//更新频率
                "name":"测试",//名称
                "ownerName":"李卓洵",//负责人
                "progress":"20%"//进度
            },{
                "frequency":"双周",
                "name":"测试",
                "ownerName":"李卓洵",
                "progress":"20%"
            },
            {
                "frequency":"双周",//更新频率
                "name":"测试",//名称
                "ownerName":"李卓洵",//负责人
                "progress":"20%"//进度
            }
        ]
    }
})

Mock.mock(/OpportunityType\/GetKTIProgress/, 'get', function (opt) {
    return {
        "code":"200",
        "meg":"Success",
        "data":{
            "1":"10%",
            "2":"20%",
            "3":"30%",
            "4":"40%"
        }
    }
})

Mock.mock(/OpportunityType\/GetKTIFrequency/, 'get', function (opt) {
    return {
        "code":"200",
        "meg":"Success",
        "data":{
            "1":"每周",
            "2":"双周"
        }
    }
})
Mock.mock(/KTI\/GetKTIDetailXZR/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"Success",
        "data":[
            {
                "BMname":"高净值",//部门
                "Name":"李卓洵",//协作人名称
                "Phone":"13500000000"//电话
            },{
                "BMname":"互联网金融部",
                "Name":"张致远",
                "Phone":"13500000000"
            }
        ]
    }
})

Mock.mock(/KTI\/GetKTIDetail/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"Success",
        "data":[
            {
                "frequency":"双周",//更新频率
                "name":"测试",//名称
                "ownerName":"李卓洵",//负责人
                "progress":"20%",//进度百分比
                "statu":"草稿",//状态
                "remark":"备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111备注1111",//备注
                "progr":"已完成三场已完成三场已完成三场已完成三场已完成三场已完成三场已完成三场已完成三场已完成三场场已完成三场已完成三场已完成三场",//进展
                "opinion":"驳回意见1111驳回意见1111驳回意见1111驳回意见1111驳回意见1111驳回意见1111驳回意见1111驳回意见1111驳回意见1111驳回意见1111",//驳回意见
                "isshow":true//是否显示下面的两个按钮 true显示 false不显示
            }
        ]
    }
})



Mock.mock(/KTI\/UpdateReject/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"Success",
        "data":""
    }
})

Mock.mock(/KTI\/UpdateApprove/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": ""
    }
})

Mock.mock(/HeightValueCustomer\/HeightValueCustomer/, 'get', function (opt) {
    return {
        "code":"200",
        "msg":"Success",
        "data":{
            //高净值客户分布
            "HDistribute":{
                "historyFactCustomerNumber":"47",          //历史事实客户数
                "historyFfectiveCustomerNumberme":"40",    //历史有效客户数
                "historyProtectHaveMeasure":"12.06",        //历史保佑量
                "stemFactCustomerNumber":"33",               //本年事实客户数
                "stemeFfectiveCustomerNumber":"22",          //本能有效客户数
                "stemeYearProtectHaveMeasure":"11",         //本年保佑量
                "time":"2019-03-02"                         //时间
            },
            //高净值客户趋势
            "HTrend":[
                {
                    "fiveMillionCustomerNumber":"64",           //五百万客户数
                    "fiveMillionProtectHaveMeasure":"5.91",     //五百万保有量
                    "millionCustomerNumber":"283",              //百万客户数
                    "millionProtectHaveMeasure":"11.58",        //百万保有量
                    "time":"2019-03-02"                      //时间
                },{
                    "fiveMillionCustomerNumber":"64",           //五百万客户数
                    "fiveMillionProtectHaveMeasure":"5.91",     //五百万保有量
                    "millionCustomerNumber":"283",              //百万客户数
                    "millionProtectHaveMeasure":"11.58",        //百万保有量
                    "time":"2019-03-02"
                }
            ],
            //有效户分布
            "EDistribute":{
                "fiveMillionCustomerNumber":"64",       //五百万客户数
                "fiveMillionProtectHaveMeasure":"5.91", //五百万保有量
                "millionCustomerNumber":"283",          //百万客户数
                "millionProtectHaveMeasure":"11.58",    //百万保有量
                "time":"2019-03-02"                     //时间
            },
            //有效户趋势
            "ETrend":[
                {
                    "fiveMillionCustomerNumber":"44",           //五百万客户数
                    "fiveMillionProtectHaveMeasure":"33",     //五百万保有量
                    "millionCustomerNumber":"44",              //百万客户数
                    "millionProtectHaveMeasure":"66",        //百万保有量
                    "time":"2019-03-02"                         //时间
                },{
                    "fiveMillionCustomerNumber":"64",
                    "fiveMillionProtectHaveMeasure":"5.91",
                    "millionCustomerNumber":"283",
                    "millionProtectHaveMeasure":"11.58",
                    "time":"2019-02-09"
                }
            ],

        }
    }
});

Mock.mock(/ExternalCall\/KeChuangReport/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "huJiao": {
                "sumHuJiao": 4700,
                "weiHuJiao": 4699,
                "weiJieTong": 100,
                "yiHuJiao": 200,
                "yiJieTong": 500
            },
            "xingQu": {
                "meiXingQu": 123,
                "yiBan": 234,
                "yongXingQu":432
            }
        }
    }
})

Mock.mock(/CustGroup\/GetCustGroupList/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data":[{
            "createdon": "2019-03-12",
            "id": "e86c02b1-ed13-e911-dfeer",
            "name": "高净值客户组"
        }]
    }

})


Mock.mock(/CustGroup\/GetCustGroupBase/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data":[{
            "des": "说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容",
            "ownerId": "crmtestadmin",
            "ownerName": "crmtestadmin",
            "id": "crmtestadmin",
        }]
    }
})


Mock.mock(/CustGroup\/GetCustInfo/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data":[{
            "currentq": "0.01",
            "custno": "123324",
            "customlabel": ["高收入","爱运动"],
            "echisvip": "0",
            "ecvip": "0",
            "highes": "0.3",
            "mobile": "12332412321",
            "name": "张三",
            "ownerId": "123324-dfdf-fbdfgdfg-23cfg",
            "ownerName": "姚佳妮",
            "summary": ""
        },{
            "currentq": "0.01",
            "custno": "22221111",
            "customlabel": ["高收入","爱运动"],
            "echisvip": "0",
            "ecvip": "0",
            "highes": "0.02",
            "mobile": "12332412321",
            "name": "李四",
            "ownerId": "123324-dfdf-fbdfgdfg-23cfg",
            "ownerName": "姚佳妮2",
            "summary": ""
        }]
    }
})

Mock.mock(/XianJinBao\/GetType/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "0": "股票型",
            "1": "货币型",
            "2": "债券型",
            "3": "混合型",
            "4": "指数型",
            "5": "保本型",
            "7": "LOF",
            "8": "理财型",
            "6,9,A": "股票型",
            "D": "代销型",
            "F": "FOF"
        }
    }
})

Mock.mock(/XianJinBao\/GetProductList/, 'get', function (opt) {
    let data=[];
    for (let i = 0; i < 12; i++) {
        data.push({
            "dailyGrowthRate": "",
            "establistDate": "",
            "fundId": mRandom.integer(0, 5000),
            "fundInomeUnit": "",
            "fundName": mRandom.cname(),
            "fundType": "9",
            "fundTypeName": "",
            "fundTypeDisplay": "",
            "fundTypeDisplayName": "股票型",
            "fundgroupType": "",
            "fundgroupTypeName": "",
            "fundStatus": "0",
            "nav": 0.774,
            "navDate": "",
            "navDisplay": "",
            "fundStatusName": "正常",
            "fundRiskLevel": "3",
            "fundRiskLevelName": "较高",
            "fundInnerUrl": "",
            "saleOnFlag": "",
            "shareType": "",
            "suggestion": "",
            "taNo": "",
            "totalScale": "",
            "yield": ""
        })
    }
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "totalSize": 841,
            "fundInfos": data
        }
    }
})

Mock.mock(/customer\/types/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "-1": "所有",
            "1": "个人",
            "2": "产品",
            "0": "机构"
        }
    }
})

Mock.mock(/customer\/list/, 'get', function (opt) {
    let data=[];
    for (let i = 0; i < 12; i++) {
        data.push({
            "email": "165487321@qq.com",
            "id": mRandom.integer(0, 5000),
            "investPrefer": "",
            "level": "",
            "name": mRandom.cname(),
            "no": "",
            "sex": "男",
            "telephone": "13695262663",
            "type": "0"
        })
    }
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "Entities": [{
                "Key": "*",
                "Value": data
            }],
            "TotalRecordCount": "13"
        }
    }
})

Mock.mock(/customer\/GetCustomerManage/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "-1": "所有客户",
            "0": "我的客户",
            "1": "有管户客户",
            "2": "无管户客户"
        }
    }
})

Mock.mock(/customer\/GetCustomerLevel/, 'get', function (opt) {
    return {
        "code": "200",
        "msg": "Success",
        "data": {
            "1": "钻石",
            "2": "白金",
            "3": "财富",
            "4": "战略"
        }
    }
})

Mock.mock(/OpportunityType\/GetKTIStatu/, 'get', function (opt) {
    return {
        "code":"200",
        "meg":"Success",
        "data":
        {
            "10":"跟进中",
            "20":"已提交",
            "30":"已驳回",
            "40":"已审批"
        }
    }
})



