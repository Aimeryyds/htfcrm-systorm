import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class TradingDetail extends Module {
	constructor(props, context) {
		super(props, context);
		this.state = {
			detailData: {
				agency:'',    		//"销售机构"
				amount:'', 			//"确认金额"
				confdt:'', 			//"确认日期"
				faliedreason:'', 	//"失败原因"
				fundaccount:'', 	//"基金账户"
				netvalue:'', 		//"基金净值"
				product_name:'', 	//"基金名称"
				reqamt:'', 			//"申请金额"
				reqdt:'', 			//"申请日期"
				reqshares:'', 		//"申请份额"
				shares:'', 			//"确认份额"
				tradeaccount:'', 	//"交易账户"
				tradetype:'',		//"业务类型"
			}
		}
	}

	componentDidMount() {
		this.changeTilte("交易记录明细");
		this.getTradingDetail();
	}

	getTradingDetail() {
		this.request({
			api:'GetTradingDetail',
			params: {
				id: this.props.location.query.id,			//客户ID
				tradeId: this.props.location.query.trade_id		//交易记录ID
			}
		}, (res)=>{
			this.setState({
				detailData: res.data
			})
		})
	}

	render() {
		let { detailData } = this.state;

		return <div className="N_trading-detail">
			<WhiteSpace size="lg" className="bg_f6"/>
			<Flex justify="between" className="mb_25">
				<div className="module_title_tab-left mt_10">基金类型</div>
			</Flex>
			<WingBlank size="lg">
				<div className="fs_18 color333 mt_15 mb_15">
					{ detailData.product_name}
				</div>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">基金账户</div>
						<div className="fs_16 color333">
							{ detailData.fundaccount || '---' }
						</div>
					</Flex.Item>
					<Flex.Item>
						<div className="fs_12 color999 mb_10">交易账户</div>
						<div className="fs_16 color333">
							{ detailData.tradeaccount || '---' }
						</div>
					</Flex.Item>
				</Flex>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">申请日期</div>
						<div className="fs_16 color333">
							{ detailData.reqdt || '---' }
						</div>
					</Flex.Item>
					<Flex.Item>
						<div className="fs_12 color999 mb_10">确认日期</div>
						<div className="fs_16 color333">
							{ detailData.confdt || '---' }
						</div>
					</Flex.Item>
				</Flex>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">销售机构</div>
						<div className="fs_16 color333">
							{ detailData.agency || '---' }
						</div>
					</Flex.Item>
					<Flex.Item>
						<div className="fs_12 color999 mb_10">业务类型</div>
						<div className="fs_16 color333">
							{ detailData.tradetype || '---' }
						</div>
					</Flex.Item>
				</Flex>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">申请金额</div>
						<div className="fs_16 color333">
							{ detailData.reqamt || '---' }
						</div>
					</Flex.Item>
					<Flex.Item>
						<div className="fs_12 color999 mb_10">申请份额</div>
						<div className="fs_16 color333">
							{ detailData.reqshares || '---' }
						</div>
					</Flex.Item>
				</Flex>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">确认金额</div>
						<div className="fs_16 color333">
							{ detailData.amount || '---' }
						</div>
					</Flex.Item>
					<Flex.Item>
						<div className="fs_12 color999 mb_10">确认份额</div>
						<div className="fs_16 color333">
							{ detailData.shares || '---' }
						</div>
					</Flex.Item>
				</Flex>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">基金净值</div>
						<div className="fs_16 color333">
							{ detailData.netvalue || '---' }
						</div>
					</Flex.Item>
				</Flex>
				<Flex className="mb_20">
					<Flex.Item>
						<div className="fs_12 color999 mb_10">失败原因</div>
						<div className="fs_16 color333">
							{ detailData.faliedreason || '---' }
						</div>
					</Flex.Item>
				</Flex>
			</WingBlank>
		</div>
	}
}

export default TradingDetail;