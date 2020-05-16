import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//自定义表格，接收headers: [[{}]], rows: [ [{}] ], 单元格对象包括colSpan:默认为1， rowSpan:默认为1，value:值,默认展示四行，点击展示更多
class CustTable extends Module{

    render(){
        let { rows, showMore, sorted, handleSort, ...rest} = this.props;
        rows = rows || [];
        let tableWidth = document.body.clientWidth * 1.5;

        return (
            <div style={{overflowX: 'scroll'}}>

                <div style={{position: 'absolute', top: '0', left: '0', backgroundColor: '#FFF', width: '150px', overflow: 'hidden'}}>
                    <table className="cust_table" style={{width: tableWidth}} >
                        <thead>
                        <tr>
                            <th style={{width: '150px'}} className={sorted !== -1 ? "ui_color" : ''} onClick={() => handleSort()}>
                                日期
                                <sapn className={sorted === -1 ? "iconfont icon-paixumoren" : (sorted === 0 ? 'iconfont ui_color icon-shengxu' : 'iconfont ui_color icon-jiangxu')} style={{fontSize: '10px'}}></sapn>
                            </th>
                            <th>
                                三方平台
                            </th>
                            <th>
                                产品名称
                            </th>
                            <th>
                                产品代码
                            </th>
                            <th style={{width: '120px'}}>
                                累计认购金额（元）
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            rows.map((items, index) => {
                                if(showMore || (!showMore && index < 4)) {
                                    return <tr key={index}>
                                        { items.map((item, i) => {
                                            return <td colSpan={item.colSpan || 1} rowSpan={item.rowSpan || 1} key={i} className={item.className || ''}>
                                                {item.value}
                                            </td>

                                        })}
                                    </tr>
                                }
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <table className="cust_table" {...rest} >
                    <thead>
                    <tr>
                        <th style={{width: '150px'}} className={sorted !== -1 ? "ui_color" : ''} onClick={() => handleSort()}>
                            日期
                            <sapn className={sorted === -1 ? "iconfont icon-paixumoren" : (sorted === 0 ? 'iconfont ui_color icon-shengxu' : 'iconfont ui_color icon-jiangxu')} style={{fontSize: '10px'}}></sapn>
                        </th>
                        <th>
                            三方平台
                        </th>
                        <th>
                            产品名称
                        </th>
                        <th>
                            产品代码
                        </th>
                        <th style={{width: '120px'}}>
                            累计认购金额（元）
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rows.map((items, index) => {
                            if(showMore || (!showMore && index < 4)) {
                                return <tr key={index}>
                                    { items.map((item, i) => {
                                        return <td colSpan={item.colSpan || 1} rowSpan={item.rowSpan || 1} key={i} className={item.className || ''}>
                                            {item.value}
                                        </td>

                                    })}
                                </tr>
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>

        )
    }
}
export default CustTable;


// { headers.length > 0 && <thead>
// {
//     headers.map((items,index) => {
//         return (
//             <tr key={'head' + index}>
//                 { items.map( (item, i) => {
//                     return <th
//                         colSpan={item.colSpan || 1}
//                         rowSpan={item.rowSpan || 1}
//                         key={'head' + index + 'th'+i}
//                         className={item.className || ''}
//                         style={item.style}
//                     >
//                         {item.value}
//                     </th>
//                 })}
//             </tr>
//         )
//
//     })
// }
// </thead>}