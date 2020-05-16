import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { SearchBar, WhiteSpace, ListView, List } from 'antd-mobile';
import NoContent from '../widget/onContent';
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
        }
        this.pageIndex = 1;
    }
    componentDidMount(){
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
            api:'getOurPeopleList',
            params:{
                key: this.state.searchKey,
                pageIndex: this.pageIndex,
                pageSize: 10
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
        let hei = document.documentElement.clientHeight - 65;
        for(let i = 0; i < dataSource.length; i++){
            listData[`${i}`] = `row-${i}`;
        }
        const renderRow = (rowData, sectionID, rowID) => {
            
            let obj = dataSource[index];
            index++;
            return  <Item   onClick={() => {this.props.changeOurPeople(obj)}} key={rowID}>
            {obj.name}
          </Item>
        
        }
       
        return (<div className='ManagerList'>
            <div className='header'>
                <SearchBar placeholder='姓名/业务部门' onChange={(val) => {this.pageIndex=1, this.setState(
                    {searchKey:val,hasMore: true, dataSource:[]}, () => {this.getData();}
                );}}/>
            <WhiteSpace size='lg' className='bg_f6'/>
            </div>
            <div className='list'>
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
        </div>)
    }
}

export default ManagerList;