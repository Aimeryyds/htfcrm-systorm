import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module'
import moment from 'moment'

import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';


let emji = {
    "#:z": <img src={require('../../resources/images/emoticons/smiley_01.png')}/>,
    "#-.-": <img src={require('../../resources/images/emoticons/smiley_02.png')}/>,
    "#:D": <img src={require('../../resources/images/emoticons/smiley_03.png')}/>,
    "#:)": <img src={require('../../resources/images/emoticons/smiley_04.png')}/>,
    "#:]": <img src={require('../../resources/images/emoticons/smiley_05.png')}/>,
    "#;-L": <img src={require('../../resources/images/emoticons/smiley_06.png')}/>,
    "#;-D": <img src={require('../../resources/images/emoticons/smiley_07.png')}/>,
    "#:<": <img src={require('../../resources/images/emoticons/smiley_08.png')}/>,
    "#*_*": <img src={require('../../resources/images/emoticons/smiley_09.png')}/>,
    "#+_+": <img src={require('../../resources/images/emoticons/smiley_10.png')}/>,
    "#>_<": <img src={require('../../resources/images/emoticons/smiley_11.png')}/>,
    "#^_+": <img src={require('../../resources/images/emoticons/smiley_12.png')}/>,
    "#;P": <img src={require('../../resources/images/emoticons/smiley_13.png')}/>,
    "#0o0": <img src={require('../../resources/images/emoticons/smiley_14.png')}/>,
    "#:-D": <img src={require('../../resources/images/emoticons/smiley_15.png')}/>,
    "#ToT": <img src={require('../../resources/images/emoticons/smiley_16.png')}/>,
    "#>P": <img src={require('../../resources/images/emoticons/smiley_17.png')}/>,
    "#z_z": <img src={require('../../resources/images/emoticons/smiley_18.png')}/>,
    "#-_,-": <img src={require('../../resources/images/emoticons/smiley_19.png')}/>,
    "#^_^": <img src={require('../../resources/images/emoticons/smiley_20.png')}/>,
    "#>o<": <img src={require('../../resources/images/emoticons/smiley_21.png')}/>,
    "#;<": <img src={require('../../resources/images/emoticons/smiley_22.png')}/>,
    "#@_@": <img src={require('../../resources/images/emoticons/smiley_23.png')}/>,
    "#+o+": <img src={require('../../resources/images/emoticons/smiley_24.png')}/>,
    "#;z*": <img src={require('../../resources/images/emoticons/smiley_25.png')}/>,
    "#x_x": <img src={require('../../resources/images/emoticons/smiley_26.png')}/>,
    "#.-b": <img src={require('../../resources/images/emoticons/smiley_27.png')}/>,
    "#@,@": <img src={require('../../resources/images/emoticons/smiley_28.png')}/>,
    "#>-<": <img src={require('../../resources/images/emoticons/smiley_29.png')}/>,
    "#:-<": <img src={require('../../resources/images/emoticons/smiley_30.png')}/>,
    "#(cute)": <img src={require('../../resources/images/emoticons/smiley_31.png')}/>,
    "#(bh)": <img src={require('../../resources/images/emoticons/smiley_32.png')}/>,
    "#(b)": <img src={require('../../resources/images/emoticons/smiley_33.png')}/>,
    "#(g)": <img src={require('../../resources/images/emoticons/smiley_34.png')}/>,
    "#-@": <img src={require('../../resources/images/emoticons/smiley_35.png')}/>,
    "#(p)": <img src={require('../../resources/images/emoticons/smiley_36.png')}/>,
    "#(18)": <img src={require('../../resources/images/emoticons/smiley_37.png')}/>,
    "#(kiss)": <img src={require('../../resources/images/emoticons/smiley_38.png')}/>,
    "#(flag)": <img src={require('../../resources/images/emoticons/smiley_39.png')}/>,
    "#(d)": <img src={require('../../resources/images/emoticons/smiley_40.png')}/>,
    "#(pig)": <img src={require('../../resources/images/emoticons/smiley_41.png')}/>,
    "#(bg)": <img src={require('../../resources/images/emoticons/smiley_42.png')}/>,
    "#(qiu)": <img src={require('../../resources/images/emoticons/smiley_43.png')}/>,
    "#(dance)": <img src={require('../../resources/images/emoticons/smiley_44.png')}/>,
    "#(good)": <img src={require('../../resources/images/emoticons/smiley_45.png')}/>,
    "#(bingo)": <img src={require('../../resources/images/emoticons/smiley_46.png')}/>,
    "#(ok)": <img src={require('../../resources/images/emoticons/smiley_47.png')}/>,
    "#(strong)": <img src={require('../../resources/images/emoticons/smiley_48.png')}/>,
    "#(b3g)": <img src={require('../../resources/images/emoticons/smiley_49.png')}/>,
    "#(blg)": <img src={require('../../resources/images/emoticons/smiley_50.png')}/>,
    "#(yoga)": <img src={require('../../resources/images/emoticons/smiley_51.png')}/>,
    "#(cut)": <img src={require('../../resources/images/emoticons/smiley_52.png')}/>,
    "#(head)": <img src={require('../../resources/images/emoticons/smiley_53.png')}/>,
    "#(no)": <img src={require('../../resources/images/emoticons/smiley_54.png')}/>,
    "#(^L)": <img src={require('../../resources/images/emoticons/smiley_55.png')}/>,
    "#(love)": <img src={require('../../resources/images/emoticons/smiley_56.png')}/>
};

let downHref = "/CustomerServiceContactRecord/InstantMessagingFileDownload";

class Detail2 extends Module {
    constructor(props, context) {
        super(props, context);
        this.state = {
            emojiKeysArr: []
        }
    }

    componentDidMount() {
        this.emojiKeys();
    }

    emojiKeys() {
        let _arr = [];
        for(let x in emji) {
            _arr.push(x);
        }
        this.setState({
            emojiKeysArr: _arr
        })
    }

    //日期格式化
    dataForment(data) {
        return moment(data).format('YYYY/MM/DD hh:mm:ss');
    }

    //文本格式化
    formatText(text) {
        let { emojiKeysArr } = this.state;
        if(text.content) {
            if(text.content.indexOf('#')>-1) {
                let _text = text.content;
                let _textArr = [];          //字符串转数组
                let _textArrStr = [];          //字符串转数组-组
                let _regPoint = [];
                let resArr = []

                _textArr = _text.split('');
                _textArr.map((item, index) => {
                    if(item === "#") {
                        _regPoint.push(index);
                    }
                });
                // console.log(_regPoint)
                _regPoint.map((item, index) => {
                    _textArrStr.push(_text.substring(_regPoint[index-1], item));
                    if(index === _regPoint.length-1) {
                        _textArrStr.push(_text.substring(item, _text.length))
                    }
                });

                emojiKeysArr.map((item ,index) => {
                    _textArrStr.map((item_a, index_a) => {
                        let _index = item_a.indexOf(item);        //判断map中表情是都存在于字符串
                        if(_index > -1) {
                            let _len = item.length;
                            _textArrStr[index_a] = [item_a.substring(0, _len), item_a.substring(_len, item_a.length) ];
                        }
                    })
                });

                // console.log(_textArrStr)
                return _textArrStr
            } else {
                return [text.content];
            }

        } else {
            return [];
        }
    }

    handleVoice(data) {
        let _h = downHref
            + "?fileid=" + data.voice.fileid
            + "&range=0-" + (data.voice.filesize -1)
            + "&filesize=" + data.voice.filesize
            + "&toid="+ data.toid
            + "&filename=" + data.voice.filename
            + "&filetype=" + data.message_category;
        return _h;
    }

    handlePic(data) {
        let _h = downHref
            + "?fileid=" + data.pic.fileid
            + "&range=0-" + (data.pic.filesize -1)
            + "&filesize=" + data.pic.filesize
            + "&toid="+ data.toid
            + "&filename=" + data.pic.filename
            + "&filetype=" + data.message_category;
        return _h;
    }

    handleFile(data) {
        let _h = downHref
            + "?fileid=" + data.file.fileid
            + "&range=0-" + (data.file.filesize -1)
            + "&filesize=" + data.file.filesize
            + "&toid="+ data.toid
            + "&filename=" + data.file.filename
            + "&filetype=" + data.message_category;
        return _h;
    }

    handleVideo(data) {
        let _h = downHref
            + "?fileid=" + data.video.fileid
            + "&range=0-" + (data.video.filesize -1)
            + "&filesize=" + data.video.filesize
            + "&toid="+ data.toid
            + "&filename=" + data.video.filename
            + "&filetype=" + data.message_category;
        return _h;
    }

    handleEmoji(data) {
        if(Array.isArray(data)) {
            return data.map((item, index) => {
                return emji[item] ? <span key={'b'+index}>{ emji[item] }</span> :
                    <span key={'b'+index} style={{verticalAlign: 'middle', display: 'inline-block', lineHeight: '30px'}}>{ item }</span>;
            })
        } else {
            return data
        }

    }
    
    render() {
        let storage = window.localStorage;
        let serveMessageDetail = storage.getItem('serveMessageDetail');
        let data = JSON.parse(serveMessageDetail);

        return <div className="">
            <WhiteSpace size="lg" className="bg_f5"/>
            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <div className="fs_16">
                    { data.message_history[0].toName }
                </div>
            </div>

            <div style={{borderBottom: '1px solid #f6f6f6', padding: '20px 10px'}}>
                <Flex className="mb_15">
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送人</div>
                        <div className="fs_14 color333">{ data.message_history[0].fromName }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">发送时间</div>
                        <div className="fs_14 color333">{ this.dataForment(data.message_history[0].createTime) }</div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">接收人</div>
                        <div className="fs_14 color333">{ data.message_history[0].toName }</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fs_12 color999 mb_5">创建时间</div>
                        <div className="fs_14 color333">{ this.dataForment(data.message_history[0].createTime) }</div>
                    </Flex.Item>
                </Flex>
            </div>

            <div style={{padding: '20px 10px'}}>
                <div className="fs_12 color999 mb_10">消息内容</div>

                {
                    data.message_history.map((item, index)=>{
                        return (
                            <div key={index}>
                                <div className="fs_14 color333 mb_10">
                                    { this.dataForment(item.createTime) }
                                </div>
                                {
                                    //文本-含表情
                                    item.message_category === -1 &&
                                    <div className="mb_20">
                                        {
                                            this.formatText(item.text).map((item, index) => {
                                                return <span key={'a'+index} className="HFT_emojiImg" style={{verticalAlign: 'middle', display: 'inline-block'}} key={index}>
                                                    { this.handleEmoji(item) }
                                                </span>
                                            })
                                        }
                                    </div>
                                }
                                {
                                    //图片
                                    item.message_category === 0 &&
                                    <div className="mb_20">
                                        <a style={{color: '#1890ff'}} href={this.handlePic(item)} >
                                            点击查看图片
                                        </a>
                                    </div>
                                }
                                {
                                    //语音
                                    item.message_category === 1 &&
                                    <div className="mb_20">
                                        <a style={{color: '#1890ff'}} href={this.handleVoice(item)}>
                                            点击查看语音
                                        </a>
                                    </div>
                                }
                                {
                                    //文件
                                    item.message_category === 2 &&
                                    <div className="mb_20">
                                        <a style={{color: '#1890ff'}} href={this.handleFile(item)}>
                                            点击查看文件
                                        </a>
                                    </div>
                                }
                                {
                                    //视频
                                    item.message_category === 3 &&
                                    <div className="mb_20">
                                        <a style={{color: '#1890ff'}} href={this.handleVideo(item)}>
                                            点击查看视频
                                        </a>
                                    </div>
                                }

                            </div>
                        )
                    })
                }

            </div>



        </div>
    }
}

export default Detail2;