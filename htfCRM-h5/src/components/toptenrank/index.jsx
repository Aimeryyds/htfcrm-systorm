import React from 'react';
import Module from '../../lib/module';
import SelectedBadge from '../fundflow/selectBadge';
import ChartA from './chartA';
import Tips from '../manager/tips';
class TopTenRank extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            custType: 0,      //0:个人， 1: 企业
            chartData: {},    //图表数据
        }
    }
    componentDidMount(){
        this.changeTilte('全渠道十大客户排名');
        this.getChartData();
    }
    getChartData = () => {
        //获取图表数据
        let custType = this.state.custType;
        custType = custType == 0 ? 1 : 0;           //需求变动，1是企业，0是个人
        this.request({
            api:'GetTopTenOwnCustomer',
            params:{
                custType,
            }
        }, (res)=>{
            let chartData = res.data;
            this.setState({
                chartData,
            })
        })
    }
    render(){
        let custType = this.state.custType;
        let userType = custType ? 0 : 1;  //跳转360视图用，1个人，0，机构
        return (
        <div className='topten'>
            <SelectedBadge options={['个人', '企业']} selected={this.state.custType} onChange={(opt, index)=>{
                this.setState({
                    custType: index,
                }, this.getChartData)
            }}/>
            <ChartA data={this.state.chartData} type={custType} userType={userType}/>
            
        </div>
        )

    }

}
export default TopTenRank;