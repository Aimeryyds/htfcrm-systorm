import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import PageA from './page_a'
import PageB from './page_b'
import PageC from './page_c'
import PageD from './page_d'
import PageE from './page_e'
import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar, Tabs } from 'antd-mobile';

let tabMap = ['a', 'b', 'c','e']

class View360 extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentTab: tabMap[window.localStorage.view360Tab || 0],
            initialPage: Number(window.localStorage.view360Tab) || 0
        }
    }

    componentDidMount() {
        let titleName = "360视图("+this.props.location.query.name+")"
        this.changeTilte(titleName);
        // this.GetView360CustomerProduct();
    }

    handleTabsChange(tab, index) {
        this.setState({
            currentTab: tab.value
        })
    }

    // GetView360CustomerProduct() {
    //     this.request({
    //         api: 'GetView360CustomerProduct',
    //         params: {
    //             id: this.props.location.query.id
    //         }
    //     }, (res) => {
    //         if(res.data.Type === "2") {
    //             this.setState({
    //                 tabs: [
    //                     {title: '资产分布', value: 'a'},
    //                     {title: '持仓明细', value: 'b'},
    //                     {title: '联系记录', value: 'd'},
    //                 ],
    //             });
    //         }
    //     })
    // }

    render() {
        let { currentTab, initialPage } = this.state;
        let id = this.props.location.query.id;
        let userType = this.props.location.query.userType;
        let tabs = [
            {title: '资产分布', value: 'a'},
            {title: '资产收益', value: 'b'},
            {title: '交易记录', value: 'c'},
            
            // {title: '联系记录', value: 'd'},

        ];
        if(userType == 1){
            tabs.push({title: '客户等级', value: 'e'},);
        }
        return <div className="N_View360">

            <div style={{position: 'fixed', top: '0', left: '0', right: '0', backgroundColor: '#fff', zIndex: 1}}>
                <Tabs tabs={tabs}
                      initialPage={ initialPage }
                      onChange={(tab, index) => this.handleTabsChange(tab, index) }
                >
                </Tabs>
            </div>

            <div style={{height: '43.5px'}}></div>


            {
                (currentTab === 'a') &&
                <PageA id={id}/>
            }

            {
                (currentTab === 'b') &&
                <PageB id={id}/>
            }

            {
                (currentTab === 'c') &&
                <PageC id={id}/>
            }

            {/* {
                (currentTab === 'd') &&
                <PageD id={id}/>
            } */}
            {//等级趋势
                (currentTab === 'e')  && <PageE id={id}/>
            }

        </div>
    }
}

export default View360;