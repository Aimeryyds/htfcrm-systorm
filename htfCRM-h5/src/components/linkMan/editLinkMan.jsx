import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Button, SearchBar, List, Drawer, Modal } from 'antd-mobile';
import EditList from '../SKList/EditList';
import BossList from './bossList';
const alert = Modal.alert;
const dropDownProps = ["GetIndustry", "GetEducation", "GetImportance", "GetServicelevel", "GetIdentitytype"];
const props = ["Industries", "Educations", "Importances", "Servicelevels", "Identitytypes"];
const paramsName = ["contactindustry", "contacteducation", "contactimportance", "servicelevel", "identitytype"];
function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
class EditLinkMan extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            params: {
                remark: "",
                birthday: "",
                contactindustry: "",
                contacteducation: "",
                contactimportance: "",
                servicelevel: "",
                parentcustomeridname: {},
                birthdaywishes: "",
                name: "",
                mobile: "",
                officetel: "",
                email: "",
                websiteurl: "",
                companyaddress: "",
                identitytype: "",
                identityno: "",
                isrejectsms: "",
                isrejectemail: "",
                hobby: "",
                manager: ""
            },
            buttonIsDisabled: false,
            Industries: [], //行业下拉框
            Educations: [], //学历下拉
            Importances: [], //重要性下拉
            Servicelevels: [], //服务级别下拉
            Identitytypes: [], //证件类型
            mapIndex: {},
            drawerOpen: false,
            bossKey: "",      //直属上司模糊匹配
            bossList: [],      //匹配返回的列表
            bossName: "",     //选中的上司名
            bossId: '',
            curIndex: 1,
            isloading: false,
            hasMore: true,
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
        this.changeTilte("编辑联系人");
        // this.context.router.setRouteLeaveHook(this.props.routes[this.props.routes.length - 1], this.shouldLeave)
        window.leaveHoldH5 = this.leaveHoldH5.bind(this);

        let mapIndex = {}, params = this.state.params, { id } = this.props.location.query;
        let initialPromise = this.requestPromise({ api: "GetContactdetail", params: { contactid: id } });
        Promise.all(dropDownProps.map((apiName) => this.requestPromise({ api: apiName })).concat(initialPromise)).then((res) => {//获取下拉框选项以及初始信息
            let dropDown = {}, len = props.length, detail = res[len].data;
            for (let i = 0; i < len; i++) {
                let curData = [], curMap = {}
                for (let option of Object.keys(res[i].data)) {
                    let curValue = res[i].data[option];
                    curData.push({ "label": curValue, 'value': curValue });
                    curMap[curValue] = option;
                }
                mapIndex[props[i]] = curMap;
                dropDown[props[i]] = curData;
            }
            params.remark = detail.depth.remark;
            params.birthday = detail.Base.birth;
            params.contactindustry = detail.Base.industry;
            params.contacteducation = detail.Base.education;
            params.contactimportance = detail.Base.important;
            params.servicelevel = detail.Base.srv_level;
            params.parentcustomeridname = detail.Base.imd_supervisor;
            // params.birthdaywishes = detail.Base.imd_supervisor; 接口不明
            params.name = detail.Base.company;
            params.mobile = detail.contact.mobile;
            params.officetel = detail.contact.phone;
            params.email = detail.contact.email;
            params.websiteurl = detail.contact.website;
            params.companyaddress = detail.contact.address;
            params.identitytype = detail.depth.identitytype;
            params.identityno = detail.depth.identityno;
            params.isrejectsms = detail.depth.refuse_sms;
            params.isrejectemail = detail.depth.refuse_email;
            params.hobby = detail.depth.hobby;
            params.manager = detail.Base.responsible_personid;
            params.parentcustomeridname.name;
            this.setState(Object.assign(dropDown, { mapIndex }, { params }, { bossName: params.parentcustomeridname.name }));
        })
        this.getList(1);
    }

    componentWillUnmount() {
        window.leaveHoldH5 = null;
        window.leaveHoldH5Show = false;
    }

    getList = (index) => {//获取直属上司列表
        let { bossList } = this.state;
        this.setState({ isloading: true }, () => {
            this.request({
                api: 'GetDirectlyBossList',
                params: {
                    key: this.state.bossKey,
                    pageIndex: index,
                    pageSize: 20
                }
            }, (res) => {
                let listData = res.data.Entities[0];
                if (listData) {
                    if (index > 1) {
                        bossList = bossList.concat(listData.Value);
                    }
                    else {
                        bossList = listData.Value

                    }
                    this.setState({
                        bossList,
                        curIndex: index,
                        isloading: false,
                        hasMore: true
                    })
                } else {
                    this.setState({
                        isloading: false,
                        hasMore: false
                    })
                }
            })
        })
    }
    searchChange = (val) => {
        this.setState({
            bossKey: val
        }, () => this.getList(1))

    }
    changeBoss = (id, name) => {//点击直属boss选项
        let params = this.state.params;
        params.parentcustomeridname.id = id, params.parentcustomeridname.name = name;
        this.setState({ params, drawerOpen: false });
    }

    inputChange = (type, val) => {
        //文本输入框变化
        let { params } = this.state;
        switch (type) {
            case "备注": params.remark = val; break;
            case "公司名称": params.name = val; break;
            case "手机号码": params.mobile = val; break;
            case "办公电话": params.officetel = val; break;
            case "电子邮件": params.email = val; break;
            case "公司网址": params.websiteurl = val; break;
            case "公司地址": params.companyaddress = val; break;
            case "证件号码": params.identityno = val; break;
            case "个人爱好": params.hobby = val; break;
            case "负责人": params.manager = val; break;
        }
        this.setState({ params });
    }
    pickerChange = (type, val) => {
        let { params } = this.state;
        switch (type) {
            case "性别": params.sex = val[0]; break;
            case "行业": params.contactindustry = val[0]; break;
            case "学历": params.contacteducation = val[0]; break;
            case "重要性": params.contactimportance = val[0]; break;
            case "服务级别": params.servicelevel = val[0]; break;
            case "证件类型": params.identitytype = val[0]; break;
            case "拒绝短信": params.isrejectsms = val[0]; break;
            case "拒绝邮件": params.isrejectemail = val[0]; break;
            case "生日": params.birthday = formatDate(val); break;
        }
        this.setState(params);
    }

    saveValue = () => {
        //保存
        let { id, orgId } = this.props.location.query;
        let state = this.state, option = { api: "ContactChange", type: "post" };
        let params = Object.assign({}, this.state.params);
        for (let i = 0; i < props.length; i++) {
            let curValue = params[paramsName[i]];
            params[paramsName[i]] = this.state.mapIndex[props[i]][curValue]; //将下拉菜单中的字符串变成相应的数字
        }
        params.id = id;
        // params.manager = ""//再议
        params.parentcustomeridname = params.parentcustomeridname.id;
        option.params = params;
        this.setState({
            canLeave: true
        }, () => {if (orgId) {//如果是机构修改跳转来的
            this.request(option, () => {
                this.context.router.push({
                    pathname: '/SKEditDetail',
                    query: {
                        id: orgId,
                        userType: 0
                    }
                })
            })
            return;
        }
        this.request(option, () => {
            this.context.router.push({
                pathname: '/LinkManDetail',
                query: this.props.location.query
            })
        })

        })
        
    }

    render() {
        let listData = [{
            header: "基础信息",
            data: [
                {
                    type: 0,
                    title: "备注",
                    value: this.state.params.remark ? this.state.params.remark : "请输入",
                },
                {
                    type: 2,
                    title: "生日",
                    value: this.state.params.birthday ? this.state.params.birthday : "请选择",
                },
                {
                    type: 1,
                    title: "行业",
                    value: this.state.params.contactindustry ? this.state.params.contactindustry : "请选择",
                    options: this.state.Industries
                },
                {
                    type: 1,
                    title: "学历",
                    value: this.state.params.contacteducation ? this.state.params.contacteducation : "请选择",
                    options: this.state.Educations,
                },
                {
                    type: 1,
                    title: "重要性",
                    value: this.state.params.contactimportance ? this.state.params.contactimportance : "请选择",
                    options: this.state.Importances,
                },
                {
                    type: 1,
                    title: "服务级别",
                    value: this.state.params.servicelevel ? this.state.params.servicelevel : "请选择",
                    options: this.state.Servicelevels,
                },
                {
                    type: 4,//暂时没有接口
                    title: "直属上司",
                    value: this.state.params.parentcustomeridname.name === "" ? "请选择" : this.state.params.parentcustomeridname.name,
                    handler: () => { this.setState({ drawerOpen: true }) }
                },
                {
                    type: 0,
                    title: "公司名称",
                    value: this.state.params.name ? this.state.params.name : "请输入",
                },
            ]
        }, {
            header: "联系信息",
            data: [
                {
                    type: 0,
                    title: "手机号码",
                    value: this.state.params.mobile ? this.state.params.mobile : "请输入",
                },
                {
                    type: 0,
                    title: "办公电话",
                    value: this.state.params.officetel ? this.state.params.officetel : "请输入",
                },
                {
                    type: 0,
                    title: "电子邮件",
                    value: this.state.params.email ? this.state.params.email : "请输入",
                },
                {
                    type: 0,
                    title: "公司网址",
                    value: this.state.params.websiteurl ? this.state.params.websiteurl : "请输入",
                },
                {
                    type: 0,
                    title: "公司地址",
                    value: this.state.params.companyaddress ? this.state.params.companyaddress : "请输入",
                },
            ]
        }, {
            header: "深度信息",
            data: [
                {
                    type: 1,
                    title: "证件类型",
                    value: this.state.params.identitytype ? this.state.params.identitytype : "请选择",
                    options: this.state.Identitytypes,
                },
                {
                    type: 0,
                    title: "证件号码",
                    value: this.state.params.identityno ? this.state.params.identityno : "请输入",
                },
                {
                    type: 1,
                    title: "拒绝短信",
                    value: typeof this.state.params.isrejectsms == "boolean" ? this.state.params.isrejectsms :"请选择",
                    options: [{ label: "是", value: true }, { label: "否", value: false }]
                },
                {
                    type: 1,
                    title: "拒绝邮件",
                    value: typeof this.state.params.isrejectemail == "boolean" ? this.state.params.isrejectemail : "请选择",
                    options: [{ label: "是", value: true }, { label: "否", value: false }],
                },
                {
                    type: 0,
                    title: "个人爱好",
                    value: this.state.params.hobby ? this.state.params.hobby : "请输入",
                },
            ]
        }];
        let bosses = this.state.bossList, key = this.state.bossKey;
        const siderBar = (<div><div className="htf_searchBar_filter"
        style={{ position: 'fixed', top: '43.5px', left: '0', right: '0', zIndex: '999' }}
    ><div style={{paddingBottom:"10px", color:"#bbb", fontSize:"12px",}}>搜索直属上司:</div>
        
            {/* <span className="search-synthetic-ph-icon"></span>
            <form onSubmit={this.searchSubmit}>
                
                <input
                    className="search-input"
                    type="text"
                    placeholder="姓名/手机号"
                    onChange={this.searchChange}
                />
            </form> */}
            <SearchBar placeholder="姓名/手机号" onSubmit={()=>{this.getList(1)}} onChange={this.searchChange} style={{borderRadius:"10px"}}/>
            <List style={{marginTop:"40px"}}>
                <BossList listData={{Value: bosses}} end={() => {this.getList(this.state.curIndex + 1)}} changeBoss={this.changeBoss} loading={this.state.isloading} hasMore={this.state.hasMore}/>
                {/* { bosses.map((boss) => {
                    return (<Item key={boss.id} onClick={() => this.changeBoss(boss.id, boss.name)} style={{fontSize:"14px"}}>{boss.name}/{boss.telephone}</Item>)
                })} */}
                
            </List>
        
    </div></div>)
        // const siderBar = (<div><div className="htf_searchBar_filter"
        //     style={{ position: 'fixed', top: '43.5px', left: '0', right: '0', zIndex: '999' }}
        // ><div style={{paddingBottom:"10px", color:"#bbb", fontSize:"12px",}}>搜索直属上司:</div>
        //     <div className="search-wrap">
        //         <span className="search-synthetic-ph-icon"></span>
        //         <form onSubmit={this.searchSubmit}>
        //             <input
        //                 className="search-input"
        //                 type="text"
        //                 placeholder="姓名/手机号"
        //                 onChange={this.searchChange}
        //             />
        //         </form>
        //         <List style={{ marginTop: "40px" }}>
        //             <BossList listData={{ Value: bosses }} end={() => { this.getList(this.state.curIndex + 1) }} changeBoss={this.changeBoss} loading={this.state.isloading} hasMore={this.state.hasMore} />
        //             {/* { bosses.map((boss) => {
        //                 return (<Item key={boss.id} onClick={() => this.changeBoss(boss.id, boss.name)} style={{fontSize:"14px"}}>{boss.name}/{boss.telephone}</Item>)
        //             })} */}

        //         </List>
        //     </div>
        // </div></div>)
        return <div style={{ backgroundColor: '#f6f6f6' }} className="edit_detail" style={{position:"relative", height:'1100px'}}>
            <Drawer open={this.state.drawerOpen} sidebar={siderBar} position="right" sidebarStyle={{ zIndex: 1001, width: '80%', backgroundColor: '#fff' }} enableDragHandle onOpenChange={() => this.setState({ drawerOpen: false })}>
                {
                    listData.map((listItem, index) => {
                        return <EditList data={listItem.data} header={listItem.header} key={index} inputChange={this.inputChange} pickerChange={this.pickerChange} />
                    })
                }<WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WhiteSpace size='lg' />
                <WingBlank size="lg">
                    <Button style={{ display: "block" }} onClick={this.saveValue} disabled={this.state.buttonIsDisabled}>保存</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" /></Drawer>
        </div>
    }

}

export default EditLinkMan;