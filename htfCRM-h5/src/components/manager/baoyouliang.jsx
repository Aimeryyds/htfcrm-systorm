import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Tabs, WhiteSpace, WingBlank, List } from 'antd-mobile';
import echarts from 'echarts';
import TableA from './table';
import IconSearch from '../widget/iconsearch';
const Item = List.Item;
class KeepQuantity extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            tabValue: 0, //tab值, 0服务等级，1保有量等级
            chartData: [],
            custtype: 0,   //1是个人，0是机构
            selectedCust: '战略',
            tableData: [],   //表格数据
            sorted: -1,   //-1位排序，0：升序， 1：降序
        }
    }
    componentDidMount(){
        this.getChartData();
        this.getTableData();
    }
    getChartData(){
        this.request({
            api: "GetManagerQuantity",
            params: {
                id: this.props.id,
                custtype: this.state.custtype,
                datatype: this.state.tabValue
            }
        }, (res)=> {
            this.setState({chartData: res.data}, this.renderChart);
        })
    }
    getTableData(){
        //获取表格数据
        let custtype = this.state.custtype, custtypename = this.state.tabValue, mapLevelToNum = {'黄金': 1, "白金":2, "钻石": 3, '财富':4, "战略": 5, "其他": 6, 's类':1, "a类":2,'b类':3, "c类":4, 'd类':5, '百万以下':1, '百万':2, '500万': 3};
        this.request({
            api:'GetQuantityTableData',
            params: {
                id: this.props.id,
                custtypename: this.state.selectedCust,
                custtype,
                custtypename,
                custlevel: mapLevelToNum[this.state.selectedCust] || 1,
                custname: ''
            }
        }, (res) => {
            this.setState({
                tableData: res.data,
                sorted: -1
            });
        })
    }
    handleSort = () => {
        //表格排序
        let data = this.state.tableData, sorted = this.state.sorted;
        if(sorted == -1){  //降序
            data = data.sort((a,b) => b.curquantity - a.curquantity);
            sorted = 1;
        }else{
            data = data.reverse();
            sorted = sorted ? 0 : 1;
        }
        this.setState({
            tableData:data,
            sorted
        })
        
    }
    goToSearch = () =>{
        let custtype = this.state.custtype, custtypename = this.state.tabValue, mapLevelToNum = {'黄金': 1, "白金":2, "钻石": 3, '财富':4, "战略": 5, "其他": 6, 'S类':1, "A类":2,'B类':3, "C类":4, 'D类':5, '百万以下':1, '百万':2, '500万': 3};
        let query = {
                id: this.props.id,
                custtypename: this.state.selectedCust,
                custtype,
                custtypename,
                custlevel: mapLevelToNum[this.state.selectedCust] || 1,
                custname: ''
            };
        this.context.router.push({
            pathname:'ManagerCustSearch',
            query,
        })

    }
    renderChart(){  
        let mychart = echarts.init(document.getElementById('bar')), xValue, yName;
        if(this.state.tabValue === 0){
            if(this.state.custtype == 0)
                xValue = ['战略', '财富','钻石', "白金", '黄金', '其他'];
            else 
                xValue = ['S类', 'A类', 'B类', 'C类', 'D类','其他'];
            
        }
        else{
            xValue = ['百万以下', '百万', '500万'];
        }
        if(this.state.custtype===0){
            yName='个人';
        }else{
            yName = '机构';
            
        }
        let option = {
            xAxis: {
                type: 'category',
                data: xValue
            },
            yAxis: {
                type: 'value',
                name: yName + "客户数（人）",
                nameTextStyle:{
                    color:"#999999",
                    padding: [0,0,0,80]
                },
                axisLabel:{
                    color: '#999',
                    barBorderRadius: [2,2,0,0]
                },
                
            },
            series:[{
                data:this.state.chartData,
                type:'bar',
                itemStyle:{
                    color:'#7CB1F9'
                },
                emphasis:{
                    itemStyle: {
                        color:'#2B83F8'
                    }
                },
                label:{
                    show: true,
                    position: 'top',
                },
                barWidth: 25
            }]
        }
        mychart.setOption(option);
        mychart.off('click');
        mychart.on('click', (param)=>{
            this.setState({
                selectedCust:param.name
            }, this.getTableData)
        });
    }
    changeCustType(val){
        let selectedCust;
        if(val === 0)
            selectedCust = "战略";
        else
            selectedCust = 'S类';
        this.setState({
            custtype:val,
            selectedCust,
        }, () =>{this.getChartData();this.getTableData()})
    }
    render(){
        return <div className='keepquantity'>
        <WingBlank size='md'>
            <Tabs tabs={[{title:'客户服务等级', value:0}, {title:'客户保有量等级',value:1}] }  onChange={(tab, index)=>{
                let selectedCust;
                if(tab.value === 0){
                    selectedCust = '战略';
                } else{
                    selectedCust = '500万';
                }
                this.setState({
                tabValue: tab.value,
                selectedCust,
            }, ()=>{this.getChartData(); this.getTableData();});}}/>
            <div className="htf-segment" style={{ height: "30px", width: "85px", margin: "10px 0 0 70%" }}>
                <div
                    className={this.state.custtype === 0 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeCustType(0)}
                >
                    个人
                </div>
                <div
                    className={this.state.custtype === 1 ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                    onClick={() => this.changeCustType(1)}
                >
                    机构
                </div>
            </div>
            <div id='bar' style={{height:'240px'}}>

            </div>
            </WingBlank>
            <WhiteSpace size='lg' className='bg_f6'/>

            <div className='quantityTable'>
                <WingBlank size='md'>
                    <Item extra={<IconSearch onClick={this.goToSearch}/>}><span className="sideBadge"> </span> {this.state.selectedCust}客户信息</Item>
                </WingBlank>
                <TableA data={this.state.tableData} sorted={this.state.sorted} handleSort={this.handleSort} userType={this.state.custtype}/>
            </div>
        </div>
    }
}
export default KeepQuantity;