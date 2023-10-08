import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Link, Switch, Route,Routes, BrowserRouter as Router} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  Pagesize = 15;
  state={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        
        <Routes>
        <Route exact path='/' element={<News setProgress={this.setProgress} key="general" Pagesize = {this.Pagesize} country = "in" category = "general"/>} />
        <Route exact path='/business' element={<News setProgress={this.setProgress} key="business" Pagesize = {this.Pagesize} country = "in" category = "business"/>} />
        <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" Pagesize = {this.Pagesize} country = "in" category = "entertainment"/>} />
        <Route exact path='/general' element={<News setProgress={this.setProgress} key="general" Pagesize = {this.Pagesize} country = "in" category = "general"/>} />
        <Route exact path='/health' element={<News setProgress={this.setProgress} key="health" Pagesize = {this.Pagesize} country = "in" category = "health"/>} />
        <Route exact path='/science' element={<News setProgress={this.setProgress} key="science" Pagesize = {this.Pagesize} country = "in" category = "science"/>} />
        <Route exact path='/sports' element={<News setProgress={this.setProgress} key="ports" Pagesize = {this.Pagesize} country = "in" category = "sports"/>} />
        <Route exact path='/technology' element={<News setProgress={this.setProgress} key="technology" Pagesize = {this.Pagesize} country = "in" category = "technology"/>} />
        </Routes>
        
        </Router>
      </div>
    )
  }
}

