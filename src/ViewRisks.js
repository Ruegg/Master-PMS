import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewRisks extends React.Component {
  constructor(props){
    super(props);
    this.state = {risks: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/risks").then(res => res.json()).then(result => {
      this.setState({risks: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/risk/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "category", title: "Category"}], data: this.state.risks};
    return (
      <div>
        <h3 className="section-title">Risks</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/risk/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewRisks;
