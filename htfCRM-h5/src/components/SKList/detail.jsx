import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import DetailHeaderFeiSanfang from './detail_header_feisanfang'		//非三方头部
import DetailHeaderSanfang from './detail_header_sanfang'		//非三方头部
import DetailSanfangTable from './detail_sanfang_table'		//三方table
import DetailBase from './detail_base'		//客户基本信息
import DetailKHLX from './detail_khlx'		//客户联系信息
import DetailLXR from './detail_lxr'		//联系人信息
import DetailSD from './detail_sd'			//深度信息
import DetailSub from './detail_sub'		//订阅信息
import DetailKHGX from './detail_khgx'		//客户关系

import $ from 'jquery'

import { WingBlank, WhiteSpace, Flex, Badge, Tabs, SearchBar, Button } from 'antd-mobile';


class SKListDetail extends Module {
	constructor(props, context) {
		super(props, context);
		this.state = {
			detailData: {},				//用户详情信息
			isShowBadge: false,			//是否显示更多标签
			tableDatas: [],				//三方表格数据
			searchValue: '',			//三方表格搜索
			tabsType: 0,				//三方tabs 0：平台统计信息；1：平台联系人信息；2：平台对标公司；3：平台对标产品明细
			lastLevelChange: '',		//最后一次等级变化
			levelChangeList: [],		//变化趋势数据
		}

	}

	componentDidMount() {
		let storage=window.localStorage;
		let { userType } = this.props.location.query;		//用户类型 -2:三方 0:机构 1:个人 2:产品  事实客户(机构、个人、产品);
		this.changeTilte("客户详情");
		if(userType == -2) {
			this.getSanFangList();			//三方数据
			this.getSanFangDetail();
		} else {
			this.getCustomerDetail();		//非三方数据
			this.getCustLevel();
		}
		//清理缓存
		storage.removeItem('view360Tab');
	}

	componentWillUnmount() {
		$(".mask_div").remove();
	}


	/**
	 * 头部冻结,占位高度设置
	 */
	setHeaderHeight() {
		let { userType } = this.props.location.query;
		if(userType!= -2) {
			//非三方
			let h = $('#detailHeaderA').height();
			$('#detailHeader_zw').height(h);
		} else {
			let h = $('#detailHeaderB').height();
			$('#detailHeader_zw_b').height(h);
		}
	}

	/**
	 * 三方客户详情
	 * @constructor
	 */
	getSanFangDetail() {
		let { id } = this.props.location.query;
		this.request({
			api: 'SanFangDetail',
			params: {
				id: id,
			}
		}, (res)=> {
			this.setState({
				detailData: res.data
			}, ()=>{
				this.GetUserInfo();
				this.setHeaderHeight();
			})
		})
	}

	/**
	 * 三方用户表单数据
	 */
	getSanFangList() {
		let { id } = this.props.location.query;
		let { tabsType, searchValue} = this.state;
		this.request({
			api: 'SanFangList',
			params: {
				id: id,
				type: tabsType,
				content: searchValue
			}
		}, (res)=>{
			this.setState({
				tableDatas: res.data
			})
		})
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
	getCustomerDetail() {
		this.request({
			api: 'customerDetail',
			params: {
				id: this.props.location.query.id
			}
		}, (res)=> {
			this.setState({
				detailData: res.data
			}, ()=>{
				this.GetUserInfo();
				this.setHeaderHeight();
			})
		})
	}

	/**
	 * 客户详情-客户级别趋势(非三方)
	 */
	getCustLevel() {
		this.request({
			api: 'getCustLevel',
			params: {
				id: this.props.location.query.id
			},
			hideToast: true
		}, (res)=>{
			//获取左后一个数据的趋势
			this.setState({
				lastLevelChange: res.data[res.data.length - 1]['changeType'],
				levelChangeList: res.data
			});

		})
	}


	/**
	 * 三方tabs切换
	 * @param tab
	 * @param index
	 */
	tabsChange(tab, index) {
		this.setState({
			tabsType: tab.value,
			searchValue: ''
		}, ()=>{
			this.getSanFangList();
		})
	}

	onSearch = (val) => {
		this.setState({
			searchValue: val.replace(/(^\s*)|(\s*$)/g, ""),
		})
	}

	onSearchSubmit = () => {
		this.getSanFangList()
	}


	render() {
		let { userType } = this.props.location.query;		//用户类型 -2:三方 0:机构 1:个人 2:产品  事实客户(机构、个人、产品);
		let { detailData, isShowBadge, tableDatas, tabsType, searchValue, lastLevelChange, levelChangeList  } = this.state;
		
		return <div className="N_SK_List_detail">

			{
				/**
				 * 非三方
				 */

				(userType !== '-2') &&
					<div>

						{
							/** 头部信息 **/
							<DetailHeaderFeiSanfang
								query={this.props.location.query}
								detailData={detailData}
								lastLevelChange={lastLevelChange}
								levelChangeList={levelChangeList}
							/>
						}

						{
							/** 客户基本信息 **/
							<DetailBase query={this.props.location.query} detailData={detailData}/>
						}

						{
							/** 客户关系, 组件内部获取数据 **/
							<DetailKHGX query={this.props.location.query}  data={detailData}/>
						}

						{
							/** 客户联系信息 **/
							detailData && <DetailKHLX query={this.props.location.query} detailData={detailData}/>
						}

						{
							/** 联系人 **/
							<DetailLXR query={this.props.location.query} detailData={detailData}/>
						}

						{
							/** 深度信息 **/
							<DetailSD query={this.props.location.query} detailData={detailData}/>
						}

						{
							/** 订阅信息 **/
							<DetailSub query={this.props.location.query} detailData={detailData}/>
						}

					</div>
			}


			{
				/**
				 * 三方
				 */

				(userType === '-2') &&
				<div>

					{
						/** 头部信息 **/
						<DetailHeaderSanfang query={this.props.location.query} detailData={detailData}/>
					}

					<WingBlank size="lg">
						<Tabs
							tabs={[{title:'平台统计信息', value: 0}, {title:'平台联系人', value: 1}, {title:'平台对标公司', value: 2}, {title:'平台对标产品明细', value: 3}]}
							initialPage={0}
							tabBarTextStyle={{fontSize: '.14rem'}}
							renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
							onChange={(tab, index) => this.tabsChange(tab, index) }
						>
						</Tabs>
					</WingBlank>

					<div className="htf_searchBar_style3">
						<SearchBar
							value={searchValue}
							placeholder="姓名/名称/联系方式/公司"
							onChange={this.onSearch}
							onClear={() => { this.setState({searchValue: ''},()=> this.getSanFangList()) }}
							onCancel={() => { this.setState({searchValue: ''},()=> this.getSanFangList()) }}
							onSubmit={this.onSearchSubmit}
						/>
					</div>

					{
						/** 三方table **/
						<DetailSanfangTable
							tabsType={ tabsType }
							tableDatas={ tableDatas }
						/>
					}


				</div>
			}


			{ (userType == 0 || userType == 1) && this.state.detailData.ismanager === "true" &&
				<div>
					<WhiteSpace size="lg" className="bg_f6"/>
					<Button className="editBotton fixedButton"
						onClick={()=>{
						this.context.router.push({
								pathname: '/SKEditDetail',
								query: {
									id: this.props.location.query.id,
									userType: userType
								}
							})
					}}
					></Button>
				</div>

			}



		</div>
	}
}

export default SKListDetail;




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

