import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { SearchBar, WhiteSpace, ListView, List } from 'antd-mobile';
import NoContent from '../widget/onContent';
const Item = List.Item;
const Brief = Item.Brief;
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
            api:'GetManagerList',
            params:{
                key: this.state.searchKey,
                pageIndex: this.pageIndex,
                pageSize: 10
            }
        }, (res) => {
            if(res.data.value.length === 0){
                this.setState({
                    isLoading:false,
                    hasMore: false
                })
                return;
            }
            let dataSource = this.state.dataSource;
            dataSource = dataSource.concat(res.data.value);
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
        for(let i = 0; i < dataSource.length; i++){
            listData[`${i}`] = `row-${i}`;
        }
        const renderRow = (rowData, sectionID, rowID) => {
            
            let obj = dataSource[index];
            index++;
            return  <Item arrow="horizontal" multipleLine onClick={() => {}} key={rowID} onClick={() => {
                this.context.router.push({
                    pathname: 'kehumanagerdetail',
                    query:{
                        id: obj.id,
                        name: obj.name
                    }
                })
            }}>
            {obj.name} <Brief>{obj.team}团队</Brief>
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
                        useBodyScroll
                        onEndReached={(e) => {console.log(e);this.pageIndex++, this.getData()}}
                        onEndReachedThreshold={10}
                        renderFooter={() => (<div style={{ textAlign: 'center' }}>
                            {this.state.isLoading ? '加载中...' : ''}
                            {!this.state.hasMore && '没有更多了'}
                        </div>)}
                        />
                    }

            </div>
        </div>)
    }
}

export default ManagerList;