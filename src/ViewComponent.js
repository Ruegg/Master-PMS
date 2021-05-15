import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {component: {}, deliverablesList: []};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/component/" + requestedID).then(res => res.json()).then(result => {
      this.setState({component: result.data});
    });
    fetch(PMSUtils.API_DOMAIN + "/api/deliverables").then(res => res.json()).then(result => {
      this.setState({deliverablesList: result.data});
    });
  }
  render(){
    if(!this.state.component){
      return <div></div>;
    }

    var innerDeliverables = this.state.component.deliverables || [];
    var deliverablesTable = {options: {view: true, viewPrefix: "/deliverable/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}, {key: "description", title: "Description"}], data: this.state.deliverablesList.filter(r => innerDeliverables.indexOf(r.id) != -1)};

    return (
      <div>
        <h2>{this.state.component.name}</h2>

        <h3>Deliverables</h3>
        <SmartViewTable data={deliverablesTable}>
        </SmartViewTable>


        <Link to={"/component/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/component/" + this.props.match.params.id, "/components")}>Delete</button>
      </div>
    );
  }
}

export default ViewComponent;
