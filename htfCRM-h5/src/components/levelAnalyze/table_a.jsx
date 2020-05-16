import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import SearchBar from '../widget/seachBar';
import { WhiteSpace, List } from 'antd-mobile';
import FixedButton from '../widget/fixedbutton';
import Landscape from '../widget/landscape';
import CurQuantityTable from './curQuantityTable';
import InOutTable from './inouttable';
import UpDownTable from './upanddowntable';
const CUSTTYPE = ['黄金客户', '白金客户', '钻石客户', '财富客户', '战略客户', '百万以下有效户', '百万有效户', '500万有效户'];
const TABLETYPE = ['上月存量', '调入数据', '调出数据', '升级数据', '流失数据', '降级数据', '当前存量'];
const Item = List.Item;

//客户等级分析表格
class DetailTable extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData: {},               //数据结构 {list: [[{}, ...]....]}
            rotate: false,   //是否横屏显示
        }
    }
    componentDidMount() {
        let { tableType, custLevel, peroid } = this.props.location.query;
        custLevel = custLevel || "";
        if (custLevel.length <= 2) {
            custLevel += "客户";
        }
        document.title = custLevel + TABLETYPE[tableType];
        this.getTableData(tableType, custLevel);
    }
    getTableData = (tableType, custLevel) => {
        //获取表格的数据
        let apis = ['GetCusCurQuantity', 'GetCusImport', 'GetCusImport', 'GetCusOutput', 'GetCusOutput', 'GetCusOutput', 'GetCusCurQuantity'], typeToTableType = [0, 0, 1, 0, 1, 2, 0], params = {
            custType: CUSTTYPE.findIndex((val) => val.indexOf(custLevel) > -1),
            period: this.props.location.query.period,
            selectedUserIds: this.props.location.query.mId,
        };
        if(tableType != 0 && tableType != 6){
            params.tableType = typeToTableType[tableType];
        }
        this.request({
            api: apis[tableType],
            params: params
        }, (res) => {
            this.setState({
                tableData: res.data
            })
        })
    }
    handleRotate = () => {
        this.setState((pre) => {
            return {
                rotate: !pre.rotate
            };
        });
    }
    render() {
        let type = this.props.location.query.tableType, period = this.props.location.query.period, position, title = document.title + "数据";
        console.log(period);
        if(this.state.rotate){
            position = {
                left: '5%',
                bottom: '5%'
            }
        }else{
            position = {
                right:'5%',
                bottom:'5%'
            }
        }
        let {userType }= this.props.location.query; 
        return (
        
            <div className="la_detail_table">
                {!this.state.rotate && <div>
                    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex:999 }}>
                        <SearchBar placeholder='客户名称/手机号' />
                        <WhiteSpace size='lg' className='bg_f6' />
                    </div>
                    <div style={{ height: '70px' }} className='bg_f6'></div>
                </div>}
                
                {
                    //存量表格
                    (type == 0 || type == 6) && <Landscape rotate={this.state.rotate}>{ this.state.rotate && <Item>{title}</Item>}<CurQuantityTable data={this.state.tableData.list} period={period} rotate={this.state.rotate} total={this.state.tableData.total} userType={userType}/></Landscape>
                }
                {
                    //调入调出表格
                    (type == 1 || type == 2) && <InOutTable data={this.state.tableData.list} total={this.state.tableData.total} userType={userType}/>

                }
                {
                    //流失降级表格
                    (type == 3 || type == 4 || type == 5) && <Landscape rotate={this.state.rotate}>{this.state.rotate && <Item>{title}</Item>}<UpDownTable data={this.state.tableData.list} rotate={this.state.rotate} total={this.state.tableData.total} userType={userType} period={period} type={type}/>
                    </Landscape>

                }
                {(type != 1 && type != 2 ) &&<FixedButton position={position} imageClass='rotatepic' onClick={this.handleRotate}/>}
            </div>

        )
    }
}

export default DetailTable;