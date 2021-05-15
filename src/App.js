import './App.css';

import React,{Component} from 'react'
import { Router, Route,Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './Home.js';

import ViewDeliverables from './ViewDeliverables.js';

import ViewDeliverable from './ViewDeliverable.js';

import ManageDeliverable from './ManageDeliverable.js';

import ViewTasks from './ViewTasks.js';

import ViewTask from './ViewTask.js';

import ManageTask from './ManageTask.js';

import ViewIssues from './ViewIssues.js';
import ViewIssue from './ViewIssue.js';
import ManageIssue from './ManageIssue.js';

import ViewActionItems from './ViewActionItems.js';
import ViewActionItem from './ViewActionItem.js';
import ManageActionItem from './ManageActionItem.js';

import ViewDecisions from './ViewDecisions.js';
import ViewDecision from './ViewDecision.js';
import ManageDecision from './ManageDecision.js';

import ViewResources from './ViewResources.js';
import ViewResource from './ViewResource.js';
import ManageResource from './ManageResource.js';

import ViewRisks from './ViewRisks.js';
import ViewRisk from "./ViewRisk.js";
import ManageRisk from './ManageRisk.js';

import ViewRequirements from './ViewRequirements.js';
import ViewRequirement from './ViewRequirement.js';
import ManageRequirement from './ManageRequirement.js';

import ViewChanges from './ViewChanges.js';
import ViewChange from './ViewChange.js';
import ManageChange from './ManageChange.js';

import ViewComponents from './ViewComponents.js';
import ViewComponent from './ViewComponent.js';
import ManageComponent from './ManageComponent.js';

import ViewDefects from './ViewDefects.js';
import ViewDefect from './ViewDefect.js';
import ManageDefect from './ManageDefect.js';

export const history = createBrowserHistory();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {isNavCollapsed: true};
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav(){
    this.setState({isNavCollapsed: !this.state.isNavCollapsed});
  }
  render(){
    return (

      <Router history={history}>
        <div>
          <header>
            <div className="nav">
              <span onClick={() => {history.push("/")}} className="logo">Master PMS</span>
              <div onClick={() => this.setState({isNavCollapsed: true})} className={"navbar-a " + (this.state.isNavCollapsed ? "hide-refs" : "")}>
                <Link to='/deliverables'>Deliverables</Link>
                <Link to='/tasks'>Tasks</Link>
                <Link to='/issues'>Issues</Link>
                <Link to='/action-items'>Action Items</Link>
                <Link to='/decisions'>Decisions</Link>
                <Link to='/resources'>Resources</Link>
                <Link to='/risks'>Risks</Link>
                <Link to='/requirements'>Requirements</Link>
                <Link to='/changes'>Changes</Link>
                <Link to='/components'>Components</Link>
                <Link to='/defects'>Defects</Link>
              </div>
              <button onClick={this.toggleNav} className="collapse-mobile">≡</button>
            </div>
          </header>
          <main>
            <div className="content">
              <Route exact path='/' component={Home}></Route>

              <Route exact path='/deliverables' component={ViewDeliverables}></Route>
              <Route path="/deliverable/edit/:id(\d+)" component={ManageDeliverable}></Route>
              <Route exact path="/deliverable/new" component={ManageDeliverable}></Route>
              <Route exact path="/deliverable/:id(\d+)" component={ViewDeliverable}></Route>


              <Route exact path='/tasks' component={ViewTasks}></Route>
              <Route exact path='/task/:id(\d+)' component={ViewTask}></Route>
              <Route path="/task/edit/:id(\d+)" component={ManageTask}></Route>
              <Route exact path="/task/new" component={ManageTask}></Route>

              <Route exact path='/issues' component={ViewIssues}></Route>
              <Route exact path='/issue/:id(\d+)' component={ViewIssue}></Route>
              <Route path="/issue/edit/:id(\d+)" component={ManageIssue}></Route>
              <Route exact path="/issue/new" component={ManageIssue}></Route>

              <Route exact path='/action-items' component={ViewActionItems}></Route>
              <Route exact path='/action-item/:id(\d+)' component={ViewActionItem}></Route>
              <Route path="/action-item/edit/:id(\d+)" component={ManageActionItem}></Route>
              <Route exact path="/action-item/new" component={ManageActionItem}></Route>

              <Route exact path='/decisions' component={ViewDecisions}></Route>
              <Route exact path='/decision/:id(\d+)' component={ViewDecision}></Route>
              <Route path="/decision/edit/:id(\d+)" component={ManageDecision}></Route>
              <Route exact path="/decision/new" component={ManageDecision}></Route>

              <Route exact path='/resources' component={ViewResources}></Route>
              <Route exact path='/resource/:id(\d+)' component={ViewResource}></Route>
              <Route path="/resource/edit/:id(\d+)" component={ManageResource}></Route>
              <Route exact path="/resource/new" component={ManageResource}></Route>

              <Route exact path='/risks' component={ViewRisks}></Route>
              <Route exact path='/risk/:id(\d+)' component={ViewRisk}></Route>
              <Route path="/risk/edit/:id(\d+)" component={ManageRisk}></Route>
              <Route exact path="/risk/new" component={ManageRisk}></Route>

              <Route exact path='/requirements' component={ViewRequirements}></Route>
              <Route exact path='/requirement/:id(\d+)' component={ViewRequirement}></Route>
              <Route path="/requirement/edit/:id(\d+)" component={ManageRequirement}></Route>
              <Route exact path="/requirement/new" component={ManageRequirement}></Route>

              <Route exact path='/changes' component={ViewChanges}></Route>
              <Route exact path='/change/:id(\d+)' component={ViewChange}></Route>
              <Route path="/change/edit/:id(\d+)" component={ManageChange}></Route>
              <Route exact path="/change/new" component={ManageChange}></Route>

              <Route exact path='/components' component={ViewComponents}></Route>
              <Route exact path='/component/:id(\d+)' component={ViewComponent}></Route>
              <Route path="/component/edit/:id(\d+)" component={ManageComponent}></Route>
              <Route exact path="/component/new" component={ManageComponent}></Route>

              <Route exact path='/defects' component={ViewDefects}></Route>
              <Route exact path='/defect/:id(\d+)' component={ViewDefect}></Route>
              <Route path="/defect/edit/:id(\d+)" component={ManageDefect}></Route>
              <Route exact path="/defect/new" component={ManageDefect}></Route>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
