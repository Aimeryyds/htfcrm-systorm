import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Icon } from 'antd-mobile';

class Tips extends Module{
    constructor(props, context){
        super(props, context);
        this.state = {
            show: true
        }
    }
    render(){
        return (
        <div {...this.props}>{
        this.state.show && <div className='tips'>
            <div className='left'>
                可向右滑动查看更多数据
            </div>
            <div className='right' onClick={() => {this.setState({show: false});}}>
                <Icon type='cross' size='md'></Icon>
            </div>
        </div>}
        </div>
        )
        
    }

}
export default Tips;