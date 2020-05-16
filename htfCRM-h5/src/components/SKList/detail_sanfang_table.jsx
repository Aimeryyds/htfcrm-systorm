import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar } from 'antd-mobile';

class DetailSanfangTable extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { tabsType, tableDatas } = this.props;

        return <WingBlank size="lg">
            <div style={{ position: 'relative' }}>
                <div id="tableScrollA" style={{overflowX: 'scroll'}}>


                    {
                        tabsType === 0 &&
                        <div>
                            <div style={{position: 'absolute', top: 0, left: 0}}>
                                <table style={{width: '1.31rem'}} className="custom_module_table">
                                    <thead>
                                    <tr>
                                        <th style={{width: '1.31rem'}} className='table_column_1'>统计日期</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        tableDatas.map((item, index)=>{
                                            return <tr key={index}>
                                                <td style={{backgroundColor: '#fff'}}>
                                                    <span style={{color: '#fff'}}>.</span>
                                                    { item.new_statisdata }
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <table width="700%" className="custom_module_table">
                                <thead>
                                <tr>
                                    <th style={{width: '1.3rem'}}>统计日期</th>
                                    <th>平台公募规模（亿）</th>
                                    <th>我司在公募规模排名</th>
                                    <th>平台事实户数（万）</th>
                                    <th>我司平台事实户数排名</th>
                                    <th>平台开户数（万）</th>
                                    <th>我司平台开户数排名</th>
                                    <th>平台有效户数（万）</th>
                                    <th>我司平台有效户数排名</th>
                                    <th>平台权益公募规模（亿）</th>
                                    <th>我司平台权益公募规模排名</th>
                                    <th>平台理财类公募规模（亿）</th>
                                    <th>我司平台理财类公募规模排名</th>
                                    <th>平台货币公募规模（亿）</th>
                                    <th>我司平台货币公募规模排名</th>
                                    <th>创建日期</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    tableDatas.map((item, index)=>{
                                        return <tr key={index}>
                                            <td>{ item.new_statisdata }</td>
                                            <td>{ item.new_size }</td>
                                            <td>{ item.new_htf_order }</td>
                                            <td>{ item.new_trade_count }</td>
                                            <td>{ item.new_htftradeorder }</td>
                                            <td>{ item.new_deposit_count }</td>
                                            <td>{ item.new_htf_depositorder }</td>
                                            <td>{ item.new_vaild_count }</td>
                                            <td>{ item.new_htf_validorder }</td>
                                            <td>{ item.new_equity_size }</td>
                                            <td>{ item.new_htf_equityorder }</td>
                                            <td>{ item.new_financial_size }</td>
                                            <td>{ item.new_htf_financialorder }</td>
                                            <td>{ item.new_currency_size }</td>
                                            <td>{ item.new_htf_currencyorder }</td>
                                            <td>{ item.createdon }</td>
                                        </tr>
                                    })
                                }
                                {
                                    tableDatas.length === 0 &&
                                    <tr>
                                        <td colSpan="16">
                                            暂无数据
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    }

                    {
                        tabsType === 1 &&
                        <div>
                            <div style={{position: 'absolute', top: 0, left: 0}}>
                                <table style={{width: '1.31rem'}} className="custom_module_table">
                                    <thead>
                                    <tr>
                                        <th style={{width: '1.31rem'}} className='table_column_1'>日常联系人姓名</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        tableDatas.map((item, index)=>{
                                            return <tr key={index}>
                                                <td
                                                    style={{backgroundColor: '#fff', color: '#0366d6'}}
                                                    onClick={()=>{
                                                                    this.context.router.push({
                                                                        pathname: '/LinkManDetail_PT',
                                                                        query: {
                                                                            id: item.new_parties_contactid
                                                                        }
                                                                    })
                                                                }}
                                                >
                                                    <span style={{color: '#fff'}}>.</span>
                                                    { item.new_name }
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <table width="400%" className="custom_module_table">
                                <thead>
                                <tr>
                                    <th style={{width: '1.30rem'}}>日常联系人姓名</th>
                                    <th>职级</th>
                                    <th>所属部门</th>
                                    <th>电话联系方式</th>
                                    <th>直属领导姓名</th>
                                    <th>直属领导手机联系方式</th>
                                    <th>微信联系方式</th>
                                    <th>汇添富对接人姓名</th>
                                    <th>对接层面分类</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    // TODO 跳转联系人详情
                                    tableDatas.map((item, index)=>{
                                        return <tr key={index}>
                                            <td>
                                                { item.new_name || '---' }
                                            </td>
                                            <td>{ item.new_position }</td>
                                            <td>{ item.new_department }</td>
                                            <td>{ item.new_tel }</td>
                                            <td>{ item.new_manager_name }</td>
                                            <td>{ item.new_manager_mobile }</td>
                                            <td>{ item.new_webchat }</td>
                                            <td>{ item.new_htf_contact }</td>
                                            <td>{ item.new_level }</td>
                                        </tr>
                                    })
                                }
                                {
                                    tableDatas.length === 0 &&
                                    <tr>
                                        <td colSpan="9">
                                            暂无数据
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>

                    }

                    {
                        tabsType === 2 &&
                        <div>
                            <div style={{position: 'absolute', top: 0, left: 0}}>
                                <table style={{width: '1.31rem'}} className="custom_module_table">
                                    <thead>
                                    <tr>
                                        <th style={{width: '1.31rem'}} className='table_column_1'>统计日期</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        tableDatas.map((item, index)=>{
                                            return <tr key={index}>
                                                <td style={{backgroundColor: '#fff'}}>
                                                    <span style={{color: '#fff'}}>.</span>
                                                    { item.new_statisdata }
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <table width="400%" className="custom_module_table">
                                <thead>
                                <tr>
                                    <th style={{width: '1.30rem'}}>统计日期</th>
                                    <th>对标分类</th>
                                    <th>平台对标公司名称</th>
                                    <th>平台对标公司规模</th>
                                    <th>入选理由</th>
                                    <th>做的好的原因</th>
                                    <th>对我们的启发</th>
                                    <th>平台名称</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    tableDatas.map((item, index)=>{
                                        return <tr key={index}>
                                            <td>{ item.new_statisdata }</td>
                                            <td>{ item.new_benchmarkingtype }</td>
                                            <td
                                                style={{backgroundColor: '#fff', color: '#0366d6'}}
                                                onClick={()=>{
                                                                    this.context.router.push({
                                                                        pathname: '/JZListDetail',
                                                                        query: {
                                                                            id: item.new_new_companyname
                                                                        }
                                                                    })
                                                                }}
                                            >
                                                { item.new_benchmarkingcompanyid }
                                            </td>
                                            <td>{ item.new_companysize }</td>
                                            <td>{ item.new_reason }</td>
                                            <td>{ item.new_best_reason }</td>
                                            <td>{ item.new_enlightenment }</td>
                                            <td>{ item.new_partiesid }</td>
                                        </tr>
                                    })
                                }
                                {
                                    tableDatas.length === 0 &&
                                    <tr>
                                        <td colSpan="8">
                                            暂无数据
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    }

                    {
                        tabsType === 3 &&
                        <div>
                            <div style={{position: 'absolute', top: 0, left: 0}}>
                                <table style={{width: '1.31rem'}} className="custom_module_table">
                                    <thead>
                                    <tr>
                                        <th style={{width: '1.31rem'}} className='table_column_1'>统计日期</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        tableDatas.map((item, index)=>{
                                            return <tr key={index}>
                                                <td style={{backgroundColor: '#fff'}}>
                                                    <span style={{color: '#fff'}}>.</span>
                                                    { item.new_statisdata }
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <table width="300%" className="custom_module_table">
                                <thead>
                                <tr>
                                    <th style={{width: '1.3rem'}}>统计日期</th>
                                    <th>平台名称</th>
                                    <th>竞品名称</th>
                                    <th>对标产品分类</th>
                                    <th>竞品规模（亿）</th>
                                    <th>入选理由</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    tableDatas.map((item, index)=>{
                                        return <tr key={index}>
                                            <td>{ item.new_statisdata }</td>
                                            <td>{ item.new_parties }</td>
                                            <td
                                                style={{backgroundColor: '#fff', color: '#0366d6'}}
                                                onClick={()=>{
                                                                    this.context.router.push({
                                                                        pathname: '/JZListDetailPro',
                                                                        query: {
                                                                            id: item.competitveproductid
                                                                        }
                                                                    })
                                                                }}
                                            >{ item.new_competitveproductid }</td>
                                            <td>{ item.new_producttype }</td>
                                            <td>{ item.new_size }</td>
                                            <td>{ item.new_reason }</td>
                                        </tr>
                                    })
                                }
                                {
                                    tableDatas.length === 0 &&
                                    <tr>
                                        <td colSpan="6">
                                            暂无数据
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    }

                </div>
            </div>

            <WhiteSpace size="lg"/>
        </WingBlank>
    }
}

export default DetailSanfangTable;