import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Button, Toast, Drawer, List, SearchBar, Modal } from 'antd-mobile';
import EditList from '../SKList/EditList';
import BossList from './bossList';
const dropDownProps = ["GetIndustry", "GetEducation", "GetImportance", "GetServicelevel", "GetIdentitytype"];
const props = ["Industries", "Educations", "Importances", "Servicelevels", "Identitytypes"];
const paramsName = ["industry", "education", "important", "srvlevel", "identitytype"];
function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
const alert = Modal.alert;
const Item = List.Item;
class AddLinkMan extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            params: {
                remark: "",
                lastname: "",
                firstname: "",
                sex: "",
                jobtitle: "",
                birth: "",
                industry: "",
                education: "",
                important: "",
                srvlevel: "",
                parentcustomer: {},
                company: "",
                mobile: "",
                phone: "",
                email: "",
                website: "",
                address: "",
                identitytype: "",
                identityno: "",
                refusesms: "",
                refuseemail: "",
                hobby: "",
                canLeave: false,
            },
            buttonIsDisabled: false,
            Industries: [], //行业下拉框
            Educations: [], //学历下拉
            Importances: [], //重要性下拉
            Servicelevels: [], //服务级别下拉
            Identitytypes: [], //证件类型
            mapIndex: {},
            drawerOpen: false, // 抽屉开关
            bossKey: "",      //直属上司模糊匹配
            bossList: [],      //匹配返回的列表
            bossName: "",     //选中的上司名
            curIndex: 1,
            isloading: false,
            hasMore: true
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
        // this.context.router.setRouteLeaveHook(
        //     this.props.routes[this.props.routes.length - 1],
        //     this.shouldLeave
        // );

        window.leaveHoldH5 = this.leaveHoldH5.bind(this);

        this.changeTilte("新建联系人");
        let mapIndex = {};
        Promise.all(dropDownProps.map((apiName) => this.requestPromise({ api: apiName }))).then((res) => {
            let dropDown = {};
            for (let i = 0; i < props.length; i++) {
                let curData = [], curMap = {}
                for (let option of Object.keys(res[i].data)) {
                    let curValue = res[i].data[option];
                    curData.push({ "label": curValue, 'value': curValue });
                    curMap[curValue] = option;
                }
                mapIndex[props[i]] = curMap;
                dropDown[props[i]] = curData;
            }
            this.setState(Object.assign(dropDown, { mapIndex }));
        })
        this.getList(1);
    }

    componentWillUnmount() {
        window.leaveHoldH5 = null;
        window.leaveHoldH5Show = false;
    }
    
    getList = (index) => {//获取直属上司列表
        let {bossList} = this.state;
        this.setState({isloading: true}, () => {
            this.request({
                api: 'GetDirectlyBossList',
                params: {
                    key: this.state.bossKey,
                    pageIndex: index,
                    pageSize: 20
                }
            }, (res) => {
                let listData = res.data.Entities[0];
                if(listData){
                if(index > 1){
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
            }else{
                this.setState({
                    isloading:false,
                    hasMore: false
                })
            }
            })
        })
        
    }
    searchChange = (value) => {
        this.setState({
            bossKey: value
        }, () => {this.getList(1);})

    }
    inputChange = (type, val) => {
        //文本输入框变化
        let { params } = this.state;
        switch (type) {
            case "备注": params.remark = val; break;
            case "姓": params.lastname = val; break;
            case "名": params.firstname = val; break;
            case "职务": params.jobtitle = val; break;
            case "公司名称": params.company = val; break;
            case "手机号码": params.mobile = val; break;
            case "办公电话": params.phone = val; break;
            case "电子邮件": params.email = val; break;
            case "公司网址": params.website = val; break;
            case "公司地址": params.address = val; break;
            case "证件号码": params.identityno = val; break;
            case "个人爱好": params.hobby = val; break;
        }
        this.setState({ params });
    }
    pickerChange = (type, val) => {
        let { params } = this.state;
        switch (type) {
            case "性别": params.sex = val[0]; break;
            case "行业": params.industry = val[0]; break;
            case "学历": params.education = val[0]; break;
            case "重要性": params.important = val[0]; break;
            case "服务级别": params.srvlevel = val[0]; break;
            case "证件类型": params.identitytype = val[0]; break;
            case "拒绝短信": params.refusesms = val[0]; break;
            case "拒绝邮件": params.refuseemail = val[0]; break;
            case "生日": params.birth = formatDate(val); break;
        }
        this.setState(params);
    }

    saveValue = () => {
        //保存
        let state = this.state, option = { api: "ContactAdd", type: "post" };
        let {id} = this.props.location.query; //如果是机构编辑页面跳转来的会有这个query
        let params = Object.assign({}, this.state.params);
        if (!state.params.lastname || !state.params.firstname) {//判断必填字段
            Toast.info("请填写姓名", 3);
            return;
        }
        else {
            for (let i = 0; i < props.length; i++) {
                let curValue = params[paramsName[i]];
                params[paramsName[i]] = this.state.mapIndex[props[i]][curValue]; //将下拉菜单中的字符串变成相应的数字
            }
            params.parentcustomer = params.parentcustomer.id; //
            if( id ){//如果是机构编辑跳转来的，就加上这个参数
                params.accountid = id;
            }
            option.params = params;
            console.log('0000',option)
            this.setState({
                canLeave:true
            }, () =>{
                if(id){
                    option.api = "ContactAdds";
                    this.request(option, () => {
                        this.context.router.push({
                            pathname: '/SKEditDetail',
                            query:this.props.location.query
                        })
                    });
                    return;
                }
                this.request(option, () => {
                    this.context.router.push({
                        pathname: '/LinkMan'
                    })
                });
            })
            
        }
    }
    changeBoss = (id, name) => {//点击直属boss选项
        
        let params = this.state.params;
        params.parentcustomer.id = id;
        this.setState({params, drawerOpen: false, bossName: name});
    }

    render() {
        let that = this;
        let listData = [{
            header: "基础信息",
            data: [
                {
                    type: 0,
                    title: "备注",
                    value: this.state.params.remark ? this.state.params.remark : "请输入",
                },
                {
                    type: 3,
                    title: "姓",
                    value: this.state.params.lastname ? this.state.params.lastname : "请输入",
                },
                {
                    type: 3,
                    title: "名",
                    value: this.state.params.firstname ? this.state.params.firstname : "请输入",
                },
                {
                    type: 1,
                    title: "性别",
                    value: this.state.params.sex !== "" ? this.state.params.sex ? "女" : "男" : "请选择",
                    options: [{ label: "男", value: false }, { label: '女', value: true }]
                },
                {
                    type: 0,
                    title: "职务",
                    value: this.state.params.jobtitle ? this.state.params.jobtitle : "请输入",
                },
                {
                    type: 2,//日期选择器
                    title: "生日",
                    value: this.state.params.birth === "" ? "请选择" : this.state.params.birth,
                },
                {
                    type: 1,
                    title: "行业",
                    value: this.state.params.industry ? this.state.params.industry : "请选择",
                    options: this.state.Industries
                },
                {
                    type: 1,
                    title: "学历",
                    value: this.state.params.education ? this.state.params.education : "请选择",
                    options: this.state.Educations,
                },
                {
                    type: 1,
                    title: "重要性",
                    value: this.state.params.important ? this.state.params.important : "请选择",
                    options: this.state.Importances,
                },
                {
                    type: 1,
                    title: "服务级别",
                    value: this.state.params.srvlevel ? this.state.params.srvlevel : "请选择",
                    options: this.state.Servicelevels,
                },
                {
                    type: 4,
                    title: "直属上司",
                    value: this.state.bossName === "" ? "请选择" : this.state.bossName,
                    handler: () => { that.setState({ drawerOpen: true }) }
                },
                {
                    type: 0,
                    title: "公司名称",
                    value: this.state.params.company ? this.state.params.company : "请输入",
                },
                // {
                //     type: 0,
                //     title: "负责人",
                //     value: "默认存在"
                // }
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
                    value: this.state.params.phone ? this.state.params.phone : "请输入",
                },
                {
                    type: 0,
                    title: "电子邮件",
                    value: this.state.params.email ? this.state.params.email : "请输入",
                },
                {
                    type: 0,
                    title: "公司网址",
                    value: this.state.params.website ? this.state.params.website : "请输入",
                },
                {
                    type: 0,
                    title: "公司地址",
                    value: this.state.params.address ? this.state.params.address : "请输入",
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
                    value: this.state.params.refusesms !== "" ? this.state.params.refusesms ? "是" : "否" : "请选择",
                    options: [{ label: "是", value: true }, { label: "否", value: false }]
                },
                {
                    type: 1,
                    title: "拒绝邮件",
                    value: this.state.params.refuseemail !== "" ? this.state.params.refuseemail ? "是" : "否" : "请选择",
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
        return <div style={{ backgroundColor: '#f6f6f6' }} className="edit_detail" style={{position:"relative", height:"1300px"}}>
            <Drawer  open={this.state.drawerOpen} sidebar={siderBar} position="right" sidebarStyle={{ zIndex: 1001, width: '80%', backgroundColor: '#fff' }} enableDragHandle onOpenChange={() => this.setState({ drawerOpen: false })} >

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
                <WhiteSpace size="lg" />
                </Drawer>
        </div>
    }

}

export default AddLinkMan;