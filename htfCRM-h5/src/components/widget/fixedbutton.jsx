import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//fiex的按钮组件，props: positon对象，left, top bottom, right,imageClass设置背景图像的类名
class FixedButton extends Module{

    componentDidMount(){
        let button = document.getElementsByClassName('fixedbutton')[0];
        let {position={}} = this.props;
        position.left && (button.style.left = position.left);
        position.right && (button.style.right = position.right);
        position.top && (button.style.top = position.top);
        position.bottom && (button.style.bottom = position.bottom);
    }
    componentDidUpdate(){
        let button = document.getElementsByClassName('fixedbutton')[0];
        button.removeAttribute('style');
        let {position={}} = this.props;
        position.left && (button.style.left = position.left);
        position.right && (button.style.right = position.right);
        position.top && (button.style.top = position.top);
        position.bottom && (button.style.bottom = position.bottom);
    }
    render(){
        let imageClass = this.props.imageClass;

        console.log(this.props.style)
        return (
            <div
                className={'fixedbutton ' + imageClass}
                onClick={this.props.onClick}
                style={this.props.style}
            >

            </div>
        )
    }
}
export default FixedButton;