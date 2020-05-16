import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//接收items属性： {title:string, content: 'string'}
class TranslationBlock extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        let {items} = this.props;
        return (
            <div className="translation">
            <div className='topleft'></div>
                {items.map(item => <div key={item.title} className='trans-item'><span className='title'>{item.title}</span><span className='content'>{item.content}</span></div>
                )}
            <div className='bottomright'></div>
            </div>
        )
    }
}
 export default TranslationBlock;