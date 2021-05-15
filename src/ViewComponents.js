import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import PMSUtils from './PMSUtils.js'

class ViewComponents extends React.Component {
  constructor(props){
    super(props);
    this.state = {components: []};
  }
  componentDidMount(){
    fetch(PMSUtils.API_DOMAIN + "/api/components").then(res => res.json()).then(result => {
      this.setState({components: result.data});
    });
  }
  render(){
    var tableData = {options: {view: true, viewPrefix: "/component/"}, tableHead: [{key: "id", title:"ID"}, {key: "name", title: "Name"}], data: this.state.components};
    return (
      <div>
        <h3 className="section-title">Components</h3>
        <SmartViewTable data={tableData}>
        </SmartViewTable>
        <Link to={"/component/new"}><button className="edit-btn right-btn">+ Create new</button></Link>
      </div>
    );
  }
}

export default ViewComponents;
