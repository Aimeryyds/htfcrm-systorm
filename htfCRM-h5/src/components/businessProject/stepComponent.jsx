import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import $ from 'jquery'

import { WingBlank, WhiteSpace, Flex, Steps } from 'antd-mobile';
const Step = Steps.Step;

class StepsComponent extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    componentDidMount() {

    }

    switchDescription(index) {
        $('#description' +index).toggle()
    }

    renderTitle(title, index) {
        return <Flex style={{width: '100%'}}>
            <Flex.Item style={{fontWeight: 'normal'}}>
                { title }
            </Flex.Item>
        </Flex>
    }

    renderIcon(num) {
        let { currentSteps } = this.props;
        if(currentSteps*1 >= num) {
            return <div
                className="bg_ui colorF fs_12 ta_c"
                style={{width: '.22rem', lineHeight: '.22rem', borderRadius: '50%'}}
            >
                { num }
            </div>
        } else {
            return <div
                className="colorF fs_12 ta_c"
                style={{width: '.22rem', lineHeight: '.22rem', borderRadius: '50%', backgroundColor: '#eee'}}
            >
                { num }
            </div>
        }

    }

    render() {

        return <div className="">
            <WhiteSpace size="lg" className="bg_f6" />

            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Steps>
                    {
                        this.props.stepsList.map((item, index)=>{
                        return <Step
                                title={this.renderTitle(item.STAGE, index)}
                                icon={this.renderIcon(index+1)}
                                key={index}
                                />
                        })
                    }
                </Steps>
            </WingBlank>

        </div>
    }
}

export default StepsComponent;