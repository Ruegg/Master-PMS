import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ManageTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {task: {name: "", start_date: "", end_date: "",duration: "",effort: 0, actual_start_date: "", actual_end_date: "", actual_duration: "", effort_completed: 0, resource_assigned: -1}, resourcesList: [], resources: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/task/" + requestedID).then(res => res.json()).then(result => {
        this.setState({task: result.data});
        this.populateSelection(this.state.resourcesList, this.state.task.resource_assigned, "name", "resources");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      this.setState({resourcesList: result.data});
      this.populateSelection(this.state.resourcesList, this.state.task.resource_assigned, "name", "resources");
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
    var task = this.state.task;
    task[event.target.name] = event.target.value;
    this.setState({task: task});
  }

  handleDate(d,name){
    var task = this.state.task;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    task[name] = datePretty;
    this.setState({task: task});
  }
  finish(){
    var final = this.state.task;
    final.resource_assigned = this.state.resources ? this.state.resources.value : -1;
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/task' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/task/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var resourceOptions = this.state.resourcesList.map(e => {return {value: e.id, label: e.name}});
    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} task</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.task.name}/>
        <label className="form-label">Resource Assigned</label>
        <Select value={this.state.resources} onChange={(e) => {this.setState({resources: e})}} options={resourceOptions} isMulti={false} />
        <label className="form-label">Start Date</label>
        <DatePicker className="form-in" name="start_date" onChange={(d) => {this.handleDate(d,"start_date")}} value={this.state.task.start_date}/>
        <label className="form-label">End Date</label>
        <DatePicker className="form-in" name="end_date" onChange={(d) => {this.handleDate(d,"end_date")}} value={this.state.task.end_date}/>
        <label className="form-label">Duration</label>
        <input className="form-in" name="duration" onChange={this.handleChange} value={this.state.task.duration}/>
        <label className="form-label">Effort</label>
        <input className="form-in" name="effort" type="number" onChange={this.handleChange} value={this.state.task.effort}/>
        <label className="form-label">Actual Start Date</label>
        <DatePicker className="form-in" name="actual_start_date" onChange={(d) => {this.handleDate(d,"actual_start_date")}} value={this.state.task.actual_start_date}/>
        <label className="form-label">Actual End Date</label>
        <DatePicker className="form-in" name="actual_end_date" onChange={(d) => {this.handleDate(d,"actual_end_date")}} value={this.state.task.actual_end_date}/>
        <label className="form-label">Actual Duration</label>
        <input className="form-in" name="actual_duration" onChange={this.handleChange} value={this.state.task.actual_duration}/>
        <label className="form-label">Effort Completed</label>
        <input className="form-in" name="effort_completed" type="number" onChange={this.handleChange} value={this.state.task.effort_completed}/>
        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageTask;
