//客户经理拜访明细
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import ManagerQa from './quantityanalyze';
import { Tabs, WhiteSpace } from 'antd-mobile';
import LossRank from './lossrank';
import DeRank from './degraderank';
class ManageVisitTable extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            list:[],
            date:''
        }
    }

    componentDidMount(){
        this.changeTilte('客户经理拜访明细');
        this.getData()
    }

    getData(){
        this.request({
            api: 'GetThreeVisitAnalyzeDetail',
            params:{
                systemUsid: this.props.location.query.id,
                dateType:this.props.location.query.dateType
            }
        }, (res) => {
            console.log('拜访明细',res)
            this.setState({
                list: res.data.list,
                date:res.data.date
            })
        })
    }

    render(){
        let {list,date}=this.state;
        let tableWidth = document.body.clientWidth * 1.6;

        return (
          <div className='threevisit_analyze'>
              <WhiteSpace size='lg' className="bg_f6"/>
              <div className="module_title_a">
                  客户经理拜访明细
                  <span style={{display:'inline-block',float:'right',marginRight:'15px',fontSize:'13px', color:'#CCCCCC'}}>数据日期：{date}</span>
              </div>

              <div className='qunatityTable kehumanagerdetail' style={{position: 'relative'}}>
                  <div style={{position: 'absolute', top: 0, left: 0, width: '1.6rem', overflow: 'hidden'}}>
                      <table className="custom_module_table" style={{width: tableWidth,background:'white'}}>
                          <thead>
                          <tr>
                              <th style={{width: '1.6rem'}}>拜访主题</th>
                              <th>拜访对象</th>
                              <th>拜访方式</th>
                              <th>负责人</th>
                              <th>开始日期</th>
                          </tr>
                          </thead>
                          <tbody>
                          {list.map((item,index)=>{
                              return (<tr key={index}>
                                  <td style={{color:'#73AFFA',width:'1.6rem'}}
                                      onClick={()=>{
                                          this.context.router.push({
                                              pathname: '/ServeDetail',
                                              query: {
                                                  id: item[5],
                                                  type:1
                                              }
                                          })
                                      }}>
                                      {item[1]}
                                  </td>
                              </tr>)
                          })}
                          </tbody>
                      </table>
                  </div>

                  <div style={{overflowX: 'scroll'}}>
                      <table className="custom_module_table" style={{width: '160%'}}>
                          <thead>
                          <tr>
                              <th style={{width: '1.6rem'}}>拜访主题</th>
                              <th>拜访对象</th>
                              <th>拜访方式</th>
                              <th>负责人</th>
                              <th>开始日期</th>
                          </tr>
                          </thead>
                          <tbody>
                          {list.map((item,index)=>{
                              return (<tr key={index}>
                                  <td style={{width: '1.6rem'}}>
                                      {item[1]}
                                  </td>
                                  <td>
                                      {item[4]}
                                  </td>
                                  <td>
                                      {item[2]}
                                  </td>
                                  <td>
                                      {item[0].name}
                                  </td>
                                  <td>
                                      {item[3]}
                                  </td>
                              </tr>)
                          })}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        )
    }

}
export default ManageVisitTable;