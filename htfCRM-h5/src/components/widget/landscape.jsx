import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//横屏组件,接收一个rotate： 表示是否横屏
class Landscape extends Module{
    constructor(props, context){
        super(props, context);
        
    }
    componentDidMount(){
        this.rotate();
    }
    componentDidUpdate(){
        this.rotate();
    }
    rotate(){
        let rotate = document.getElementById('rotate'), rotate_container = document.getElementById('rotate_container'),rotateH = rotate.clientHeight,rotateW = rotate.scrollWidth, screenWidth = screen.availWidth, translateY = rotateH > screenWidth ? rotateH : screenWidth, shouldRotate = this.props.rotate;
        if(shouldRotate){
            rotate.style.transform = `rotate(90deg) translate(0, -${translateY}px)` ;
            rotate_container.style.height = rotateW + 'px';
            // rotate_container.style.width = rotateH + 'px';
            window.scrollTo(translateY,0);
        }else{
            rotate.removeAttribute('style');
            rotate_container.removeAttribute('style');
        }

    }
    render(){
        return (
            <div id='rotate_container'>
                <div id='rotate' className='rotate_widget'>
                    {this.props.children}
                </div>
            </div>
        )

    }
}
export default Landscape;