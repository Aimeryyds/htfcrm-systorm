import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class BaseInfo extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showMore: false
        }
    }

    componentDidMount() {

    }

    //tabs切换
    tabsChange(tab, index) {

    }

    render() {

        let { showMore } = this.state;
        let detailData = this.props.detailData;

        return <div className="N_businessProject">

            <WhiteSpace size="lg" className="bg_f6"/>

            <div style={{borderBottom: '1px solid #eee', padding: '0 .15rem'}}>
                <WhiteSpace size="lg"/>
                <Flex justify="between" align="start">
                    <Flex.Item style={{flex: 7}}>
                        <div className="fs_16 color333 mb_10">
                            { detailData.BUSINESSNAME || '---' }
                        </div>
                        <div className="color999 fs_12">
                            项目类型:{ detailData.OPPORTUNITYTYPE || '---' }
                        </div>
                    </Flex.Item>
                    <Flex.Item style={{flex: 3}}>
                        <div className="fs_14" style={{textAlign: 'right', color: '#fa7375'}}>
                            { detailData.PROGRAMSTATE || '---' }
                        </div>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
            </div>

            {
                detailData.customer &&
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <div className="mb_15">
                        <span className="iconfont icon-jqitaxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
                        <span className="fs_16 color_ui">主要信息</span>
                    </div>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">客户名称</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14"
                                 onClick={ ()=>{ this.context.router.push({pathname: '/LinkManDetail', query: { id: item.ID }}) } }
                                 style={{color: '#0366d6', fontWeight: '700' }}
                            >
                                { detailData.customer.ID || '---' }
                            </div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">项目级别</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.customer.TINGCODE || '---' }</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">项目来源</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.customer.NEWSOURCE || '---' }</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">客户星级</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.STARLEVEL || '---' }</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">项目完成度</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.FINISHRATE || '---' }</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">是否需领导介入</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.DOYOUNEEDIT || '---' }</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">项目最新进展</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.MAKEPROGRESS || '---' }</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className="mb_15">
                        <Flex.Item style={{flex: '4'}} className="ta_r">
                            <div className="color999 fs_14 mr_20">项目中的困难</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: '7'}}>
                            <div className="color000 fs_14">{ detailData.DIFFICULTY || '---' }</div>
                        </Flex.Item>
                    </Flex>

                </WingBlank>
            }


            {
                (detailData.contactinfo && (detailData.contactinfo.length > 0) && showMore) &&
                <div>
                    <WhiteSpace size="lg" className="bg_f6"/>
                            <WingBlank size="lg">

                                <WhiteSpace size="lg"/>
                                <div className="mb_15">
                                    <span className="iconfont icon-klianxiren color_ui_linear" style={{marginRight: '.12rem'}}></span>
                                    <span className="fs_16 color_ui">联系人信息</span>
                                </div>
                    {
                        detailData.contactinfo.map((item, index)=>{
                            return <div  key={index}>
                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">姓名</div>
                                    </Flex.Item>
                                    <Flex.Item
                                        style={{flex: '7'}}
                                        onClick={()=>{
                                        this.context.router.push({
                                                pathname: '/LinkManDetail',
                                                query: {
                                                    id: item.ID
                                                }
                                            })
                                        }}
                                    >
                                        <div
                                            className="color000 fs_14"
                                            style={{color: '#0366d6', fontWeight: '700' }}
                                        >
                                            { item.FULLNAME || '---' }
                                        </div>
                                    </Flex.Item>
                                </Flex>

                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">性别</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14">{ item.SEX || '---' }</div>
                                    </Flex.Item>
                                </Flex>

                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">手机号码</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14">{ item.MOBILE || '---' }</div>
                                    </Flex.Item>
                                </Flex>

                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">办公电话</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14">{ item.OFFICAL || '---' }</div>
                                    </Flex.Item>
                                </Flex>

                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">办公邮箱</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14">{ item.EMAIL || '---' }</div>
                                    </Flex.Item>
                                </Flex>

                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">创建时间</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14">{ item.CREATEDDATE || '---' }</div>
                                    </Flex.Item>
                                </Flex>

                                <Flex className="mb_15">
                                    <Flex.Item style={{flex: '4'}} className="ta_r">
                                        <div className="color999 fs_14 mr_20">个人爱好</div>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: '7'}}>
                                        <div className="color000 fs_14">{ item.HOBBY || '---' }</div>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="lg"/>
                            </div>
                        })
                    }
                    </WingBlank>



                </div>
            }

            {
                (detailData.contactinfo && (detailData.contactinfo.length > 0)) &&
                <div
                    className='fs_14 color999 mt_10 mb_30'
                    style={{textAlign:'center'}}
                    onClick={()=>{this.setState({showMore:!showMore})}}
                >
                    {showMore ? '收起' : '更多'}
                    <span className={["iconfont", showMore ? "icon-shanglashouqi" : "icon-xialagengduo", "color_ui_linear", "fs_12", "ml_5"].join(' ')} style={{marginRight: '.12rem'}}></span>
                </div>
            }


            <WhiteSpace size="lg"/>

        </div>
    }
}

export default BaseInfo;

// {
//     (detailData.INCOMEFORECASTS > 0 && showMore) &&
//     <WingBlank size="lg">
//         <WhiteSpace size="lg" className="bg_f6"/>
//         <WhiteSpace size="lg"/>
//         <div className="mb_15">
//             <span className="iconfont icon-shangjishouruyuce color_ui_linear" style={{marginRight: '.12rem'}}></span>
//             <span className="fs_16 color_ui">项目收入预测</span>
//             <span className="ml_15 fs_12" style={{color: '#fa7375'}}>(合计¥{detailData.TOTALINCOMEFORECAST || '--'})</span>
//         </div>
//
//         {detailData.INCOMEFORECASTS.map((item, index)=>{
//             return <div className="mb_15" key={index}>
//                 <Flex className="mb_15">
//                     <Flex.Item style={{flex: '4'}} className="ta_r">
//                         <div className="color999 fs_14 mr_20">产品分类</div>
//                     </Flex.Item>
//                     <Flex.Item style={{flex: '7'}}>
//                         <div className="color000 fs_14">{ item.CATEGORY || '---' }</div>
//                     </Flex.Item>
//                 </Flex>
//
//                 <Flex className="mb_15">
//                     <Flex.Item style={{flex: '4'}} className="ta_r">
//                         <div className="color999 fs_14 mr_20">产品类型</div>
//                     </Flex.Item>
//                     <Flex.Item style={{flex: '7'}}>
//                         <div className="color000 fs_14 mb_5">{ item.TYPE || '---' }</div>
//                     </Flex.Item>
//                 </Flex>
//
//                 <Flex className="mb_15">
//                     <Flex.Item style={{flex: '4'}} className="ta_r">
//                         <div className="color999 fs_14 mr_20">预计收入</div>
//                     </Flex.Item>
//                     <Flex.Item style={{flex: '7'}}>
//                         <div className="color000 fs_14 mb_5">{ item.ESTIMATE || '---' }</div>
//                     </Flex.Item>
//                 </Flex>
//
//                 <Flex className="mb_15">
//                     <Flex.Item style={{flex: '4'}} className="ta_r">
//                         <div className="color999 fs_14 mr_20">创建时间</div>
//                     </Flex.Item>
//                     <Flex.Item style={{flex: '7'}}>
//                         <div className="color000 fs_14 mb_5">{ item.ODATE || '---' }</div>
//                     </Flex.Item>
//                 </Flex>
//             </div>
//         })}
//     </WingBlank>
// }