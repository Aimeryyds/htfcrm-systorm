import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace } from 'antd-mobile';

class Info extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailData: {},
        }
    }

    componentDidMount() {
        this.changeTilte("个人信息");
        this.getDetail();
    }

    getDetail() {
        this.request({
            api:'FundManagersInfo',
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
            <div className="info_style_a">
                <WhiteSpace size="lg"/>
                <WingBlank>

                    {
                        detailData.new_resume==''?
                            <div style={{width:'100%',height:'2.5rem',display:'flex', justifyContent: 'center',
                                alignItems: 'center',position:'relative'}}>
                                <img width='50%' src={require('../../resources/images/noPersonInfo.png')} alt=""/>
                                <div style={{position:'absolute',bottom:'0.4rem'}} className='fs_14 color666'>暂无简历信息</div>
                            </div>:
                            <div><div className='fs_16 color666 mt_15 mb_15'>
                                简历
                            </div>
                                <div style={{fontSize:'0.14rem',lineHeight:'0.3rem',wordWrap: 'break-word'}}>
                                    {detailData.new_resume||'-----'}
                                </div>
                            </div>
                    }

                </WingBlank>


            </div>
        </div>
    }
}

export default Info;


