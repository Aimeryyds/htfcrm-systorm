import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Picker, Icon, List, InputItem,  } from 'antd-mobile';
const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
class Competitor extends Module{
    constructor(props, context){
        super(props, context);
    }

    render(){
        let { index, data, dropdown, change } = this.props;
        return <div className='competitor'>
            <h1 style={{fontSize: '12px', color:'#999', backgroundColor:'#F6F6F6', margin:0, padding:'9px 15px', display:'flex', justifyContent:'space-between'}}>
                竞品{index + 1}
                <span onClick={()=>{this.props.del(index)}}>
                    <Icon type='cross-circle' size='xxs'/>
                </span>
            </h1>
            <List>
            <InputItem
                placeholder='请输入'
                value={data.code}
                onChange = {(val) => {change(index, 'code', val);}}
            >
                产品代码:
            </InputItem>
                
            <Item extra={data.name}>
                产品名称:
            </Item>

            <Item extra={data.competitorName}>
                竞争对手:
            </Item>
            
            <InputItem
            type={'digit'}
            placeholder="IPO至今累计认购金额"
            clear
            onChange={(val) => {change(index,'money', val)}}
             value={data.money }
            // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >累计认购金额(元):</InputItem>
            </List>
        </div>

    }
}
export default Competitor;