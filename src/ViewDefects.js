import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewDefects extends React.Component {
  constructor(props){
    super(props);
    this.state = {defects: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/defects").then(res => res.json()).then(result => {
      this.setState({defects: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/defect/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.defects};
    return (
      <div>
        <h3 className="section-title">Defects</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/defect/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewDefects;
