import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class ECommerceDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData: [],
            sorted: [-1, -1],
            originalTableData: [],        //原始数据,即首次获取后数据保存,用于前端模糊搜索后还原用
            searchValue: ''
        }
    }

    componentDidMount() {
        this.changeTilte("客户申赎信息")
        
        this.getData();
        // console.log(this.props.location.query, '----11')
    }

    getData(){
        let _detailType, _searchType;
        switch (this.props.location.query.detailType) {
            case '权益':
                _detailType = 0;
                break;
            case '债券':
                _detailType = 1;
                break;
            case '货币':
                _detailType = 2;
                break;
            case '其他':
                _detailType = 3;
                break;
        }
        switch (this.props.location.query.managerName) {
            case "全部":
                _searchType = 1;
                break;
            case "无管户":
                _searchType = 2;
                break;
            default:
                _searchType = 0;
        }
        let _params = {
            type: this.props.location.query.type,
            dataTime: this.props.location.query.dataTime,
            detailType: _detailType,       //0是权益1是债券2是货币3是其他
            userId: this.props.location.query.userId,
            searchType: _searchType,
            selectType: this.props.location.query.selectType
        };

        // console.log('--biange--', _params)

        //获取数据
        this.request({
            api:'PurchaseRedemptionDetailed',
            params: _params
        }, (res) => {
            console.log('--res--', res)
            this.setState({
                tableData: res.data,
                originalTableData: res.data
            })
        });
    }


    handleSort(index) {
        let { tableData, sorted } = this.state;
        let _tableData = this.deepClone(tableData),
            _sorted = this.deepClone(sorted);
        if(index === 0) {
            //金额排序
            if(sorted[index] === -1) {
                _tableData.sort((a, b) => b.amount - a.amount);
                _sorted = [-1, -1];
                _sorted[index] = 1
            }
            if(sorted[index] === 1) {
                _tableData.sort((a, b) => a.amount - b.amount);
                _sorted[index] = 0
            }
            if(sorted[index] === 0) {
                _sorted[index] = -1
            }
        }
        if(index === 1) {
            //交易时间排序
            if(sorted[index] === -1) {
                _tableData.sort((a, b) => new Date(b.DataDt.replace(/-/g, '/')).getTime() - new Date(a.DataDt.replace(/-/g, '/')).getTime());
                _sorted = [-1, -1];
                _sorted[index] = 1
            }
            if(sorted[index] === 1) {
                _tableData.sort((a, b) => new Date(a.DataDt.replace(/-/g, '/')).getTime() - new Date(b.DataDt.replace(/-/g, '/')).getTime());
                _sorted[index] = 0
            }
            if(sorted[index] === 0) {
                _sorted[index] = -1
            }
        }
        this.setState({
            tableData: _tableData,
            sorted: _sorted
        })
    }

    onSearch = (val) => {
        this.setState({
            searchValue: val.replace(/(^\s*)|(\s*$)/g, ""),
        })
    }

	/**
     * 前端模糊搜索
     */
    filterData() {
        let { searchValue, originalTableData } = this.state;
        let _originalTableData = this.deepClone(originalTableData);

        let _tableData = _originalTableData.filter((item)=>{
            return (
                (item.manager.indexOf(searchValue) > -1) ||
                (item.name.indexOf(searchValue) > -1) ||
                (item.amount.indexOf(searchValue) > -1)
            )
        });

        this.setState({
            sorted: [-1, -1],
            tableData: _tableData
        })
    }


    render() {
        let { tableData, sorted } = this.state;
        let tableWidth = document.body.clientWidth * 1.8;

        return <div className="">

            <div className="htf_searchBar_style2" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                <SearchBar
                    value={ this.state.searchValue }
                    placeholder="客户经理/客户名称/申购金额"
                    onChange={ this.onSearch }
                    onClear={() => { this.setState({searchValue: '', tableData: this.state.originalTableData})} }
                    onCancel={() => { this.setState({searchValue: '', tableData: this.state.originalTableData})} }
                    onSubmit={ () => this.filterData() }
                />
            </div>

            <div style={{height: '.5rem'}}></div>

            <div className='qunatityTable kehumanagerdetail'>
                <WhiteSpace size='lg' />

                <div style={{ position: 'relative' }}>
                    <div style={{overflowX: 'scroll'}}>

                        <div style={{position: 'absolute', top: '0', left: '0', backgroundColor: '#FFF', width: '101px', overflow: 'hidden'}}>
                            <table className="cust_table" style={{width: tableWidth}} >
                                <thead>
                                <tr>
                                    <th style={{width: '100px'}}>
                                        客户经理
                                    </th>
                                    <th>
                                        客户名称
                                    </th>
                                    <th>
                                        产品名称
                                    </th>
                                    <th>
                                        交易类型
                                    </th>
                                    <th className={sorted[0] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(0)}>
                                        <div className="ta_r" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            {this.props.location.query.selectType === '1' ? '申购金额(万元)' : '赎回份额(万份)'}
                                            {
                                                sorted[0] === -1? <img style={{height:'14px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[0] === 0 ?<img style={{height:'14px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'14px'}} src={require('../../resources/images/default_down.png')} alt=""/>)
                                            }
                                        </div>

                                    </th>
                                    <th className={sorted[1] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(1)}>
                                        <div className="ta_r" style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
                                            交易时间
                                            {
                                                sorted[1] === -1? <img style={{height:'14px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[1] === 0 ?<img style={{height:'14px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'14px'}} src={require('../../resources/images/default_down.png')} alt=""/>)
                                            }
                                        </div>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    tableData.map((item, index)=>{
                                        return (
                                            <tr key={ index }>
                                                <td>
                                                    { item.manager }
                                                </td>
                                                <td>
                                                    { item.name }
                                                </td>
                                                <td>
                                                    { item.pname }
                                                </td>
                                                <td>
                                                    { item.type }
                                                </td>
                                                <td>
                                                    { item.amount }
                                                </td>
                                                <td>
                                                    { item.DataDt }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                </tbody>
                            </table>
                        </div>

                        <table className="cust_table" style={{width: '180%'}}>
                            <thead>
                            <tr>
                                <th  style={{width: '100px'}}>
                                    客户经理
                                </th>
                                <th>
                                    客户名称
                                </th>
                                <th>
                                    产品名称
                                </th>
                                <th>
                                    交易类型
                                </th>
                                <th className={sorted[0] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(0)}>
                                    <div className="ta_r" style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
                                        {this.props.location.query.selectType === '1' ? '申购金额(万元)' : '赎回份额(万份)'}
                                        {
                                            sorted[0] === -1? <img style={{height:'14px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[0] === 0 ?<img style={{height:'14px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'14px'}} src={require('../../resources/images/default_down.png')} alt=""/>)
                                        }
                                    </div>

                                </th>
                                <th className={sorted[1] !== -1 ? "ui_color" : ''} onClick={() => this.handleSort(1)}>
                                    <div className="ta_r" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                        交易时间
                                        {
                                            sorted[1] === -1? <img style={{height:'14px'}} src={require('../../resources/images/default_sort.png')} alt=""/>:(sorted[1] === 0 ?<img style={{height:'14px'}} src={require('../../resources/images/default_up.png')} alt=""/>:<img style={{height:'14px'}} src={require('../../resources/images/default_down.png')} alt=""/>)
                                        }
                                    </div>

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tableData.map((item, index)=>{
                                    return (
                                        <tr key={ index }>
                                            <td>
                                                { item.manager }
                                            </td>
                                            <td>
                                                <div className="ui_color" onClick={()=>{
                                                    this.context.router.push({
                                                        pathname: '/View360',
                                                        query: {
                                                            id: item.accountid,
                                                            name: item.name,
                                                            userType: item.userType
                                                        }
                                                    })
                                                }}>
                                                    { item.name }
                                                </div>

                                            </td>
                                            <td>
                                                { item.pname }
                                            </td>
                                            <td>
                                                { item.type }
                                            </td>
                                            <td>
                                                { item.amount }
                                            </td>
                                            <td>
                                                { item.DataDt }
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    }
}

export default ECommerceDetail;



