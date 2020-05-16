import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Picker, DatePicker, List, InputItem, Button, Toast, Modal } from 'antd-mobile';
import _default from 'antd-mobile/lib/action-sheet';
const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class OwnProduct extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            data: {                       //各项数据
               
            },
            buttonIsDisabled: false,           //按键是否可点
        }
    }
    componentDidMount(){
    }


    // sendData = () => {
    //     let data = this.state.data;
    //     this.setState({
    //         buttonIsDisabled: true,
    //     });
    //     //处理数据
    //     let _drops = this.state.dropDown;
    //     let item = _drops.find((item) => item.value == data.platform);
        // this.request({
        //     api: 'SetOwnProduct',
        //     type: 'get',
        //     params: {
        //         platform: item.new_partiesid,
        //         time: this.formatDate(data.time),
        //         amount: data.money,
        //         name: this.props.productid
        //     }
        // }, () => {
        //     this.context.router.push({
        //         pathname: 'IPOList',
        //     });
    //     }, ()=> {
    //         this.setState({
    //             buttonIsDisabled: false,
    //         })
    //     })
    // }
    render(){
        let { dropdown,data, change, sendData} = this.props, now = new Date();
        return (
            <div className="own-product">
            <List>
                <Picker data={dropdown} cols='1' value={[data.platform]} onChange={(val) => {
                    change(val[0], 'platform');
                }}>
                    <Item extra={'请选择'} arrow='horizontal'>三方平台:</Item>
                </Picker>
                <DatePicker value={data.time} onChange={(v) => {
                    change(v, 'time');
                }} maxDate={ new Date(now.valueOf() + 3600000 )} minuteStep={30}>
                    <Item arrow='horizontal'>
                        统计时间:
                    </Item>
                </DatePicker>
                <InputItem
            type={'digit'}
            placeholder="IPO至今累计认购金额"
            clear
            onChange={(v) => {
                change(v, 'money');
             }}
             value={data.money }
            // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >累计认购金额(元):</InputItem>
                </List>
                <div className='button'>
                <Button style={{color: 'white'}} onClick={ sendData}
                disabled={this.state.buttonIsDisabled}>提交</Button>
 
                </div>
            </div>
        )
    }
}
export default OwnProduct;