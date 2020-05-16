import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import SearchBar from '../widget/seachBar';
import { WhiteSpace, List } from 'antd-mobile';
import NoContent from '../widget/onContent';
const Item = List.Item;
class ManagerCustSearch extends Module{
    constructor(props, context) {
        super(props, context);
        this.state = {
            total: [],
            searchKey: '',
        }

    }
    componentDidMount(){
        document.documentElement.className='bg_f6';
        this.getData();
    }
    componentWillUnmount(){
        document.documentElement.className='';
    }
    getData(){
        let params = this.props.location.query;
        this.request({
            api:'GetQuantityTableData',
            params,
        }, (res) => {
            let list = res.data;
            this.setState({
                total: list,
            })
        })
    }
    searchChange = (val)=>{
        this.setState({
            searchKey: val,
        })
    }
    goToDetail(id){
        this.context.router.push({
            pathname:'SKListDetail',
            query:{
                id,
                userType: this.props.location.query.custtype
            }
        })
    }
    render(){
        let key = this.state.searchKey, list = [], total = this.state.total;
        if(key == ''){
            list = this.state.total;
        }else{
            list = total.filter((item) => {
                if(isNaN(parseInt(key))){
                    return item.name.indexOf(key) > -1;
                }else{
                    return item.mobile.toString().indexOf(key) > -1;
                }
            })
        }
        return <div>
            <SearchBar placeholder='客户名称/手机号' onChange={this.searchChange}/>
            <WhiteSpace size='lg' className='bg_f6'/>
            { list.length <= 0 && <NoContent/>}
            {
                list.length > 0 && <List>
                    {list.map(item => <Item key={item.id} onClick={() => { this.goToDetail(item.id);}}>{item.name}</Item>)}
                </List>
            }
        </div>
    }
}
 export default ManagerCustSearch;