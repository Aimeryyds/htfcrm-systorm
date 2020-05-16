import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Module from '../../lib/module';
import { WingBlank, WhiteSpace, List, InputItem, Button, Modal } from 'antd-mobile';
import EditList from './EditList'
const alert = Modal.alert;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class SKEditDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: null,
            VipLevels: null, //客户等级
            productTypes: null, //产品类型
            sources: null, //客户来源
            preference: null, //收益率
            vocations: null,//职业
            buttonIsDisabled: true,
            mapIndex: {}, //值的index
            investortypes: null, //投资者类型
            instproperties: null, //企业性质
            contactList: [], //联系人列表
            canLeave: false,
        }
    }

    leaveHoldH5() {
        if(window.leaveHoldH5Show) {return;}
        window.leaveHoldH5Show = true;
        alert("当前内容还未保存", "是否离开", [
            {
                text: '取消',
                onPress: () => {
                    this.setState({
                        canLeave: false
                    });
                    window.leaveHoldH5Show = false;
                },
                style: 'default'
            },
            {
                text: '确定',
                onPress: () => {
                    this.setState({
                        canLeave: true
                    }, () => this.context.router.goBack());
                    window.leaveHoldH5Show = false;
                }
            },
        ]);
    };

    componentDidMount() {
        let { id, userType } = this.props.location.query;
        // this.context.router.setRouteLeaveHook(
        //     this.props.routes[this.props.routes.length - 1],
        //     this.shouldLeave
        // );
        window.leaveHoldH5 = this.leaveHoldH5.bind(this);
        
        let mapIndex = {};//将下拉框的值对应到数字
        let apiList;
        if (userType == 1) {//个人客户
            apiList = ['GetVipLevel', 'GetProducttype', "GetSource", "GetPreference", "GetVocation"];
        }
        else {
            apiList = ['GetVipLevel', 'GetProducttype', "GetSource", "GetPreference", "GetInvestortype", "GetInstpropertiy"];
        }
        this.changeTilte("客户详情");
        let promises = [this.requestPromise({
            api: 'customerDetail',
            params: {
                id: this.props.location.query.id
            }
        })];
        promises.push(
            ...apiList.map((apiName) => this.requestPromise({//获取各下拉菜单信息
                api: apiName
            })));
        Promise.all(promises).then((res) => {
            let props, dropDown = {}, contactList = [];/*当前页面下所有下拉菜单的信息 */
            if (userType == 1) { //个人客户
                props = ["VipLevels", "productTypes", "sources", "preference", "vocations"];
            }
            else {
                props = ["VipLevels", "productTypes", "sources", "preference", "investortypes", "instproperties"];
            }
            for (let i = 1; i <= props.length; i++) {
                let curData = [], curMap = {}
                for (let option of Object.keys(res[i].data)) {
                    let curValue = res[i].data[option];
                    curData.push({ "label": curValue, 'value': curValue });
                    curMap[curValue] = option;
                }
                mapIndex[props[i - 1]] = curMap;
                dropDown[props[i - 1]] = curData;

            }
            if (res[0].data) {
                contactList = contactList.concat(res[0].data.primaryContacts);
            }
            this.setState(Object.assign({ detailData: res[0].data, mapIndex }, dropDown, {
                buttonIsDisabled: false,
                contactList
            }));
        })

    };

    componentWillUnmount() {
        window.leaveHoldH5 = null;
        window.leaveHoldH5Show = false;
    }


	/**
	 *  通过ID获取客户详情
     */
    getCustomerDetail() {
        return this.requestPromise({
            api: 'customerDetail',
            params: {
                id: this.props.location.query.id
            }
        });
    }
    cusLevelValueChange = (val) => {
        let { detailData } = this.state;
        detailData.level = val;
        this.setState({
            detailData
        })
    }

    pickerChange = (type, val) => {
        let { detailData } = this.state;
        let { Depth, Subscription } = this.state.detailData;
        Depth = Depth ? Depth : {};
        Subscription = Subscription ? Subscription : {};
        switch (type) {
            case "产品类型": Depth["producttype"] = val[0]; break;
            case "客户来源": Depth["new_source"] = val[0]; break;
            case "收益率": Depth["productrate"] = val[0]; break;
            case "职业": Depth["new_o_vocation"] = val[0]; break;
            case "账单": Subscription["new_srv_account"] = val[0]; break;
            case "邮件": Subscription["new_srv_email"] = val[0]; break;
            case "邮寄": Subscription["new_srv_mail"] = val[0]; break;
            case "短信": Subscription["new_srv_sms"] = val[0]; break;
            case "微信": Subscription["new_srv_wechat"] = val[0]; break;
            case "投资者类型": Depth["investor_type"] = val[0]; break;
            case "企业性质": Depth["inst_propertiy"] = val[0]; break;
        }
        Object.assign(detailData, { Subscription });
        this.setState({ detailData });

    }
    inputChange = (type, val) => {
        let { detailData } = this.state;
        switch (type) {
            case "remark": detailData.other.remark = val; break;
            case "联系电话": detailData.contact.phone = val; break;
            case "邮编": detailData.contact.post = val; break;
            case "电子邮箱": detailData.contact.email = val; break;
            case "传真": detailData.contact.fax = val; break;
            case "地址": detailData.contact.address = val; break;
            case "现有保有量(元)": detailData.Depth.current = val; break;
            case "历史最高保有量(元)": detailData.Depth.reserves = val; break;
            case "个人爱好": detailData.Depth.new_hobby = val; break;
            case "性格特点": detailData.Depth.new_character = val; break;
            case "沟通风格": detailData.Depth.new_communicate_type = val; break;
            case "关联账户": detailData.Depth.new_relate_account = val; break;
            case "法人代表姓名": detailData.Depth.instrepr_name = val; break;
        }
        this.setState({ detailData });
    }
    saveValue = (savetype, cid) => {//type: 1，编辑联系人， 2：添加联系人
        let { userType, id } = this.props.location.query;
        let { detailData, mapIndex } = this.state;
        let params = {//个人和机构相同的部分
            id: id,
            remark: detailData.other.remark,                                          //备注
            phone: detailData.contact.phone,                                   //电话
            fax: detailData.contact.fax,                                     //传真
            email: detailData.contact.email,                                   //email
            post: detailData.contact.post,                                    //邮编
            address: detailData.contact.address,                                 //地址
            level: mapIndex['VipLevels'][detailData.level],                                            //等级
            currentquantity: detailData.Depth.current,                  //当前持有量

            srvsms: detailData.Subscription.new_srv_sms,                        //短信
            srvemail: detailData.Subscription.new_srv_email,                    //email
            srvaccount: detailData.Subscription.new_srv_account,                //账单
            srvmail: detailData.Subscription.new_srv_mail,                      //邮寄
            srvwechat: detailData.Subscription.new_srv_wechat,                  //微信
        };
        let diff;
        if (userType == 1) {//个人客户
            diff = {
                highesthistoricalreserves: detailData.Depth.reserves,     //历史最高
                new_source: mapIndex['sources'][detailData.Depth.new_source],                            //客户来源
                new_preference_product: mapIndex['productTypes'][detailData.Depth.producttype],               //产品类型
                new_preference_rate: mapIndex['preference'][detailData.Depth.productrate],                  //收益率
                new_o_vocation: mapIndex['vocations'][detailData.Depth.new_o_vocation],                    //职业
                new_hobby: detailData.Depth.new_hobby,                              //兴趣
                new_character: detailData.Depth.new_character,                      //性格
                new_communicate_type: detailData.Depth.new_communicate_type,        //沟通风格
            }
        }
        else { // 机构
            diff = {
                reserves: detailData.Depth.reserves,
                source: mapIndex['sources'][detailData.Depth.new_source],             //客户来源
                producttype: mapIndex['productTypes'][detailData.Depth.producttype],//产品类型
                productrate: mapIndex['preference'][detailData.Depth.productrate], //收益率
                instreprnm: detailData.Depth.instrepr_name,                    //法人姓名
                investortype: mapIndex["investortypes"][detailData.Depth.investor_type],      //投资者类型
                instpropertiy: mapIndex["instproperties"][detailData.Depth.inst_propertiy],                //企业性质
                relateaccount: detailData.Depth.new_relate_account             //关联账户
            }
        }
        Object.assign(params, diff);
        this.setState({ canLeave: true }, () => {
            let api;
            if (userType == 1) {
                api = "PersonalCustomerChange";
            } else {
                api = "OrganizationCustomerChange"
            }
            if (savetype == 1) {
                this.request({
                    api,
                    type: 'post',
                    params,
                }, () => {
                    this.context.router.push({
                        pathname: "/EditLinkMan",
                        query: {
                            id: cid,
                            orgId: id
                        }
                    })
                });
                return;
            }
            else if (savetype === 2) {
                this.request({
                    api,
                    type: 'post',
                    params,
                }, () => {
                    this.context.router.push({
                        pathname: "/AddLinkMan",
                        query: this.props.location.query
                    })
                });
                return;
            }
            this.request({
                api,
                type: 'post',
                params,
            }, () => {
                this.context.router.push({
                    pathname: '/SKListDetail',
                    query: {
                        id,
                        userType: userType
                    }
                })
            });
        })

    }
    deleteContact = (contactId, userId) => {//删除机构用户联系人
        alert("是否确定删除联系人", "", [
            { text: "取消", onPress: () => { } },
            {
                text: "确定", onPress: () => {
                    let list = this.state.contactList;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].contactid == contactId) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                    this.setState({ contactList: list });
                    this.request({
                        api: "CusConRelatvionDelect",
                        type: "post",
                        params: {
                            id: userId,
                            contactid: contactId
                        }
                    })
                }
            }
        ])

    }
    addContact = () => {//增加联系人
        this.saveValue(2);

    }
    componentWillUnmount() {

    }
    render() {
        let { id, userType } = this.props.location.query;       //用户类型 -2:三方 0:机构 1:个人 2:产品  事实客户(机构、个人、产品);
        let { detailData } = this.state;
        let Subscription = detailData ? detailData.Subscription : {};
        Subscription = Subscription ? Subscription : {};
        let listData;
        if (userType == 1) {
            listData = [{
                header: "客户联系信息",
                data: [{
                    type: 0,
                    title: "联系电话",
                    value: detailData ? detailData.contact.phone ? detailData.contact.phone : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "邮编",
                    value: detailData ? detailData.contact.post ? detailData.contact.post : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "电子邮箱",
                    value: detailData ? detailData.contact.email ? detailData.contact.email : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "传真",
                    value: detailData ? detailData.contact.fax ? detailData.contact.fax : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "地址",
                    value: detailData ? detailData.contact.address ? detailData.contact.address : "请输入" : "请输入"
                }]
            }, {
                header: "深度信息",
                data: [
                    {
                        type: 0,
                        title: "现有保有量(元)",
                        value: detailData ? isNaN(parseFloat(detailData.Depth["current"])) ? 0 : parseFloat(detailData.Depth["current"]) : 0
                    }, {
                        type: 0,
                        title: "历史最高保有量(元)",
                        value: detailData ? isNaN(parseFloat(detailData.Depth["reserves"])) ? 0 : parseFloat(detailData.Depth["reserves"]) : 0
                    }, {
                        type: 1,
                        title: "产品类型",
                        options: this.state.productTypes,
                        value: detailData ? detailData.Depth["producttype"] ? detailData.Depth["producttype"] : "请选择" : "请选择",
                    }, {
                        type: 1,
                        title: "客户来源",
                        options: this.state.sources,
                        value: detailData ? detailData.Depth["new_source"] ? detailData.Depth["new_source"] : "请选择" : "请选择",

                    }, {
                        type: 1,
                        title: "收益率",
                        options: this.state.preference,
                        value: detailData ? detailData.Depth["productrate"] ? detailData.Depth["productrate"] : "请选择" : "请选择",
                    }, {
                        type: 1,
                        title: "职业",
                        options: this.state.vocations,
                        value: detailData ? detailData.Depth["new_o_vocation"] ? detailData.Depth["new_o_vocation"] : "请选择" : "请选择",
                    }, {
                        type: 0,
                        title: "个人爱好",
                        value: detailData ? detailData.Depth["new_hobby"] ? detailData.Depth["new_hobby"] : "请输入" : "请输入"
                    }, {
                        type: 0,
                        title: "性格特点",
                        value: detailData ? detailData.Depth["new_character"] ? detailData.Depth["new_character"] : "请输入" : "请输入"
                    }, {
                        type: 0,
                        title: "沟通风格",
                        value: detailData ? detailData.Depth["new_communicate_type"] ? detailData.Depth["new_communicate_type"] : "请输入" : "请输入"
                    }

                ]
            }, {
                header: "订阅信息",
                data: [
                    {
                        type: 1,
                        title: "账单",
                        value: Subscription.new_srv_account,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "邮件",
                        value: Subscription.new_srv_email,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "邮寄",
                        value: Subscription.new_srv_mail,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "短信",
                        value: Subscription.new_srv_sms,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "微信",
                        value: Subscription.new_srv_wechat,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                ]
            }];
        } else {//机构

            listData = [{
                header: "客户联系信息",
                data: [{
                    type: 0,
                    title: "联系电话",
                    value: detailData ? detailData.contact.phone ? detailData.contact.phone : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "邮编",
                    value: detailData ? detailData.contact.post ? detailData.contact.post : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "电子邮箱",
                    value: detailData ? detailData.contact.email ? detailData.contact.email : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "传真",
                    value: detailData ? detailData.contact.fax ? detailData.contact.fax : "请输入" : "请输入"
                }, {
                    type: 0,
                    title: "地址",
                    value: detailData ? detailData.contact.address ? detailData.contact.address : "请输入" : "请输入"
                }]
            },
            {
                header: "联系人信息",
                data: {
                    addContact: this.addContact,
                    deleteContact: (cid) => { this.deleteContact(cid, id) },
                    list: this.state.contactList,
                    editLinkMan: (cid) => {
                        this.saveValue(1, cid);
                    },

                }
            },
            {
                header: "深度信息",
                data: [
                    {
                        type: 0,
                        title: "现有保有量(元)",
                        value: detailData ? isNaN(parseFloat(detailData.Depth["current"])) ? 0 : parseFloat(detailData.Depth["current"]) : 0
                    }, {
                        type: 0,
                        title: "历史最高保有量(元)",
                        value: detailData ? isNaN(parseFloat(detailData.Depth["reserves"])) ? 0 : parseFloat(detailData.Depth["reserves"]) : 0
                    }, {
                        type: 1,
                        title: "产品类型",
                        options: this.state.productTypes,
                        value: detailData ? detailData.Depth["producttype"] ? detailData.Depth["producttype"] : "请选择" : "请选择"
                    }, {
                        type: 1,
                        title: "客户来源",
                        options: this.state.sources,
                        value: detailData ? detailData.Depth["new_source"] ? detailData.Depth["new_source"] : "请选择" : "请选择"
                    }, {
                        type: 1,
                        title: "收益率",
                        options: this.state.preference,
                        value: detailData ? detailData.Depth["productrate"] ? detailData.Depth["productrate"] : "请选择" : "请选择"
                    }, {
                        type: 0,
                        title: "法人代表姓名",
                        options: this.state.vocations,
                        value: detailData ? detailData.Depth["instrepr_name"] ? detailData.Depth["instrepr_name"] : "请输入" : "请输入"
                    }, {
                        type: 1,
                        title: "投资者类型",
                        value: detailData ? detailData.Depth["investor_type"] ? detailData.Depth["investor_type"] : "请选择" : "请选择",
                        options: this.state.investortypes
                    }, {
                        type: 1,
                        title: "企业性质",
                        value: detailData ? detailData.Depth["inst_propertiy"] ? detailData.Depth["inst_propertiy"] : "请选择" : "请选择",
                        options: this.state.instproperties
                    }, {
                        type: 0,
                        title: "关联账户",
                        value: detailData ? detailData.Depth["new_relate_account"] ? detailData.Depth["new_relate_account"] : "请输入" : "请输入"
                    }

                ]
            }, {
                header: "订阅信息",
                data: [
                    {
                        type: 1,
                        title: "账单",
                        value: Subscription.new_srv_account,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "邮件",
                        value: Subscription.new_srv_email,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "邮寄",
                        value: Subscription.new_srv_mail,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "短信",
                        value: Subscription.new_srv_sms,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                    {
                        type: 1,
                        title: "微信",
                        value: Subscription.new_srv_wechat,
                        options: [{ label: "是", value: true }, { label: "否", value: false }]
                    },
                ]
            }];
        }
        return <div style={{ backgroundColor: '#f6f6f6' }} className="edit_detail"><div style={{ position: "fixed", top: "0", width: "100%", zIndex: "1000" }}>
            <WhiteSpace size="lg" className="bg_f6" />
            <List>
                <InputItem
                    placeholder={this.state.detailData ? this.state.detailData.other.remark : "备注"} onChange={(val) => { this.inputChange("remark", val) }}
                >备注</InputItem><InputItem placeholder={detailData ? detailData['level'] : ""} editable={false}>客户等级</InputItem>
                {/*客户信息 */}
                {/* 客户等级picker
            <Picker data={this.state.VipLevels} onChange={this.cusLevelValueChange} extra={<span className="iconfont icon-kgengduo color_ui"></span>} cols={1}>
                <InputItem placeholder={detailData ? detailData['level'] : "请选择"}>客户等级</InputItem>
    </Picker>*/}
            </List></div><div style={{ marginTop: "110px" }}>
                {
                    listData.map((listItem, index) => {
                        return <EditList data={listItem.data} header={listItem.header} key={index} inputChange={this.inputChange} pickerChange={this.pickerChange} />
                    })
                }<WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WingBlank size="lg">
                    <Button style={{ display: "block" }} onClick={this.saveValue} >保存</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" /></div>
        </div>
    }
}

export default withRouter(SKEditDetail);