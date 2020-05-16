import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class JJListDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {},
        }
    }

    componentDidMount() {
        this.changeTilte("基金产品详情");
        this.getFundDetail();
    }

    getFundDetail() {
        this.request({
            api: 'GetFundDetail',
            params: {
                id: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }

    render() {
        let { detailData } = this.state;

        return <div className="N_customer_List_detail">
            <WhiteSpace size="lg" className="bg_f6" />

            <div className="info_style_a">
                <WhiteSpace size="lg"/>
                <WingBlank>
                    <div className="color48 fs_16 mb_5" style={{width:'70%',lineHeight:'0.24rem'}}>
                        { detailData.name || '---' }
                    </div>
                    { detailData.new_raisetype &&<div className='fs_12 mb_10 colorF mr_10' style={{padding: '5px 10px', backgroundColor: '#fa7375', display: 'inline-block', borderRadius: '4px'}}>
                        { detailData.new_raisetype }
                    </div> }
                    { detailData.new_fundstatus  && <div className='fs_12 mb_10 colorF' style={{padding: '5px 10px', backgroundColor: '#fa7375', display: 'inline-block', borderRadius: '4px'}}>
                        { detailData.new_fundstatus }
                    </div>}
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                <WingBlank>
                    <div className="mb_15">
                        <span className="iconfont icon-sjibenxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
                        <span className="fs_16 color_ui">基本信息</span>
                    </div>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">产品经理</div>
                            <div className="color333 fs_14">{ detailData.new_productmanager || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">客户经理</div>
                            <div className="color333 fs_14">{ detailData.new_accountsmanager || '---' }</div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">预计规模</div>
                            <div className="color333 fs_14">{ detailData.new_pexpectipoamt || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">运作方式</div>
                            <div className="color333 fs_14">{ detailData.new_operateway || '---' }</div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">基金性质</div>
                            <div className="color333 fs_14">{ detailData.new_property || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">是否分级</div>
                            <div className="color333 fs_14">{ detailData.new_isstruct || '---' }</div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">产品状态</div>
                            <div className="color333 fs_14">{ detailData.new_productstatus || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">开放频率</div>
                            <div className="color333 fs_14">{  }</div>
                        </Flex.Item>
                    </Flex>
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">托管行</div>
                        <div className="color333 fs_14" style={{wordWrap:'break-word'}}>{  }</div>
                    </div>
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                <WingBlank>
                    <div className="mb_15">
                        <span className="iconfont icon-jjyunzuoqingkuang color_ui_linear" style={{marginRight: '.12rem'}}></span>
                        <span className="fs_16 color_ui">运作情况</span>
                    </div>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">产品阶段</div>
                            <div className="color333 fs_14">{ detailData.new_phase || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">最新净值</div>
                            <div className="color333 fs_14">{ detailData.new_lastnetvalue2 || '---' }</div>
                        </Flex.Item>
                    </Flex>
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">资产规模</div>
                        <div className="color333 fs_14" style={{wordWrap:'break-word'}}>
                            { detailData.new_lastasset || '---' }
                        </div>
                    </div>
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">续约情况</div>
                        <div className="color333 fs_14" style={{wordWrap:'break-word'}}>
                            {  detailData.new_renewdate || '---'}
                        </div>
                    </div>
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                <WingBlank>
                    <div className="mb_15">
                        <span className="iconfont icon-jjhetongqingkuang color_ui_linear" style={{marginRight: '.12rem'}}></span>
                        <span className="fs_16 color_ui">合同情况</span>
                    </div>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">运作开始日期</div>
                            <div className="color333 fs_14">{ detailData.new_setupdate || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">运作截止日期</div>
                            <div className="color333 fs_14">{ detailData.new_durenddate || '---' }</div>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                {
                    /**


                     <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                     <WingBlank>
                     <div className="mb_15">
                     <span className="iconfont icon-jjhetongqingkuang color_ui_linear" style={{marginRight: '.12rem'}}></span>
                     <span className="fs_16 color_ui">产品净值曲线</span>
                     </div>

                     <div>缺少接口</div>
                     </WingBlank>


                     **/
                }
                
            </div>

            <WhiteSpace size="lg"/>
        </div>
    }
}

export default JJListDetail;

// <div className="info_style_a">
//     <WhiteSpace size="lg"/>
//     <Flex  className="mb_15">
//         <div
//             style={{
//                             color: '#fff',
//                             padding: '.05rem .15rem .05rem .2rem',
//                             borderRadius: '0rem 0.13rem 0.13rem 0',
//                             lineHeight: 1,
//                             fontSize: '.16rem'
//
//                         }}
//             className="bg_ui"
//         >
//             {detailData.new_raisetype||'-----'}
//         </div>
//
//     </Flex>
//     <div className="ml_15 mb_20">
//         <div className='fs_16 color000 mb_5'>
//             {detailData.name||'-----'}
//         </div>
//         <div className='fs_10 color666'>
//             {detailData.new_fundcode||'----'}
//         </div>
//     </div>
//
//     {/*基本信息*/}
//     <WingBlank>
//         <div className="mb_15">
//             <span className="iconfont icon-sjibenxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
//             <span className="fs_16 color_ui">基本信息</span>
//         </div>
//         {
//             (detailData.new_custname !== null) &&
//             <div className="mb_15">
//                 <div className="color999 fs_10 mb_5">客户名称</div>
//                 <div className="color000 fs_16">{ detailData.new_custname || '---' }</div>
//             </div>
//         }
//
//
//         <Flex className="mb_15" align='start'>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">产品经理</div>
//                     <div className="color000 fs_16">{ detailData.new_productmanager || '---' }</div>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">客户经理</div>
//                     <div className="color000 fs_16">{ detailData.new_accountsmanager|| '---' }</div>
//                 </div>
//             </Flex.Item>
//         </Flex>
//         <Flex className="mb_15" align='start'>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">预计规模</div>
//                     <div className="color000 fs_16">{  detailData.new_pexpectipoamt||'---' }</div>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">运作方式</div>
//                     <div className="color000 fs_16">{ detailData.new_operateway||'---' }</div>
//                 </div>
//             </Flex.Item>
//         </Flex>
//         <Flex className="mb_15" align='start'>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">基金性质</div>
//                     <div className="color000 fs_16">{ detailData.new_property || '---' }</div>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">基金状态</div>
//                     <div className="color000 fs_16">{ detailData.new_fundstatus || '---' }</div>
//                 </div>
//             </Flex.Item>
//         </Flex>
//         <Flex className="mb_15" align='start'>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">分红频率</div>
//                     <div className="color000 fs_16">{ detailData.new_sharerate || '---' }</div>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">是否分级</div>
//                     <div className="color000 fs_16">{ detailData.new_isstruct || '---' }</div>
//                 </div>
//             </Flex.Item>
//         </Flex>
//         <Flex className="mb_15" align='start'>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">产品状态</div>
//                     <div className="color000 fs_16">{ detailData.new_productstatus || '---' }</div>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">净值精度</div>
//                     <div className="color000 fs_16">{ detailData.new_netprecision|| '---' }</div>
//                 </div>
//             </Flex.Item>
//         </Flex>
//         <div className="mb_15">
//             <div className="color999 fs_10 mb_5">托管行</div>
//             <div className="color000 fs_16">{ detailData.new_smatrusteecode || '---' }</div>
//         </div>
//     </WingBlank>
// </div>
//
//
// <WhiteSpace size="lg" className="bg_f6" style={{height:'0.1rem'}}/>
//
// {/*运作情况*/}
// <div className="info_style_a">
//     <WhiteSpace size="lg"/>
//     <WingBlank>
//         <div className="mb_15">
//             <span className="iconfont icon-jjyunzuoqingkuang color_ui_linear" style={{marginRight: '.12rem'}}></span>
//             <span className="fs_16 color_ui">运作情况</span>
//         </div>
//         <Flex className="mb_15" align='start'>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">产品阶段</div>
//                     <div className="color000 fs_16">{ detailData.new_phase||'----'}</div>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div>
//                     <div className="color999 fs_10 mb_5">最新净值</div>
//                     <div className="color000 fs_16">{ detailData.new_lastnetvalue2 || '---' }</div>
//                 </div>
//             </Flex.Item>
//         </Flex>
//         <div className="mb_15">
//             <div className="color999 fs_10 mb_5">资产规模</div>
//             <div className="color000 fs_16">{ detailData.new_lastasset || '---' }</div>
//         </div>
//         <div className="mb_15">
//             <div className="color999 fs_10 mb_5">续约情况</div>
//             <div className="color000 fs_16">{ detailData.new_renewdate || '---' }</div>
//         </div>
//     </WingBlank>
// </div>
//
// <WhiteSpace size="lg" className="bg_f6" style={{height:'0.1rem'}}/>
// <div className="info_style_a">
//     <WhiteSpace size="lg"/>
//     <WingBlank>
//     <div className="mb_15">
//     <span className="iconfont icon-jjhetongqingkuang color_ui_linear" style={{marginRight: '.12rem'}}></span>
// <span className="fs_16 color_ui">合同情况</span>
//     </div>
//     <Flex className="mb_15" align='start'>
//     <Flex.Item>
//     <div>
//     <div className="color999 fs_10 mb_5">运作开始日期</div>
//     <div className="color000 fs_16">{ detailData.new_setupdate || '---' }</div>
// </div>
// </Flex.Item>
// <Flex.Item>
//     <div>
//         <div className="color999 fs_10 mb_5">运作截止日期</div>
//         <div className="color000 fs_16">{ detailData.new_durenddate || '---' }</div>
//     </div>
// </Flex.Item>
// </Flex>
// </WingBlank>
// </div>


// <div className="dashed_style" style={{margin:'.2rem .15rem'}}></div>
//
// <div className="info_style_a">
// 	<WingBlank>
// 	<div className="mb_15">
// 	<span className="fs_16 color000">订阅信息</span>
// 	</div>
// 	<Grid
// data={subData}
// renderItem={dataItem => (
// 	<Checkbox>
// 		{ dataItem.text }
// 	</Checkbox>
// )}
// columnNum={3}
// hasLine={false}
// square={false}
// activeStyle={false}
// className="checkbox_list"
// 	/>
// 	</WingBlank>
// 	</div>