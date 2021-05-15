import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewDeliverables extends React.Component {
  constructor(props){
    super(props);
    this.state = {deliverables: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/deliverables").then(res => res.json()).then(result => {
      console.log(result);
      this.setState({deliverables: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/deliverable/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "description", title: "Description"}], data: this.state.deliverables};
    return (
      <div>
        <h3 className="section-title">Deliverables</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/deliverable/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewDeliverables;
