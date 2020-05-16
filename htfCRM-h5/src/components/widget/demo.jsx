import React from 'react';
import Module from '../../lib/module';
import CustTable from './custTable';
import Mock from 'mockjs';
import SideLabel from './sideLabel';
const R = Mock.Random;
class Demo extends Module{


    render(){
        
        let headers = [], rows = [];
        headers[0] = [];
        for(let i = 0; i < 10; i++){
            headers[0].push({
                value: R.ctitle()
            })
        }
        for(let i = 0; i < 5; i++){
            let cur = [];
            for(let i =0; i < 10; i++){
                cur.push({ value: R.float(10000,1000000, 0,99)});
            }
            rows.push(cur);
        }
        console.log(headers);
        return <div>
            <SideLabel content={'啦啦啦啦啦啦啦'} extra={'good'}/>
            <CustTable headers={headers} rows={rows}/></div>
    }
}
export default Demo;