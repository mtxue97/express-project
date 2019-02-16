import React, { Component } from 'react';

import {Router, Route, Link} from 'react-router-dom';
import { Button } from 'antd';
import './components/comment.css'

// 引入4个模块组件
import Plan from './components/plan.js'
import Home from './components/home.js'
import Popup from './components/popup.js'
import TestRouter from './components/testrouter.js'
import Detail from './components/detail.js'

// 引入样式文件
import './App.css'
import './components/comment.css'
// 引入路由
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature:temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature:temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
          <Button type="primary" href="http://www.baidu.com">button</Button>
          {/* <Home></Home> */}
          {/* 路由配置 */}
            <Router history = {history}>
               <div className="contentBox">
                  <ul className="nav">
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/plan">计划表</Link></li>
                    <li><Link to="/test">二级路由</Link></li>
                  </ul>
                  <div className="content"> 
                    <Route exact path="/" component={Home}/>
                    <Route path="/plan" component={Plan}/>
                    <Route path="/test" component={TestRouter}/>
                    <Route path="/detail/:id" component={Detail}/>
                  </div>
              </div>
            </Router>
            {/* <Popup/> */}
            <Router history = {history}>
              <div>
                <ul>
                  <li><Link to="/">首页</Link></li>
                  <li><Link to="/hot">热门</Link></li>
                  <li><Link to="/zhuanlan">专栏</Link></li>
                </ul>
                <Route  exact path="/" component={Home}></Route>
                <Route path="/hot" component={Hot}></Route>
                <Route path="/zhuanlan" component={Zhuanlan}></Route>
              </div>
            </Router>
      </div>
    );
  }
}

const Hot = ({match})=>(<div>
  <h2>热门</h2>
    <li><Link to={`${match.url}/article`}>文章</Link></li>
    <li><Link to={`${match.url}/qa`}>问答</Link></li>
    <li><Link to={`${match.url}/news`}>新闻</Link></li>
    <hr/>
    <Route path={`${match.url}/:type`} component={Content}></Route>
  </div>)

 const Content=({match})=>(
  <div>
    <h2>子目录</h2>
    <p>{match.params.type}</p>
  </div>
)

const Zhuanlan = ()=> (<div><h2>专栏</h2></div>)
export default App;