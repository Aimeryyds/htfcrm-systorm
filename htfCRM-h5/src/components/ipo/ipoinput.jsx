import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Tabs, WhiteSpace, Modal } from 'antd-mobile';
import OwnProduct from './wosichanping';
import CompetProduct from './competproduct';
function getTime(){
    //时间初始化
    let now = new Date(), minute = now.getMinutes(), _f = ~~(minute / 15);
    switch(_f){
        case 0: now.setMinutes(0);break;
        case 1:case 2: now.setMinutes(30); break;
        case 3: now.setMinutes(60); break;
    }
    return now;

}
function formatDate(date){
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
}
class IPOInput extends Module{
    constructor(props, context){
        super(props, context);
        let now = getTime();

        this.state = {
            tabValue: 0,  //0:我司产品,1:竞品
            ownProduct:{
                platform: '',              //平台
                time: now,                      //统计时间
                money: '',
            },
            competitorProduct:{
                platform: '',                    //平台
                time: getTime(),                   //时间
                isSame:false,                      //是否有重复的产品代码判断
                competitors:[{code: '',name:'', id: '',competitorName:'', money:'', competitorId:''}], //竞品

            },
            dropdown: {                               //下拉框
                platform: [],                          //平台
                competitor: [],                          //竞争对手
            },  
        }
    }
    componentDidMount(){
        document.title = "IPO录入";
        this.getDropDown();   
    }
    changeTab = (tab)=>{
        this.setState({
            tabValue: tab.value
        })
    }

    getDropDown(){
        //获取下拉框
        let apis = ['getFundPlatform', 'getIPOCompetitor'], promises = [],  dropdown = this.state.dropdown;
        apis.forEach((item, index) => {
            promises.push(this.requestPromise({
                api: item,
            }));
        });
        Promise.all(promises).then((res)=> {
            dropdown.platform = res[0].data;
            dropdown.competitor = res[1].data;

            this.setState({
                dropdown,
            })
        });
    }
    ownProductChange = (val, type) => {//我司产品修改
        let data = this.state.ownProduct;

        if(type==='money'){
            val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            val = val.replace(/^\./g,""); //验证第一个字符是数字
            val = val.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        }

        data[type] = val;
        this.setState({
            ownProduct: data
        });
    }
    comProductChange = (val, type) => {
        //竞品修改基本信息修改平台和时间
        console.log(val,type);
        let data = this.state.competitorProduct;
        data[type] = val;
        this.setState({
            competitorProduct: data
        });

    }
	/**
     *
     * @param index
     * @param type
     * @param val
     */
    compeitorChange = (index, type, val) => {

        if(type==='money'){
            val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            val = val.replace(/^\./g,""); //验证第一个字符是数字
            val = val.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        }

        //竞品内容修改
        let competitorProduct = this.state.competitorProduct,
            coms = competitorProduct.competitors,
            _isSame=false,
            len1=coms.length,
            _code=[];

        coms[index][type] = val;
        coms.map((item,index)=>{
            _code.push(item.code)
        })
        _code=_code.sort();
        if(type==='code'&&len1>=2){
            for(var i=0;i<_code.length;i++){
                if (_code[i]==_code[i+1]){
                    _isSame=true;
                    break;
                }
            }
            competitorProduct.isSame=_isSame;
        }
        this.setState({
            competitorProduct,
        });
        if(type == 'code'){
            this.bounce(this.getProductName, val, index);
        }

    }

	/**
     * 处理竞品代码重复
     */
    handleCodeSame() {
        let competitorProduct = this.state.competitorProduct,
            coms = competitorProduct.competitors,
            _isSame=false,
            len1=coms.length,
            _code=[];
        coms.map((item)=>{
            _code.push(item.code)
        })
        _code=_code.sort();
        console.log(_code, '--_code')
        if(len1>=2){
            for(var i=0;i<_code.length;i++){
                if (_code[i]==_code[i+1]){
                    _isSame=true;
                    break;
                }
            }
        }
        competitorProduct.isSame=_isSame;
        this.setState({
            competitorProduct,
        });

    }
    
	/**
     * 新增竞品
     */
    addCompet = ()=> {
        //增加竞品
        let competitorProduct = this.state.competitorProduct;
        competitorProduct.competitors.push({code: '',name:'', id: '',competitorId:'', competitorName: '', money:''});
        this.setState({
            competitorProduct
        })
    }
	/**
     * 删除竞品
     * @param index
     */
    delCom = (index) => {
        //删除竞品
        let competitorProduct = this.state.competitorProduct;
        competitorProduct.competitors.splice(index, 1);
        this.setState({
            competitorProduct
        }, ()=>{
            this.handleCodeSame()
        })
    }
    
    bounce(fn){   
        let args = [].slice.call(arguments, 1);
        //防抖,
        fn._bounceId && clearTimeout(fn._bounceId);
        fn._bounceId = setTimeout(() => {
            fn.apply(this,args);
        }, 500);
    }
    getProductName = (code, index)=> {
        this.request({
            api: 'SelectProduct',
            params:{
                fundcode: code
            }
        }, (res) => {
            let competitorProduct = this.state.competitorProduct, competitors = competitorProduct.competitors, product = res.data[0];
            if(product){
                competitors[index].id = product.productid;
                competitors[index].name = product.name;
                competitors[index].competitorName = product.competitorName;
                competitors[index].competitorId = product.competitorId;
                this.setState({
                    competitorProduct,
                });
            }else{
                competitors[index].id = "";
                competitors[index].name = "";
                competitors[index].competitorId = '';
                competitors[index].competitorName = '';
                this.setState({
                    competitorProduct,
                });
            }
        });
    }
    verify1 = () => {
        //验证我司产品是否填写完毕
        let data = this.state.ownProduct, items = ['三方平台', '累计认购金额'], unInput = [], keys=['platform', 'money'];
        for(let i = 0; i < keys.length; i++){
            if(data[keys[i]] === ''){
                unInput.push(items[i]);
            }
        }
        return unInput;
    }
    verify2 = () => {
        //检验
        let data = this.state.competitorProduct, unInput = [], coms = data.competitors;
        //验证基金平台
        if(data.platform === ''){
            unInput.push('三方平台');
        }
        coms.forEach((item, index) => {
            let _keys = ['code', 'competitor', 'money'];
            for(let i = 0; i < 3; i++){
                if(item[_keys[i]] === ''){
                    unInput.push('竞品' + (index + 1));
                    break;
                }
            }
        })
        return unInput;
    }
    sendData1 =() => {
        //我司产品的发送功能
        let unInput = this.verify1();   //验证是否填写完毕
        if(unInput.length > 0){
            Modal.alert(unInput.join("、") +"未填写完", '', [{text:'关闭'}]);
            return ;
        }
        unInput = this.verify2();  //验证竞品是否完成
        if(unInput.length > 0){
            Modal.alert('竞品尚未录入','是否提交',[{text:'否'}, {text:'是', onPress: this.postOurData}] );
            return;
        }
        //同时发送竞品和我司产品
        this.postAllData();

    }
    sendData2 =() => {
        //发送竞品数据

        let unInput = this.verify1();  //我司产品是否填写
        let unInput2 = this.verify2(); //验证竞品是否完成
        if(unInput2.length > 0){//如果竞品没完成则提示未完成
            Modal.alert(unInput2.join('、') + '未填写完', '', [{text:'关闭'}]);
            return;
        }

        if(this.state.competitorProduct.isSame){
            Modal.alert('不允许提交重复的产品代码', '',[{text:'关闭'}]);
            return;
        }
        if(unInput.length == 0){  //如果我司产品已经录入，则同时发送我司产品和竞品
            this.postAllData();
        }else{ //只发送竞品数据
            let data2 = this.state.competitorProduct, moneys = [], unFinish = [];

            data2.competitors.forEach( (item, index) => {
                moneys.push(item.money);
                if(item.name=='' || item.competitorId=='')
                    unFinish.push('竞品' + (index + 1));
            })
            if(unFinish.length > 0){
                Modal.alert(unFinish.join('、')+"未匹配到相应的产品信息", '请确认代码是否填写无误，如确认无误，请到产品库维护',[{text:'关闭'}]);
                return;
            }
            let text = '';
            moneys.forEach((item, index) => {
                text += '竞品' + (index + 1) + "：" + item + '元\n';
            })

            Modal.alert('请确认金额', text, [{text:'取消'}, {text:'确认', onPress: ()=> {
                let promises = [], coms = data2.competitors;
                coms.forEach((item) => {
                    promises.push(
                        this.requestPromise({
                            api:'SetCompetitorProduct',
                            type: 'get',
                            params:{
                                platform: this.getPlatformId(data2.platform),
                                time: formatDate(data2.time),
                                name: item.id,
                                amount: item.money,
                                competitor: item.competitorId,
                                productid: this.props.location.query.productid
                            }
                        })
                    )
                });
                Promise.all(promises).then(()=>{
                    this.gotoList();
                })
            }}])

        }
    }
    getPlatformId = (val)=>{
        //获取平台id
        let plats = this.state.dropdown.platform;
        let item = plats.find( i => i.value == val);
        return item && item.new_partiesid;
    }
    getCompetitorId = (val) => {
        //获取竞争对手id
        let coms = this.state.dropdown.competitor;
        let item = coms.find(i => i.value == val);
        return item && item.competitorid;
    }
    gotoList = () => {
        //返回列表
        this.context.router.goBack();
    }
    // confirmMoney = () => {
    //     //确认金额
    //     let data1 = this.state.ownProduct, data2 = this.state.competitorProduct.competitors, text = '';
    //     if(data1.money !== ''){
    //         text += "我司产品：" + data1.money;
    //     }
    //     data2.forEach((item,index) => {
    //         if(item.money !== ''){
    //             text += '竞品' + (index + 1) + "：" + item.money; 
    //         }
    //     });
    //     Modal.alert('请确认金额', text, [{text:'取消',}, {text:'确认', onPress: this.postOurData}])
    // }
    postOurData =()=>{
        //发送我司产品数据
        let data = this.state.ownProduct;
        Modal.alert("请确认金额", data.money + '元', [{text:'取消'}, {'text':'确认', onPress: () => {
            this.request({
                api: 'SetOwnProduct',
                type: 'get',
                params: {
                    platform: this.getPlatformId(data.platform),
                    time: this.formatDate(data.time),
                    amount: data.money,
                    name: this.props.location.query.productid
                }
            }, this.gotoList)
        }}])

    }
    postAllData = ()=> {
        //同时发送我司产品和竞品
        let data1 = this.state.ownProduct, data2 = this.state.competitorProduct, moneys = [],unFinish = [];
        data2.competitors.forEach( (item, index) => {
            if(item.name==''  || item.competitorId==''){
                unFinish.push('竞品' + (index + 1));
            }
            moneys.push(item.money);
        });
        if(unFinish.length > 0){//如果有产品代码没有匹配出产品名称
            
            Modal.alert(unFinish.join('、')+"未匹配到相应的产品信息", '请确认代码是否填写无误，如确认无误，请到产品库维护',[{text:'关闭'}]);

        }else{
            let text = '我司产品：' + data1.money + '万元\n';
        moneys.forEach((item, index) => {
            text += '竞品' + (index + 1) + "：" + item + '万元\n';
        })
        Modal.alert('请确认金额', text, [{text:'取消'}, {text:'确认', onPress: ()=> {
            let promises = [this.requestPromise({
                api: 'SetOwnProduct',
                type: 'get',
                params: {
                    platform: this.getPlatformId(data1.platform),
                    time: this.formatDate(data1.time),
                    amount: data1.money,
                    name: this.props.location.query.productid
                }
            })], coms = data2.competitors;
            coms.forEach((item) => {
                promises.push(
                    this.requestPromise({
                        api:'SetCompetitorProduct',
                        type: 'get',
                        params:{
                            platform: this.getPlatformId(data2.platform),
                            time: formatDate(data2.time),
                            name: item.id,
                            amount: item.money,
                            competitor: item.competitorId,
                            productid: this.props.location.query.productid
                        }
                    })
                )
            });
            Promise.all(promises).then(()=>{
                this.gotoList();
            })
        }}]);

        }
        
        
    }
    render(){
        let { tabValue, dropdown, ownProduct, competitorProduct } = this.state;
        return(
            <div className='ipo-input'>
                <Tabs tabs={[{title: '我司产品', value: 0}, {title: '竞品', value: 1}]} onChange={this.changeTab}/>
                <WhiteSpace size='lg' className='bg_f6'/>
                {
                    tabValue === 0 &&
                    <OwnProduct
                        productid={this.props.location.query.productid}
                        dropdown={dropdown.platform}
                        data={ownProduct}
                        change={this.ownProductChange}
                        sendData={this.sendData1}
                    />
                }
                {
                    tabValue === 1 &&
                    <CompetProduct
                        dropdown={dropdown}
                        data={competitorProduct}
                        baseChange={this.comProductChange}
                        comChange={this.compeitorChange}
                        addCom={this.addCompet}
                        delCom={this.delCom}
                        sendData={this.sendData2}
                    />
                }
            </div>
        )

    }
}
export default IPOInput;