//老版本联系人详情
import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import Moment from 'moment'

import { WingBlank, WhiteSpace, Flex, Button } from 'antd-mobile';

class LinkManDetail extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {},
            showMore:false,
        }
    }

    componentDidMount() {
        this.changeTilte("联系人详情");
        this.getLeadDetail();
    }

    getLeadDetail() {
        this.request({
            api: 'GetContactdetail',
            params: {
                contactid: this.props.location.query.id
            }
        }, (res)=> {
            this.setState({
                detailData: res.data
            })
        })
    }

    render() {
        let { detailData, showMore } = this.state;

        return <div className="N_customer_List_detail">
            <WhiteSpace size="lg" className="bg_f5"/>

            <div className="info_style_a">
                <WhiteSpace size="lg"/>

                <Flex justify="between" className="mb_25">
                    <div className="ml_15">
						<span className="fs_18 color000 mr_10">
							{ detailData.name }
						</span>
                        <span className="fs_12 color999">({ detailData.sex })</span>
                    </div>
                    <div
                        style={{
                            color: '#fff',
                            padding: '.05rem .15rem .05rem .2rem',
                            borderRadius: '.13rem 0 0 .13rem',
                            lineHeight: 1,
                            fontSize: '.16rem'

                        }}
                        className="bg_ui"
                    >
                        { detailData.jobtitle || '---' }
                    </div>
                </Flex>

                {
                    detailData.Base &&
                    <WingBlank>
                        <div className="mb_15">
                            <span className="iconfont icon-sjibenxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
                            <span className="fs_16 color_ui">基础信息</span>
                        </div>
                        <Flex className="mb_15" align="start">
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">出生日期</div>
                                    <div className="color000 fs_16">{ detailData.Base.birth || '---' }</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">行业</div>
                                    <div className="color000 fs_16">{ detailData.Base.industry || '---' }</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align="start">
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">学历</div>
                                    <div className="color000 fs_16">{ detailData.Base.education || '---' }</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">重要性</div>
                                    <div className="color000 fs_16">{ detailData.Base.important || '---' }</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align="start">
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">服务级别</div>
                                    <div className="color000 fs_16">{ detailData.Base.srv_level || '---' }</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">直属上司</div>
                                    <div className="color000 fs_16">{ detailData.Base.imd_supervisor || '---' }</div>
                                </div>
                            </Flex.Item>
                        </Flex>

                        <Flex className="mb_15" align="start">
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">负责人</div>
                                    <div className="color000 fs_16">{ detailData.Base.responsible_person || '---' }</div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">生日提醒日期</div>
                                    <div className="color000 fs_16">{ detailData.Base.birthday_remind || '---' }</div>
                                </div>
                            </Flex.Item>
                        </Flex>

                        <div className="mb_15">
                            <div className="color999 fs_12 mb_5">公司名称</div>
                            <div className="color000 fs_16">{ detailData.Base.company || '---' }</div>
                        </div>

                        <div className="mb_15">
                            <div className="color999 fs_12 mb_5">备注</div>
                            <div className="color000 fs_16">{detailData.depth.remark || '---'}</div>
                        </div>
                    </WingBlank>
                }
                <WhiteSpace size="lg"/>
            </div>

            {
                detailData.contact &&
                <div className="info_style_a">
                    <WhiteSpace size="lg" className="bg_f6"/>
                    <WhiteSpace size="lg"/>
                    <WingBlank>
                        <div className="mb_15">
                            <span className="iconfont icon-slianxixinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
                            <span className="fs_16 color_ui">联系信息</span>
                        </div>
                        <Flex className="mb_15" align="start">
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">手机号码</div>
                                    <div className="color000 fs_16">
                                        { detailData.contact.mobile ? this.formatPhone(detailData.contact.mobile) : '---' }
                                    </div>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>
                                    <div className="color999 fs_12 mb_5">办公电话</div>
                                    <div className="color000 fs_16">{ detailData.contact.phone || '---' }</div>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <div className="mb_15">
                            <div className="color999 fs_12 mb_5">电子邮件</div>
                            <div className="color000 fs_16">{ detailData.contact.email || '---' }</div>
                        </div>
                        <div className="mb_15">
                            <div className="color999 fs_12 mb_5">公司网址</div>
                            <div className="color000 fs_16">{ detailData.contact.website || '---' }</div>
                        </div>
                        <div className="mb_15">
                            <div className="color999 fs_12 mb_5">公司地址</div>
                            <div className="color000 fs_16">{ detailData.contact.address || '---' }</div>
                        </div>
                    </WingBlank>
                </div>
            }

            {
                showMore &&
                <div>
                    {
                        detailData.depth &&
                        <div className="info_style_a">
                            <WhiteSpace size="lg" className="bg_f6"/>
                            <WhiteSpace size="lg"/>
                            <WingBlank>
                                <div className="mb_15">
                                <span className="iconfont icon-shenduxinxi color_ui_linear"
                                      style={{marginRight: '.12rem'}}>
                                </span>
                                    <span className="fs_16 color_ui">深度信息</span>
                                </div>
                                <Flex className="mb_15" align="start">
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">证件类型</div>
                                            <div className="color000 fs_16">
                                                {detailData.depth.identitytype || '---'}
                                            </div>
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">证件号码</div>
                                            <div className="color000 fs_16">{detailData.depth.identityno || '---'}</div>
                                        </div>
                                    </Flex.Item>
                                </Flex>
                                <Flex className="mb_15" align="start">
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">拒绝短信</div>
                                            <div className="color000 fs_16">{detailData.depth.refuse_sms || '---'}</div>
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">拒绝邮件</div>
                                            <div className="color000 fs_16">{detailData.depth.refuse_email || '---'}</div>
                                        </div>
                                    </Flex.Item>
                                </Flex>
                                <div className="mb_15">
                                    <div className="color999 fs_12 mb_5">个人爱好</div>
                                    <div className="color000 fs_16">{detailData.depth.hobby || '---'}</div>
                                </div>

                            </WingBlank>
                        </div>
                    }

                    {
                        (detailData.rels && detailData.rels.length > 0 ) &&
                        <div className="info_style_a">
                            <WhiteSpace size="lg" className="bg_f6"/>
                            <WhiteSpace size="lg"/>
                            <WingBlank>
                                <div className="mb_15">
                                <span className="iconfont icon-guanxirenxin color_ui_linear"
                                      style={{marginRight: '.12rem'}}
                                >
                                </span>
                                    <span className="fs_16 color_ui">关系人信息</span>
                                </div>
                                <div className="mb_15">
                                    <div className="color000 fs_16 mb_5">
                                        {detailData.rels[0].name}（{detailData.rels[0].rel || '---'}）
                                    </div>
                                </div>
                                <Flex className="mb_15" align="start">
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">手机号码</div>
                                            <div className="color000 fs_16">
                                                {detailData.rels[0].mobile || '---'}
                                            </div>
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">办公电话</div>
                                            <div className="color000 fs_16">
                                                {detailData.rels[0].phone || '---'}
                                            </div>
                                        </div>
                                    </Flex.Item>
                                </Flex>
                                <Flex className="mb_15" align="start">
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">电子邮箱</div>
                                            <div className="color000 fs_16">
                                                {detailData.rels[0].email || '---'}
                                            </div>
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <div>
                                            <div className="color999 fs_12 mb_5">生日</div>
                                            <div className="color000 fs_16">
                                                {detailData.rels[0].birth || '---'}
                                            </div>
                                        </div>
                                    </Flex.Item>
                                </Flex>
                                <div className="mb_15">
                                    <div className="color999 fs_12 mb_5">个人爱好</div>
                                    <div className="color000 fs_16">
                                        {detailData.rels[0].hobby || '---'}
                                    </div>
                                </div>
                            </WingBlank>
                            {
                                detailData.rels.map((item, index) => {
                                    if (index > 0) {
                                        return <WingBlank key={index}>
                                            <div className="mb_15">
                                                <div className="color000 fs_16 mb_5 mt_30">
                                                    {item.name}（{item.rel || '---'}）
                                                </div>
                                            </div>
                                            <Flex className="mb_15" align="start">
                                                <Flex.Item>
                                                    <div>
                                                        <div className="color999 fs_12 mb_5">手机号码</div>
                                                        <div className="color000 fs_16">
                                                            {item.mobile || '---'}
                                                        </div>
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div>
                                                        <div className="color999 fs_12 mb_5">办公电话</div>
                                                        <div className="color000 fs_16">
                                                            {item.phone || '---'}
                                                        </div>
                                                    </div>
                                                </Flex.Item>
                                            </Flex>
                                            <Flex className="mb_15" align="start">
                                                <Flex.Item>
                                                    <div>
                                                        <div className="color999 fs_12 mb_5">电子邮箱</div>
                                                        <div className="color000 fs_16">
                                                            {item.email || '---'}
                                                        </div>
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div>
                                                        <div className="color999 fs_12 mb_5">生日</div>
                                                        <div className="color000 fs_16">
                                                            {item.birth || '---'}
                                                        </div>
                                                    </div>
                                                </Flex.Item>
                                            </Flex>
                                            <div className="mb_15">
                                                <div className="color999 fs_12 mb_5">个人爱好</div>
                                                <div className="color000 fs_16">
                                                    {item.hobby || '---'}
                                                </div>
                                            </div>
                                        </WingBlank>
                                    }

                                })
                            }
                        </div>
                    }
                </div>
            }


            <div
                className='fs_14 color999 mt_10 mb_60'
                style={{textAlign:'center'}}
                onClick={()=>{this.setState({showMore:!showMore})}}
            >
                {showMore ? '收起' : '更多'}
                <span className={["iconfont", showMore ? "icon-shanglashouqi" : "icon-xialagengduo", "color_ui_linear", "fs_12", "ml_5"].join(' ')} style={{marginRight: '.12rem'}}></span>
            </div>
            <Button className="editButton" onClick={()=>{this.context.router.push({
                pathname: '/EditLinkMan',
                query:this.props.location.query
            })}}></Button>
        </div>
    }
}

export default LinkManDetail;


// <Flex className="mb_15" align="start">
//     <Flex.Item>
//         <div>
//             <div className="color999 fs_12 mb_5">主要联系人</div>
//             <div className="color000 fs_16">{ detailData.Base.main_contact || '---' }</div>
//         </div>
//     </Flex.Item>
//     <Flex.Item>
//         <div>
//             <div className="color999 fs_12 mb_5">负责人</div>
//             <div className="color000 fs_16">{ detailData.Base.responsible_person || '---' }</div>
//         </div>
//     </Flex.Item>
// </Flex>

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