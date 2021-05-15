import React,{Component} from 'react'

import { Router, Route,Link } from 'react-router-dom';

class SmartViewTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {sortByIndex: 0, sortValue: 1};

    this.newSortIndex = this.newSortIndex.bind(this);
  }

  componentDidMount(){
  }

  newSortIndex(i){
    if(i == this.state.sortByIndex){
      this.setState({sortValue: this.state.sortValue*-1});
    }else{
      this.setState({sortByIndex: i});
    }
  }
  render(){

    var tableInfo = this.props.data;

    var header = tableInfo.tableHead;

    if(header == null){
      return (<div></div>);
    }

    var willView = tableInfo.options.view;

    var headerSortingBy = header[this.state.sortByIndex].key;


    var tableHeaders = header.map((head,i) => <td className={(i == this.state.sortByIndex ? "sorting-header" : "")} onClick={() => {this.newSortIndex(i)}}>{head.title}</td>);

    tableInfo.data = tableInfo.data.sort((a, b) => (a[headerSortingBy] > b[headerSortingBy]) ? this.state.sortValue : (-1*this.state.sortValue));

    if(willView){
      tableHeaders.push(<td>Views</td>);
    }

    var tableHead = <tr className="smart-headers">{tableHeaders}</tr>;

    var tableEntries = tableInfo.data.map(data => {

      var theseColumns = [];
      for(var head of header){
        theseColumns.push(<td>{data[head.key]}</td>);
      }

      if(willView){
        theseColumns.push(<td>
            <Link className="view-btn" to={tableInfo.options.viewPrefix + data["id"]}>Info</Link>
        </td>);
      }

      var thisEntry = <tr>{theseColumns}</tr>;
      return thisEntry;
    });

    var table = (
    <table className="smart-table">
      {tableHead}
      {tableEntries}
    </table>
    );
    return (
      <div>
        {table}
      </div>
    );
  }
}

export default SmartViewTable;
