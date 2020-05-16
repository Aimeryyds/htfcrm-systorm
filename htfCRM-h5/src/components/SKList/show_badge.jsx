import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { Badge } from 'antd-mobile';

class ShowBadge extends Module {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

    }

    render() {
        let { badgeData, name, isShowBadge, cloaseShowBadge } = this.props;

        return isShowBadge ? (
            <div
                style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '999',
                border: '1px solid #eee',
                boxShadow: '0 0 20px #f1f1f1',
                backgroundColor: '#fff'
                }}
            >
                <div className="fs_16 color333 mt_10 mb_20" style={{textAlign: 'center'}}>
                    { name }
                </div>

                <div style={{margin: '0 .2rem .2rem'}}>
                    <div className="mb_10 fs_12 color999">客户标签:</div>
                    {
                        badgeData.map((item, index)=>{
                            return <Badge key={index} text={item} className={["badge-style"+(index%3), 'mb_10'].join(' ')} />
                        })
                    }
                </div>

                <div
                    style={{
                    lineHeight: '.5rem',
                    textAlign: 'center',
                    color: '#148ce6',
                    borderTop: '1px solid #eee',
                    fontSize: '.16rem'
                    }}
                    onClick={()=>cloaseShowBadge()}
                >
                    确认
                </div>

            </div>
        ) : (
            <div></div>
        )


    }
}

export default ShowBadge;