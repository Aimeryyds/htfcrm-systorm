import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import Asset from './zichan';
import KeepQuantity from './baoyouliang';
import {WhiteSpace, Flex, Badge, WingBlank, List} from 'antd-mobile';
import UpAndDown from './upanddown';
const Item = List.Item;
class ManagerDetail extends Module{
    constructor(props, context){
        super(props, context);
        // let dataType = window.localStorage.getItem('managerDetailDataType');
        // if(dataType){
        //     dataType = parseInt(dataType);
        // }else{
        //     dataType = 0;
        // }
        this.state = {
            managerDetail: {},  
            dataType: 0,                //0:资产, 1:保有量, 2:升降级 
        }
    }
    componentDidMount(){
        let { name } = this.props.location.query;
        name = name || '';
        if(name)
            this.changeTilte('客户经理详情(' + name + ')');
        else 
        this.changeTilte('客户经理详情');
        this.getDetail();
    }
    // componentWillUnmount(){
    //     let storage = window.localStorage;
    //     storage.setItem('managerDetailDataType', this.state.dataType);
    // }
    getDetail(){
        //获取客户经理详情
        let { id } = this.props.location.query;
        this.request({
            api:'GetManagerDetail',
            params: {
                id,
            }
        }, (res) => {
            let data = {};
            data.team = res.data.team, data.custnumber = res.data.number, data.total = res.data.totalownership, data.highestproduct = res.data.holdthehighestproduct;
            this.setState({
                managerDetail: data
            })
        })
    }
    changeDataType(val){
        this.setState({
            dataType:val
        })
    }
    goToVisit = () => {
        //跳转到拜访
        let managerid = this.props.location.query.id;
        this.context.router.push({pathname:'ServeList', query: {urltype: 2, managerid}});
    }
    render(){
        let {name, id} = this.props.location.query, {team, custnumber, total, highestproduct} = this.state.managerDetail;
        return (<div className='kehumanagerdetail'>
            <WhiteSpace size='lg' className='bg_f6'/>
            <div className='header'>
            <WingBlank size='md'>
                <h3>{name} <span className='sub'>{team ? team + '团队' : ''}</span></h3>
                <Flex wrap="wrap">
                    {custnumber && <Badge text={`客户数${custnumber}`}  size="large" style={{marginRight:'3px', backgroundColor:"#7CB1F9", marginTop:'4px'}}/>}
                    {total && <Badge text={`当前客户总保有量${total}万`} style={{marginRight:'3px', backgroundColor:"#FABE3E", marginTop:'4px'}}/>}
                    {highestproduct && <Badge text={`持有最高产品:${highestproduct}`} style={{marginRight:'3px', backgroundColor:"#7FCAFF", marginTop:'4px'}}/>}
                </Flex>
                <Item arrow="horizontal" onClick={this.goToVisit}>近一周客户联系情况</Item>
            </WingBlank>
            </div>
            <WhiteSpace size='lg' className='bg_f6'/>
            <div className='display'>
            <div className="htf-segment" style={{ height: "30px", width: "250px", margin: "10px auto" }}>
                <div
                    className={this.state.dataType === 0 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeDataType(0)}
                >
                    资产
                </div>
                <div
                    className={this.state.dataType === 1 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeDataType(1)}
                >
                    保有量
                </div>
                {/* <div
                    className={this.state.dataType === 2 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeDataType(2)}
                >
                    升降级
                </div> */}
                </div>
                { this.state.dataType === 0 && <Asset id={id}/>}
                { this.state.dataType === 1 && <KeepQuantity id={id}/>}
                {/* { this.state.dataType === 2 && <UpAndDown id={id}/>} */}
            </div>
        </div>)
    }
}
export default ManagerDetail;