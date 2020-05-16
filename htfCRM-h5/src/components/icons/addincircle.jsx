import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
class CircleAdd extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        return (<i style={{display:'inline-block'}} className="icon-add">
            <svg className='am-icon' stroke="currentColor" strokeWidth='1'>
            <circle cx='50%' cy='50%' r='45%' fill='none'/>
                <line x1='50%' y1='20%' x2='50%' y2='80%'/>
                <line x1='20%' y1='50%' x2='80%' y2='50%'/>
            </svg></i>
        )
    }
}
export default CircleAdd;