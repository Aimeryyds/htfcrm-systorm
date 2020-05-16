//个体编辑的组件
import React from 'react';
import Module from '../../lib/module';
import { List, InputItem, Picker, DatePicker} from 'antd-mobile';
//props {header: 标题，data:[{title: list标题, type: 0为input({data:placeholder})，1为picker, 2为日期选择器}]}
const CusItem = ({onClick, extra, children}) => {
    return (<div onClick={onClick} style={{display:"flex", alignItems:'strentch', justifyContent:"space-between"}}>
        {children}
    </div>)
}
class EditList extends Module{
    constructor(props, context){
        super(props, context);
    }
    render(){
        if(this.props.header == "联系人信息"){//机构客户中的联系人信息
            return(<div className="contact">
                <List style={{position:"relative"}} renderHeader={() => (<div>{this.props.header}<span style={{display: "inline-block", position: "absolute", right:"20px", fontWeight:"bolder", fontSize:"20px", top:"8%"}} onClick={this.props.data.addContact}>+</span></div>)}>
                    {this.props.data.list.map((contact) => {return (<InputItem  key={contact.contactid} extra={<span style={{width:"18px", height:"18px", border:"2px solid #888888", borderRadius:"50%", display:"inline-block", textAlign:"center", lineHeight:"15px", fontWeight:"bolder", fontSize:"5px" }} onClick={()=>{this.props.data.deleteContact(contact.contactid)}}>一</span>} editable={false}>{<span style={{color:"blue"}} onClick={()=>{this.props.data.editLinkMan(contact.contactid)}}>{contact.name}</span>}</InputItem>)})}
                </List>
            </div>)
        }
        return (<div>
            <List renderHeader={() => this.props.header }>
                {this.props.data.map((obj, index) => {
                    if(obj.type === 0){
                        return (<InputItem placeholder={ obj.value } onChange={(val)=>{this.props.inputChange(obj.title, val)}} key={index} type = {["联系电话", "邮编", "手机号码"].indexOf(obj.title) >= 0 ? "number" :["现有保有量(元)","历史最高保有量(元)"].indexOf(obj.title) >= 0 ? "money":"text"} moneyKeyboardAlign="left" clear>{obj.title}</InputItem>)
                    }
                    else if(obj.type === 1){
                        return (<Picker data={obj.options} onChange={(val)=> {this.props.pickerChange(obj.title, val)}}  cols={1} key={index} value={[obj.value]}>
                       <CusItem> <InputItem placeholder={typeof obj.value === "boolean" ? obj.value ? "是" : "否" : obj.value} editable={false}>{obj.title}</InputItem><div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6", display:'flex', alignItems:'center', justifyContent:'flex-end'}}><span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span></div></CusItem>
                    </Picker>)}
                    else if(obj.type === 2){ //日期选择
                        return (<DatePicker minDate={new Date(1800,1,1)} mode="date" onChange={(val)=> {this.props.pickerChange(obj.title, val)}} extra={<span className="iconfont icon-kgengduo color_ui"></span>} cols={1} key={index}>
                        <InputItem placeholder={obj.value} editable={false}>{obj.title}</InputItem>
                    </DatePicker>)
                    }
                    else if(obj.type === 3){//必须输入 type=3
                        return (<InputItem placeholder={obj.value} onChange={(val)=>{this.props.inputChange(obj.title, val)}} key={index} clear ><span className="required">*</span>{obj.title}</InputItem>)
                    }
                    else{//直属上司，点击出现抽屉
                        return (<CusItem key={index} onClick={obj.handler}><InputItem placeholder={obj.value}   clear  editable={false}>{obj.title}</InputItem><div style={{flexGrow:'1',  borderBottom:"1px solid #f6f6f6",display:'flex', alignItems:'center', justifyContent:'flex-end'}}><span className="iconfont icon-kgengduo color_ui" style={{marginRight:"15px"}}></span></div></CusItem>)
                    }
                    
                })}
            </List>
        </div>)
    }
}
export default EditList;