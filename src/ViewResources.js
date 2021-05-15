import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewResources extends React.Component {
  constructor(props){
    super(props);
    this.state = {resources: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      console.log(result);
      this.setState({resources: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/resource/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.resources};
    return (
      <div>
        <h3 className="section-title">Resources</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/resource/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewResources;
