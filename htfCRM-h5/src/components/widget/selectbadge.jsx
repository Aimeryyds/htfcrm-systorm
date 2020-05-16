import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
/* 
    接收参数 options： 选项数组，每个选项为字符串, selected:选中的选项，数据， onChange:选项变化的事件,参数（字符串, 下标）
*/
class SelectBadge extends Module{
    
    
    render(){
        let options = this.props.options, selected = this.props.selected, onChange = this.props.onChange;
        return <div className="htf-segment select-badge">
                    {options.map((opt, index) => {
                        return <div key={index}
                        className={selected === index ? "htf-segment-item border_color_ui bg_ui colorF" : "htf-segment-item color_ui border_color_ui"}
                        onClick={() => {onChange(opt, index)}}
                    >
                        {opt}
                    </div>
                    })}
                
            </div>

    }
}
export default SelectBadge;