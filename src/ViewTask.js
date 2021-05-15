import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {task: {resource_assigned: -1}, resourcesList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/task/" + requestedID).then(res => res.json()).then(result => {
      this.setState({task: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      this.setState({resourcesList: result.data});
    });
  }
  render(){
    if(!this.state.task){
      return <div></div>;
    }

    var innerResource = this.state.task.resource_assigned;
    var resourcesTable = {options: {view: true, viewPrefix: "/resource/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.resourcesList.filter(r => innerResource == r.id)};
    return (
      <div>
        <h2>{this.state.task.name}</h2>
        <h3>Resource Assigned</h3>
        <SmartViewTable data={resourcesTable}>
        </SmartViewTable>
        <h3>Start Date</h3>
        <p>{this.state.task.start_date}</p>
        <h3>End Date</h3>
        <p>{this.state.task.end_date}</p>
        <h3>Duration</h3>
        <p>{this.state.task.duration}</p>
        <h3>Effort</h3>
        <p>{this.state.task.effort}</p>
        <h3>Actual Start Date</h3>
        <p>{this.state.task.actual_start_date}</p>
        <h3>Actual End Date</h3>
        <p>{this.state.task.actual_end_date}</p>
        <h3>Actual Duration</h3>
        <p>{this.state.task.actual_duration}</p>
        <h3>Effort Completed</h3>
        <p>{this.state.task.effort_completed}</p>
        <Link to={"/task/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/task/" + this.props.match.params.id, "/tasks")}>Delete</button>
      </div>
    );
  }
}

export default ViewTask;
