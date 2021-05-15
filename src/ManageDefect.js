import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ManageDefect extends React.Component {
  constructor(props){
    super(props);
    this.state = {defect: {name: "", description: "", priority: "", severity: "", date_raised: "", date_assigned: "", expected_completion_date: "", status: "", status_description: "", update_date: "", components: [], deliverables: []}, componentsList: [], deliverablesList: [], components: null, deliverables: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/defect/" + requestedID).then(res => res.json()).then(result => {
        this.setState({defect: result.data});
        this.populateSelection(this.state.componentsList, this.state.defect.components, "name", "components");
        this.populateSelection(this.state.deliverablesList, this.state.defect.deliverables, "name", "deliverables");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/components").then(res => res.json()).then(result => {
      this.setState({componentsList: result.data});
      this.populateSelection(this.state.componentsList, this.state.defect.components, "name", "components");
    });
    fetch(PMSUtils.API_DOMAIN + "/api/deliverables").then(res => res.json()).then(result => {
      this.setState({deliverablesList: result.data});
      this.populateSelection(this.state.deliverablesList, this.state.defect.deliverables, "name", "deliverables");
    });
  }

  populateSelection(populated, idList, targetLabel, selectionData){
      if(!populated || !idList){
        return;
      }
      var properType = populated.filter(e => (idList.indexOf(e.id) != -1)).map(e => {return {value: e.id, label: e[targetLabel]}});
      this.setState({[selectionData]: properType});
  }

  handleDate(d,name){
    var defect = this.state.defect;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    defect[name] = datePretty;
    this.setState({defect: defect});
  }

  handleChange = (event) => {
    var defect = this.state.defect;
    defect[event.target.name] = event.target.value;
    this.setState({defect: defect});
  }
  finish(){
    var final = this.state.defect;
    final.components = this.state.components.map(e => e.value);
    final.deliverables = this.state.deliverables.map(e => e.value);
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/defect' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/defect/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var componentOptions = this.state.componentsList.map(e => {return {value: e.id, label: e.name}});
    var deliverableOptions = this.state.deliverablesList.map(e => {return {value: e.id, label: e.name}});

    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Defect</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.defect.name}/>

        <label className="form-label">Description</label>
        <input className="form-in" name="description" onChange={this.handleChange} value={this.state.defect.description}/>

        <label className="form-label">Priority</label>
        <input className="form-in" name="priority" onChange={this.handleChange} value={this.state.defect.priority}/>

        <label className="form-label">Severity</label>
        <input className="form-in" name="severity" onChange={this.handleChange} value={this.state.defect.severity}/>

        <label className="form-label">Date Raised</label>
        <DatePicker className="form-in" name="date_raised" onChange={(d) => {this.handleDate(d,"date_raised")}} value={this.state.defect.date_raised}/>

        <label className="form-label">Date Assigned</label>
        <DatePicker className="form-in" name="date_assigned" onChange={(d) => {this.handleDate(d,"date_assigned")}} value={this.state.defect.date_assigned}/>

        <label className="form-label">Expected Completion Date</label>
        <DatePicker className="form-in" name="expected_completion_date" onChange={(d) => {this.handleDate(d,"expected_completion_date")}} value={this.state.defect.expected_completion_date}/>

        <label className="form-label">Status</label>
        <input className="form-in" name="status" onChange={this.handleChange} value={this.state.defect.status}/>

        <label className="form-label">Status Description</label>
        <input className="form-in" name="status_description" onChange={this.handleChange} value={this.state.defect.status_description}/>

        <label className="form-label">Update Date</label>
        <DatePicker className="form-in" name="update_date" onChange={(d) => {this.handleDate(d,"update_date")}} value={this.state.defect.update_date}/>

        <label className="form-label">Components</label>
        <Select value={this.state.components} onChange={(e) => {this.setState({components: e})}} options={componentOptions} isMulti={true} />

        <label className="form-label">Deliverables</label>
        <Select value={this.state.deliverables} onChange={(e) => {this.setState({deliverables: e})}} options={deliverableOptions} isMulti={true} />

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageDefect;
