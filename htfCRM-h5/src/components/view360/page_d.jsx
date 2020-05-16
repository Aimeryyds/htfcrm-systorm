import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Module from '../../lib/module'

import { Flex, ListView, SearchBar } from 'antd-mobile';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class PageD extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchValue: '',
            pageIndex: 1,
            pageSize: 10,
            listData: [],

            height: document.documentElement.clientHeight-150,
            isLoading: false,
            hasMore: true,
            refreshing: true,

            modal1: false,
            showModalInfo: {},
            initPage: false
        }
    }

    componentDidMount() {
        this.getCustomerContact()
    }

    getCustomerContact() {
        this.request({
            api:'customerContact',
            params: {
                id: this.props.id,
                search: this.state.searchValue,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize,
                content: '',
                type: '',
                begindate: '',
                enddate: '',
            }
        }, (res)=>{
            let Attributes = res.data.Attributes;
            let _hasMore = true;
            let _listData = [];
            if(Attributes.length < 10) {
                _listData = Attributes;
                _hasMore = false;
            }
            if(this.state.pageIndex > 1 ) {
                _listData = this.state.listData.concat(res.data.Attributes)
            }
            this.setState({
                listData: _listData,
                hasMore: _hasMore,
                isLoading: false,
                initPage: true
            })
        })
    }

    onSearch = (val) => {
        this.setState({
            searchValue: val.replace(/(^\s*)|(\s*$)/g, "")
        })
    }

    onSearchSubmit = (val) => {
        this.setState({
            searchValue: val.replace(/(^\s*)|(\s*$)/g, ""),
            pageIndex: 1
        }, ()=>{
            this.getCustomerContact()
        })
    }

    onEndReached = () => {
        this.setState({
            pageIndex: ++this.state.pageIndex,
            isLoading: true
        }, ()=>{
            this.getCustomerContact()
        })
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    jumpDetail(visit_id) {
        //跳转前记录下单签tab位置
        let { initialPage } = this.state;
        let storage=window.localStorage;
        storage.setItem('view360Tab', 2);

        this.context.router.push({
            pathname: '/ServeList',
            query: {
                visitId: visit_id
            }
        })
    }

    renderRow(rowData, sectionID, rowI) {
        return (
            <Flex className={["module_a", 'module_a-ui'].join(' ')} onClick={()=>this.jumpDetail(rowData.visit_id)}>
                <Flex.Item className="mc" style={{flex: 4, paddingLeft: '20px'}}>
                    <div className="fs_16 color000 mb_10">{ rowData.subject || '---' }</div>
                    <div className="fs_12 color999">开始时间:{ rowData.Visit_time || '---' }</div>
                </Flex.Item>
                <Flex.Item className="mr" style={{flex: 1, textAlign: 'center'}}>
                    <div className="iconfont icon-kgengduo color999"></div>
                </Flex.Item>
            </Flex>
        )
    }

    render() {
        let { searchValue, listData, showModalInfo, initPage } = this.state;

        return <div className="Page_D">

            <div className="htf_searchBar_style2"
            >
                <SearchBar
                    value={searchValue}
                    placeholder="拜访主题"
                    onChange={this.onSearch}
                    onClear={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getCustomerContact()) }}
                    onCancel={() => { this.setState({searchValue: '', pageIndex: 1},()=> this.getCustomerContact()) }}
                    onSubmit={this.onSearchSubmit}
                />
            </div>

            {
                (listData.length == 0 && initPage) ?
                    <div style={{textAlign: 'center', padding: '2rem 0'}}>没有相关数据</div> :
                    <ListView
                        ref={el => this.lvb = el}
                        dataSource={new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(listData)}
                        renderFooter={() => (<div style={{textAlign: 'center' }}>
                      {this.state.isLoading ? '加载中...' : ''}
                      {this.state.hasMore ? '' : '没有更多了'}
                    </div>)}
                        renderRow={this.renderRow.bind(this)}
                        style={{
                      height: this.state.height,
                      overflow: 'auto',
                    }}
                        pageSize={4}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
            }

        </div>
    }
}

export default PageD;

//以下为备份,请勿删

// <Modal
//     visible={this.state.modal1}
//     transparent
//     maskClosable={false}
//     onClose={() =>this.setState({modal1: false})}
//     title="拜访人员"
//     footer={[{ text: '确定', onPress: () =>this.setState({modal1: false})}]}
//     wrapProps={{ onTouchStart: this.onWrapTouchStart }}
//     style={{width: '90%'}}
//
// >
//     <div style={{ height: '2rem', overflow: 'scroll', textAlign: 'left' }}>
//         <div className="fs_16 color666 mb_10">负责人</div>
//         <div style={{display: 'inline-block', textAlign: 'center'}}>
//             <img
//                 style={{width: '.4rem', height: '.4rem', borderRadius: '50%'}}
//                 src={ showModalInfo.Visiting_responsible_head || require('../../resources/images/header_img.jpg')} alt=""
//             />
//             <div className="fs_12 color999">
//                 { showModalInfo.Visiting_responsible_personnel }
//             </div>
//         </div>
//         <WhiteSpace size="lg"/>
//         <div className="fs_16 color666 mb_10">协同人</div>
//         <div>
//             {
//                 showModalInfo.Visiting_personnel && showModalInfo.Visiting_personnel.map((item, index) => {
//                     if(showModalInfo.Visiting_responsible_personnel !== item) {
//                         return <div key={index} className="mr_15" style={{display: 'inline-block', textAlign: 'center'}}>
//                             <img
//                                 style={{width: '.4rem', height: '.4rem', borderRadius: '50%'}}
//                                 src={ showModalInfo.Visiting_head[index]|| require('../../resources/images/header_img.jpg')} alt=""
//                             />
//                             <div className="fs_12 color999">
//                                 { item }
//                             </div>
//                         </div>
//                     }
//
//                 })
//             }
//         </div>
//     </div>
// </Modal>



// renderRow(rowData, sectionID, rowI) {
//     return (
//         <div>
//             <WingBlank size="lg">
//                 <Flex className="mt_15 mb_15">
//                     <Flex.Item className="fs_16 color000">
//                         被拜访人: { rowData.By_visiting_people }
//                     </Flex.Item>
//                     <Flex.Item className="fs_14 color666" style={{textAlign: 'right'}}>
//                         { rowData.Visit_time }
//                     </Flex.Item>
//                 </Flex>
//                 <div className="fs_12 color999 mb_10" style={{lineHeight: '1.5'}}>
//                     { rowData.Visit_information }
//                 </div>
//                 <div>
//                         <span style={{padding: '.02rem .05rem', border: '1px solid #999', color: '#999', borderRadius: '2px', fontSize: '.12rem'}}>
//                             { rowData.Visit_type }
//                         </span>
//                 </div>
//                 <div className="mt_25 mb_5 fs_14 color000">
//                     拜访人员
//                 </div>
//                 <div onClick={ ()=>{
//                         this.setState({
//                             modal1: true,
//                             showModalInfo: rowData
//                         })
//                         }
//                     }
//                 >
//                     {
//                         rowData.Visiting_personnel[0] &&
//                         <img
//                             className="mr_15"
//                             style={{width: '.4rem', height: '.4rem', borderRadius: '50%'}}
//                             src={rowData.Visiting_head[0] || require('../../resources/images/header_img.jpg')} alt=""
//                         />
//                     }
//                     { rowData.Visiting_personnel[1] &&
//                     <img
//                         className="mr_15"
//                         style={{width: '.4rem', height: '.4rem', borderRadius: '50%'}}
//                         src={rowData.Visiting_head[1] ||require('../../resources/images/header_img.jpg')} alt=""
//                     />
//                     }
//                     { rowData.Visiting_personnel[2] && <img
//                         style={{width: '.4rem', height: '.4rem', borderRadius: '50%'}}
//                         src={rowData.Visiting_head[2]|| require('../../resources/images/header_img.jpg')} alt=""
//                     />}
//                     <div className="fs_14 color666" style={{lineHeight: '.4rem', display: 'inline-block', verticalAlign: 'bottom'}}>
//                         {rowData.Visiting_personnel[0] + '、'}
//                         {rowData.Visiting_personnel[0]}
//                         {rowData.Visiting_personnel.length >2 && '...'}
//                         {' '+rowData.Visiting_personnel.length}人 >>
//                     </div>
//                 </div>
//                 <WhiteSpace size="lg"/>
//             </WingBlank>
//             <WhiteSpace size="lg" className="bg_f6"/>
//         </div>
//     )
// }