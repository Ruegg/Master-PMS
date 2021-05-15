import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

class ManageComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {component: {name: "", deliverables: []}, deliverablesList: [], deliverables: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/component/" + requestedID).then(res => res.json()).then(result => {
        this.setState({component: result.data});
        this.populateSelection(this.state.deliverablesList, this.state.component.deliverables, "name", "deliverables");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/deliverables").then(res => res.json()).then(result => {
      this.setState({deliverablesList: result.data});
      this.populateSelection(this.state.deliverablesList, this.state.component.deliverables, "name", "deliverables");
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
    var component = this.state.component;
    component[event.target.name] = event.target.value;
    this.setState({component: component});
  }

  finish(){
    var final = this.state.component;
    final.deliverables = this.state.deliverables.map(e => e.value);
    PMSUtils.postAndCallback('/api/component' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/component/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var deliverableOptions = this.state.deliverablesList.map(e => {return {value: e.id, label: e.name}});

    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Component</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.component.name}/>

        <label className="form-label">Deliverables</label>
        <Select value={this.state.deliverables} onChange={(e) => {this.setState({deliverables: e})}} options={deliverableOptions} isMulti={true} />

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageComponent;
