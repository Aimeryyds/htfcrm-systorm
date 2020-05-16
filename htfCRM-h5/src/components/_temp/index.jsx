import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'

import { WingBlank, WhiteSpace, Flex, Grid, ListView, SearchBar } from 'antd-mobile';

class SellCharts extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        this.changeTilte("");
    }

    render() {
        let {  } = this.state;

        return <div>
            
        </div>
    }
}

export default SellCharts;