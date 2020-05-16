//竞品
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Picker, DatePicker, List, InputItem, Button, Modal, } from 'antd-mobile';
import Competitor from './competitor';
import CircleAdd from '../icons/addincircle';
const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


class CompetProduct extends Module{
    constructor(props, context){
        super(props, context);
        
        this.state = {
                
            buttonIsDisabled: false,                     //按钮是否不可用   
        }
    }
    
    componentDidMount(){
    }
   




    sendData = () => {
        this.setState({
            buttonIsDisabled: true,
        })
        let data = this.state.data, coms = this.state.competitors, promises = [], platDrop = this.state.dropdown.platform, curPlat = platDrop.find((item) => item.value == data.platform), pId = curPlat && curPlat.new_partiesid, comDrop = this.state.dropdown.competitor;
        coms.forEach((item) => {
            let curCom = comDrop.find(c => c.value == item.competitor), comId = curCom && curCom.competitorid; 
            promises.push(this.requestPromise({
                api:'SetCompetitorProduct',
                type: 'get',
                params:{
                    platform: pId,
                    time: formatDate(data.time),
                    name: item.id,
                    amount: item.money,
                    competitor: comId
                }
            }));
        });
        Promise.all(promises).then(() => {
            
            this.context.router.push({
                pathname: 'IPOList',
            })
        }, () => {
            this.canLeave = true;
            this.setState({
                buttonIsDisabled: false
            })
        })
       
    }
    render(){
        let { dropdown, data, baseChange, comChange, addCom, delCom, sendData} = this.props;
        let competitors = data.competitors;
        return (
            <div className='competitor'>
                <List>
                    <Picker data={ dropdown.platform } value={[data.platform]} cols='1' onChange={(val) => {
                        baseChange(val[0], 'platform');
                    }}>
                        <Item arrow='horizontal'>三方平台:</Item>
                    </Picker>
                    <DatePicker value={data.time} minuteStep={30} onChange={(val) => {baseChange(val, 'time')}}>
                        <Item arrow='horizontal'>统计时间:</Item>
                    </DatePicker>
                    
                </List>
                {competitors.map((com,index) => <Competitor dropdown={dropdown.competitor} data={com} change={comChange} key={index} index={index} del={delCom}/>)}
                
                <div className='addCompet'><span onClick={addCom}><CircleAdd/></span></div>
                
                <div className='button'>
                    <Button
                        style={{color: 'white'}}
                        onClick={sendData}
                    >
                        提交
                    </Button>
                </div>
            </div>
        )
    }
}
export default CompetProduct;