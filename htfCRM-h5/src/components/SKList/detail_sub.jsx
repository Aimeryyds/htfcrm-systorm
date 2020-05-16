import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Grid, Checkbox } from 'antd-mobile';

const subMap = {
    "new_srv_sms": "短信",
    "new_srv_email": "邮件",
    "new_srv_account": "账单",
    "new_srv_mail": "邮寄",
    "new_srv_wechat": "微信"
}

class DetailSub extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        let { detailData, query } = this.props;
        let data = detailData.Subscription;
        let newData = [];
        
        if(!data) {
            return <div></div>
        }

        for(let x in data) {
            newData.push({
                title: subMap[x],
                value: !!data[x]
            })
        }


        return <div className="SK_module_a">
            <WhiteSpace size="lg" className="bg_f6"/>
            <WingBlank size="sm">
                <div className="fs_18 color000 m_title color48">
                    <span className="iconfont icon-kdingyuexinxi mr_10 color48"></span>订阅信息
                </div>

                <div className="info_style_a">
                    <WingBlank size="sm">
                        <Grid
                            data={newData}
                            renderItem={dataItem => (
								<Checkbox disabled checked={dataItem.value}  className="color666">
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
                </div>
            </WingBlank>
        </div>
    }
}

export default DetailSub;