import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Picker } from 'antd-mobile';
//获取时间选项
class CustDatePicker extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        let { dates } = this.props;
        return (
            <Picker className='HTF_datePicker' data={}>
                
            </Picker>
        )
    }
}
 export default CustDatePicker;