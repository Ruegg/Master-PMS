import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewDecisionItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {decision: {decision_maker: -1}, resourcesList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/decision/" + requestedID).then(res => res.json()).then(result => {
      this.setState({decision: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      this.setState({resourcesList: result.data});
    });
  }
  render(){
    if(!this.state.decision){
      return <div></div>;
    }

    var innerResource = this.state.decision.decision_maker;
    var resourcesTable = {options: {view: true, viewPrefix: "/resource/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.resourcesList.filter(r => innerResource == r.id)};
    return (
      <div>
        <h2>{this.state.decision.name}</h2>

        <h3>Description</h3>
        <p>{this.state.decision.description}</p>

        <h3>Priority</h3>
        <p>{this.state.decision.priority}</p>

        <h3>Impact</h3>
        <p>{this.state.decision.impact}</p>

        <h3>Date Created</h3>
        <p>{this.state.decision.date_created}</p>

        <h3>Date Needed</h3>
        <p>{this.state.decision.date_needed}</p>

        <h3>Date Made</h3>
        <p>{this.state.decision.date_made}</p>

        <h3>Decision Maker</h3>
        <SmartViewTable data={resourcesTable}>
        </SmartViewTable>

        <h3>Expected Completion Date</h3>
        <p>{this.state.decision.expected_completion_date}</p>

        <h3>Actual Completion Date</h3>
        <p>{this.state.decision.actual_completion_date}</p>

        <h3>Status</h3>
        <p>{this.state.decision.status}</p>

        <Link to={"/decision/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/decision/" + this.props.match.params.id, "/decision")}>Delete</button>
      </div>
    );
  }
}

export default ViewDecisionItem;
