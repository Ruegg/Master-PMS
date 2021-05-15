import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ManageChange extends React.Component {
  constructor(props){
    super(props);
    this.state = {change: {name: "", date_requested: "", requestor: "",status: "",update_date: ""}};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/change/" + requestedID).then(res => res.json()).then(result => {
        this.setState({change: result.data});
      });
    }
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
    var change = this.state.change;
    change[event.target.name] = event.target.value;
    this.setState({change: change});
  }

  handleDate(d,name){
    var change = this.state.change;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    change[name] = datePretty;
    this.setState({change: change});
  }
  finish(){
    var final = this.state.change;
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/change' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/change/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} change</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.change.name}/>

        <label className="form-label">Date Requested</label>
        <DatePicker className="form-in" name="date_requested" onChange={(d) => {this.handleDate(d,"date_requested")}} value={this.state.change.date_requested}/>

        <label className="form-label">Requestor</label>
        <input className="form-in" name="requestor" onChange={this.handleChange} value={this.state.change.requestor}/>

        <label className="form-label">Status</label>
        <input className="form-in" name="status" onChange={this.handleChange} value={this.state.change.status}/>

        <label className="form-label">Update Date</label>
        <DatePicker className="form-in" name="update_date" onChange={(d) => {this.handleDate(d,"update_date")}} value={this.state.change.update_date}/>

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageChange;
