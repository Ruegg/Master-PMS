import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewResource extends React.Component {
  constructor(props){
    super(props);
    this.state = {resource: {}};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/resource/" + requestedID).then(res => res.json()).then(result => {
      this.setState({resource: result.data});
    });
  }
  render(){
    if(!this.state.resource){
      return <div></div>;
    }

  return (
      <div>
        <h2>{this.state.resource.name}</h2>

        <h3>Title</h3>
        <p>{this.state.resource.title}</p>

        <h3>Pay Rate</h3>
        <p>{this.state.resource.pay_rate}</p>

        <h3>Availability</h3>
        <p>{this.state.resource.availability}</p>

        <Link to={"/resource/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/resource/" + this.props.match.params.id, "/resources")}>Delete</button>
      </div>
    );
  }
}

export default ViewResource;
