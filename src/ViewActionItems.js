import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewActionItems extends React.Component {
  constructor(props){
    super(props);
    this.state = {actionItems: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/action-items").then(res => res.json()).then(result => {
      this.setState({actionItems: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/action-item/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.actionItems};
    return (
      <div>
        <h3 className="section-title">Action Items</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/action-item/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewActionItems;
