import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
class NoContent extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        return (<div className='no_content' style={{color:'#e3e3e5', textAlign:'center', fontSize:'0.2rem', display:'flex', alignItems:'center', justifyContent:'center'}}><span style={{transform:'translate(0, 0.5rem)'}}>暂无数据</span></div>);
    }
}
 export default NoContent;