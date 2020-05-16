import React from 'react';
import Module from '../../lib/module';
import { WhiteSpace, DatePicker} from 'antd-mobile';
import ChartA from './chart_a';
import ChartB from './chart_b';
import TableB from './table_b';
import SeansonPicker from './seasonPicker';
import TableA from "./table_a";
import LandScape from '../widget/landscape';
import FixedButton from '../widget/fixedbutton';
const CustomDate = ({ onClick, extra, children, date, type }) => {
    
    return <div onClick={onClick}>


        <div>
            {date} <span className="iconfont icon-xialagengduo" style={{color:"#f1f1f1"}}></span>
        </div>



    </div>
}
function handleTimeStart(d, t){
    //吧timestart设置为每月的第一天

    if(t != 0){
        if( t== 2){
            let month = d.getMonth(), season = ~~(month / 3), m = season * 3;

            d = new Date(d.getFullYear(), m, 1);
        }else
             d = new Date(d.getFullYear(), d.getMonth(), 1);
    }
    return d;

}
function handleTimeEnd(d, t){
    //把timeEnd,设置为每月的最后一天
    if(t != 0){
        if( t== 2){
            let month = d.getMonth(), season = ~~(month / 3) + 1; 
            d = new Date(d.getFullYear(), season * 3, '0');
        }else
             d = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    }
    return d;
}
function formatDate(d, t){
    if(t !== 2){
        let re = "";
        re = d.getFullYear() + "-" + (d.getMonth() + 1);
        if(t === 0)
            re += "-" + d.getDate();
        return re;
    }else{
        let m = d.getMonth();
        return d.getFullYear()+"Q" + (Math.floor(m/3) + 1);
    }
    
}
class Khfp extends Module {
    constructor(props, context) {
        super(props, context);
        let today = new Date();
        let timeStart = new Date(today.getFullYear(), today.getMonth(), 1), timeEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.state = {
            period: 1,// 0:当日, 1:月度, 2,季度
            team: 0,
            teamList: [],//0:高净值，1，三方
            managerList: [],//经理列表
            managerId: " ",//当前选中的客户经理, 空格表示全部
            custType: 1, //只有个人
            timeStart: timeStart,// 分派时间起点
            timeEnd: timeEnd, //终点
            curCusType: "战略",          //当前选中的客户类型
            roleType: -1,              //使用者权限0:客户经理，1.团队主管, 2.副总经理,3,系统管理员, 4,其他，-1默认
            charAData: [],                    //第一饼图数据
            charBData: [],                    //第二个饼图数据
            tableData: null,                    //表格数据
            detailTable: {},                     //详细表数据
            totalIds: '',                     //所有客户经理的id, 用, 连接
            showDetail: false,
            showHeader: true,
            selectedNum: 0,   //                        第二张饼图中客户数
            showChart: true,
            
        }
    }
    
    componentDidMount() {
        this.changeTilte("客户分派回测");
        let initState = {}, showDetail = false;
        if(document.location.hash.indexOf('table') >= 0){
            window.onpopstate = () =>{ 
                this.setState({
                    showDetail: false,
                    showHeader: true,
                });
                window.onpopstate = () => {};
            }
            showDetail = true;
        }
        initState.showDetail = showDetail;
     
        this.setState(initState, () =>{
            this.request({                          //先请求当前权限
                api: "GetUserNameRole",              //id在cookie中取
            }, (res) => {
                let roleType = res.data[0].roleType, teamName = res.data[0].teamName, teamList;
                if(roleType == 2 ||  roleType ==3){
                    teamList = ['高净值']
                }else if(roleType == 0 || roleType == 1){
                    teamList = ["高净值"];
                }else{
                    teamList = ["高净值"];
                }
                this.setState({
                    teamList,
                });
                this.getManagerList();
            });
        })
        
    }
    getManagerList = () => {
        //客户经理列表, 列表变动后其他数据都得变
        this.request({
            api: "GetUserName",
            params: {
                teamId: this.state.team               //团队
            }
        }, (res) => {
            let ids = '', list = res.data.list;
            if(list.length > 0){
                ids = list[0].id;
            }
            for(let i = 1;i < list.length; i++){
                ids += ',' + list[i].id;
            }
            list.sort((a, b) => {
                return -a.name.localeCompare(b.name);
            })
            this.setState({
                managerList: res.data.list,
                managerId: " ",
                totalIds: ids
            }, () => {
                this.getFpData();
                if(this.state.showDetail)
                    this.getTableDetail();
            })
        })
    }
    getFpData = () => {
        //获取分派的数据（第一个饼图）
        let id = this.state.managerId;
        if(id === " "){
            id = this.state.totalIds;
        }
        let timeEnd = handleTimeEnd(this.state.timeEnd, this.state.period);
        let timeStart = handleTimeStart(this.state.timeStart, this.state.period);
        this.request({
            api: "GetFpData",
            params: {
                manageId: id, //客户经理
                custType: this.state.custType, //客户类型
                timeStart: formatDate(timeStart, 0), //开始时间
                timeEnd: formatDate(timeEnd, 0), //结束时间      
            }
        }, (res) => {
            let list = res.data.data || [], total = 0,flag = true, indexLevel = ['黄金', "白金", "钻石", '财富', '战略'];
            for(let i = 0; i < list.length; i++){
                total += list[i];
            } 
            if(!total){
                flag = false;
            }
            let i = 4;
            for(; i >= 0 ; i--){   //找到等级最高的第一个非0的数据
                if(list[i] > 0){
                    break;
                }
            }
            i < 0 && (i = 0);
            this.setState({
                charAData: res.data.data,
                selectedNum: res.data.data[4],
                showChart: flag,
                curCusType: indexLevel[i],
                selectedNum: list[i]
            }, () => {
                this.getcurData();
                this.getTableData();
            })
        })
    }
    getcurData = () => {
        //当前等级分布
        let timeEnd = handleTimeEnd(this.state.timeEnd, this.state.period);
        let timeStart = handleTimeStart(this.state.timeStart, this.state.period);
        let id = this.state.managerId;
        if(id === " "){
            id = this.state.totalIds;
        }
        this.request({
            api: "GetCurCusData",
            params: {
                manageId: id,  //客户经理
                custType: this.state.custType,    //客户类型
                timeStart: formatDate(timeStart, 0),  //开始时间
                timeEnd: formatDate(timeEnd, 0),      //结束时间
                selectedCusType: this.state.curCusType  //第一个饼图中选中的客户类型
            }
        }, (res) => {
            this.setState({
                charBData: res.data.data
            })
        })
    }
    getTableData = () =>{
        let timeEnd = handleTimeEnd(this.state.timeEnd, this.state.period);
        let timeStart = handleTimeStart(this.state.timeStart, this.state.period);
        let id = this.state.managerId;
        if(id === " "){
            id = this.state.totalIds;
        }
        this.request({
            api:"GetCusRetrun",
            params:{
                custType: this.state.custType,
                timeStart: formatDate(timeStart, 0),  //开始时间
                timeEnd: formatDate(timeEnd, 0),      //结束时间
                manageId: id,
                selectedCusType: this.state.curCusType
            }
        }, (res) => {
            this.setState({
                tableData: res.data
            })
        })
    }
    handleDetailData(data){            //处理回测数据
        let len = data.length, totalList = [];
        console.log(data);
        for(let i =0; i < len; i++){
            let curData = {}, _data = data[i]
            curData.manager = {id: _data.MangerId, name:_data.ManagerName};
            curData.apportionTime = _data.DateTime;
            curData.apportionNums = [], curData.curLevelDis = [], curData.preQuantity = [], curData.curQuantity = [], curData.changeRate = [];
            let list = _data.list || [], custLevels = ['战略', '财富','钻石', '白金', '黄金', '普通'], levelKeys = ['ZhanLueCount','CaiFuCount', 'ZuanShiCount', 'BaiJinCount', 'HuangJinCount', 'PuTongCount']
            for(let j = 0; j <6;j++){
                let curLevel = custLevels[j];
                let curRow = list.find((item) => item.level == curLevel);
                let curDis = [];
                if(curRow){
                    curData.apportionNums.push(curRow.apportionNums);
                    curData.preQuantity.push(curRow.preQuantity || 0);
                    curData.curQuantity.push(curRow.curQuantity || 0);
                    curData.changeRate.push(curRow.changeRate || 0);
                    for(let k = 0; k < 6; k++){
                        let curData = curRow[levelKeys[k]] || 0;
                        curDis.push(curData);
                    }
                    
                }else{
                    curData.apportionNums.push(0);
                    curData.preQuantity.push(0);
                    curData.curQuantity.push(0);
                    curData.changeRate.push(0);
                    curDis = [0, 0, 0, 0, 0, 0];
                }
                curData.curLevelDis.push(curDis);
            }
            totalList.push(curData);
        }
        return totalList;
    }
    getTableDetail = ()=> {
        let timeEnd = handleTimeEnd(this.state.timeEnd, this.state.period);
        let timeStart = handleTimeStart(this.state.timeStart, this.state.period);
        let id = this.state.managerId;
        if(id === " "){
            id = this.state.totalIds;
        }
        this.request({
            api: "GetCusLoopbackDetail",
            params: {
                manageId: id,
                timeStart: formatDate(timeStart, 0),  //开始时间
                timeEnd: formatDate(timeEnd, 0),      //结束时间
                custType: this.state.custType
            }
        }, (res) => {
            let list = res.data|| [], flag;
            list = this.handleDetailData(list);
            console.log('total',list);
            if(list.length == 0){
                flag = false;
            }else{
                flag = true
            }
            this.setState({
                detailTable: list,
                showChart: flag
            })
        })
    }
    changePeriod = (val) => {
        this.setState({
            period: val,
        }, this.getFullData)
    }
    selectTeam = (val) => {
        this.setState({
            team: val
        })
    }
    getFullData = () => {
        if(this.state.showDetail){
            this.getTableDetail();
        }else{
            this.getFpData();
            this.getTableData();
            this.getcurData();
        }
    }
    selectJL = (val) => {
        this.setState({
            managerId: val,
        }, this.getFullData);
    }
    changeCurCusType = (val, num) =>{

        this.setState({
            curCusType: val,
            selectedNum: num
        }, ()=>{
            this.getcurData();
            this.getTableData();
        })
    }
    showDetail = () => {    //加载详情表
        let s = document.location.hash;
        s = s.replace("Khfp", "Khfptable");    
        document.location.hash = s;
        this.setState({
            showDetail: true                            //是否显示详情表格
        }, this.getTableDetail);
        window.onpopstate = () =>{ 
            this.setState({
                showDetail: false,
                showHeader: true
            });
            window.onpopstate = () => {};
        }
    }
    rotateScreen(){
        console.log('rotate');
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let flag = this.state.showHeader; //是否不横屏
        if(isAndroid && window.AndroidHtfPortal) {
            if(flag){
                window.AndroidHtfPortal.crmDeviceRotate(0);
            }else{
                window.AndroidHtfPortal.crmDeviceRotate(3);
            }
        }
        if(isiOS && window.webkit) {
            if(flag){
                window.webkit.messageHandlers.crmDeviceRotate.postMessage(0);
            }else{
                window.webkit.messageHandlers.crmDeviceRotate.postMessage(3);
            }
        }
    }
    fullScreen = () =>{
        this.setState((prev, props) =>{
            return {
                showHeader: !prev.showHeader
            }
        },
        ()=>{
            this.rotateScreen();
            // let container = document.getElementById('rotate_container'), rotate = document.getElementById('rotate'),tablecon = document.getElementById('tablecon');
            // let screenW = screen.availWidth, screenH = document.documentElement.clientHeight;
            // if(this.state.showHeader){
            //     // container.removeAttribute('style');
            //     // rotate.removeAttribute('style');
            //     tablecon.removeAttribute('style');
            //     tablecon.style.width =screenW + 'px';
            //     tablecon.style.overflow = 'scroll';
            //     // container.style.width = screenW + 'px';
            //     // rotate.style.transformOrigin = "top left";
                
            //     return
            // }
            
            // tablecon.style.width = screenH + 'px';
            // // let rotateHeight = rotate.clientHeight, rotateWidth = rotate.clientWidth;
            // // rotate.style.transform = `rotate(90deg) translate(0, -${rotateHeight}px)`;
            // // container.style.width = rotateHeight;
            // // container.style.height = screenH + 'px';
            // window.scrollTo(100000,0);

        }
        )
    }
    render() {
        let state = this.state;
        return (<div className="N_levelAnalyze">
        {  this.state.showHeader &&  <div id='fpheader'> 
            <WhiteSpace size='lg' className="bg_f6" />
            <div className="htf-segment" style={{ height: "30px", width: "250px", margin: "10px auto" }}>
                <div
                    className={this.state.period === 0 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changePeriod(0)}
                >
                    当日
                </div>
                <div
                    className={this.state.period === 1 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changePeriod(1)}
                >
                    月度
                </div>
                <div
                    className={this.state.period === 2 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changePeriod(2)}
                >
                    季度
                </div>
            </div>
            <div className="select_tools">
                <div className="row">
                    <div className="label">
                        团队:
                    </div>
                    <div className="list">
                        {this.state.teamList.map((item, index) => (<div key={index}
                            className={state.team === index ? "selected border_color_ui color_ui" : 'color666'}
                            onClick={() => this.selectTeam(index)}>
                            {item}
                        </div>))}

                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        客户经理:
                    </div>
                    <div style={{ overflowX: 'auto', lineHieght: '26px' }}>
                        <div className="list">
                        <div
                                       
                                        className={state.managerId == " " ? "selected border_color_ui color_ui" : 'color666'}
                                        onClick={() => this.selectJL(" ")}
                                    >全部</div>
                            {
                                state.managerList.map((item, index) => {
                                    
                                    return <div
                                        key={index}
                                        className={state.managerId == item.id ? "selected border_color_ui color_ui" : 'color666'}
                                        onClick={() => this.selectJL(item.id)}
                                    >{item.name}</div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        客户类型:
                    </div>
                    <div className="list">

                        <div
                            className={"selected border_color_ui color_ui"}>
                            个人
                        </div>
                        {/* <div style={{color:'rgba(0,0,0, 0.3)'}}
                            >
                            机构
                        </div> */}

                    </div>
                </div>
            
                <div className="row">
                    <div className="label">
                        分派时间:
                    </div> 
                    { (this.state.period === 0 || this.state.period=== 1) && <div className="list">
                    <DatePicker minDate={new Date("2018/10/1")} extra={"至"} mode={ this.state.period === 0 ? "date" : "month"} onChange={(d)=>{
                        if(d.valueOf() > this.state.timeEnd.valueOf())
                            this.setState({
                                timeStart: d,
                                timeEnd: d
                            }, this.getFullData);
                        else
                         this.setState({timeStart:d}, this.getFullData)}} title="请选项起始日期" maxDate={new Date()}>
                        <CustomDate date={formatDate(this.state.timeStart, this.state.period)}/>
                    </DatePicker> <div className="list" style={{border:'none'}}>至</div>
                    <DatePicker extra=" " mode={ this.state.period === 0 ? "date" : "month"} onChange={(d)=>{this.setState({timeEnd:d}, this.getFullData)}} minDate={this.state.timeStart} title="请选择终止日期" maxDate={new Date()}>
                        <CustomDate date={formatDate(this.state.timeEnd, this.state.period)}/>
                    </DatePicker>
                    </div>}
                    {
                        this.state.period === 2 && <div className="list"> 
                            <SeansonPicker  type={1} onChange={(val) => {
                            let year = val[0], season = val[1], endYear = this.state.timeEnd.getFullYear(), endSeason = (~~this.state.timeEnd.getMonth() / 3) + 1 ,timeEnd = this.state.timeEnd
                            if((year * 10 + season) > (endYear * 10 + endSeason)){
                                timeEnd = new Date(year, season * 3 - 1 );
                            }
                            this.setState({
                                timeStart: new Date(year, ((season - 1 ) * 3)),
                                timeEnd,
                            },this.getFullData)
                        }} year={this.state.timeStart.getFullYear()} season={(this.state.timeStart.getMonth() / 3) + 1}>
                            <CustomDate date={formatDate(this.state.timeStart, this.state.period)} type={1}/>
                        </SeansonPicker> <div className="list" style={{border:"none"}}>至</div>
                            <SeansonPicker year={this.state.timeStart.getFullYear()} type={2} onChange={(val) => {
                            let year = val[0], season = val[1];
                            console.log(year, season);
                            let timeEnd = new Date(year, season * 3 -1);
                            if(timeEnd.valueOf() < this.state.timeStart.valueOf()){
                                timeEnd = this.state.timeStart;
                            }
                            this.setState({
                                timeEnd: timeEnd
                            }, this.getFullData)
                        }} season={(this.state.timeStart.getMonth() / 3) + 1}>
                            <CustomDate date={formatDate(this.state.timeEnd, this.state.period)}/>
                        </SeansonPicker>
                        
                        </div>
                    }
                </div>
                </div>
                </div>}
                { this.state.showChart &&<div>
                { !this.state.showDetail && <div>
             {this.state.charAData.length > 0 && <ChartA data={this.state.charAData} changeCurCusType={this.changeCurCusType}/>}
            <WhiteSpace size='lg' className="bg_f6" />
            <div className="color_ui fs_16 bg_ui_2 mt_10" style={{ display: 'inline-block', lineHeight: '36px', padding: '0 20px 0 10px', borderRadius: '0 18px 18px 0' }}>
                {this.state.curCusType}客户现有等级分布
            </div>
            {this.state.charBData.length > 0 && <ChartB curCusType={this.state.curCusType} data={this.state.charBData} cusNum={this.state.selectedNum}/>}
            <WhiteSpace size='lg' className="bg_f6" />
            <div>
                <TableB curCusType={this.state.curCusType} showDetail={this.showDetail} data={this.state.tableData}/>
            </div></div>
            } 
            {this.state.showDetail &&<TableA fullScreen={this.fullScreen} data={this.state.detailTable} haveData={this.state.showChart}/>}
            </div>}
            {!this.state.showChart && <div className='nocontent' style={{top:'2.5rem', color:'#e3e3e5', textAlign:'center', fontSize:'0.2rem', display:'flex', alignItems:'center', justifyContent:'center'}}><span style={{transform:'translate(0, 0.5rem)'}}>暂无数据</span></div>}
            {this.state.showDetail && <FixedButton imageClass='rotatepic' position={this.state.showHeader ? {right: '5%', bottom:'5%'} :{left: '5%', bottom: '5%'}} onClick={this.fullScreen}/>}
        </div>)
    }
}
export default Khfp;