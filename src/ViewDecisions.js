import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewDecisions extends React.Component {
  constructor(props){
    super(props);
    this.state = {decisions: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/decisions").then(res => res.json()).then(result => {
      this.setState({decisions: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/decision/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.decisions};
    return (
      <div>
        <h3 className="section-title">Decisions</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/decision/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewDecisions;
