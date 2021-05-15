import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ManageIssue extends React.Component {
  constructor(props){
    super(props);
    this.state = {issue: {name: "", update_date: "", status: "",expected_completion_date: "",actual_completion_date: "", date_assigned: ""},  actionItemsList: [], decisionsList: [], actions: null, decisions: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/issue/" + requestedID).then(res => res.json()).then(result => {
        this.setState({issue: result.data});
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/action-items").then(res => res.json()).then(result => {
      this.setState({actionItemsList: result.data});
      this.populateSelection(this.state.actionItemsList, this.state.issue.actionItems, "name", "actions");
    });
    fetch(PMSUtils.API_DOMAIN + "/api/decisions").then(res => res.json()).then(result => {
      this.setState({decisionsList: result.data});
      this.populateSelection(this.state.decisionsList, this.state.issue.decisions, "name", "decisions");
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
    var issue = this.state.issue;
    issue[event.target.name] = event.target.value;
    this.setState({issue: issue});
  }

  handleDate(d,name){
    var issue = this.state.issue;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    issue[name] = datePretty;
    this.setState({issue: issue});
  }
  finish(){
    var final = this.state.issue;
    final.actionItems = this.state.actions.map(e => e.value);
    final.decisions = this.state.decisions.map(e => e.value);
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/issue' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/issue/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){

    var actionItemOptions = this.state.actionItemsList.map(e => {return {value: e.id, label: e.name}});
    var decisionOptions = this.state.decisionsList.map(e => {return {value: e.id, label: e.name}});

    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} issue</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.issue.name}/>

        <label className="form-label">Update Date</label>
        <DatePicker className="form-in" name="update_date" onChange={(d) => {this.handleDate(d,"update_date")}} value={this.state.issue.update_date}/>

        <label className="form-label">Status</label>
        <input className="form-in" name="status" onChange={this.handleChange} value={this.state.issue.status}/>

        <label className="form-label">Expected Completion Date</label>
        <DatePicker className="form-in" name="expected_completion_date" onChange={(d) => {this.handleDate(d,"expected_completion_date")}} value={this.state.issue.expected_completion_date}/>

        <label className="form-label">Actual Completion Date</label>
        <DatePicker className="form-in" name="actual_completion_date" onChange={(d) => {this.handleDate(d,"actual_completion_date")}} value={this.state.issue.actual_completion_date}/>

        <label className="form-label">Date Assigned</label>
        <DatePicker className="form-in" name="date_assigned" onChange={(d) => {this.handleDate(d,"date_assigned")}} value={this.state.issue.date_assigned}/>

        <label className="form-label">Action Items</label>
        <Select value={this.state.actions} onChange={(e) => {this.setState({actions: e})}} options={actionItemOptions} isMulti={true} />

        <label className="form-label">Decisions</label>
        <Select value={this.state.decisions} onChange={(e) => {this.setState({decisions: e})}} options={decisionOptions} isMulti={true} />

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageIssue;
