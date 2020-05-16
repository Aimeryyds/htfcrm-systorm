import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
//自定义表格，接收headers: [[{}]], rows: [ [{}] ], 单元格对象包括colSpan:默认为1， rowSpan:默认为1，value:值
class CustTable extends Module{


    render(){
        let { headers, rows, ...rest} = this.props;
        headers = headers || [], rows = rows || [];
        return (<table className="cust_table" {...rest}>
            { headers.length > 0 && <thead>
                {
                    headers.map((items,index) => {
                        return (
                            <tr key={'head' + index}>
                                { items.map( (item, i) => {
                                    return <th colSpan={item.colSpan || 1} rowSpan={item.rowSpan || 1} key={'head' + index + 'th'+i} className={item.className || ''} >
                                        {item.value}
                                    </th>
                                })}
                            </tr>
                        )

                    })
                }
            </thead>}
            <tbody>
            {
                rows.map((items, index) => {
                    return <tr key={"row" + index}>
                        { items.map((item, i) => {
                            return <td colSpan={item.colSpan || 1} rowSpan={item.rowSpan || 1} key={'tr'+index + 'td'+i} className={item.className || ''}>
                                {item.value}
                            </td>
                        })}
                    </tr>
                })
            }
            </tbody>
        </table>)
    }
}
export default CustTable;