import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Button,Modal,Toast } from 'antd-mobile';
let mapNameToPathName={
    'account': 'SKListDetail',            //需要额外的客户类型参数
    'contact':'LinkManDetail', 
    'appointment':'TodoListDetail',
    'opportunity':'BusinessProject',
    'task': 'ServeDetail',                  //type=1
    'new_lead': 'QKListDetail',                 //id改为leadid
    'new_blocktrade': 'View360',                 //大额资金变动
}
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class ToDoListDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isFinish:null,
            isCancel:null,
            detailData:{},
            modal1:false,
            modal2:false,
        }
    }

    componentDidMount() {
        this.changeTilte("待办事项");
        this.getDetail();
    }

    getDetail(){
        this.request({
            api: 'GetTodoDetail',
            params: {
                id:this.props.location.query.id
            }
        }, (res)=>{
            console.log(res)
            this.setState({
                detailData: res.data,
                isFinish:res.data.is_finished=='False'?false:true,
                isCancel:res.data.is_canceled=='False'?false:true,
            })
        })
    }

    submitFinish(){
        this.request({
            api: 'TodoIsFinish',
            type:'post',
            params: {
                id:this.props.location.query.id
            }
        }, (res)=>{
            if(res.code=='200'){
                Toast.success("标记成功",2,()=>{
                    this.setState({isFinish:true},()=>{
                        let storage=window.localStorage;
                        storage.setItem('todoListTab', 2);
                    })
                })
            }
        })
    }

    submitCancel(){
        this.request({
            api: 'TodoIsCancel',
            type:'post',
            params: {
                id:this.props.location.query.id
            }
        }, (res)=>{
            if(res.code=='200'){
                Toast.success("取消成功",2,()=>{
                    this.setState({isCancel:true},()=>{
                        let storage=window.localStorage;
                        storage.setItem('todoListTab', 3);
                    })
                })
            }
        })
    }


    //弹框兼容
    onWrapTouchStart = (e) => {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    goto = () => {
        //关于跳转
        let storage=window.localStorage;
        let data = this.state.detailData;
        let type = data.LogicalName, id = data.id;
        let query={};
        //是否跳转到客户升降级列表项,最优先
        if(data.subject.indexOf('升降级')>-1){
            this.context.router.push({
                pathname:'/LevelChange',
                query:{
                    currentId:0,
                    appointmentid:data.id
                }
            })
            return;
        }
        // if(data.subject.indexOf('大额资金变动')>-1){
        //     try {
        //         storage.setItem('view360Tab', 1);
        //     } catch (e){
        //         console.log('IOS10 - localStorage无效')
        //     }
        //     this.context.router.push({
        //         pathname:'/View360',
        //         query:{
        //             id:0,
        //             name:0,
        //             userType:0
        //         }
        //     })
        //     return;
        // }

        if(!data.about || !mapNameToPathName[type]){
            return;
        }
        
        if(type == 'account'){
            this.request({
                api:"customerDetail",
                params: {
                    id,
                }
            }, (res) => {
                let custtype = res.data.custtype|| "", ctype = 1;
                if(custtype.indexOf('机构') > -1){
                    ctype = 0;
                }
                this.context.router.push({
                    pathname:'SKListDetail',
                    query:{
                        userType: ctype,
                        id,
                    }
                })

            })
            return;
        }
        if(type == "task"){
            query.type = 1;
        }
        if(type == "new_lead"){
            query.leadid = id;
        }
        if(type == "new_blocktrade"){
            storage.setItem('view360Tab', 1);
            query.id = data.userId;
            query.name = data.userName;
            query.userType = data.userType; //TODO
        }
        this.context.router.push({
            pathname: mapNameToPathName[type],
            query,
        })


    }
    render() {
        let { isFinish,detailData,isCancel,modal1,modal2 } = this.state;
        let tabVal=this.props.location.query.tabVal;
        let data = {};
        return <div className="N_customer_List_detail todoDetail">
      
                <WhiteSpace size="lg"/>
                <WingBlank>
                    <div className="color48 fs_16 mb_5" style={{width:'70%',lineHeight:'0.24rem'}}>{ detailData.subject || '---' }</div>
                    { detailData.newtype && <div className='fs_12 mb_10 colorF' style={{padding: '5px 10px', backgroundColor: '#fa7375', display: 'inline-block', borderRadius: '4px'}}>
                        { detailData.newtype }
                    </div> }
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                <WingBlank>
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">日期</div>
                        <div className="color333 fs_14" style={{wordWrap:'break-word'}}>{ detailData.date || '---' }</div>
                    </div>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">创建者</div>
                            <div className="color333 fs_14">{ detailData.createdby || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">类型</div>
                            <div className="color333 fs_14">{ detailData.type || '---' }</div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">地点</div>
                            <div className="color333 fs_14">{ detailData.location|| '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">关于</div>
                            <div
                                className={
                                (
                                detailData.about ||
                                (detailData.subject && detailData.subject.indexOf('升降级')>-1)
                                ) ? "color333 fs_14 ui_color" : "color333 fs_14"}
                                onClick={this.goto}
                            >
                                {
                                    detailData.about ||
                                    ((detailData.subject && detailData.subject.indexOf('升降级')>-1) && "升降级详情")
                                }
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">开始时间</div>
                            <div className="color333 fs_14">{ detailData.begin_time ? detailData.begin_time : '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">结束时间</div>
                            <div className="color333 fs_14">{ detailData.end_time ? detailData.end_time : '---' }</div>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                <WingBlank>
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">主题内容</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ detailData.newsubject || '---' }</div>
                    </div>
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">说明</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ detailData.desc || '---' }</div>
                    </div>
                    <div className="mb_10">
                        <div className="color999 fs_12 mb_5">处理说明</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ detailData.result || '---' }</div>
                    </div>
                </WingBlank>

                <WhiteSpace size="lg" className="bg_f5"/>
            {/* <div className="info_style_a">
                <WhiteSpace size="lg"/>
                <Flex  className="mb_15">
                    <div
                        style={{
                            color: '#fff',
                            padding: '.05rem .15rem .05rem .2rem',
                            borderRadius: '0rem 0.13rem 0.13rem 0',
                            lineHeight: 1,
                            fontSize: '.16rem'

                        }}
                        className="bg_ui"
                    >
                        {detailData.newtype||'---'}
                    </div>

                </Flex>
                <WingBlank>
                    <Flex className="mb_15" justify='between' align='start'>
                        <div className="color48 fs_16 mb_5" style={{lineHeight:'0.2rem'}}>{detailData.subject||'---'}</div>
                        <div className="color48 fs_12 mb_5 ml_30" style={{lineHeight:'0.2rem'}}>{detailData.date||'---'}</div>
                    </Flex>

                    <div style={{wordWrap:'break-word',lineHeight:'0.2rem',marginBottom:'0.4rem'}} className='fs_14 color666 mb_20'>
                        {detailData.newsubject||'---'}
                    </div>



                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">开始时间</div>
                                <div className="color000 fs_16">{detailData.begin_time||'---'}</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">结束时间</div>
                                <div className="color000 fs_16">{detailData.end_time||'---'}</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">创建者</div>
                                <div className="color000 fs_16">{detailData.createdby||'---'}</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <div className="color999 fs_10 mb_5">地点</div>
                                <div className="color000 fs_16">{detailData.location||'---'}</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <div className="mb_15">
                        <div className="color999 fs_10 mb_5">关于</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word',color:'#0070fa',lineHeight:'0.24rem'}}>{detailData.about||'---'}
                            <span className="iconfont icon-jiantoutiaozhuan fs_14" style={{display:'inline-block',paddingLeft: '.06rem',color:'#0070fa',lineHeight:'0.24rem'}}></span>
                        </div>
                    </div>
                    <div className="mb_15">
                        <div className="color999 fs_10 mb_5">处理说明</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word',lineHeight:'0.24rem'}}>{detailData. result||'---'}</div>
                    </div>
                    
                </WingBlank>
            </div> */}
            <div className="button">
                <Modal
                    visible={modal1}
                    transparent
                    maskClosable={false}
                    onClose={()=> {this.setState({modal1: false})}}
                    title="是否标记完成"
                    footer={[
                        { text: '取消', onPress: () => {this.setState({modal1: false});} },
                        { text: '确认', onPress: () => {this.setState({modal1: false}); this.submitFinish()} }
                    ]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div>
                        <div>您是否确定完成此任务？任务标记完成后将无法改变状态，请谨慎选择</div>
                    </div>
                </Modal>
                <Modal
                    visible={modal2}
                    transparent
                    maskClosable={false}
                    onClose={()=> {this.setState({modal2: false})}}
                    title="是否标记取消"
                    footer={[
                        { text: '不了', onPress: () => {this.setState({modal2: false});} },
                        { text: '确认', onPress: () => {this.setState({modal2: false});  this.submitCancel()} }
                    ]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div>
                        <div>您是否取消此任务？任务取消后将无法改变状态，请谨慎选择</div>
                    </div>
                </Modal>
                {
                    (tabVal==0||tabVal==1)&&
                    <div>
                        {!isFinish?
                            <Button
                                style={isCancel?{display:'none'}:{display:'block'}}
                                onClick={() =>this.setState({modal1: true})}>标记完成</Button>:
                            <Button style={isCancel?{display:'none'}:{display:'block',background:'#cccccc'}} disabled>已完成</Button>
                        }
                        {
                            !isCancel ?
                                <Button
                                    style={isFinish?{display:'none'}:{marginTop: '0.1rem',background:'#fff',color:'#000'}}
                                    onClick={() =>this.setState({modal2: true})}>取消任务</Button> :
                                <Button style={isFinish?{display:'none'}:{display:'block',background:'#cccccc'}} disabled>已取消</Button>
                        }
                    </div>
                }
                {
                    tabVal==2&&
                    <div>
                        <Button disabled style={{background:'#cccccc'}}>已完成</Button>
                    </div>
                }
                {
                    tabVal==3&&
                    <div>
                        <Button disabled style={{background:'#cccccc'}}>已取消</Button>
                    </div>
                }

            </div>
        </div>
    }
}

export default ToDoListDetail;