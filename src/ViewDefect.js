import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewDefect extends React.Component {
  constructor(props){
    super(props);
    this.state = {defect: {}, componentsList: [], deliverablesList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/defect/" + requestedID).then(res => res.json()).then(result => {
      console.log(result);
      this.setState({defect: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/components").then(res => res.json()).then(result => {
      this.setState({componentsList: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/deliverables").then(res => res.json()).then(result => {
      this.setState({deliverablesList: result.data});
    });
  }
  render(){
    if(!this.state.defect){
      return <div></div>;
    }

    var innerComponents = this.state.defect.components || [];
    var componentsTable = {options: {view: true, viewPrefix: "/component/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.componentsList.filter(r => innerComponents.indexOf(r.id) != -1)};

    var innerDeliverables = this.state.defect.deliverables || [];
    var deliverablesTable = {options: {view: true, viewPrefix: "/deliverable/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.deliverablesList.filter(r => innerDeliverables.indexOf(r.id) != -1)};

    return (
      <div>
        <h2>{this.state.defect.name}</h2>
        <p>{this.state.defect.description}</p>

        <h3>Priority</h3>
        <p>{this.state.defect.priority}</p>

        <h3>Severity</h3>
        <p>{this.state.defect.severity}</p>

        <h3>Date Raised</h3>
        <p>{this.state.defect.date_raised}</p>

        <h3>Date Assigned</h3>
        <p>{this.state.defect.date_assigned}</p>

        <h3>Expected Completion Date</h3>
        <p>{this.state.defect.expected_completion_date}</p>

        <h3>Status</h3>
        <p>{this.state.defect.status}</p>

        <h3>Status Description</h3>
        <p>{this.state.defect.status_description}</p>

        <h3>Update Date</h3>
        <p>{this.state.defect.update_date}</p>

        <h3>Components</h3>
        <SmartViewTable data={componentsTable}>
        </SmartViewTable>
        <h3>Deliverables</h3>
        <SmartViewTable data={deliverablesTable}>
        </SmartViewTable>
        <Link to={"/defect/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/defect/" + this.props.match.params.id, "/defects")}>Delete</button>
      </div>
    );
  }
}

export default ViewDefect;
