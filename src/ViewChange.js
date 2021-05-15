import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewChange extends React.Component {
  constructor(props){
    super(props);
    this.state = {change: {}};
  }
  componentDidMount(){
    const {match} = this.props;
    var requestedID = match.params.id;
    fetch(PMSUtils.API_DOMAIN + "/api/change/" + requestedID).then(res => res.json()).then(result => {
      this.setState({change: result.data});
    });
  }
  render(){
    if(!this.state.change){
      return <div></div>;
    }

  return (
      <div>
        <h2>{this.state.change.name}</h2>
        <h3>Date Requested</h3>
        <p>{this.state.change.date_requested}</p>
        <h3>Requestor</h3>
        <p>{this.state.change.requestor}</p>
        <h3>Status</h3>
        <p>{this.state.change.status}</p>
        <h3>Update Date</h3>
        <p>{this.state.change.update_date}</p>
        <Link to={"/change/edit/" + this.props.match.params.id}><button className="edit-btn">Edit</button></Link>
        <button className="delete-btn" onClick={() => PMSUtils.deleteAndRedirect("/api/change/" + this.props.match.params.id, "/changes")}>Delete</button>
      </div>
    );
  }
}

export default ViewChange;
