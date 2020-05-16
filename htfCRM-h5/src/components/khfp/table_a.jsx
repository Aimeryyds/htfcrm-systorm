import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import { WingBlank, WhiteSpace, Button, List} from 'antd-mobile';
const Item = List.Item;
class TableA extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
           fullScreen: false,
           width: 105,
           height: 52,
        }
    }

    componentDidMount() {
        let list = this.props.data.list || [];
        if(list.length>0){
            let dom = document.getElementById('mName'), height = dom.clientHeight, width = dom.clientWidth;
            this.setState({
                height,
                width
            });
        }else{

        }

    }

    render() {
        
        let data = this.props.data, list = data|| [],fullScreen = this.props.fullScreen, sHeight = document.documentElement.clientHeight, height = this.state.height, width = this.state.width,haveData = this.props.haveData;
        
            return <div id='rotate_container'>
            {list.length > 0 && <div>
            <div id="rotate" style={{transformOrigin:'top left', }}>
            <Item className='kehumanagerdetail' style={{marginLeft:'15px'}}><span className="sideBadge"> </span> 分派客户转化详情</Item>
            
            <div style={{ position: 'relative' }}>

                <div style={{overflow: 'scroll'}} className="tablecontainer" id='tablecon'>
                    
                        <table className="custom_module_table" style={{width: 65 * 20 + "px",}}>
                            <thead>
                            <tr>
                                <th rowSpan='2' colSpan='2' id='mName'>客户经理</th>
                                <th rowSpan='2' colSpan='2'>分派日期</th>
                                <th rowSpan='2' colSpan='2'>客户等级</th>
                                <th rowSpan='2' colSpan='2'>分派客户数</th>
                                <th colSpan="6">当前客户等级</th>
                                <th rowSpan='2' colSpan='2'>转化时保有量(百万)</th>
                                <th rowSpan='2' colSpan='2'>当前保有量(百万)</th>
                                <th rowSpan='2' colSpan='2'>变化率</th>
                            </tr>
                            <tr>
                                <th>战略</th>
                                <th>财富</th>
                                <th>钻石</th>
                                <th>白金</th>
                                <th>黄金</th>
                                <th>普通</th>
                            </tr>
                            </thead>
                            {
                                list.map((item, index) => {
                                    let changeRate = item.changeRate, rowSpan = 6, _list = item.apportionNums;
                                    for(let i = 0; i < _list.length; i++){
                                        if(_list[i] == 0)
                                            rowSpan--;
                                    }
                                    console.log(rowSpan);
                                    changeRate = changeRate.map((item) => parseFloat(item));
                                    return (<tbody key={item.manager.id + index}>
                                        <tr>
                                            <td rowSpan={rowSpan + 1} colSpan='2'>{item.manager.name}</td>
                                            <td rowSpan={rowSpan + 1} colSpan='2'>{item.apportionTime}</td></tr>
                                           {_list[0] > 0 && <tr>
                                            <td colSpan='2' className={changeRate[0] < 0 ? 'colorGreen' : ''}>战略</td>
                                            <td colSpan='2'>{item.apportionNums[0]}</td>
                                            <td>{item.curLevelDis[0][0]}</td>
                                            <td>{item.curLevelDis[0][1]}</td>
                                            <td>{item.curLevelDis[0][2]}</td>
                                            <td>{item.curLevelDis[0][3]}</td>
                                            <td>{item.curLevelDis[0][4]}</td>
                                            <td>{item.curLevelDis[0][5]}</td>
                                            <td colSpan='2'>{item.preQuantity[0]}</td>
                                            <td colSpan='2'>{item.curQuantity[0]}</td>
                                            <td colSpan='2' className={changeRate[0] < 0 ? 'colorGreen' : ''}>{item.changeRate[0]}</td></tr>}
                                        
                                        { _list[1] > 0 && <tr>
                                            <td colSpan='2' className={changeRate[1] < 0 ? 'colorGreen' : ''}>财富</td>
                                            <td colSpan='2'>{item.apportionNums[1]}</td>
                                            <td>{item.curLevelDis[1][0]}</td>
                                            <td>{item.curLevelDis[1][1]}</td>
                                            <td>{item.curLevelDis[1][2]}</td>
                                            <td>{item.curLevelDis[1][3]}</td>
                                            <td>{item.curLevelDis[1][4]}</td>
                                            <td>{item.curLevelDis[1][5]}</td>
                                            <td colSpan='2'>{item.preQuantity[1]}</td>
                                            <td colSpan='2'>{item.curQuantity[1]}</td>
                                            <td colSpan='2' className={changeRate[1] < 0 ? 'colorGreen' : ''}>{item.changeRate[1]}</td>
                                        </tr>}
                                        {_list[2] > 0 && <tr>
                                            <td colSpan='2' className={changeRate[2] < 0 ? 'colorGreen' : ''}>钻石</td>
                                            <td colSpan='2'>{item.apportionNums[2]}</td>
                                            <td>{item.curLevelDis[2][0]}</td>
                                            <td>{item.curLevelDis[2][1]}</td>
                                            <td>{item.curLevelDis[2][2]}</td>
                                            <td>{item.curLevelDis[2][3]}</td>
                                            <td>{item.curLevelDis[2][4]}</td>
                                            <td>{item.curLevelDis[2][5]}</td>
                                            <td colSpan='2'>{item.preQuantity[2]}</td>
                                            <td colSpan='2'>{item.curQuantity[2]}</td>
                                            <td colSpan='2' className={changeRate[2] < 0 ? 'colorGreen' : ''}>{item.changeRate[2]}</td>
                                        </tr>}
                                        {_list[3] > 0 && <tr>
                                            <td colSpan='2' className={changeRate[3] < 0 ? 'colorGreen' : ''}>白金</td>
                                            <td colSpan='2'>{item.apportionNums[3]}</td>
                                            <td>{item.curLevelDis[3][0]}</td>
                                            <td>{item.curLevelDis[3][1]}</td>
                                            <td>{item.curLevelDis[3][2]}</td>
                                            <td>{item.curLevelDis[3][3]}</td>
                                            <td>{item.curLevelDis[3][4]}</td>
                                            <td>{item.curLevelDis[3][5]}</td>
                                            <td colSpan='2'>{item.preQuantity[3]}</td>
                                            <td colSpan='2'>{item.curQuantity[3]}</td>
                                            <td colSpan='2' className={changeRate[3] < 0 ? 'colorGreen' : ''}>{item.changeRate[3]}</td>
                                        </tr>}
                                        {_list[4] > 0 && <tr>
                                            <td colSpan='2' className={changeRate[4] < 0 ? 'colorGreen' : ''}>黄金</td>
                                            <td colSpan='2'>{item.apportionNums[4]}</td>
                                            <td>{item.curLevelDis[4][0]}</td>
                                            <td>{item.curLevelDis[4][1]}</td>
                                            <td>{item.curLevelDis[4][2]}</td>
                                            <td>{item.curLevelDis[4][3]}</td>
                                            <td>{item.curLevelDis[4][4]}</td>
                                            <td>{item.curLevelDis[4][5]}</td>
                                            <td colSpan='2'>{item.preQuantity[4]}</td>
                                            <td colSpan='2'>{item.curQuantity[4]}</td>
                                            <td colSpan='2' className={changeRate[4] < 0 ? 'colorGreen' : ''}>{item.changeRate[4]}</td>
                                        </tr>}
                                        {_list[5] > 0 && <tr>
                                            <td colSpan='2' className={changeRate[5] < 0 ? 'colorGreen' : ''}>普通</td>
                                            <td colSpan='2'>{item.apportionNums[5]}</td>
                                            <td>{item.curLevelDis[5][0]}</td>
                                            <td>{item.curLevelDis[5][1]}</td>
                                            <td>{item.curLevelDis[5][2]}</td>
                                            <td>{item.curLevelDis[5][3]}</td>
                                            <td>{item.curLevelDis[5][4]}</td>
                                            <td>{item.curLevelDis[5][5]}</td>
                                            <td colSpan='2'>{item.preQuantity[5]}</td>
                                            <td colSpan='2'>{item.curQuantity[5]}</td>
                                            <td colSpan='2' className={changeRate[5] < 0 ? 'colorGreen' : ''}>{item.changeRate[5]}</td>
                                        </tr>}
                                      
                                    </tbody>)
                                })
                            }
                            
                            
                        </table>
        

                   
                </div>
                {/* 冻结表头 */}
                <table className="custom_module_table" style={{position:"absolute", left:0, top: 0, width:width + 1 +"px"}}>
                    <thead>
                        <tr style={{height: height +"px",}}><th>
                            客户经理
                            </th></tr>
                    </thead>
                    {
                        list.map((item, index) => {
                            let rowSpan = 6, _list = item.apportionNums;
                                    for(let i = 0; i < _list.length; i++){
                                        if(_list[i] == 0)
                                            rowSpan--;
                                    }
                            
                            return (<tbody key={item.manager.id + "rel" + index}>
                
                                <tr style={{height: 41 * rowSpan + 'px', backgroundColor:"white"}}><td>
                                    {item.manager.name}
                                    </td></tr>
                            </tbody>)
                        })
                    }
                    
                </table>
                </div> 
                
                </div>
           {/* <div className={this.state.fullScreen?"fixedButton2":'fixedButton'} style={{backgroundImage:"url(" + require("../../resources/images/rotate.png") +")"}} onClick={()=>{this.props.fullScreen();this.setState((prev,cur)=>{
               return {
                   fullScreen: !prev.fullScreen
               }
           })}}></div> */}
           </div>}
           {list.length <= 0 &&  <div className='nocontent' style={{top:'2.5rem', color:'#e3e3e5', textAlign:'center', fontSize:'0.2rem', display:'flex', alignItems:'center', justifyContent:'center',position:'fixed'}}><span style={{transform:'translate(0, 0.5rem)'}}>暂无数据</span></div>}
        </div>
        
    }
}

export default TableA;


