import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { Picker } from 'antd-mobile';
import SearchBar from '../widget/seachBar';
import serveDetail from '../../containers/serveDetail';

function CustItem(props){
    let { onChange, extra, onClick} = props;
    return  <div
    className={"search-filter"}
    onClick={onClick}
><span style={{paddingRight:'8px', whiteSpace:'nowrap'}}>
    <span className="sl">| </span>
    <span className="sr">{extra}</span>
    <span className='triangle-down'></span></span>
    
</div>
}
class SearchBarWithPicker extends Module{
    constructor(props, context) {
        super(props, context);
        

    }
    bounce= (fn,arg) => {
        fn._bounceId && clearTimeout(fn._bounceId);
        fn._bounceId = setTimeout(() => {
            fn(arg);
        }, 300);
    }

    render(){
        let {placeholder, searchChange, pickerChange, data, pickerData} = this.props;
        return <div className='visit-object'><div className="htf_searchBar_filter"
        style={{position: 'fixed', top: '0px', left: '0', right: '0',zIndex:'999'}}
   >
       <div className="search-wrap">
           
           <form type='search' action="javascript:return true">
           <span className="search-synthetic-ph-icon"></span>
               <input
                   className="search-input"
                   type="search"
                   placeholder={placeholder}
                   onChange={(e) => {
                    this.bounce(searchChange, e.target.value.trim());
                   }}
               />
           </form>
           <div style={{display:'inline-block'}}><Picker data={pickerData} cols={1} value={[data.pickerValue]} onChange={pickerChange}>
               <CustItem/>
           </Picker></div>
           

       </div>
   </div>


   <div style={{height: '50px', backgroundColor:'white'}}></div></div>
    }
}
 export default SearchBarWithPicker;