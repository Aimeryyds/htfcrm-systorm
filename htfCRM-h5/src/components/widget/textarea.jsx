import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { TextareaItem} from 'antd-mobile';

class Textarea extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        let { header, onChange, value } = this.props;
        return <div className='cust-textarea'>
            <div style={{fontSize: '15px', padding: '10px 25px 0 25px', }}>{header}</div>
            <div className='cust-textarea-container'>
            <TextareaItem onChange={onChange} rows={6} count={200} placeholder='请输入' value={value}/></div>
        </div>
    }
}
 export default Textarea