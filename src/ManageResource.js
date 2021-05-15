import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ManageResource extends React.Component {
  constructor(props){
    super(props);
    this.state = {resource: {name: "", title: "", pay_rate: 0.0, availability: ""}};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/resource/" + requestedID).then(res => res.json()).then(result => {
        this.setState({resource: result.data});
      });
    }
  }

  handleChange = (event) => {
    var resource = this.state.resource;
    resource[event.target.name] = event.target.value;
    this.setState({resource: resource});
  }

  handleDate(d,name){
    var resource = this.state.resource;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    resource[name] = datePretty;
    this.setState({resource: resource});
  }
  finish(){
    var final = this.state.resource;
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/resource' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/resource/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Resource</h3>

        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.resource.name}/>

        <label className="form-label">Title</label>
        <input className="form-in" name="title" onChange={this.handleChange} value={this.state.resource.title}/>

        <label className="form-label">Pay Rate</label>
        <input className="form-in" name="pay_rate" type="number" onChange={this.handleChange} value={this.state.resource.pay_rate}/>

        <label className="form-label">Availability</label>
        <input className="form-in" name="availability" onChange={this.handleChange} value={this.state.resource.availability}/>

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageResource;
