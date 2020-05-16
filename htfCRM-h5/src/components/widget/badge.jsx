import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
class Badge extends Module{
    constructor(props, context) {
        super(props, context);
    }


    render(){
        let {content, bgColor, fontColor} = this.props;
        return <div className='my-badge' style={{padding: '5px 10px', backgroundColor: bgColor||'', borderRadius: '4px', color: fontColor}}>
        { content }
    </div>
    }
}
 export default Badge;