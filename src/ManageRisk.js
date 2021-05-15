import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';
import Select from 'react-select';

import PMSUtils from './PMSUtils.js'

class ManageRisk extends React.Component {
  constructor(props){
    super(props);
    this.state = {risk: {category: "", name: "", probability: 0, impact: "", mitigation: "", contingency: "", risk_score: 0, action_by: "", actionItems: []}, actionsList: [], actions: null};
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
    this.populateSelection = this.populateSelection.bind(this);
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    if(requestedID){
      fetch(PMSUtils.API_DOMAIN + "/api/risk/" + requestedID).then(res => res.json()).then(result => {
        this.setState({risk: result.data});
        this.populateSelection(this.state.actionsList, this.state.risk.actionItems, "name", "actions");
      });
    }
    fetch(PMSUtils.API_DOMAIN + "/api/action-items").then(res => res.json()).then(result => {
      this.setState({actionsList: result.data});
      this.populateSelection(this.state.actionsList, this.state.risk.actionItems, "name", "actions");
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
    var risk = this.state.risk;
    risk[event.target.name] = event.target.value;
    this.setState({risk: risk});
  }
  finish(){
    var final = this.state.risk;
    final.actionItems = this.state.actions.map(e => e.value);
    PMSUtils.postAndCallback('/api/risk' + (this.props.match.params.id ? ("/" + this.props.match.params.id) : ""), JSON.stringify(final), (data) => {
      if(data.status == "success"){
        var id = data.data.id;
        window.location = "/risk/" + id;
      }else{
        alert("Could not complete, please check your values.");
      }
    });
  }
  render(){
    var actionOptions = this.state.actionsList.map(e => {return {value: e.id, label: e.name}});

    return (
      <div>
        <h3>{this.props.match.params.id ? "Edit" : "New"} Risk</h3>
        <label className="form-label">Name</label>
        <input className="form-in" name="name" onChange={this.handleChange} value={this.state.risk.name}/>

        <label className="form-label">Category</label>
        <input className="form-in" name="category" onChange={this.handleChange} value={this.state.risk.category}/>

        <label className="form-label">Probability</label>
        <input className="form-in" name="probability" type="number" onChange={this.handleChange} value={this.state.risk.probability}/>

        <label className="form-label">Impact</label>
        <input className="form-in" name="impact" onChange={this.handleChange} value={this.state.risk.impact}/>

        <label className="form-label">Mitigation</label>
        <input className="form-in" name="mitigation" onChange={this.handleChange} value={this.state.risk.mitigation}/>

        <label className="form-label">Contingency</label>
        <input className="form-in" name="contingency" onChange={this.handleChange} value={this.state.risk.contingency}/>

        <label className="form-label">Risk Score</label>
        <input className="form-in" name="risk_score" type="number" onChange={this.handleChange} value={this.state.risk.risk_score}/>

        <label className="form-label">Action By</label>
        <input className="form-in" name="action_by" onChange={this.handleChange} value={this.state.risk.action_by}/>

        <label className="form-label">Action Items</label>
        <Select value={this.state.actions} onChange={(e) => {this.setState({actions: e})}} options={actionOptions} isMulti={true} />

        <button className="edit-btn right-btn" onClick={this.finish}>{this.props.match.params.id == null ? "Create" : "Finish Edit"}</button>
      </div>
    );
  }
}

export default ManageRisk;
