import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ManageActionItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {actionItem: {name: "", description: "", status: "", actual_completion_date: "", expected_completion_date: "", date_assigned: "", date_created: "", resource_assigned: -1}, resourcesList: [], resources: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/action-item/" + requestedID).then(res => res.json()).then(result => {
        this.setState({actionItem: result.data});
        this.populateSelection(this.state.resourcesList, this.state.actionItem.resource_assigned, "name", "resources");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/resources").then(res => res.json()).then(result => {
      this.setState({resourcesList: result.data});
      this.populateSelection(this.state.resourcesList, this.state.actionItem.resource_assigned, "name", "resources");
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
    var actionItem = this.state.actionItem;
    actionItem[event.target.name] = event.target.value;
    this.setState({actionItem: actionItem});
  }

  handleDate(d,name){
    var actionItem = this.state.actionItem;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    actionItem[name] = datePretty;
    this.setState({actionItem: actionItem});
  }
  finish(){
    var final = this.state.actionItem;
    final.resource_assigned = this.state.resources ? this.state.resources.value : -1;
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/action-item' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/action-item/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var resourceOptions = this.state.resourcesList.map(e => {return {value: e.id, label: e.name}});
    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Action Item</h3>

        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.actionItem.name}/>

        <label className="form-label">Description</label>
        <input className="form-in" name="description" onChange={this.handleChange} value={this.state.actionItem.description}/>

        <label className="form-label">Status</label>
        <input className="form-in" name="status" onChange={this.handleChange} value={this.state.actionItem.status}/>

        <label className="form-label">Actual Completion Date</label>
        <DatePicker className="form-in" name="actual_completion_date" onChange={(d) => {this.handleDate(d,"actual_completion_date")}} value={this.state.actionItem.actual_completion_date}/>

        <label className="form-label">Expected Completion Date</label>
        <DatePicker className="form-in" name="expected_completion_date" onChange={(d) => {this.handleDate(d,"expected_completion_date")}} value={this.state.actionItem.expected_completion_date}/>

        <label className="form-label">Date Assigned</label>
        <DatePicker className="form-in" name="date_assigned" onChange={(d) => {this.handleDate(d,"date_assigned")}} value={this.state.actionItem.date_assigned}/>

        <label className="form-label">Date Created</label>
        <DatePicker className="form-in" name="date_created" onChange={(d) => {this.handleDate(d,"date_created")}} value={this.state.actionItem.date_created}/>

        <label className="form-label">Resource Assigned</label>
        <Select value={this.state.resources} onChange={(e) => {this.setState({resources: e})}} options={resourceOptions} isMulti={false} />

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageActionItem;
