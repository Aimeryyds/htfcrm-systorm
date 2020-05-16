import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { List } from 'antd-mobile';
const Item = List.Item;
class SideLabel extends Module{


    render(){
        let { content, extra, ...rest} = this.props;
        
        return (
            <div>
                <Item  extra={extra} {...rest}><span className='sideBadge'></span>{content}</Item>
            </div>
        )
    }

}

export default SideLabel;