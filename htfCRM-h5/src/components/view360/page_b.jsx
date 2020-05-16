import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import echarts from 'echarts'
import $ from 'jquery'
import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class PageB extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            productDatas: [],
            records: [],
            selectedIndex: 0,
            typeIndex: 0,
            type: 0,
            initPage: false,

            optionsState: false,
            productLable: [],
        }

    }

    componentDidMount() {
        this.GetView360CustomerProduct();

    }

    componentWillUnmount() {
        $(".mask_div").remove();
    }

    GetUserInfo() {
        this.request({
            api: 'GetUserInfo'
        }, (res) => {
            let { type } = this.state;
            this.watermark({
                watermark_txt: res.data.name + ' ' + res.data.mobile,
                watermark_rows: 9
            });
        })
    }

    GetView360CustomerProduct() {
        this.request({
            api: 'GetView360CustomerProduct',
            params: {
                id: this.props.id
            }
        }, (res) => {
            this.setState({
                productDatas: res.data.product_info,
                records: res.data.large_money_change_records,
                type: res.data.Type,
                initPage: true
            }, ()=>{
                this.GetUserInfo();
            });
        })
    }

    selectLable() {
        let { productDatas } = this.state;
        let _productLable = [];
        productDatas.map(item => {
            _productLable.push(item.name)
        });
        this.setState({
            optionsState: true,
            productLable: _productLable
        })
        // ActionSheet.showActionSheetWithOptions({
        //         options: _productLable,
        //         maskClosable: true,
        //         'data-seed': 'logId',
        //         wrapProps,
        //         cancelButtonIndex: _productLable.length,
        //     },
        //     (buttonIndex) => {
        //         Toast.info("按钮被点击了!!!" + buttonIndex);
        //         buttonIndex > -1 && this.setState({
        //             selectedIndex:buttonIndex
        //         })
        //     })
    }

    closeOption() {
        this.setState({
            optionsState: false,
        })
    }

    clickOption(index) {
        this.setState({
            optionsState: false,
            selectedIndex:index
        })
    }

    colorShow(val){
        if(val === "赎回") {
            return <span style={{color: '#009944'}}>赎回</span>
        }
        if(val === "卖出") {
            return <span style={{color: '#F4333C'}}>卖出</span>
        }
    }

    // changeSegmented = (e) => {
    //     this.setState({
    //         typeIndex: e.nativeEvent.selectedSegmentIndex
    //     }, ()=>{
    //         this.renderChart_b();
    //     })
    // }

    // renderChart_b() {
    //     let { productDatas, selectedIndex, typeIndex } = this.state;
    //     let myChart_b = echarts.init(document.getElementById('funnelChartB_b'));
    //     let valMap = ['shares', 'market_values']
    //     let _dataB = productDatas[selectedIndex]['history'][valMap[typeIndex]];
    //     let name = (typeIndex === 0) ? '份' : '万元';
	//
    //     let option_b = {
    //         grid: {
    //             left: '5%',
    //             right: '5%',
    //             bottom: '5%',
    //             containLabel: true
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             axisLine: {onZero: false},
    //             data: productDatas[selectedIndex]['history'].months
    //         },
    //         yAxis: {
    //             name: name,
    //             type: 'value',
    //             splitLine: {
    //                 lineStyle: {
    //                     color: '#eee'
    //                 }
    //             }
    //         },
    //         series: [
    //             {
    //                 name:'邮件营销',
    //                 type:'line',
    //                 stack: '总量',
    //                 itemStyle: {
    //                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                         offset: 0,
    //                         color: '#5a96e6'
    //                     }, {
    //                         offset: 1,
    //                         color: '#5a96e6'
    //                     }])
    //                 },
    //                 lineStyle: {
    //                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                         offset: 0,
    //                         color: '#5a96e6'
    //                     }, {
    //                         offset: 1,
    //                         color: '#5a96e6'
    //                     }])
    //                 },
    //                 areaStyle: {
    //                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                         offset: 0,
    //                         color: 'rgba(123, 177, 249, 0.4)'
    //                     }, {
    //                         offset: 1,
    //                         color: 'rgba(123, 177, 249, 0.4)'
    //                     }])
    //                 },
    //                 label: {
    //                     normal: {
    //                         show: true,
    //                         position: 'top',
    //                         color:'#5a96e6'
    //                     }
    //                 },
    //                 data:_dataB
    //             }
    //         ]
    //     };
    //     myChart_b.setOption(option_b)
    // }

    render() {
        let { productDatas, records, type, selectedIndex, typeIndex, initPage, optionsState, productLable } = this.state;
        
        return <div className="Page_B">

            {
                (productDatas.length == 0 && initPage) ?
                    (<div style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div>):
                (
                  <div>
                      <WhiteSpace size="lg" className="bg_f6"/>
                      {
                          (productDatas[selectedIndex] && type === "1") &&
                          <WingBlank size="lg">
                              <WhiteSpace size="lg"/>
                              <div className="mb_10" onClick={()=>this.selectLable()}>
                                <span className="fs_16">
                                    { productDatas[selectedIndex].name }
                                </span>
                                  <span className="arrow-down ml_5"></span>
                              </div>
                              <div className="fs_12 color999">
                                  { productDatas[selectedIndex].modifiedon }更新
                              </div>
                              <div className="module_a_1">
                                  <div className="f_a">当前盈亏</div>
                                  <div className="f_b" style={{color: '#F4333C'}}>
                                      { productDatas[selectedIndex].incomeloss >=0 ?
                                          <span style={{color: '#F4333C'}}>{productDatas[selectedIndex].incomeloss}</span> :
                                          <span style={{color: '#009944'}}>{productDatas[selectedIndex].incomeloss}</span> }
                                  </div>
                                  <div className="f_c">(万元)</div>
                              </div>
                              <Flex>
                                  <Flex.Item>
                                      <div className="fs_12 color999 mb_5">基金市值(万元)</div>
                                      <div className="fs_14 color_ui">¥{ productDatas[selectedIndex].market_value }</div>
                                  </Flex.Item>
                                  <Flex.Item>
                                      <div className="fs_12 color999 mb_5">基金占比</div>
                                      <div className="fs_14 color_ui">{ productDatas[selectedIndex].value_rate }%</div>
                                  </Flex.Item>
                                  <Flex.Item>
                                      <div className="fs_12 color999 mb_5">盈亏占比</div>
                                      <div className="fs_14 color_ui">{ productDatas[selectedIndex].incomeloss_rate }%</div>
                                  </Flex.Item>
                              </Flex>
                              <WhiteSpace size="lg"/>
                          </WingBlank>
                      }

                      {
                          type === "2" &&
                          productDatas.map((item, index)=>{
                              return <Flex key={index} className={["module_a", 'module_a-ui'].join(' ')}>
                                  <Flex.Item className="mc" style={{paddingLeft: '20px'}}>
                                      <div className="fs_16 color000 mb_10">{ item.name || '---' }</div>
                                      <div className="fs_12 mb_5 color999">基金资产:{ item.capital || '---' }</div>
                                      <div className="fs_12 color999">交易账号:{ item.tradeaccount || '---' }</div>
                                  </Flex.Item>
                              </Flex>
                          })

                      }

                      <WhiteSpace size="lg" className="bg_f6"/>

                      {
                          productDatas[selectedIndex] &&
                          <WingBlank size="lg">
                              <WhiteSpace size="lg"/>
                              <div className="fs_16 mb_10">大额资金变动记录</div>
                              <div style={{ position: 'relative' }}>
                                  <div style={{overflow: 'scroll'}}>

                                      <div style={{position: 'absolute', top: 0, left: 0}}>
                                          <table style={{width: '2.2rem'}} className="custom_module_table">
                                              <thead>
                                              <tr>
                                                  <th style={{width: '1.1rem'}} className='table_column_1'>产品名称</th>
                                                  <th style={{width: '1.1rem'}} className='table_column_1'>交易类型</th>
                                              </tr>
                                              </thead>

                                              <tbody>
                                              {
                                                  records.map((item, index)=>{
                                                      return <tr key={index}>
                                                          <td
                                                              style={{backgroundColor: '#fff', color: '#0366d6'}}
                                                              onClick={()=>{
                                                                            this.context.router.push({
                                                                                pathname: '/JJListDetail',
                                                                                query: {
                                                                                    id: item.id
                                                                                }
                                                                            })
                                                                        }}
                                                          >
                                                              { item.funName }
                                                          </td>
                                                          <td  style={{backgroundColor: '#fff'}}>{ item.in_out }</td>
                                                      </tr>
                                                  })
                                              }
                                              </tbody>
                                          </table>
                                      </div>

                                      <table width="240%" className="custom_module_table">
                                          <thead>
                                          <tr>
                                              <th style={{width: '1.1rem'}}>产品</th>
                                              <th style={{width: '1.1rem'}}>交易类型</th>
                                              <th>交易日期</th>
                                              <th>交易时间</th>
                                              <th>交易金额</th>
                                              <th>组合基金</th>
                                              <th>受理方式</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {
                                              records.map((item, index)=>{
                                                  return <tr key={index}>
                                                      <td>{ item.funName }</td>
                                                      <td>{ item.in_out }</td>
                                                      <td>{ item.date }</td>
                                                      <td>{ item.time }</td>
                                                      <td>{ item.money }</td>
                                                      <td>{ item.group_jijin }</td>
                                                      <td>{ item.accptmd }</td>
                                                  </tr>
                                              })
                                          }

                                          </tbody>
                                      </table>
                                  </div>
                              </div>

                              <WhiteSpace size="lg"/>
                          </WingBlank>
                      }
                  </div>
                )
            }
            
            { optionsState &&
               <div>
                   <div className="am-action-sheet-mask" onClick={()=>this.closeOption()}></div>
                   <div className="am-action-sheet-wrap" onClick={()=>this.closeOption()}>
                       <div className="am-action-sheet am-action-sheet-normal">
                           <div className="am-action-sheet-content">
                               <button className="am-action-sheet-close">
                                   <span className="am-action-sheet-close-x"></span>
                               </button>
                               <div className="am-action-sheet-body">
                                   <div>
                                       <div className="am-action-sheet-button-list">
                                           {productLable.map((item, index)=>{
                                               return  <div key={index} className="am-action-sheet-button-list-item" onClick={()=>this.clickOption(index)}>{item}</div>
                                           })}
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            }

        </div>
    }
}

export default PageB;

// <SegmentedControl
//     selectedIndex={ typeIndex }
//     values={ ['基金份额', '基金市值'] }
//     tintColor={'#DDAF59'}
//     style={{ height: '30px', width: '200px', margin: '30px auto 0' }}
//     onChange={this.changeSegmented}
// />
// <div id="funnelChartB_b" style={{height: '300px', margin: '.2rem 0'}}></div>
//
// <WhiteSpace size="lg" className="bg_f6"/>

// <WhiteSpace size="lg" className="bg_f6"/>
//
// {
//     changeRecord.data &&
//     <WingBlank size="lg">
//         <WhiteSpace size="lg"/>
//         <div className="fs_16 mb_10">当日大额资金变动记录</div>
//         <div className="fs_12 color999 mb_20">
//             {changeRecord.date}
//         </div>
//         <table width="100%" className="custom_module_table">
//             <thead>
//             <tr>
//                 <th>时间</th>
//                 <th>金额(万元)</th>
//                 <th>进/出</th>
//                 <th>备注</th>
//             </tr>
//             </thead>
//             <tbody>
//             {
//                 changeRecord.data.map((item, index)=>{
//                     return <tr key={index}>
//                         <td>{ item.time }</td>
//                         <td>{ item.money }</td>
//                         <td>{ this.colorShow(item.in_out) }</td>
//                         <td>{ item.type }</td>
//                     </tr>
//                 })
//             }
//
//             </tbody>
//         </table>
//         <WhiteSpace size="lg"/>
//     </WingBlank>
// }