import React from 'react';
import Module from '../../lib/module'
import { Button } from 'antd-mobile';

//接受props：manageList(列表{value:""}), closeManage(关闭函数), changeValue(选中后)
class MyActionSheet extends Module{

    render(){
        let props = this.props;
        return (
                <div>
                    <div className="am-action-sheet-mask" onClick={this.props.closeManage}></div>
                    <div className="am-action-sheet-wrap" onClick={this.props.closeManage}>
                        <div className="am-action-sheet am-action-sheet-normal">
                            <div className="am-action-sheet-content">
                                <button className="am-action-sheet-close">
                                    <span className="am-action-sheet-close-x"></span>
                                </button>
                                <div className="am-action-sheet-body">
                                    <div>
                                        <div className="am-action-sheet-button-list">
                                        <div className="am-action-sheet-button-list-item">
                                            <Button type='ghost' inline>取消</Button>
                                            <Button type='ghost' inline>确定</Button>
                                        </div>
                                            {this.props.manageList.map((item, index)=>{
                                                return  <div
                                                    key={index}
                                                    className="am-action-sheet-button-list-item"
                                                    onClick = {()=>{console.log(this.props)}}
                                                    
                                                >
                                                    {item}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
}
export default MyActionSheet;