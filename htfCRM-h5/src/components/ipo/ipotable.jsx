import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import SideLabel from '../widget/sideLabel';
import IconAdd from '../icons/add';
import CustTable from "./custTable";
import { WhiteSpace } from 'antd-mobile';
import moment from 'moment';

//props: data [[{}]]
class IPOTable extends Module{
    constructor(props, context) {
        super(props, context);
        this.state = {
            showMore: false,
            sorted: -1,      //如果为0则升序，1则降序,-1初始
        }
    }
    showMore = () =>{
        
        this.setState((pre) => {
            return {
                showMore: !pre.showMore
            }
        })
    }

	/**
     * 排序
     * @param val
     */
    handleSort = (val) => {

        let { data } = this.props;
        console.log(val, data);
        this.setState((preState)=>{
            console.log(preState.sorted);
            if(preState.sorted === -1) {
                return {
                    sorted: 1
                }
            }
            if(preState.sorted === 1) {
                return {
                    sorted: 0
                }
            }
            if(preState.sorted === 0) {
                return {
                    sorted: -1
                }
            }
        });
    }

    render(){
        let { data } = this.props, rows=[], { sorted } = this.state;
            // list = data.list.sort((a, b) => new Date(b.date.replace(/-/g, "/")+' '+b.time) - new Date(a.date.replace(/-/g, "/")+' '+a.time));
        let list = data.list;
        if(sorted === 1) {
            list = data.list.sort((a, b) => new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/")))
        } else if(sorted === 0) {
            list = data.list.sort((a, b) => new Date(a.date.replace(/-/g, "/")) - new Date(b.date.replace(/-/g, "/")) )
        } else {
            list = this.props.data.list;
        }

        //处理rows
        list.forEach((item)=>{
            rows.push([
                {value: item.date},
                {value: item.partiesName},
                {value: item.productName},
                {value: item.code},
                {value: item.amount}
            ])
        });
        //3.21 庆军 改为精确到日后比较
        let now = new Date(moment().format('YYYY/MM/DD') + ' 00:00:00'),
            cur = data.endtime|| "",
            flag = false; 
        cur = cur.replace(/-/g, '/');
        cur = new Date(cur);
        //只有产品的endtime大于等于当前，就有新增按钮
        if(cur.valueOf() >= now.valueOf()) {
            flag = true;
        }

        return (
            <div className="ipo-table">
            <WhiteSpace size='lg' className='bg_f6'/>
            <SideLabel
                content={(data.productName || '') + '(' + data.code + ')'}
                extra={flag ? <span onClick={() => { this.context.router.push({
                    pathname: 'IPOInput',
                    query:{
                        productid: data.productid
                    }
                })
            }}><IconAdd/></span> : ''}/>

            {
               rows.length > 0 &&
               <div style={{ position: 'relative' }}>
                 <CustTable
                     style={{width: '150%'}}
                     rows={rows}
                     showMore={this.state.showMore}
                     handleSort={this.handleSort}
                     sorted={this.state.sorted}
                 />
               </div>
            }
                
            { ( rows.length > 4) && <div className="show-more">{(this.state.showMore) ?
                <span className='iconfont icon-shanglashouqi' onClick={this.showMore}></span> :
                <span className="iconfont icon-xialagengduo" onClick={this.showMore}></span>}
            </div>
            }
        </div>
        )
    }
}
 export default IPOTable;