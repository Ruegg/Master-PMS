import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewIssues extends React.Component {
  constructor(props){
    super(props);
    this.state = {issues: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/issues").then(res => res.json()).then(result => {
      this.setState({issues: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/issue/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.issues};
    return (
      <div>
        <h3 className="section-title">Issues</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/issue/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewIssues;
