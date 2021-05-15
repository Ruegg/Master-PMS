import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewRisk extends React.Component {
  constructor(props){
    super(props);
    this.state = {risk: {}, actionsList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/risk/" + requestedID).then(res => res.json()).then(result => {
      this.setState({risk: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/action-items").then(res => res.json()).then(result => {
      this.setState({actionsList: result.data});
    });
  }
  render(){
    if(!this.state.risk){
      return <div></div>;
    }

    var innerActions = this.state.risk.actionItems || [];
    var actionsTable = {options: {view: true, viewPrefix: "/action-item/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "description", title: "Description"}], data: this.state.actionsList.filter(r => innerActions.indexOf(r.id) != -1)};

    return (
      <div>
        <h2>{this.state.risk.name}</h2>

        <h3>Category</h3>
        <p>{this.state.risk.category}</p>

        <h3>Probability</h3>
        <p>{this.state.risk.probability}</p>

        <h3>Impact</h3>
        <p>{this.state.risk.impact}</p>

        <h3>Mitigation</h3>
        <p>{this.state.risk.mitigation}</p>

        <h3>Contingency</h3>
        <p>{this.state.risk.contingency}</p>

        <h3>Risk Score</h3>
        <p>{this.state.risk.risk_score}</p>

        <h3>Action By</h3>
        <p>{this.state.risk.action_by}</p>

        <h3>Action Items</h3>
        <SmartViewTable data={actionsTable}>
        </SmartViewTable>


        <Link to={"/risk/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/risk/" + this.props.match.params.id, "/risks")}>Delete</button>
      </div>
    );
  }
}

export default ViewRisk;
