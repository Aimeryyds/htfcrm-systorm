import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'
import $ from 'jquery'
import { WingBlank, WhiteSpace, Tabs } from 'antd-mobile';

class BusinessProject extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listData: [],
            userType: '2',     // 不传/字符串空：所有，1：个人，2：机构，3：三方
            isSanfang: '0',     // 是否三方:0 否 1 是
        }
    }

    componentDidMount() {
        this.changeTilte("项目漏斗");
        let storage=window.localStorage;
        try {
            storage.removeItem('businessListTab');
        } catch (e){
            console.log('IOS10 - localStorage无效')
        }
        this.GetUserInfo();
    }

    componentWillUnmount() {
        $(".mask_div").remove();
    }

	/**
     * 用户信息
     * 优先请求,获取用户类型,然后在请求漏斗数据
     * @constructor
     */
    GetUserInfo() {
        this.request({
            api: 'GetUserInfo'
        }, (res) => {
            this.setState({
                isSanfang:res.data.isSanfang
            }, ()=> {
                this.OpportunityList();
            });
            this.watermark({
                watermark_txt: res.data.name + ' ' +res.data.mobile,
                watermark_rows: 10
            })
        })
    }

	/**
     * 漏斗数据
     * @constructor
     */
    OpportunityList() {
        let params = {};
        let { isSanfang, userType } = this.state;
        if(isSanfang === '1') {
            params.type = userType
        }
        this.request({
            api: 'OpportunityList',
            params: params
        }, (res)=>{
            this.setState({
                listData: res.data.Entities
            }, ()=>{
                this.renderFunnelChart();
            })
        })
    }

	/**
     * 漏斗图
     */
    renderFunnelChart() {
        let { listData, userType } = this.state;
        let myChart1 = echarts.init(document.getElementById('funnelChart1'));
        let ColorArr = ['#FA7375', '#FF9F7F', '#5A96E6','#7BB1F9', '#FF8100', '#FFB900', '#FFD35A'];
        let _data = [];
        listData.map((item, index)=>{
            _data.push({
                value: item.NUM,
                name: item.STAGE,
                id: item.STAGEID,
                itemStyle: {
                    color: ColorArr[index]
                }
            });
        });

        let option1 = {
            title: {
                text: userType == 3 ? '三方项目漏斗': '企业项目漏斗',
                left: 'center'
            },
            toolbox: {
                show: false
            },
            series: [
                {
                    type: 'funnel',
                    left: '8%',
                    width: '70%',
                    maxSize: '80%',
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}',
                            textStyle: {
                                color: '#333'
                            }
                        },
                        emphasis: {
                            position:'inside',
                            formatter: '{b}: {c}%'
                        }
                    },
                    labelLine: {
                        length: 30
                    },
                    itemStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    data: _data
                }
            ]
        };
        myChart1.setOption(option1);

        myChart1.on("click", (param) => {
            this.context.router.push({
                pathname: '/BusinessProjectList',
                query: {
                    STAGE: param.data.name,
                    id: param.data.id,
                    // userType: this.state.userType
                }
            })
        });
    }

    //跳转列表
    toList(STAGE, id) {
        let { userType } = this.state
        this.context.router.push({
            pathname: '/BusinessProjectList',
            query: {
                STAGE,
                id,
                // userType
            }
        })
    }

    tabsChange(tab, index) {
        this.setState({
            userType: tab.value
        }, ()=>{
            this.OpportunityList();
        })
    }

    render() {
        let { listData, userType, isSanfang } = this.state;

        return <div className="">

            {
                isSanfang === '1' &&
                <Tabs
                    tabs={[{title: '企业项目', value: '2'}, {title: '三方项目', value: '3'}]}
                    onChange={(tab, index) => this.tabsChange(tab, index) }
                />
            }

            
            <div id="funnelChart1" style={{height: '300px', marginTop: '.2rem'}}></div>

            <WhiteSpace size="lg" className="bg_f5"/>

            <WingBlank size="lg" className="custom_module_table">
                <WhiteSpace size="lg"/>
                <table width="100%">
                    <thead>
                        <tr>
                            <th>阶段</th>
                            <th>项目个数</th>
                            <th>占比</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        listData.map((item, index)=>{
                            return <tr key={index}>
                                <td>
                                    <div onClick={()=>this.toList(item.STAGE, item.STAGEID)}>{ item.STAGE }</div>
                                </td>
                                <td>{ item.NUM }</td>
                                <td>{ item.RATE }</td>
                            </tr>
                        })
                    }

                    </tbody>
                </table>
                <WhiteSpace size="lg"/>
            </WingBlank>


        </div>
    }
}

export default BusinessProject;