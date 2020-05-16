import React from 'react';
import Module from '../../lib/module';
import { Picker } from 'antd-mobile';

class SeansonPicker extends Module{

    render(){
        let year = this.props.year, data = [], upper = new Date().getFullYear(), type = this.props.type, i = year;
        if(type === 1){
            i = 2018;
        }
        data.push({
            label: i,
            value: i,
            children:[{label: "第四季度", value: 4}]
        })
        i++;
        for(; i <= upper; i++){
            data.push({
                label: i,
                value: i,
                children: [{label: "第一季度", value: 1}, {label: "第二季度", value: 2},{label: "第三季度", value: 3},{label: "第四季度", value: 4},]
            })
        } 
 
        return (<div>
            <Picker cols='2' data={data} title={type === 1 ? "请选择起始日期" : "请选择终止日期"} extra={type=== 1 ? "至" :" "}  value={[year, this.props.season]} onChange={(val) => {this.props.onChange(val)}}>
                {this.props.children}
            </Picker>
        </div>)
    }
}
export default SeansonPicker;
