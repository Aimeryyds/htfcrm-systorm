import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar,Modal, Button, List, InputItem, Picker, DatePicker, Toast } from 'antd-mobile';
const alert = Modal.alert;
const CusItem = ({onClick, extra, children}) => {
    return (<div onClick={onClick} style={{display:"flex", alignItems:'strentch', justifyContent:"space-between"}}>
        {children}
    </div>)
}

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// let u = navigator.userAgent;
// let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

class QKEditDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userType:null,      //记录选择的客户类型的key,1:个人，0：机构；3三方
            userName: '',       //负责人, 新增时默认当前登录人(可修改), 修改时不可修改;
            clientName: '',     //客户名称
            clientType: '',     //客户类型
            leadSourceCode: '',     //客户来源
            clientStatus: '潜在',     //客户状态
            industry: '',           //行业类别
            targetproducttype01: '',        //目标产品1
            targetproducttype02: '',        //目标产品2
            targetproducttype03: '',        //目标产品3
            potentialresources: '',     //潜在资产量

            mobilephone:'',         //手机号码
            telephone1:'',         //电话号码
            emailaddress1:'',         //电子邮件
            new_o_identitytype: '',     //证件类型
            new_zz_sfzhm:'',        //证件号码
            birthday: '',           //生日
            sex: '',                //性别 TODO
            age: '',        //年龄 TODO
            education:'',   //学历
            createdon:'',       //创建时间 TODO

            company_name: '',        //工作单位名称
            jobtitle: '',        //职位
            officetel1: '',        //工作电话1
            officetel2: '',        //工作电话2
            workingaddress: '',        //工作单位地址
            modifiedon:'',        //修改时间
            remark: '',        //备注

            property: '',       //企业性质
            inst_type: '',       //机构类型
            regist_capital: '',       //注册资本
            instrepr_name: '',       //法人姓名
            instrepr_id: '',       //法人代表证件号
            instrep_vali_date: '',       //法人代表证件有效期

            sexOptions:[],                      //性别数据
            clientTypeOptions:[],               //客户类型数据
            clientSourceOptions: [],            //客户来源数据
            clientStatusOptions: [],            //客户状态数据
            industryOptions: [],                //行业类别数据
            productOptions: [],                 //产品类型数据
            leadIdentityOptions: [],            //证件类型数据
            educationOptions: [],               //学历数据
            propertyOptions:[],                 //企业性质数据
            instypeOptions:[],                  //机构类型数据

            isGaojingzhi:null,                  //是否是高净值客户true:是；false:否
            isSanfang:null                      //是否三方，1：是，0：否
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

		/**
         * 提供全局方法给app集成方进行监听,如果全局方法中存在该方法,集成方不执行goback回退
         * 而执行 window.leaveHoldH5() 方法
         * 此时是否回退交给H5处理
         * 在H5执行完回退后,页面被销毁将会把全局变量设置为null,此时集成方监听全局方法不存在时,默认执行返回操作
         * @type {function(this:QKEditDetail)}
         */
        window.leaveHoldH5 = this.leaveHoldH5.bind(this);

        // if(isAndroid && window.AndroidOrH5) {
        //     window.AndroidOrH5.isAndroid(false);
        // }


        this.changeTilte("潜客详情");

        Toast.loading('数据加载中...', 0);
        //id存在表示修改,不存在未新增
        if(this.props.location.query.id) {
            //修改
            Promise.all([
                this.getLeadsource(),
                // this.getLeadstatus(),
                this.getIndustry(),
                this.getLeadProducttype1(),
                this.getLeadIdentitytype(),
                this.getLeadeducation(),
                this.getCusttype(),
                this.getInstpropertiy(),
                this.getLeadInsttype(),
                this.getLeadGender(),
                this.getUserInfo()
            ]).then((res)=>{
                Toast.hide();
                this.setState({
                    clientSourceOptions: this.objToArr(res[0].data),
                    // clientStatusOptions: this.objToArr(res[1].data),
                    industryOptions: this.objToArr(res[1].data),
                    productOptions: this.objToArr(res[2].data),
                    leadIdentityOptions: this.objToArr(res[3].data),
                    educationOptions: this.objToArr(res[4].data),
                    clientTypeOptions:this.objToArr(res[5].data),
                    propertyOptions:this.objToArr(res[6].data),
                    instypeOptions:this.objToArr(res[7].data),
                    sexOptions:this.objToArr(res[8].data),
                    isGaojingzhi:res[9].data.isGaojingzhi,//是否高净值
                    isSanfang:res[9].data.isSanfang,//是否三方
                },()=>this.getLeadDetail())
            })
        } else {
            //新增
            Promise.all([
                this.getUserInfo(),
                this.getLeadsource(),
                // this.getLeadstatus(),
                this.getIndustry(),
                this.getLeadProducttype1(),
                this.getLeadIdentitytype(),
                this.getLeadeducation(),
                this.getCusttype(),
                this.getInstpropertiy(),
                this.getLeadInsttype(),
                this.getLeadGender()
            ]).then((res)=>{
                Toast.hide();
                let { userType } = this.props.location.query;          //用户类型 3:三方 0:机构 1:个人;
                let _arr=this.objToArr(res[6].data).filter(item=>item.key==userType)
                this.setState({
                    userName: res[0].data.name,//负责人
                    isGaojingzhi:res[0].data.isGaojingzhi,//是否高净值
                    isSanfang:res[0].data.isSanfang,//是否三方
                    clientSourceOptions: this.objToArr(res[1].data),
                    // clientStatusOptions: this.objToArr(res[2].data),
                    industryOptions: this.objToArr(res[2].data),
                    productOptions: this.objToArr(res[3].data),
                    leadIdentityOptions: this.objToArr(res[4].data),
                    educationOptions: this.objToArr(res[5].data),
                    clientTypeOptions:this.objToArr(res[6].data),
                    propertyOptions:this.objToArr(res[7].data),
                    instypeOptions:this.objToArr(res[8].data),
                    sexOptions:this.objToArr(res[9].data),
                    clientType:_arr.length?_arr[0].value:'',
                    userType,
                })
            })
        }
    }

    componentWillUnmount() {
        window.leaveHoldH5 = null;
        window.leaveHoldH5Show = false;

        // if(isAndroid && window.AndroidOrH5) {
        //     window.AndroidOrH5.isAndroid(true);
        // }
    }

    objToArr(obj) {
        let _datas= [];
        for(let x in obj) {
            _datas.push({label: obj[x], value: obj[x],key:x})
        };
        return _datas;
    }




    /**
     * 获取用户详情
     */
    getLeadDetail() {
        this.request({
            api: 'LeadDetail',
            params: {
                leadId: this.props.location.query.id
            },
            hideToast: true
        }, (res)=> {
            let { userType } = this.props.location.query;          //客户类型 3:三方 0:机构 1:个人;
            let _arr=this.state.clientTypeOptions.filter(item=>item.key==userType)
            this.setState({
                clientName: res.data.EntityA.name||'',
                sex:res.data.EntityA.sex||'',
                age:res.data.EntityB.age||'',
                education:res.data.EntityB.edtion||'',
                userType:res.data.Types,
                clientType: _arr.length?_arr[0].value:'' ,
                leadSourceCode: res.data.EntityB.leadsourcecode||'',
                clientStatus: res.data.EntityB.status||'',
                industry: res.data.EntityB.industry||'',
                targetproducttype01: res.data.EntityB.targetproducttype01||'',
                targetproducttype02: res.data.EntityB.targetproducttype02||'',
                targetproducttype03: res.data.EntityB.targetproducttype03||'',
                userName: res.data.EntityB.owner,
                potentialresources: res.data.EntityB.potentialresources?res.data.EntityB.potentialresources.replace(/,|元/g, ""):'',
                mobilephone: res.data.EntityC.mobilephone||'',
                telephone1: res.data.EntityC.telephone1||'',
                emailaddress1: res.data.EntityC.emailaddress1||'',
                new_o_identitytype: res.data.EntityB.new_o_identitytype||'',
                new_zz_sfzhm: res.data.EntityB.new_zz_sfzhm||'',
                birthday: res.data.EntityB.birthday||'',
                createdon: res.data.EntityB.createdon||'',
                company_name: res.data.EntityD?(res.data.EntityD.company_name||''):'',
                jobtitle: res.data.EntityD?(res.data.EntityD.jobtitle||''):'',
                officetel1: res.data.EntityD?(res.data.EntityD.officetel1||''):'',
                officetel2: res.data.EntityD?(res.data.EntityD.officetel2||''):'',
                workingaddress: res.data.EntityD?(res.data.EntityD.workingaddress||''):'',
                modifiedon: res.data.EntityC.modifiedon||'',
                remark: res.data.EntityB ? (res.data.EntityB.remark ? res.data.EntityB.remark: res.data.EntityD.remark ) : '', //个人时取B其他取
                property: res.data.EntityC.property||'',
                instrep_vali_date: res.data.EntityC.instrep_vali_date||'',
                instrepr_id: res.data.EntityC.instrepr_id||'',
                instrepr_name: res.data.EntityC.instrepr_name||'',
                regist_capital: res.data.EntityC.regist_capital?res.data.EntityC.regist_capital.replace(/,|元/g, ""):'',
                inst_type: res.data.EntityC.inst_type||'',
            })
        })
    }

    /**
     * 获取用户信息
     */
    getUserInfo() {
        return this.requestPromise({
            api: 'GetUserInfo',
            hideToast: true
        })
    }

    /**
     * 性别
     */
    getLeadGender() {
        return this.requestPromise({
            api: 'GetLeadGender',
            hideToast: true
        })
    }


    /**
     * 客户类型
     */
    getCusttype() {
        return this.requestPromise({
            api: 'GetCusttype',
            hideToast: true
        })
    }

    /**
     * 客户来源数据
     */
    getLeadsource() {
        return this.requestPromise({
            api: 'GetLeadsource',
            hideToast: true
        })
    }

    /**
     * 客户状态数据
     */
    getLeadstatus() {
        return this.requestPromise({
            api: 'GetLeadstatus',
            hideToast: true
        })
    }

    /**
     * 行业类别数据
     */
    getIndustry() {
        return this.requestPromise({
            api: 'GetIndustrys',
            hideToast: true
        })
    }

    /**
     * 产品类型数据
     */
    getLeadProducttype1() {
        return this.requestPromise({
            api: 'GetLeadProducttype1',
            hideToast: true
        })
    }

    /**
     * 证件类型数据
     */
    getLeadIdentitytype() {
        return this.requestPromise({
            api: 'GetLeadIdentitytype',
            hideToast: true
        })
    }

    /**
     * 学历数据
     */
    getLeadeducation() {
        return this.requestPromise({
            api: 'GetLeadeducation',
            hideToast: true
        })
    }

    /**
     * 企业性质
     */
    getInstpropertiy() {
        return this.requestPromise({
            api: 'GetInstpropertiys',
            hideToast: true
        })
    }

    /**
     * 机构类型
     */
    getLeadInsttype() {
        return this.requestPromise({
            api: 'GetLeadInsttype',
            hideToast: true
        })
    }


    //客户类型
    changeSex = (val)=>{
        this.setState({
            sex:val[0],
        })
    }


    //客户类型
    changeclientType = (val)=>{
        let state=this.state;
        this.setState({
            clientType:val[0],
            userType:this.findKey(state.clientTypeOptions,val[0])
        })
    }

    //客户来源
    changeSourceCode = (val)=>{
        this.setState({
            leadSourceCode: val[0]
        })
    }

    //客户状态
    changeclientStatus = (val)=>{
        this.setState({
            clientStatus: val[0]
        })
    }

    //行业类别
    changeindustry = (val)=>{
        this.setState({
            industry: val[0]
        })
    }

    //目标产品类型一
    changetargetproducttype01 = (val)=>{
        this.setState({
            targetproducttype01: val[0]
        })
    }

    //目标产品类型二
    changetargetproducttype02 = (val)=>{
        this.setState({
            targetproducttype02: val[0]
        })
    }

    //目标产品类型三
    changetargetproducttype03 = (val)=>{
        this.setState({
            targetproducttype03: val[0]
        })
    }

    //企业性质
    changeproperty= (val)=>{
        this.setState({
            property: val[0]
        })
    }

    //机构类型
    changeinstype= (val)=>{
        this.setState({
            inst_type: val[0]
        })
    }

    //证件类型
    changeNewOidentitytype= (val)=>{
        this.setState({
            new_o_identitytype: val[0]
        })
    }

    //学历
    changeEducation= (val)=>{
        this.setState({
            education: val[0]
        })
    }

    saveValue = () => {
        let state=this.state;

        if (!state.clientName) {
            Toast.info("请填写客户名称", 3);
            return;
        }
        if (!state.clientType) {
            Toast.info("请选择客户类型", 3);
            return;
        }
        if (!state.leadSourceCode) {
            Toast.info("请选择客户来源", 3);
            return;
        }

        // if (!state.clientStatus) {
        //     Toast.info("请选择客户状态", 3);
        //     return;
        // }


        //高净值个人的联系电话与手机号码必填其一,没有则保存时给提示“请填写手机号或联系电话"
        //3.20号 国梁  不再判断是否高净值三方  手机号或联系电话必填一个
        // if (state.userType==='1' && state.isGaojingzhi && !state.mobilephone && !state.telephone1){
        //     Toast.info("请填写手机号或联系电话", 3);
        //     return;
        // }
        if (state.userType==='1' && !state.mobilephone && !state.telephone1){
            Toast.info("请填写手机号或联系电话", 3);
            return;
        }

        if(state.mobilephone&&!(/^1[23456789]\d{9}$/.test(state.mobilephone.replace(/\s*/g,"")))){
            Toast.info('请输入合法的11位手机号码',2);
            return;
        }

        this.submitValue();

    }



    submitValue(){
        let state=this.state,api='SubmitLeadAdd',id=this.props.location.query.id;
        let params={
            CustName:state.clientName,		//客户名称
            CustType:this.findKey(state.clientTypeOptions,state.clientType),		//客户类型
            CustSource:this.findKey(state.clientSourceOptions,state.leadSourceCode),		//客户来源
            // CustStatus:this.findKey(state.clientStatusOptions,state.clientStatus),		//客户状态
            IndustryType:this.findKey(state.industryOptions,state.industry),		//行业类别
            TargetProduct1:this.findKey(state.productOptions,state.targetproducttype01),		//目标产品一
            TargetProduct2:this.findKey(state.productOptions,state.targetproducttype02),		//目标产品二
            TargetProduct3:this.findKey(state.productOptions,state.targetproducttype03),		//目标产品三
            PotentialAssetOutput:state.potentialresources,		//潜在资产量
            EnterpriseNature:this.findKey(state.propertyOptions,state.property),		//企业性质
            BodyType:this.findKey(state.instypeOptions,state.inst_type),		        //机构类型
            RegisteredCapital:state.regist_capital||'',		//注册资本
            LegalPersonName:state.instrepr_name||'',		//法人姓名
            LegalPersonCardId:state.instrepr_id||'',		//法人代表证件号码
            LegalPCValidity:state.instrep_vali_date||'',		//法人代表证件有效期
            Remark:state.remark||'',		//备注
            Phone:state.mobilephone||'',		//手机号码
            Tel:state.telephone1||'',		//联系电话
            Email:state.emailaddress1||'',		//电子邮箱
            CardType:this.findKey(state.leadIdentityOptions,state.new_o_identitytype),		//证件类型
            CardId:state.new_zz_sfzhm||'',		//证件号码
            birthday:state.birthday||'',		//生日
            sex:this.findKey(state.sexOptions,state.sex),		//性别
            age:state.age||'',		//年龄
            education:this.findKey(state.educationOptions,state.education),		//学历
            WorkName:state.company_name||'',		//工作单位名称
            Position:state.jobtitle||'',		//职位
            WorkPhone1:state.officetel1||'',		//工作电话1
            WorkPhone2:state.officetel2||'',		//工作电话2
            WorkAddress:state.workingaddress||'',		//工作单位地址
        };

        if(id){
           params.id=id;
           api='SubmitLeadChange';
        }
        console.log(params)
        this.request({
            api,
            params,
            type:'post'
        }, () => {
            this.setState({
                canLeave:true
            },()=>{
                Toast.success('保存成功!', 3,()=>{history.back();})
            })

        });

    }
    //下拉框的选择内容返回对应key
    findKey(arr,value) {
        if(value){
            let arr1=arr.filter(item=>item.value==value)||[];

            return arr1[0].key||'';
        }else{
            return '';
        }
    }


    formatPhone(val) {
        let reg = /^[0-9]*$/;
        if(!val || (val.length !== 11)) {
            return val;
        }
        if(val && reg.test(val)) {
            let reg = /^(\d{3})(\d{4})(\d{4})$/;
            let matches = reg.exec(val);
            let newNum = matches[1] + ' ' + matches[2] + ' ' + matches[3];
            return newNum;
        } else {
            return '---'
        }
    }



    render() {

        let {id} = this.props.location.query;
        let {userType}=this.state;

        return <div className="edit_detail" >
            <List
                renderHeader="基本信息"
            >
                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({clientName:val})}
                    value={ this.state.clientName }
                    clear
                >
                    <span className="colorRed">*</span> 客户名称
                </InputItem>
                <Picker
                    data={ this.state.clientTypeOptions }
                    cols={1}
                    value={[this.state.clientType]}
                    onChange={ this.changeclientType }
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.clientType }
                            editable={false}
                        >
                            <span className="colorRed">*</span> 客户类型
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>


                <Picker
                    data={ this.state.clientSourceOptions }
                    cols={1}
                    value={[this.state.leadSourceCode]}
                    onChange={ this.changeSourceCode }
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.leadSourceCode }
                            editable={false}
                        >
                            <span className="colorRed">*</span> 客户来源
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>
                {/*客户状态前端先固定为潜客*/}
                {/*<Picker
                    data={ this.state.clientStatusOptions }
                    cols={1}
                    value={[this.state.clientStatus]}
                    onChange={this.changeclientStatus}
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.clientStatus }
                            editable={false}
                        >
                            <span className="colorRed">*</span> 客户状态
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>*/}
                <InputItem
                    value={ this.state.clientStatus||'潜在' }
                    editable={false}
                >
                    <span className="colorRed">*</span> 客户状态
                </InputItem>

                <Picker
                    data={ this.state.industryOptions }
                    cols={1}
                    value={[this.state.industry]}
                    onChange={this.changeindustry}
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.industry }
                            editable={false}
                        >
                            行业类别
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <Picker
                    data={ this.state.productOptions }
                    cols={1}
                    value={[this.state.targetproducttype01]}
                    onChange={this.changetargetproducttype01 }
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.targetproducttype01 }
                            editable={false}
                        >
                            目标产品类型一
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <Picker
                    data={ this.state.productOptions }
                    cols={1}
                    value={[this.state.targetproducttype02]}
                    onChange={this.changetargetproducttype02 }
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.targetproducttype02 }
                            editable={false}
                        >
                            目标产品类型二
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <Picker
                    data={ this.state.productOptions }
                    cols={1}
                    value={[this.state.targetproducttype03]}
                    onChange={this.changetargetproducttype03 }
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.targetproducttype03 }
                            editable={false}
                        >
                            目标产品类型三
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <InputItem
                    placeholder='请输入'
                    value={ this.state.potentialresources }
                    onChange={(val)=>{
                            let re = /([0-9]+\.[0-9]{2})[0-9]*/;
                            if(val >= -922377203685477 && val <= 922377203685477) {
                                this.setState({
                                    potentialresources: val.replace(re,"$1")
                                })
                            }
                        }
                    }
                    clear
                >
                    潜在资产量
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    disabled={ id ? true : false }
                    value={ this.state.userName }
                >
                    <span className="colorRed">*</span> 负责人
                </InputItem>

            </List>

            { (userType === '2' || userType === '3'||userType === '0') &&
            <List
                renderHeader="机构信息"
            >
                <Picker
                    data={ this.state.propertyOptions }
                    cols={1}
                    value={[this.state.property]}
                    onChange={this.changeproperty }
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={this.state.property}
                            editable={false}
                        >
                            企业性质
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <Picker
                    data={ this.state.instypeOptions }
                    cols={1}
                    onChange={this.changeinstype }
                    value={[this.state.inst_type]}
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.inst_type }
                            editable={false}
                        >
                            机构类型
                        </InputItem>
                        <div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>{
                        let re = /([0-9]+\.[0-9]{2})[0-9]*/;
                        if(val >= -922337203685477 && val <= 922337203685477) {
                            this.setState({
                                regist_capital: val.replace(re,"$1")
                            })
                        }
                    }}
                    value={ this.state.regist_capital }
                    clear
                >
                    注册资本
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({instrepr_name:val})}
                    value={ this.state.instrepr_name }
                    clear
                >
                    法人姓名
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({instrepr_id:val})}
                    value={ this.state.instrepr_id }
                    clear
                >
                    法人代表证件号
                </InputItem>



                <DatePicker minDate={new Date(1800,1,1)} mode="date" onChange={(val)=> {this.setState({instrep_vali_date:formatDate(val)})}} extra={<span className="iconfont icon-kgengduo color_ui"></span>} cols={1} >
                    <InputItem placeholder='请选择' editable={false} value={ this.state.instrep_vali_date }> 法人代表证件有效期</InputItem>
                </DatePicker>

                {/*{id&&<InputItem
                    // placeholder='请输入'
                    value={ id?this.state.createdon:formatDate(new Date()) }
                >
                    创建时间
                </InputItem>}*/}

                {/*<InputItem
                    // placeholder='请输入'
                    value={ id?this.state.modifiedon:formatDate(new Date()) }
                >
                    修改时间
                </InputItem>*/}

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({remark:val})}
                    value={ this.state.remark }
                    clear
                >
                    备注
                </InputItem>

            </List>
            }


            { userType === '1'&&
            <List
                renderHeader="个人信息"
            >
                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({mobilephone:val})}
                    value={this.formatPhone(this.state.mobilephone)}
                    type={'number'}
                    clear
                >
                    <span className="colorRed">*</span> 手机号码
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({telephone1:val})}
                    value={this.formatPhone(this.state.telephone1) }
                    type={'number'}
                    clear
                >
                    <span className="colorRed">*</span> 联系电话
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({emailaddress1:val})}
                    value={ this.state.emailaddress1 }
                    clear
                >
                    电子邮件
                </InputItem>

                <Picker
                    data={ this.state.leadIdentityOptions }
                    cols={1}
                    onChange={this.changeNewOidentitytype}
                    value={[this.state.new_o_identitytype]}
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            value={ this.state.new_o_identitytype }
                            editable={false}
                        >
                            证件类型
                        </InputItem>
                        <div
                            style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({new_zz_sfzhm:val})}
                    value={ this.state.new_zz_sfzhm }
                    clear
                >
                    证件号码
                </InputItem>

                <DatePicker minDate={new Date(1800,1,1)} mode="date" onChange={(val)=> {this.setState({birthday:formatDate(val)})}} extra={<span className="iconfont icon-kgengduo color_ui"></span>} cols={1} >
                    <InputItem placeholder='请选择' editable={false} value={ this.state.birthday }>出生日期</InputItem>
                </DatePicker>

                <Picker
                    data={ this.state.sexOptions }
                    cols={1}
                    value={[this.state.sex]}
                    onChange={this.changeSex}
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            editable={false}
                            value={this.state.sex}
                        >
                            性别
                        </InputItem>
                        <div
                            style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({age:val})}
                    value={ this.state.age }
                    clear
                >
                    年龄
                </InputItem>

                <Picker
                    data={ this.state.educationOptions }
                    cols={1}
                    value={[this.state.education]}
                    onChange={this.changeEducation}
                >
                    <CusItem>
                        <InputItem
                            placeholder="请选择"
                            editable={false}
                            value={this.state.education}
                        >
                            学历
                        </InputItem>
                        <div
                            style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                            <span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span>
                        </div>
                    </CusItem>
                </Picker>

               {/* {id&&<InputItem
                    // placeholder='请输入'
                    value={ id?this.state.createdon:formatDate(new Date())}
                >
                    创建时间
                </InputItem>}*/}

            </List>
            }

            { userType === '1' &&
            <List
                renderHeader="扩展信息"
            >
                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({company_name:val})}
                    value={ this.state.company_name }
                    clear
                >
                    工作单位名称
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({jobtitle:val})}
                    value={ this.state.jobtitle }
                    clear
                >
                    职位
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({officetel1:val})}
                    value={ this.formatPhone(this.state.officetel1) }
                    type={'number'}
                    clear
                >
                    工作电话1
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({officetel2:val})}
                    value={ this.formatPhone(this.state.officetel2) }
                    type={'number'}
                    clear
                >
                    工作电话2
                </InputItem>

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({workingaddress:val})}
                    value={ this.state.workingaddress }
                    clear
                >
                    工作单位地址
                </InputItem>

                {/*<InputItem
                    // placeholder='请输入'
                    value={ id?this.state.modifiedon:formatDate(new Date()) }
                >
                    修改时间
                </InputItem>*/}

                <InputItem
                    placeholder='请输入'
                    onChange={(val)=>this.setState({remark:val})}
                    value={ this.state.remark }
                    clear
                >
                    备注
                </InputItem>
            </List>
            }

            <WhiteSpace size='lg' className="bg_f6" />
            <WhiteSpace size='lg' className="bg_f6" />
            <WhiteSpace size='lg' className="bg_f6" />
            <div style={{padding: '0 .2rem'}}  className="bg_f6">
                <Button style={{ display: "block" }} onClick={this.saveValue} >保存</Button>
            </div>
            <WhiteSpace size="lg" className="bg_f6" />
            <WhiteSpace size="lg" className="bg_f6" />
            <WhiteSpace size="lg" className="bg_f6" />
        </div>
    }
}

export default QKEditDetail;