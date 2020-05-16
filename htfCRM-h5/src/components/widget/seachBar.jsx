import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { SearchBar, WhiteSpace } from 'antd-mobile';

class MySeacherBar extends Module{
    
    render(){
        let { placeholder, onChange, onSubmit} = this.props; 
        return(
            <div className='cust_searchbar'>
                <SearchBar placeholder={placeholder} onChange={onChange} onSubmit={onSubmit}/>
            </div>
        )
    }
}

export default MySeacherBar;