import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import IPOTable from './ipotable';
import IconAdd from '../icons/add';
import NoContent from '../widget/onContent';
class IpoList extends Module{
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData: [],               //表格数据,  [{productName: "基金名", code：产品代码, list:[{date:日期, time:时间, code: 产品代码, amount:总金额}, ...]}] 
            productList: [],  //第一个接口请求回的数据
        }

    }
    componentDidMount(){
        document.title = "IPO列表";
        this.getProductList();
    }
    // getTableData(){
    //     this.request({
    //         api: 'getIpoList',
    //         params:{

    //         }
    //     }, (res) => {
    //         //处理数据
    //         let data = res.data;
    //         this.setState({
    //             data: data
    //         });
    //     })
    // };
    getProductList(){
        // 请求产品列表，并且对列表中的每一个产品请求一次getIPOList
        this.request({
            api: 'getIPOProduct',
        }, (res) => {
            console.log('----IPO产品1',res);
            //处理数据
            let _data = res.data, list = this.state.data, re = [], promises = [];
            _data.forEach(item => {
                let cur = item;
                cur.code = item.new_fundcode;
                cur.productName = item.name;
                cur.list = [];
                promises.push(this.requestPromise({
                    api: 'getIpoList',
                    params:{
                        productId: cur.productid
                    }
                }));
                re.push(cur);
            });
            this.setState({
                tableData: re
            },()=>{this.getIPOlist(promises,re)});

        })
    }


    getIPOlist(promises,re){
        Promise.all(promises).then((res)=>{
            // alert('----IPO列表'+JSON.stringify(res))
            // console.log(res[0])
            res.forEach((item, index) =>{
                let list = item.data && item.data.list;
                re[index].list = list;
            });

            this.setState({
                tableData: re
            });
        })
    }

    render(){
        let list = this.state.tableData, products = this.state.productList;
        // list = [];
       return  <div className='ipo-list'>
            {list.length>0 && list.map((item, index) => {
                // let list = item.list, re = /(\d{4}-\d{1,2}-\d{1,2})\s(\d{1,2}:\d{1,2})/;
                // for(let i = 0; i < list.length; i++){
                //     let _d = list[i].date, match= re.exec(_d);
                //     match || (match=['2018-1-1', '14:45'])
                //     list[i].date = match[1];
                //     list[i].time = match[2];
                // }
                return <IPOTable key={item.productName + item.code} data={item}/>
            })}
            {
                list.length == 0 && <NoContent/>
            }
        </div>
    }
}
export default IpoList;