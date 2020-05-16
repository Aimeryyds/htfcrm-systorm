import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Text, ListView, SearchBar } from 'antd-mobile';

class CustomeGroupSearch extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchVal: "",
            listData:[],
            oListData: [],
            height: document.documentElement.clientHeight,
        }
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei
        });
        this.changeTilte("客户搜索");
        this.getCustInfo();
    }

    /**
     * 获取客户信息
     * 前端搜索
     * @returns {*}
     */
    getCustInfo() {
        let { id } = this.props.location.query;
        let _params = {
            custGroupId: id
        };
        this.request({
            api: 'GetCustInfo',
            params: _params
        }, (res)=>{
            this.setState({
                listData: res.data,
                oListData: res.data
            },()=>{
                this.handleData()
            })


        })
    }

    handleData() {
        let { searchVal, listData, oListData } = this.state;
        let _listData = oListData.filter((item)=> item.name.indexOf(searchVal) > -1);
        this.setState({
            listData: _listData,
        })
    }

    formatName(name) {
        let { searchVal } = this.state;
        let _arr = name.split("");
        _arr.map((item, index)=>{
            if(searchVal.indexOf(item) > -1) {
                _arr[index] = <Text key={index} className="color_ui">{item}</Text>
            }
        });
        return _arr
    }

    jump(custno) {
        let { id } = this.props.location.query;
        this.context.router.push({
            pathname: '/CustomeGroupSearchDetail',
            query: {
                custno,
                id
            }
        })
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div style={{padding: '.15rem',borderBottom: '1px solid #f5f5f5'}} onClick={() => this.jump(rowData.custno)}>
                <div className="fs_14 color333">
                    { this.formatName(rowData.name) }({ rowData.custno })
                </div>
            </div>
        )
    }

    render() {
        let { searchVal, listData, height } = this.state;

        return <div>
            <div className="htf_searchBar_style3" style={{position: 'fixed', top: '0', left: '0', right: '0',zIndex:'999'}}>
                <SearchBar
                    value={ searchVal }
                    placeholder="客户名称"
                    onChange={ (val)=>this.setState({searchVal: val}, ()=>this.handleData()) }
                    onClear={() => { this.setState({searchVal: ''}, ()=>this.handleData())} }
                    onCancel={() => { this.setState({searchVal: ''}, ()=>this.handleData())} }
                    onSubmit={ () => this.handleData() }
                />
            </div>

            <div style={{height: '50px'}}></div>
            <WhiteSpace style={{height: '10px'}} className="bg_f6"/>

            {
                (listData.length == 0) ?
                    <div ref={el => this.lv = el} style={{ textAlign: 'center', padding: '2rem 0' }}>没有相关数据</div> :
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(listData)}
                        renderRow={this.renderRow}
                        scrollRenderAheadDistance={500}
                        style={{
                            height: height,
                            overflow: 'auto'
                        }}
                    />
            }

        </div>
    }
}

export default CustomeGroupSearch;