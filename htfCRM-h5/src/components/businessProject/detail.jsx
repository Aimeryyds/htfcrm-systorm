import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { Tabs } from 'antd-mobile';

import BaseInfo from './baseInfoComponent'
import StepsComponent from './stepComponent'

class BusinessProjectDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [
                {title: '基本信息'},
                {title: '所处阶段'},
            ],
            OPSTAGE: 0,
            initialPage: 0,
            stepsList: [],
            detailData: {}
        }
    }

    componentDidMount() {
        this.changeTilte("项目详情");
        this.StageDetailList();
        this.OpportunityDetailList();
    }

    //获取所处阶段
    StageDetailList() {
        this.request({
            api: 'StageDetailList',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=>{
            this.setState({
                stepsList: res.data.Entities,
                OPSTAGE: res.data.OPSTAGE
            })
        })
    }

    //获取项目详情-基本信息
    OpportunityDetailList() {
        this.request({
            api: 'OpportunityDetailList',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=>{
            this.setState({
                detailData: res.data
            })
        })
    }

    //tabs切换
    tabsChange(tab, index) {
        this.setState({
            initialPage: index
        })
    }

    render() {
        let { tabs, initialPage, stepsList, OPSTAGE, detailData } = this.state;

        return <div className="N_businessProject">

            <Tabs
                tabs={tabs}
                initialPage={initialPage}
                onChange={(tab, index) => this.tabsChange(tab, index) }
            ></Tabs>

            {
                initialPage === 0 &&
                <BaseInfo detailData={detailData}/>
            }

            {
                initialPage === 1 &&
                <StepsComponent stepsList={stepsList} currentSteps={OPSTAGE} />
            }



        </div>
    }
}

export default BusinessProjectDetail;