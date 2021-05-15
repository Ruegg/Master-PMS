import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewRequirement extends React.Component {
  constructor(props){
    super(props);
    this.state = {requirement: {}};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/requirement/" + requestedID).then(res => res.json()).then(result => {
      this.setState({requirement: result.data});
    });
  }
  render(){
    if(!this.state.requirement){
      return <div></div>;
    }

  return (
      <div>
        <h2>{this.state.requirement.name}</h2>
        <h3>Text</h3>
        <p>{this.state.requirement.text}</p>
        <h3>Source Document</h3>
        <p>{this.state.requirement.source_document}</p>
        <h3>Client Reference</h3>
        <p>{this.state.requirement.client_reference}</p>
        <Link to={"/requirement/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/requirement/" + this.props.match.params.id, "/requirements")}>Delete</button>
      </div>
    );
  }
}

export default ViewRequirement;
