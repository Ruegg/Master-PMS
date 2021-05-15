import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ManageRequirement extends React.Component {
  constructor(props){
    super(props);
    this.state = {requirement: {name: "", text: "", source_document: "",client_reference: ""}};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/requirement/" + requestedID).then(res => res.json()).then(result => {
        this.setState({requirement: result.data});
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
    var requirement = this.state.requirement;
    requirement[event.target.name] = event.target.value;
    this.setState({requirement: requirement});
  }

  handleDate(d,name){
    var requirement = this.state.requirement;
    var datePretty = (d.getMonth()+1) +"/" + d.getDate() + "/" + d.getFullYear();
    requirement[name] = datePretty;
    this.setState({requirement: requirement});
  }
  finish(){
    var final = this.state.requirement;
    final = PMSUtils.convertKeysToCamel(final);
    PMSUtils.postAndCallback('/api/requirement' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/requirement/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} requirement</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.requirement.name}/>

        <label className="form-label">Text</label>
        <input className="form-in" name="text" onChange={this.handleChange} value={this.state.requirement.text}/>

        <label className="form-label">Source Document</label>
        <input className="form-in" name="source_document" onChange={this.handleChange} value={this.state.requirement.source_document}/>

        <label className="form-label">Client Reference</label>
        <input className="form-in" name="client_reference" onChange={this.handleChange} value={this.state.requirement.client_reference}/>

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageRequirement;
