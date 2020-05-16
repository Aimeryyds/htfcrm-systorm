import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import BadgeList from '../widget/badgelist';
import FixedBoutton from '../widget/fixedbutton';
import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';

class ServeDetailBaiFang extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showMore: false
        }
    }

    componentDidMount() {
        this.changeTilte("联系详情");
    }

    render() {
        let { showMore } = this.state;
        let { data } = this.props, isOwner = data.isowner;
        //处理头部标签
        // let badgeKeys = ['OVISITTYPE', 'VISITTYPE', 'priority', 'activityState'], badges=[], colors = ['#FEE5E5', '#FEF5E5', '#E5ECFE', '#FEF5E5'], fontColors= ['#FB5C5F', '#FB935C', '#A8AEBE', '#FB935C'];
        let badgeKeys = ['VISITTYPE'], badges = [], colors = ['#FEE5E5'], fontColors = ['#FB5C5F'];
        for(let i = 0; i < badgeKeys.length; i++){
            if(data[badgeKeys[i]]){
                badges.push({content: data[badgeKeys[i]], bgColor: colors[i], fontColor: fontColors[i]});
            }
        }
        return <div className="N_customer_List_detail">
            <WhiteSpace size="lg" className="bg_f5"/>

            <div className="info_style_a">
                <WhiteSpace size="lg"/>
                <WingBlank>
                    <div className="color48 fs_16 mb_5" style={{width:'70%',lineHeight:'0.24rem'}}>{ data.SUBJECT || '---' }</div>
                    {/* { data.VISITTYPE && <div className='fs_12 mb_10 colorF' style={{padding: '5px 10px', backgroundColor: '#fa7375', display: 'inline-block', borderRadius: '4px'}}>
                        { data.VISITTYPE }
                    </div> } */}
                    <BadgeList badges={badges}/>
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>
                <Flex>
                    <Flex.Item style={{ padding: '.1rem', flexGrow: 0, flexBasis: "50%"}}>
                        <Flex>
                            <Flex.Item style={{flex: 2.5}}>
                                <div style={{width: '.35rem', height: '.35rem', backgroundColor: '#eee', borderRadius: '50%', overflow: 'hidden'}}>
                                    <img src={ "" } alt=""/>
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{flex: 7.5}}>
                                <div className="fs_12 color999 mb_5">负责人</div>
                                <div className="fs_14 color666">{ data.responsiblePerson || '暂无负责人' }</div>
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                    {/* <Flex.Item style={{padding: '.1rem'}}>
                        <div className="fs_12 color999 mb_5">共享人员</div>
                        <div className="fs_14 color666">{ data.manager || '---' }</div>
                    </Flex.Item> */}
                </Flex>
                    <WhiteSpace size='lg' className='bg_f6'/>
                <WingBlank>
                    <div className="mb_15" style={{paddingTop: '15px'}}>
                        <div className="color999 fs_12 mb_5">拜访对象</div>
                        <div className="color333 fs_14" style={{wordWrap:'break-word'}}>{ data.PACCOUNT || '---' }</div>
                    </div>
                    <Flex className="mb_15" align='start'>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">拜访开始时间</div>
                            <div className="color333 fs_14">{ data.VISITSTARTTIME || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">拜访结束时间</div>
                            <div className="color333 fs_14">{ data.VISITENDTIME || '---' }</div>
                        </Flex.Item>
                    </Flex>
                    <Flex className="mb_15" align='start'>
                    <Flex.Item>
                            <div className="color999 fs_12 mb_5">相关联系人</div>
                            <div className="color333 fs_14">{ data.contactperson || '---' }</div>
                        </Flex.Item>
                       
                        {/* <Flex.Item>
                            <div className="color999 fs_12 mb_5">我方人员</div>
                            <div className="color333 fs_14">{ data.USERID || '---' }</div>
                        </Flex.Item> */}
                    </Flex>
                    <Flex className="mb_15" align='start'>
                    <Flex.Item>
                            <div className="color999 fs_12 mb_5">涉及产品</div>
                            <div className="color333 fs_14">{ data.PRODUCT || '---' }</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="color999 fs_12 mb_5">拜访地点</div>
                            <div className="color333 fs_14">{ data.ADDRESS || '---' }</div>
                        </Flex.Item>
                        
                    </Flex>
                   
                </WingBlank>

                <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                <WingBlank>
                {/* <div className="mb_15">
                        <div className="color999 fs_12 mb_5">意见：</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.SUGGEST || '---' }</div>
                    </div> */}
                    <div className="mb_15">
                        <div className="color999 fs_12 mb_5">沟通内容：</div>
                        <div className="color000 fs_14" style={{wordWrap:'break-word'}}>{ data.GTcontent || '---' }</div>
                    </div>
                    
                    {/* <div className="mb_10">
                        <div className="color999 fs_12 mb_5">工作难点：</div>
                        <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.problem || '---' }</div>
                    </div> */}
                </WingBlank>


               

                <WhiteSpace size="lg" className="bg_f5"/>

                {
                    (data.followInfos &&  data.followInfos.length > 0)&&
                    <WingBlank>
                        <div className="mb_10 mt_10">
                            <span className="iconfont icon-sjibenxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
                            <span className="fs_16 color_ui">跟进记录</span>
                        </div>
                        <div className="mb_10" style={{borderTop: '1px solid #f5f5f5'}}></div>

                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">任务名称</div>
                                <div className="color333 fs_14">{ data.followInfos[0].NEWNAME || '---' }</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">任务描述</div>
                                <div className="color333 fs_14">{ data.followInfos[0].FOLLOWCONTENT || '---' }</div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">创建时间</div>
                                <div className="color333 fs_14">{ data.followInfos[0].CREATEDDATE || '---' }</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">完成时间</div>
                                <div className="color333 fs_14">{  }</div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">承办人</div>
                                <div className="color333 fs_14">{ data.followInfos[0].UNDERTAKER || '---' }</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">督办人</div>
                                <div className="color333 fs_14">{  }</div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="mb_15" align='start'>
                            <Flex.Item>
                                <div className="color999 fs_12 mb_5">协办人</div>
                                <div className="color333 fs_14">{ data.followInfos[0].COORDINATOR || '---' }</div>
                            </Flex.Item>
                            <Flex.Item>
                            </Flex.Item>
                        </Flex>


                        {
                            showMore && data.followInfos.map((item,index)=>{
                                if(index > 0) {
                                    return <div key={index} style={{borderTop: '1px solid #f5f5f5', paddingTop: '10px'}}>
                                        <Flex className="mb_15" align='start'>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">任务名称</div>
                                                <div className="color333 fs_14">{ item.NEWNAME || '---' }</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">任务描述</div>
                                                <div className="color333 fs_14">{ item.FOLLOWCONTENT || '---' }</div>
                                            </Flex.Item>
                                        </Flex>
                                        <Flex className="mb_15" align='start'>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">创建时间</div>
                                                <div className="color333 fs_14">{ item.CREATEDDATE || '---' }</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">完成时间</div>
                                                <div className="color333 fs_14">{  }</div>
                                            </Flex.Item>
                                        </Flex>
                                        <Flex className="mb_15" align='start'>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">承办人</div>
                                                <div className="color333 fs_14">{ item.UNDERTAKER || '---' }</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">督办人</div>
                                                <div className="color333 fs_14">{  }</div>
                                            </Flex.Item>
                                        </Flex>
                                        <Flex className="mb_15" align='start'>
                                            <Flex.Item>
                                                <div className="color999 fs_12 mb_5">协办人</div>
                                                <div className="color333 fs_14">{ item.COORDINATOR || '---' }</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                            </Flex.Item>
                                        </Flex>
                                    </div>
                                }
                            })
                        }
                    </WingBlank>
                }

                {
                    (data.followInfos && data.followInfos.length > 0)&&
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

            {
                isOwner &&
                <FixedBoutton
                    style={{right:'5%', bottom:'5%'}}
                    imageClass='edit_button'
                    onClick={() => {
                        this.context.router.push({
                            pathname: 'EditVisit',
                            query:{
                                type: 1,
                                id: this.props.id
                            }
                        })
                    }}
                />
            }

        </div>
    }
}

export default ServeDetailBaiFang;

//
// <Flex  className="mb_15">
//     <div
//         style={{
//                             color: '#fff',
//                             padding: '.05rem .15rem .05rem .2rem',
//                             borderRadius: '0rem 0.13rem 0.13rem 0',
//                             lineHeight: 1,
//                             fontSize: '.16rem'
//
//                         }}
//         className="bg_ui"
//     >
//         { data.OVISITTYPE || '---' }
//     </div>
//
// </Flex>
//
// <WingBlank>
// <Flex className="mb_15" justify='between' align='start'>
//     <div className="color48 fs_16 mb_5" style={{width:'70%',lineHeight:'0.24rem'}}>{ data.SUBJECT || '---' }</div>
// <div className="color48 fs_12 mb_5" style={{width:'30%',lineHeight:'0.24rem',textAlign:'right'}}>{ data.ACTIVITYDATE || '---' }</div>
// </Flex>
//
// <div style={{wordWrap:'break-word',lineHeight:'0.2rem'}} className='fs_14 color666 mb_10'>
//     { data.CONTENT || '---' }
// </div>
//
// <div className='color_ui fs_14 mb_30 border_color_ui' style={{borderWidth:'0.01rem', borderStyle: 'solid', display:'inline-block',padding:'0.03rem 0.15rem'}}>
//     {data.VISITTYPE || '----'}
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">拜访对象</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.PACCOUNTID || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">拜访开始时间</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.VISITENDTIME?data.VISITSTARTTIME.substring(0,10) : '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">拜访结束时间</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.VISITSTARTTIME?data.VISITENDTIME.substring(0,10) : '---' }</div>
// </div>
//
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">负责人</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.responsiblePerson || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">共享客户经理</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.manager || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">优先级</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.priority || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">活动状态</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.activityState || '---' }</div>
// </div>
//
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">涉及产品</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.PRODUCT || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">对方人员</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.CONTACTID || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">我方人员</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.USERID || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">拜访地点</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.ADDRESS || '---' }</div>
// </div>
// <div className="mb_15">
//     <div className="color999 fs_12 mb_5">意见</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.SUGGEST || '---' }</div>
// </div>
// <div className="mb_30">
//     <div className="color999 fs_12 mb_5">问题</div>
//     <div className="color000 fs_16" style={{wordWrap:'break-word'}}>{ data.QUESTION || '---' }</div>
// </div>
// </WingBlank>
//
// {
//     (showMore && data.followInfos.length > 0)&&
//     <WingBlank>
//         <div className="mb_15">
//             <span className="iconfont icon-sjibenxinxi color_ui_linear" style={{marginRight: '.12rem'}}></span>
//             <span className="fs_16 color_ui">跟进记录</span>
//         </div>
//         {
//             data.followInfos.map((item,index)=>{
//                 return <div key={index}>
//                     <Flex className="mb_15" justify='between' align='start' >
//                         <div className="color48 fs_16 mb_5" style={{width:'70%',lineHeight:'0.24rem'}}>{ item.NEWNAME || '---' }</div>
//                         <div className="color48 fs_12 mb_5" style={{width:'30%',lineHeight:'0.24rem',textAlign:'right'}}>{item.CREATEDDATE || '---' }</div>
//                     </Flex>
//
//                     <div style={{wordWrap:'break-word',lineHeight:'0.2rem'}} className='fs_14 color666 mb_10'>
//                         { item.FOLLOWCONTENT || '---' }
//                     </div>
//                     <Flex className="mb_15" align='start'>
//                         <Flex.Item>
//                             <div>
//                                 <div className="color999 fs_12 mb_5">承办人</div>
//                                 <div className="color000 fs_16">{item.UNDERTAKER || '---' }</div>
//                             </div>
//                         </Flex.Item>
//                         <Flex.Item>
//                             <div>
//                                 <div className="color999 fs_12 mb_5">督办人</div>
//                                 <div className="color000 fs_16">{ item.SUPERVISOR|| '---' }</div>
//                             </div>
//                         </Flex.Item>
//                     </Flex>
//                     <div className="mb_15">
//                         <div className="color999 fs_12 mb_5">协办人</div>
//                         <div className="color000 fs_16">{item.COORDINATOR || '---' }</div>
//                     </div>
//                 </div>
//             })
//         }
//     </WingBlank>
// }
//
// {
//     (data.followInfos&&data.followInfos.length > 0)&&
//     <div
//         className='fs_14 color999 mt_10 mb_30'
//         style={{textAlign:'center'}}
//         onClick={()=>{this.setState({showMore:!showMore})}}
//     >
//         {showMore ? '收起' : '更多'}
//         <span className={["iconfont", showMore ? "icon-shanglashouqi" : "icon-xialagengduo", "color_ui_linear", "fs_12", "ml_5"].join(' ')} style={{marginRight: '.12rem'}}></span>
//     </div>
// }