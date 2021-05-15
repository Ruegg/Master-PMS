import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

class ManageDeliverable extends React.Component {
  constructor(props){
    super(props);
    this.state = {deliverable: {name: "", description: "", requirements: [], tasks: []}, requirementsList: [], tasksList: [], requirements: null, tasks: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/deliverable/" + requestedID).then(res => res.json()).then(result => {
        this.setState({deliverable: result.data});
        this.populateSelection(this.state.requirementsList, this.state.deliverable.requirements, "name", "requirements");
        this.populateSelection(this.state.tasksList, this.state.deliverable.tasks, "name", "tasks");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/requirements").then(res => res.json()).then(result => {
      this.setState({requirementsList: result.data});
      this.populateSelection(this.state.requirementsList, this.state.deliverable.requirements, "name", "requirements");
    });
    fetch(PMSUtils.API_DOMAIN + "/api/tasks").then(res => res.json()).then(result => {
      this.setState({tasksList: result.data});
      this.populateSelection(this.state.tasksList, this.state.deliverable.tasks, "name", "tasks");
    });
  }

  populateSelection(populated, idList, targetLabel, selectionData){
      if(!populated || !idList){
        return;
      }
      var properType = populated.filter(e => (idList.indexOf(e.id) != -1)).map(e => {return {value: e.id, label: e[targetLabel]}});
      this.setState({[selectionData]: properType});
  }

  handleChange = (event) => {
    var deliverable = this.state.deliverable;
    deliverable[event.target.name] = event.target.value;
    this.setState({deliverable: deliverable});
  }
  finish(){
    var final = this.state.deliverable;
    final.requirements = this.state.requirements.map(e => e.value);
    final.tasks = this.state.tasks.map(e => e.value);
    PMSUtils.postAndCallback('/api/deliverable' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/deliverable/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var requirementOptions = this.state.requirementsList.map(e => {return {value: e.id, label: e.name}});
    var taskOptions = this.state.tasksList.map(e => {return {value: e.id, label: e.name}});

    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Deliverable</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.deliverable.name}/>
        <label className="form-label">Description</label>
        <input className="form-in" name="description" onChange={this.handleChange} value={this.state.deliverable.description}/>
        <label className="form-label">Requirements</label>
        <Select value={this.state.requirements} onChange={(e) => {this.setState({requirements: e})}} options={requirementOptions} isMulti={true} />
        <label className="form-label">Tasks</label>
        <Select value={this.state.tasks} onChange={(e) => {this.setState({tasks: e})}} options={taskOptions} isMulti={true} />
        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageDeliverable;
