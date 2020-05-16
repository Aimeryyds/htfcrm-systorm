import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
class IconSearch extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        return <i className='icon_search' onClick={this.props.onClick}></i>
    }
}
 export default IconSearch;