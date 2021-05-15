import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewChanges extends React.Component {
  constructor(props){
    super(props);
    this.state = {changes: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/changes").then(res => res.json()).then(result => {
      this.setState({changes: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/change/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.changes};
    return (
      <div>
        <h3 className="section-title">Changes</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/change/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewChanges;
