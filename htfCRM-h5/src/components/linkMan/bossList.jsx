import { ListView , List} from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import Module from '../../lib/module';
const Item = List.Item;
function Body(props) {
  return (
    <div className="am-list-body my-body">
      
      {props.children}
    </div>
  );
}
class BossList extends Module {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 1,
      height: document.documentElement.clientHeight * 3 /4
    }
  }
  componentDidMount(){
    
    
  }
  onEndReached = (e)=>{
    console.log(e);
    this.props.end();
  }
  render() {
    let listData = this.props.listData;
    let sectionIDs = ["Value"];
    let rowIDs = [listData.Value.map((item, index) => index)];
    const row = (rowData, sectionId, rowId) => {

      return (<Item onClick={() => this.props.changeBoss(rowData[rowId].id,rowData[rowId].name)}>{rowData[rowId].name}{rowData[rowId].telephone}</Item>)
    }
    let height = this.state.height;
    return (<div>
      <ListView
        ref={el => this.lv = el}
        dataSource={
          new ListView.DataSource({
            getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID],
            getSectionHeaderData: (dataBlob, sectionID) => sectionID,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            rowHasChanged: (row1, row2) => row1 !== row2
          }
          ).cloneWithRowsAndSections(
            listData,
            sectionIDs,
            rowIDs
          )
        }
        style={{
          height: "812px",
          overflow: 'auto'
        }}
        renderBodyComponent={()=><Body/>}
        renderRow={row}
        initialListSize={20}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        renderFooter={() => { 
          if(listData['Value'].length === 0)
            return (<div style={{ textAlign: 'center' }}>未搜索到结果</div>)
          return   (<div style={{ textAlign: 'center' }}>
          {this.props.loading ? '加载中...' : '' ||
          !this.props.hasMore && '没有更多了'}
        </div>)}}
        onScroll={(e) => console.log(e)}
      />
    </div>)
  }
}
export default BossList;