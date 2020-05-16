import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import Badge from './badge';
//props: badges [{content:内容, bgColor:背景色}]
class BadgeList extends Module{
    constructor(props, context) {
        super(props, context);

    }


    render(){
        let { badges } = this.props;
        return <div className='badge_list'>
                {badges.map((bad, index) => {
                    return <Badge content={bad.content} bgColor={bad.bgColor} key={index} fontColor={bad.fontColor}/>;
                })}
        </div>
    }
}
 export default BadgeList;