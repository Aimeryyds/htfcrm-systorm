import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Picker, InputItem, List, WhiteSpace, DatePicker, Button, Modal, Drawer } from 'antd-mobile';
import Textarea from '../widget/textarea';
import OurPeopleList from './ourlist';                          //我方人员弹框
import VisitObject from './visitobject';                    //拜访对象弹框
import { format } from 'util';
const Alert = Modal.alert;
function CustItem(props) {
    let { children, extra, onClick } = props;
    
    return <InputItem placeholder={'请选择'} onClick={onClick} editable={false} className='cust-item' value={extra == '请选择' ? '' : extra}>{children}</InputItem>
}
const Item = List.Item;
function formateDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
}
class EditVisit extends Module {
    constructor(props, context) {
        super(props, context);
       
        this.state = {
            data: {
                theme: '',    //主题
                visitType: '', //拜访方式
                whom: '',    //拜访对象
                beginTime: new Date(), //开始时间
                endTime: new Date(),   //结束时间
                // status: 0,    //活动状态, 已开始，已取消，已完成， 编辑时不需要
                priority: 1,   //优先级, 高正常低
                theirContacts: '',    //对方联系人
                place: '',              //拜访地点
                ourPeople: '',        //我方人员
                content: '',            //沟通内容
                opinion: '',     //意见
                question: '',              //问题
                difficulty: '',      //工作难点
                username: '',                //负责人
                custtype: '',         //0:事实客户，1：潜客，2：三方
            },
            dropdowns: {
                visitType: [],                 //拜访方式

            },
            shouldLeave: false,            //是否能离开
            valueOfLocal: 0,                //实地拜访的值
            drawOpen: false,            //是否打开抽屉
            drawType: 0,              //抽屉sidebar类型， 0为拜访对象，1为我方人员
        }

    }
    // shouldLeave = () => {
    //     console.log(this.state.shouldLeave, this.props.route);
    //     if (!this.state.shouldLeave) {
    //         Alert("当前内容还未保存", "是否离开", [
    //             { text: '取消', onPress: () => { this.setState({ shouldLeave: false }) }, style: 'default' },
    //             {
    //                 text: '确定', onPress: () => {
    //                     this.setState({ shouldLeave: true }, () => {
    //                         // this.context.router.goBack()
    //                         history.back();
    //                         // this.props.navigation.goBack();
    //                     })
    //                 }
    //             },
    //         ]);

    //         return false;
    //     }
    //     else{
    //         return true;

    //     }
    // }
    getUserInfor() {
        //获取登录人信息
        this.request({
            api: 'GetUserInfo',
        }, (res) => {
            let name = res.data && res.data.name;
            let data = this.state.data;
            data.username = name;
            this.setState({
                data
            })
        })
    }

    leaveHoldH5() {
        if(window.leaveHoldH5Show) {return;}
        window.leaveHoldH5Show = true;
        Alert("当前内容还未保存", "是否离开", [
            {
                text: '取消',
                onPress: () => {
                    this.setState({
                        canLeave: false
                    });
                    window.leaveHoldH5Show = false;
                },
                style: 'default'
            },
            {
                text: '确定',
                onPress: () => {
                    this.setState({
                        canLeave: true
                    }, () => this.context.router.goBack());
                    window.leaveHoldH5Show = false;
                }
            },
        ]);
    };
    
    componentDidMount() {
        //如果是添加，则导入初始记录
        let { type } = this.props.location.query;
        document.title = '拜访记录';
        this.getDropdowns();
        this.getUserInfor();
       
        // window.onpopstate = () => {
        //     history.pushState({}, '',"/#/EditVisit");
        //     window.onpopstate = function(){}
        //     // console.log(history);
        // }
        //获取下拉框选项

        //路由离开hook
        // this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
        window.leaveHoldH5 = this.leaveHoldH5.bind(this);

    }

    componentWillUnmount(){
        // this.context.router.unregisterTransitionHook(this.routerWillLeave);
        window.leaveHoldH5 = null;
        window.leaveHoldH5Show = false;
    }


    getDetail() {
        //编辑初始化数据
        this.request({
            api: 'ServeDetail',
            params: {
                id: this.props.location.query.id
            }
        }, (res) => {
            let priorities = ['高', '正常', '低'];

            let _data = res.data, data = this.state.data;
            data.theme = _data.SUBJECT;
            data.visitType = this.getDropDownValue(_data.VISITTYPE, 'visitType')[0];
            data.beginTime = new Date(_data.VISITSTARTTIME);
            data.endTime = new Date(_data.VISITENDTIME);
            data.priority = priorities.indexOf(_data.priority);
            data.theirContacts = _data.contactperson;
            data.ourPeople = _data.USERID;
            data.content = _data.GTcontent;
            data.whom = {}
            data.whom.name = _data.PACCOUNT;
            data.whom.id = _data.PACCOUNTID;
            data.place = _data.ADDRESS;
            this.setState({
                data,
            })
        })
    }
    getDropDownValue = (val, type) => {
        if (typeof val == 'number') {
            return [val];
        }
        else {
            let dp = this.state.dropdowns[type];
            let item = dp.find(item => item.label == val);
            if (item) {
                console.log(item);
                return [item.value];
            } else {
                return [-1];
            }

        }

    }
    getDropdowns() {
        let apis = ['getVisitType'], promises = [], keys = ['visitType'], dropdowns = {};
        let { type } = this.props.location.query;

        for (let api of apis) {
            promises.push(this.requestPromise({
                api,
                params: {
                    type: (type === "0") ? true : false
                }
            }));
        }

        console.log((type === "0") ? true : false)
        Promise.all(promises).then((res) => {
            res.forEach((data, index) => {
                let cur = data.data, _keys = Object.keys(cur), re = [];
                for (let key of _keys) {
                    re.push({ label: cur[key], value: parseInt(key) });
                }
                dropdowns[keys[index]] = re
            });
            console.log(dropdowns);
            let _vistType = dropdowns['visitType'], valueOfLocal = _vistType.findIndex(item => item.label == '实地拜访');


            this.setState({
                dropdowns,
                valueOfLocal,
            }, () => {
                let {type} = this.props.location.query;
                if(type == 1){
                    this.getDetail();
                }
            })
        })

    }
    changeVisit = (obj, custtype) => {
        //改变拜访对象
        let data = this.state.data;
        data.whom = obj;
        data.custtype = custtype;
        this.setState({
            data,
            drawOpen: false
        })

    }
    changeOurPeople = (obj) => {
        //改变我方人员
        let data = this.state.data;
        data.ourPeople = obj;
        this.setState({
            data,
            drawOpen: false
        })
    }
    changePicker = (picker, key) => {
        let { data } = this.state;
        data[key] = picker[0];
        this.setState({
            data
        })
    }
    verify = () => {
        //验证表单
        let keys = ['theme', 'visitType', 'whom', 'beginTime', "endTime"], titles = ['交流主题', '拜访方式', '拜访对象', '开始时间', '结束时间'], unfinish = [], data = this.state.data;
        keys.forEach((item, index) => {
            if (data[item] === '') {
                unfinish.push(titles[index]);
            }
        });
        return unfinish;
    }
    save = () => {
        let unfinish = this.verify(), api = 'AddVisitRecord', pathname = 'ServeDetail';
        let { type } = this.props.location.query;
        if (unfinish.length == 0) {
            
        } else {
            let required = unfinish.join('、');
            Alert('请填写' + required, '', [{ text: '关闭' }])
            return;
        }
        //处理数据
        let { data } = this.state, params = {},
            paramsKey = ['SUBJECT', 'OVISITTYPE', 'priority', 'contactperson', 'ADDRESS', 'Gtcontent'],
            dataKey = ['theme', 'visitType', 'priority', 'theirContacts', 'place', 'content'];

        if (type == 1) {
            paramsKey = ['subject', 'visittype', 'prioritycode', 'contact', 'address', 'content'];
            params.id = this.props.location.query.id;
            pathname = 'ServeDetail';
        }

        paramsKey.forEach((item, index) => {
            params[item] = data[dataKey[index]];
        })
        //处理时间格式和拜访对象，我方人员
        if (type == 0) {
            params['VISITSTARTTIME'] = formateDate(data.beginTime);
            params['VISITENDTIME'] = formateDate(data.endTime);
            params['PACCOUNTID'] = data.whom && data.whom.id;
            params['USERID'] = data.ourPeople&& data.ourPeople.id;
        }else{
            params['starttime'] = typeof data.beginTime == 'object' ? formateDate(data.beginTime) : data.beginTime;
            params['endtime'] = typeof data.endTime == 'object'? formateDate(data.endTime) : data.endTime;
            params['objectid'] = data.whom && data.whom.id;
            params['systemuserid'] = data.ourPeople&& data.ourPeople.id;
            if(typeof params['visittype'] == 'string'){ //如果是传过来的
                let types = this.state.dropdowns.visitType;
                let curd = types.find((item) => item.label == params['visittype']);
                curd && (params['visittype'] = curd.value);
            }

        }
        params.custtype = data.custtype;                     //新增字段
        //发起post请求
        if (type == 1) {
            api = 'UpdataVisit';
        }
        this.request({
            api: api,
            type: 'post',
            params
        }, (res)=> {
            this.setState({
                shouldLeave: true,
            }, ()=> {
                let query = { type: 1};
                if(type == 1){
                    query.id = this.props.location.query.id;
                }else{
                    query.id = res.data.id;
                }
                this.context.router.goBack()
            })
        })

    }
    render() {
        let { type } = this.props.location.query;
        let { data, dropdowns, valueOfLocal, drawType, drawOpen } = this.state;
        return (<div className='edit-visit'>
            <Drawer
                sidebar={drawType ? <OurPeopleList changeOurPeople={this.changeOurPeople} /> : <VisitObject changeVisit={this.changeVisit} />}
                open={drawOpen}
                onOpenChange={(val) => {this.setState({ drawOpen: val })}}
                position='right'
                sidebarStyle={{ width: '80%', height: '100%' }}
            >
            <WhiteSpace size='lg' className='bg_f6' />
            <div className='content'>
            <List>
                <InputItem
                    placeholder='请输入'
                    value={data.theme}
                    onChange={(val) => {
                        data.theme = val;
                        this.setState({
                                data,
                            })
                        }
                    }
                >
                    <span className='required'>*</span>
                    交流主题
                </InputItem>

                <Picker
                    cols='1'
                    data={dropdowns.visitType}
                    disabled={ type === "1" && true }
                    onChange={(val) => {
                        this.changePicker(val, 'visitType');
                    }}
                    value={this.getDropDownValue(data.visitType, 'visitType')}
                >
                    <CustItem>
                        <span className='required'>*</span>
                        拜访方式
                    </CustItem>
                </Picker>

                <Item onClick={() => {
                    this.setState(
                        {
                            drawOpen: true,
                            drawType: 0,
                        }
                    )
                }} extra={data.whom ? <span className='input-value'>{data.whom.name}</span>:"请选择"}><span className='required'>*</span>拜访对象</Item>

                <DatePicker onChange={(date) => {
                    data.beginTime = date;
                    this.setState({
                        data,
                    })
                }} value={data.beginTime} mode='datetime'>
                    <CustItem><span className='required'>*</span>开始时间</CustItem>
                </DatePicker>
                <DatePicker onChange={(date) => {
                    data.endTime = date;
                    this.setState({
                        data,
                    })
                }} value={data.endTime} minDate={data.beginTime} mode='datetime'>
                    <CustItem><span className='required'>*</span>结束时间</CustItem>
                </DatePicker>
                {/* <Picker cols='1' value={[data.status]} data={[{ label: '已开启', value: 0 }, { label: '已取消', value: 1 }, { label: '已完成', value: 2 }]} onChange={(val) => { this.changePicker(val, 'status')}}><CustItem><span className='required'>*</span>活动状态</CustItem></Picker> */}
                {/* <Picker cols='1' value={[1]} data={[{ label: '高', value: 0 }, { label: '正常', value: 1 }, { label: '低', value: 2 }]} value={[data.priority]} onChange={(val) => { this.changePicker(val, 'priority') }}><CustItem>
                    优先级</CustItem></Picker> */}

                <InputItem placeholder='请输入' onChange={(val) => {
                    data.theirContacts = val;
                    this.setState({
                        data,
                    })
                }} value={data.theirContacts}>相关联系人</InputItem>

                {
                    (data.visitType == valueOfLocal && type === "1") &&
                    <InputItem
                        placeholder='请输入'
                        onChange={(val) => {
                            data.place = val;
                            this.setState({
                                data,
                            })
                        }}
                        disabled={ true }
                        value={data.place}
                    >
                        会议地点
                    </InputItem>
                }
                
                {/* <Item onClick={() => { this.setState({ drawOpen: true, drawType: 1 }) }} extra={data.ourPeople.name ? <span className='input-value'>{data.ourPeople.name}</span>:"请选择"}>我方人员</Item> */}

                <InputItem placeholder={data.username} editable={false}>负责人</InputItem>
                <WhiteSpace className='bg_f6' size='lg' />
                <Textarea header='沟通内容' onChange={(val) => {
                    data.content = val;
                    this.setState({
                        data
                    })
                }} value={data.content} />
                {/* <WhiteSpace className='bg_f6' size='lg' />
                <Textarea header='意见' onChange={(val) => {
                    data.opinion = val;
                    this.setState({
                        data,
                    })
                }} value={data.opinion}/>
                <WhiteSpace className='bg_f6' size='lg' />
                <Textarea header='问题'  onChange={(val) => {
                    data.question = val;
                    this.setState({
                        data,
                    })
                }} value={data.question}/>
                <WhiteSpace className='bg_f6' size='lg' />
                <Textarea header='工作难点'  onChange={(val) => {
                    data.difficulty = val;
                    this.setState({
                        data,
                    })
                }} value={data.difficulty}/> */}

            </List>
            </div>
            <div style={{ padding: '30px 15px', backgroundColor: '#f6f6f6' }}>
                <Button style={{ color: 'white' }} onClick={this.save}>保存</Button>
            </div>
        </Drawer>
        </div>)
    }
}
export default EditVisit