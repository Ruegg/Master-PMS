import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewDeliverable extends React.Component {
  constructor(props){
    super(props);
    this.state = {deliverable: {}, requirementsList: [], tasksList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/deliverable/" + requestedID).then(res => res.json()).then(result => {
      this.setState({deliverable: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/requirements").then(res => res.json()).then(result => {
      this.setState({requirementsList: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/tasks").then(res => res.json()).then(result => {
      this.setState({tasksList: result.data});
    });
  }
  render(){
//    var tableData = {options: {view: true, viewPrefix: "/deliverable/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "description", title: "Description"}], data: this.state.deliverables};

    if(!this.state.deliverable){
      return <div></div>;
    }

    var innerRequirements = this.state.deliverable.requirements || [];
    var requirementsTable = {options: {view: true, viewPrefix: "/requirement/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "text", title: "Text"}], data: this.state.requirementsList.filter(r => innerRequirements.indexOf(r.id) != -1)};

    var innerTasks = this.state.deliverable.tasks || [];
    var tasksTable = {options: {view: true, viewPrefix: "/task/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "start_date", title: "Start Date"}, {key: "end_date", title: "End Date"}], data: this.state.tasksList.filter(r => innerTasks.indexOf(r.id) != -1)};

    return (
      <div>
        <h2>{this.state.deliverable.name}</h2>
        <p>{this.state.deliverable.description}</p>
        <h3>Requirements</h3>
        <SmartViewTable data={requirementsTable}>
        </SmartViewTable>
        <h3>Tasks</h3>
        <SmartViewTable data={tasksTable}>
        </SmartViewTable>
        <Link to={"/deliverable/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/deliverable/" + this.props.match.params.id, "/deliverables")}>Delete</button>
      </div>
    );
  }
}

export default ViewDeliverable;
