import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'


class ViewTasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {tasks: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/tasks").then(res => res.json()).then(result => {
      this.setState({tasks: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/task/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.tasks};
    return (
      <div>
        <h3 className="section-title">Tasks</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/task/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewTasks;
