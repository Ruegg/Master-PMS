import React,{Component} from 'react'

import SmartViewTable from './SmartViewTable.js';
import { Router, Route,Link } from 'react-router-dom';

import ReactTextTransition, { presets } from "react-text-transition";
import PMSUtils from './PMSUtils.js'


const texts = ["Deliverables", "Tasks", "Issues", "Action Items", "Decisions", "Resources", "Risks", "Requirements", "Changes", "Components", "Defects"];


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {textIndex: 0};
  }
  componentDidMount(){
    setInterval(() => {
      this.setState({
        textIndex: this.state.textIndex + 1
      });
    }, 2000);
  }
  render(){
    return (
      <div>
        <h3 class="intro-title">Welcome to Master PMS</h3>

        <section className="inline intro-niche">
          Go ahead and create some&nbsp;
        <ReactTextTransition
              text={texts[this.state.textIndex % texts.length]}
              springConfig={presets.gentle}
              className="big niche"
              delay={300}
              inline
            />
        </section>
        <img className="mobile-preview" src="mobile.png"/>
      </div>
    );
  }
}

export default Home;
