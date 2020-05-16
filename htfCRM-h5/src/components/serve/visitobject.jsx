import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { SearchBar, WhiteSpace, ListView, List } from 'antd-mobile';
import NoContent from '../widget/onContent';
import MySearchBar from '../widget/seacherBarwithPicker';
import FixedBoutton from '../widget/fixedbutton';
const Item = List.Item;
const Brief = Item.Brief;
function Body(props) {
    return (
      <div className="am-list-body my-body" style={props.style}>
        
        {props.children}
      </div>
    );
  }
class ManagerList extends Module{
    constructor(props, context){
        super(props, context);
        this.state={
            searchKey: '',
            dataSource: [],
            hasMore: true,
            isLoading: true,
            pickerValue: 0,           //0：事实客户，1：潜客，2：三方
        }
        this.pageIndex = 1;
    }
    componentDidMount(){
        this.changeTilte('客户经理列表');
        this.getData();
    }
    getData = () => {
        if(!this.state.hasMore){
            return;
        }
        this.setState({
            isLoading: true
        });
        this.request({
            api:'getVisistObject',
            params:{
                key: this.state.searchKey,
                pageindex: this.pageIndex,
                pagesize: 20,
                custtype: this.state.pickerValue,
            }
        }, (res) => {
            let data = res.data;
            if(data.length === 0){
                this.setState({
                    isLoading:false,
                    hasMore: false
                })
                return;
            }
            let dataSource = this.state.dataSource;
            dataSource = dataSource.concat(data);
            this.setState({
                dataSource,
                isLoading: false,
                hasMore: true
            })
        })
    }
    render(){
        let {dataSource} = this.state, listData = {};
        let index = 0;
        let hei = document.documentElement.clientHeight - 50;
        for(let i = 0; i < dataSource.length; i++){
            listData[`${i}`] = `row-${i}`;
        }
        const renderRow = (rowData, sectionID, rowID) => {
            
            let obj = dataSource[index];
            index++;
            return  <Item  onClick={() => {this.props.changeVisit(obj, this.state.pickerValue)}} key={rowID}>
            {obj.name}（{obj.phone}）
          </Item>
        
        }
       
        return (<div className='ManagerList visit-object-content'>
             <MySearchBar placeholder="姓名/手机号" searchChange={(val) => {
                 val = val || "";
                 val = val.trim();
                 this.pageIndex = 1;
                 this.setState({
                     searchKey: val,
                     hasMore: true,
                     dataSource: [],
                 }, this.getData)
             }} pickerChange={(val)=> {
                 this.pageIndex = 1;
                 this.setState({
                     pickerValue: val[0],
                     hasMore: true,
                     dataSource: []
                 }, this.getData)
             }} data={this.state} pickerData={[{label:'事实客户', value: 0}, {label:'潜客', value:1}, {label:'三方客户', value:2}]}/>
            <div className='list' style={{marginTop: 0}}>
                    {
                        (dataSource.length === 0 && !this.state.hasMore) ? <NoContent/> : <ListView 
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (row1, row2) => row1 !== row2}
                            ).cloneWithRows(
                                listData,
                            )
                        }
                        renderRow={renderRow}
                        
                        onEndReached={(e) => {this.pageIndex++, this.getData();}}
                        onEndReachedThreshold={10}
                        initialListSize={20}
                        renderFooter={() => (<div style={{ textAlign: 'center',backgroundColor:'white' }}>
                            {this.state.isLoading ? '加载中...' : ''}
                            {!this.state.hasMore && '没有更多了'}
                        </div>)}
                        renderBodyComponent={() => <Body/>}
                        style={{height: hei + 'px', overflow:'auto'}}
                        />
                    }

            </div>

            {
                (this.state.pickerValue === 1) &&
                <FixedBoutton
                    position={{right:'5%', bottom:'12%'}}
                    imageClass='add-button'
                    onClick={() => {
                        this.context.router.push({
                            pathname: 'QKEditDetail',
                            query:{
                                userType: -1,
                            }
                        })
                    }}
                />
            }

        </div>)
    }
}

export default ManagerList;