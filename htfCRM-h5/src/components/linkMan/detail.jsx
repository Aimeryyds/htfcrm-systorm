import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import DetailHeader from './header'		//非三方头部
import DetailBase from './base'		//客户基本信息
import DetailKHLX from './contact'		//客户联系信息
import DetailLXR from './linkman'		//联系人信息
import DetailSD from './depth'			//深度信息
import DetailSub from '../SKList/detail_sub'		//订阅信息
import DetailKHGX from '../SKList/detail_khgx'		//客户关系

import $ from 'jquery'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar, Button } from 'antd-mobile';


class LinkManDetail extends Module {
	constructor(props, context) {
		super(props, context);
		this.state = {
			detailData: {},				//用户详情信息
			isShowBadge: false,			//是否显示更多标签
			showButton: false
		}

	}

	componentDidMount() {
		this.changeTilte("联系人详情");
		this.getContactDetail();		//非三方数据
		//清理缓存
	}

	componentWillUnmount() {
		$(".mask_div").remove();
	}


	/**
	 * 头部冻结,占位高度设置
	 */
	setHeaderHeight() {
		
			//非三方
		let h = $('#detailHeaderA').height();
		$('#detailHeader_zw').height(h);
	}



	/**
	 * 水印需要,获取用户信息
	 * @constructor
	 */
	GetUserInfo() {
		this.request({
			api: 'GetUserInfo',
			hideToast: true
		}, (res) => {
			this.watermark({
				watermark_txt: res.data.name + ' ' + res.data.mobile,
				watermark_rows: 14
			});
		})
	}

	//获取客户详情
	getContactDetail() {
		this.request({
			api: 'GetContactdetail',
			params: {
				contactid: this.props.location.query.id
			}
		}, (res)=> {
			this.setState({
				detailData: res.data,
				showButton: res.data.Base.isowner
			}, ()=>{
				this.GetUserInfo();
				this.setHeaderHeight();
			})
		})
	}



	render() {
		let { detailData } = this.state;
		
		return <div className="N_SK_List_detail">

			{
				/**
				 * 非三方
				 */

				
					<div>

						{
							/** 头部信息 **/
							<DetailHeader
								
								detailData={detailData}
								query = { this.props.location.query}
								
							/>
						}

						{
							/** 客户基本信息 **/
							<DetailBase  detailData={detailData}/>
						}
						{
							/** 客户联系信息 **/
							<DetailKHLX  detailData={detailData}/>
						}
						{
							/** 深度信息 **/
							<DetailSD  detailData={detailData}/>
						}
				

						

						{
							/** 联系人 **/
							<DetailLXR  data={detailData.rels}/>
						}

						

						

					</div>
			}


			{ this.state.showButton &&
				<div>
					<WhiteSpace size="lg" className="bg_f6"/>
					<Button className="editBotton"
						onClick={()=>{
						this.context.router.push({
								pathname: '/EditLinkMan',
								query: {
									id: this.props.location.query.id,
								}
							})
					}}
					></Button>
				</div>

			}



		</div>
	}
}

export default LinkManDetail;




//
// <Flex className="mb_10">
// 	<Flex.Item className="fs_14 color999">
// 		行业类别: { detailData.industry }
// 	</Flex.Item>
// 	<Flex.Item className="fs_14 color999">
// 		委托人类别: { detailData.wtrtype }
// 	</Flex.Item>
// </Flex>

// { detailData.custtype }
// <span className="color999 ml_5 mr_5">|</span>
// { detailData.level ?  detailData.level : '暂无等级'}

