import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewRequirements extends React.Component {
  constructor(props){
    super(props);
    this.state = {requirements: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/requirements").then(res => res.json()).then(result => {
      this.setState({requirements: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/requirement/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.requirements};
    return (
      <div>
        <h3 className="section-title">Requirements</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/requirement/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewRequirements;
