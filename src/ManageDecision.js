import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ManageDecision extends React.Component {
  constructor(props){
    super(props);
    this.state = {decision: {name: "", start_date: "", end_date: "",duration: "",effort: 0, actual_start_date: "", actual_end_date: "", actual_duration: "", effort_completed: 0, decision_maker: -1}, resourcesList: [], resources: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/decision/" + requestedID).then(res => res.json()).then(result => {
        this.setState({decision: result.data});
        this.populateSelection(this.state.resourcesList, this.state.decision.decision_maker, "name", "resources");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      this.setState({resourcesList: result.data});
      this.populateSelection(this.state.resourcesList, this.state.decision.decision_maker, "name", "resources");
    });
  }

  populateSelection(populated, idList, targetLabel, selectionData){
    if(!populated || !idList){
      return;
    }
    var properType = ""
    if(typeof idList == "object"){
      properType = populated.filter(e => (idList.indexOf(e.id) != -1)).map(e => {return {value: e.id, label: e[targetLabel]}});
    }else{
      properType = populated.filter(e => (idList == e.id)).map(e => {return {value: e.id, label: e[targetLabel]}})[0];
    }
    this.setState({[selectionData]: properType});
  }

  handleChange = (event) => {
    var decision = this.state.decision;
    decision[event.target.name] = event.target.value;
    this.setState({decision: decision});
  }

  handleDate(d,name){
    var decision = this.state.decision;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    decision[name] = datePretty;
    this.setState({decision: decision});
  }
  finish(){
    var final = this.state.decision;
    final.decision_maker = this.state.resources ? this.state.resources.value : -1;
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/decision' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/decision/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var resourceOptions = this.state.resourcesList.map(e => {return {value: e.id, label: e.name}});
    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Decision</h3>

        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.decision.name}/>

        <label className="form-label">Description</label>
        <input className="form-in" name="description" onChange={this.handleChange} value={this.state.decision.description}/>

        <label className="form-label">Priority</label>
        <input className="form-in" name="priority" onChange={this.handleChange} value={this.state.decision.priority}/>

        <label className="form-label">Impact</label>
        <input className="form-in" name="impact" onChange={this.handleChange} value={this.state.decision.impact}/>

        <label className="form-label">Date Created</label>
        <DatePicker className="form-in" name="date_created" onChange={(d) => {this.handleDate(d,"date_created")}} value={this.state.decision.date_created}/>

        <label className="form-label">Date Needed</label>
        <DatePicker className="form-in" name="date_needed" onChange={(d) => {this.handleDate(d,"date_needed")}} value={this.state.decision.date_needed}/>

        <label className="form-label">Date Made</label>
        <DatePicker className="form-in" name="date_made" onChange={(d) => {this.handleDate(d,"date_made")}} value={this.state.decision.date_made}/>

        <label className="form-label">Decision Maker</label>
        <Select value={this.state.resources} onChange={(e) => {this.setState({resources: e})}} options={resourceOptions} isMulti={false} />

        <label className="form-label">Expected Completion Date</label>
        <DatePicker className="form-in" name="expected_completion_date" onChange={(d) => {this.handleDate(d,"expected_completion_date")}} value={this.state.decision.expected_completion_date}/>

        <label className="form-label">Actual Completion Date</label>
        <DatePicker className="form-in" name="actual_completion_date" onChange={(d) => {this.handleDate(d,"actual_completion_date")}} value={this.state.decision.actual_completion_date}/>

        <label className="form-label">Status</label>
        <input className="form-in" name="status" onChange={this.handleChange} value={this.state.decision.status}/>

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageDecision;
