import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import Moment from 'moment'

import { WingBlank, WhiteSpace, Flex, Grid, Checkbox, Button } from 'antd-mobile';

const subMap = {
	"SMS": "短信",
	"apppush":"App Push",
	"mail": "邮件",
	"bill": "账单",
	"post": "邮寄",
	"wechat": "微信"
}

class QKListDetail extends Module {
	constructor(props, context) {
		super(props, context);
		this.state = {
			detailData: {
				EntityA: {},
				EntityB: {},
				EntityC: {},
				EntityD: {},
				EntityE: {}

			},
			type: null,
			showMore: false
		}

	}

	componentDidMount() {
		this.changeTilte("潜客详情");
		this.getLeadDetail();
	}

	getLeadDetail() {
		this.request({
			api: 'LeadDetail',
			params: {
				leadId: this.props.location.query.leadid
			}
		}, (res)=> {
			this.setState({
				detailData: res.data,
				type: res.data.Type,
                types:res.data.Types //客户类型
			})
		})
	}

	render() {

		let { detailData, type, showMore,types } = this.state;
		let newData = [];

		if(type === "1") {
			for(let x in detailData.EntityE) {
				newData.push({
					title: subMap[x],
					value: detailData.EntityE[x]
				})
			}
		}
		if(type === "2") {
			for(let x in detailData.EntityD) {
				newData.push({
					title: subMap[x],
					value: detailData.EntityD[x]
				})
			}
		}

		return <div className="N_customer_List_detail">
			<WhiteSpace size="lg" className="bg_f5"/>

			<div className="info_style_a">
				<WhiteSpace size="lg"/>
				<Flex justify="between" className="mb_25">
					<div className="ml_15">
						<span className="fs_18 color000 mr_10" style={{display:'inline-block', maxWidth: '2.4rem', wordBreak:'break-all'}}>
							{ detailData.EntityA.name }
						</span>
						{
							(detailData.EntityA.sex && type === "1") &&
							<span className="fs_10 color999">({ detailData.EntityA.sex })</span>
						}

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
						{ detailData.EntityA.custno || '---' }
					</div>
				</Flex>

			</div>

			{
				type === "1" &&
				<div>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">基本信息</span>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">生日</div>
									<div className="color000 fs_16">{ detailData.EntityB.birthday || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">行业</div>
									<div className="color000 fs_16">{ detailData.EntityB.industry || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">证件类型</div>
									<div className="color000 fs_16">{ detailData.EntityB.new_o_identitytype || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">证件号码</div>
									<div className="color000 fs_16">{ detailData.EntityB.new_zz_sfzhm || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">客户来源</div>
									<div className="color000 fs_16">{ detailData.EntityB.leadsourcecode || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">潜在资产量</div>
									<div className="color000 fs_16">{ detailData.EntityB.potentialresources || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">共享客户经理</div>
									<div className="color000 fs_16">{ detailData.EntityB.customerManager || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">所属负责人</div>
									<div className="color000 fs_16">{ detailData.EntityB.owner || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">目标产品</div>
							<div className="color000 fs_16">
								<Flex  align="start">
									<Flex.Item>
										<span className="color000 fs_16">
											{ detailData.EntityB.targetproducttype01 || '---' }
										</span>
									</Flex.Item>
									<Flex.Item>
										<span className="color000 fs_16">
											{ detailData.EntityB.targetproducttype02 || '---' }
										</span>
									</Flex.Item>
									<Flex.Item>
										<span className="color000 fs_16">
											{ detailData.EntityB.targetproducttype03 || '---' }
										</span>
									</Flex.Item>
								</Flex>
							</div>
						</div>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}

			{
				type === "1" &&
				<div className="info_style_a">
					<WhiteSpace size="lg" className="bg_f6"/>
					<WhiteSpace size="lg"/>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">联系信息</span>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">手机号码</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.mobilephone ? this.formatPhone(detailData.EntityC.mobilephone) : '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">电话号码</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.telephone1 ? this.formatPhone(detailData.EntityC.telephone1) : '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">电子邮件</div>
							<div className="color000 fs_16">
								{ detailData.EntityC.emailaddress1 || '---' }
							</div>
						</div>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">联系地址</div>
							<div className="color000 fs_16">
								{ detailData.EntityC.address1_composite || '---' }
							</div>
						</div>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}

			{
				(type === "1" && showMore) &&
				<div className="info_style_a">
					<WhiteSpace size="lg" className="bg_f6"/>
					<WhiteSpace size="lg"/>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">工作信息</span>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">工作单位名称</div>
									<div className="color000 fs_16">
										{ detailData.EntityD.company_name || '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">职位</div>
									<div className="color000 fs_16">
										{ detailData.EntityD.jobtitle || '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">工作电话1</div>
									<div className="color000 fs_16">
										{ detailData.EntityD.officetel1 ? this.formatPhone(detailData.EntityD.officetel1) : '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">工作电话2</div>
									<div className="color000 fs_16">
										{ detailData.EntityD.officetel2 ? this.formatPhone(detailData.EntityD.officetel2) : '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">工作单位地址</div>
							<div className="color000 fs_16">
								{ detailData.EntityD.workingaddress || '---' }
							</div>
						</div>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}

			{
				(type === "1" && showMore && newData.length > 0) &&
				<div className="info_style_a">
					<WhiteSpace size="lg" className="bg_f6"/>
					<WhiteSpace size="lg"/>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">订阅偏好</span>
						</div>
						<Grid
							data={newData}
							renderItem={dataItem => (
								<Checkbox disabled checked={dataItem.value === "True"}  className="color666">
									{ dataItem.title }
								</Checkbox>
							)}
							columnNum={3}
							hasLine={false}
							square={false}
							activeStyle={false}
							className="checkbox_list"
						/>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}


			{
				(type === "2" || type === "3") &&
				<div>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">基本信息</span>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">机构类型</div>
									<div className="color000 fs_16">{ detailData.EntityB.inst_type || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">行业</div>
									<div className="color000 fs_16">{ detailData.EntityB.industry || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">联系人名称</div>
							<div className="color000 fs_16">
								{ detailData.EntityB.contactname || '---' }
							</div>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">联系电话1</div>
									<div className="color000 fs_16">
										{ detailData.EntityB.phone1 ? this.formatPhone(detailData.EntityB.phone1) : '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">联系电话2</div>
									<div className="color000 fs_16">
										{ detailData.EntityB.phone2 ? this.formatPhone(detailData.EntityB.phone2) : '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">电子邮箱</div>
							<div className="color000 fs_16">
								{ detailData.EntityB.emailaddress1 || '---' }
							</div>
						</div>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">联系地址</div>
							<div className="color000 fs_16">
								{ detailData.EntityB.address1_composite || '---' }
							</div>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">证件类型</div>
									<div className="color000 fs_16">{ detailData.EntityB.new_o_identitytype || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">证件号码</div>
									<div className="color000 fs_16">{ detailData.EntityB.new_zz_sfzhm || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">客户状态</div>
									<div className="color000 fs_16">{ detailData.EntityB.status || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">潜在资产量</div>
									<div className="color000 fs_16">{ detailData.EntityB.potentialresources || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">客户类型</div>
									<div className="color000 fs_16">{ detailData.EntityB.custtype || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">客户来源</div>
									<div className="color000 fs_16">{ detailData.EntityB.leadsourcecode || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">共享客户经理</div>
									<div className="color000 fs_16">{ detailData.EntityB.customerManager || '---' }</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">所属负责人</div>
									<div className="color000 fs_16">{ detailData.EntityB.owner || '---' }</div>
								</div>
							</Flex.Item>
						</Flex>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">目标产品</div>
							<div className="color000 fs_16">
								<Flex align="start">
									<Flex.Item>
										<span className="color000 fs_16">
											{ detailData.EntityB.targetproducttype01 || '---' }
										</span>
									</Flex.Item>
									<Flex.Item>
										<span className="color000 fs_16">
											{ detailData.EntityB.targetproducttype02 || '---' }
										</span>
									</Flex.Item>
									<Flex.Item>
										<span className="color000 fs_16">
											{ detailData.EntityB.targetproducttype03 || '---' }
										</span>
									</Flex.Item>
								</Flex>
							</div>
						</div>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">创建时间</div>
							<div className="color000 fs_16">
								{ detailData.EntityB.createdon || '---' }
							</div>
						</div>
						<div className="mb_15">
							<div className="color999 fs_12 mb_5">备注</div>
							<div className="color000 fs_16">
								{ detailData.EntityB.remark || '---' }
							</div>
						</div>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}

			{
				((type === "2" || type === "3") && showMore) &&
				<div className="info_style_a">
					<WhiteSpace size="lg" className="bg_f6"/>
					<WhiteSpace size="lg"/>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">扩展信息</span>
						</div>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">企业性质</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.property || '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">注册资本</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.regist_capital || '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">法人代表姓名</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.instrepr_name || '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">法人代表证件号</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.instrepr_id || '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
						<Flex className="mb_15" align="start">
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">法人证件有效期</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.instrep_vali_date || '---' }
									</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<div className="color999 fs_12 mb_5">修改时间</div>
									<div className="color000 fs_16">
										{ detailData.EntityC.modifiedon || '---' }
									</div>
								</div>
							</Flex.Item>
						</Flex>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}

			{
				(type === "2" && showMore && newData.length > 0) &&
				<div className="info_style_a">
					<WhiteSpace size="lg" className="bg_f6"/>
					<WhiteSpace size="lg"/>
					<WingBlank>
						<div className="mb_15">
							<span className="iconfont1 iconjibenxinxi fs_14 color999 va mr_5" />
							<span className="fs_16 color_ui">订阅偏好</span>
						</div>
						<Grid
							data={newData}
							renderItem={dataItem => (
								<Checkbox disabled checked={dataItem.value === "True"}  className="color666">
									{ dataItem.title }
								</Checkbox>
							)}
							columnNum={3}
							hasLine={false}
							square={false}
							activeStyle={false}
							className="checkbox_list"
						/>
					</WingBlank>
					<WhiteSpace size="lg"/>
				</div>
			}


			{

				detailData.EntityB.isowner &&
				<Button className="editBotton fixedButton"
						onClick={()=>{
					this.context.router.push({
							pathname: '/QKEditDetail',
							query: {
								id: this.props.location.query.leadid,
								userType: types,
							}
						})
				}}
				></Button>
            }


			<div
				className='fs_14 color999 mb_30'
				style={{textAlign:'center', paddingBottom: '10px'}}
				onClick={()=>{this.setState({showMore:!showMore})}}
			>
				{showMore ? '收起' : '更多'}
				<span className={["iconfont", showMore ? "icon-shanglashouqi" : "icon-xialagengduo", "color_ui_linear", "fs_12", "ml_5"].join(' ')} style={{marginRight: '.12rem'}}></span>
			</div>

		</div>
	}
}

export default QKListDetail;


// {
// 	detailData.EntityA.sex &&
// 	<span className="fs_12 color999">({ detailData.EntityA.sex })</span>
// }