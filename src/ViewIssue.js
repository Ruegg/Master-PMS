import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewIssue extends React.Component {
  constructor(props){
    super(props);
    this.state = {issue: {}, actionItemsList: [], decisionsList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/issue/" + requestedID).then(res => res.json()).then(result => {
      this.setState({issue: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/action-items").then(res => res.json()).then(result => {
      this.setState({actionItemsList: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/decisions").then(res => res.json()).then(result => {
      this.setState({decisionsList: result.data});
    });
  }
  render(){
    if(!this.state.issue){
      return <div></div>;
    }

    var innerActions = this.state.issue.actionItems || [];
    var actionsTable = {options: {view: true, viewPrefix: "/action-item/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.actionItemsList.filter(r => innerActions.indexOf(r.id) != -1)};

    var innerDecisions = this.state.issue.decisions || [];
    var decisionsTable = {options: {view: true, viewPrefix: "/decision/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.decisionsList.filter(r => innerDecisions.indexOf(r.id) != -1)};

    return (
        <div>
          <h2>{this.state.issue.name}</h2>
          <h3>Update Date</h3>
          <p>{this.state.issue.update_date}</p>
          <h3>Status</h3>
          <p>{this.state.issue.status}</p>
          <h3>Expected Completion Date</h3>
          <p>{this.state.issue.expected_completion_date}</p>
          <h3>Actual Completion Date</h3>
          <p>{this.state.issue.actual_completion_date}</p>
          <h3>Date Assigned</h3>
          <p>{this.state.issue.date_assigned}</p>

          <h3>Action Items</h3>
          <SmartViewTable data={actionsTable}>
          </SmartViewTable>
          <h3>Decisions</h3>
          <SmartViewTable data={decisionsTable}>
          </SmartViewTable>
          
          <Link to={"/issue/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
          <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/issue/" + this.props.match.params.id, "/issues")}>Delete</button>
        </div>
      );
  }
}

export default ViewIssue;
