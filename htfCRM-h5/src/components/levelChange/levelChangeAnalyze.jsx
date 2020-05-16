import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module';
import { WingBlank, Picker,List, TextareaItem,Button,WhiteSpace, Flex, Text, Modal } from 'antd-mobile';

class LevelChangeAnalyze extends Module{
    
    constructor(props,context){
        super(props,context);
        this.state={
            pickerData:[],
            id:'',                    //详情页id--
            mainReason:'',            //主观原因id
            mainReasonName: '',
            mainReasonDesc: '',        //主观原因描述
        }
    }

    leaveHoldH5() {
        if(window.leaveHoldH5Show) {return;}
        window.leaveHoldH5Show = true;
        Modal.alert("当前内容还未保存", "是否离开", [
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



    componentDidMount(){
        this.changeTilte("主观原因描述");
        /**
         * 提供全局方法给app集成方进行监听,如果全局方法中存在该方法,集成方不执行goback回退
         * 而执行 window.leaveHoldH5() 方法
         * 此时是否回退交给H5处理
         * 在H5执行完回退后,页面被销毁将会把全局变量设置为null,此时集成方监听全局方法不存在时,默认执行返回操作
         * @type {function(this:QKEditDetail)}
         */
        window.leaveHoldH5 = this.leaveHoldH5.bind(this);
        this.getMainReason();
    }

    

    componentWillUnmount() {
        window.leaveHoldH5 = null;
        window.leaveHoldH5Show = false;
    }


    /**
     * 获取主观原因列表
     */
    getMainReason(){
        this.request({
            api:'GetMainReason',
        },(res) => {
            console.log(res, '=-')
            let newData = [];
            res.data.map((item,i)=>{
                newData.push({
                    label: item.name,
                    value: item.id
                });
            });
            this.setState({
                pickerData:newData
            })
        })
    }

	/**
     * 保存
     */
    saveValue=()=>{
        let params={
            id: this.props.location.query.id,                         //详情页id
            mainReason:this.state.mainReason,                         //主观原因id
            mainReasonDesc:this.state.mainReasonDesc                  //主观原因描述
        };
        console.log(params)
        this.request({
            api:'MainReasonUpdate',
            params:params
        },()=>{
            this.context.router.goBack()
        })
    }

    /**
     * 选择主观原因回调
     */
    onOkHandle = (a)=>{
        let id = a[0];
        let { pickerData } = this.state;
        let _name = '';
        pickerData.map((item) => {
            if (item.value === id) {
                _name = item.label;
            }
        })
        this.setState({
            mainReason: id,
            mainReasonName: _name
        });
    } 

    render(){
        console.log(this.state.pickerData)
        return <div ref={el => this.lv1 = el}>
            <WhiteSpace size="md" className="bg_f6"/>

            <Picker
                extra={<Text style={{ fontSize: '.14rem' }}>{this.state.mainReasonName || '请选择'}</Text>}
                data={this.state.pickerData}
                cols={1}
                value={[this.state.mainReason]}
                onOk={this.onOkHandle}
                itemStyle={{}}
            >
                <List.Item arrow="horizontal" >
                    <Text className="fs_14">主观原因：</Text>
                </List.Item>
            </Picker>
            <div  style={{borderTop: '1px solid #eee'}}>
                <div style={{fontSize: '.17rem', margin: '.1rem .15rem 0'}}>主观说明</div>
                <TextareaItem
                    placeholder="请在此输入"
                    /* rows={5} */
                    autoHeight = 'true'
                    style={{fontSize: '.14rem',minHeight:'2rem',paddingRight:'.15rem'}}
                    onBlur={(val)=>{this.setState({mainReasonDesc:val})}}
                />
            </div>
            <WhiteSpace size="xl" className="bg_f6" />
            <div  style={{padding: '0 .2rem'}}  className="bg_f6" >
                <Button  style={{ display: "block" }}  className="colorF" onClick={this.saveValue} >保存</Button>
            </div>
            <WhiteSpace size="xl" className="bg_f6" />

        </div>
    }

}

export default LevelChangeAnalyze;