import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewActionItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {actionItem: {resource_assigned: -1}, resourcesList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/action-item/" + requestedID).then(res => res.json()).then(result => {
      this.setState({actionItem: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      this.setState({resourcesList: result.data});
    });
  }
  render(){
    if(!this.state.actionItem){
      return <div></div>;
    }

    var innerResource = this.state.actionItem.resource_assigned;
    var resourcesTable = {options: {view: true, viewPrefix: "/resource/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.resourcesList.filter(r => innerResource == r.id)};
    return (
      <div>
        <h2>{this.state.actionItem.name}</h2>

        <h3>Description</h3>
        <p>{this.state.actionItem.description}</p>

        <h3>Status</h3>
        <p>{this.state.actionItem.status}</p>

        <h3>Actual Completion Date</h3>
        <p>{this.state.actionItem.actual_completion_date}</p>

        <h3>Expected Completion Date</h3>
        <p>{this.state.actionItem.expected_completion_date}</p>

        <h3>Date Assigned</h3>
        <p>{this.state.actionItem.date_assigned}</p>

        <h3>Date Created</h3>
        <p>{this.state.actionItem.date_created}</p>

        <h3>Resource Assigned</h3>
        <SmartViewTable data={resourcesTable}>
        </SmartViewTable>

        <Link to={"/action-item/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/action-item/" + this.props.match.params.id, "/action-items")}>Delete</button>
      </div>
    );
  }
}

export default ViewActionItem;
