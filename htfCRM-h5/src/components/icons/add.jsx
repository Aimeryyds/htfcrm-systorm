import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
class IconAdd extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        return (<i style={{display:'inline-block'}} className="icon-add">
            <svg className='am-icon' stroke="currentColor" strokeWidth='2'>
                <line x1='50%' y1='0%' x2='50%' y2='100%'/>
                <line x1='0%' y1='50%' x2='100%' y2='50%'/>
            </svg></i>
        )
    }
}
export default IconAdd;