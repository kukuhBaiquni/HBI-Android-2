import React, { Component } from 'react';
import RouterTabs from './Router';
import { Provider } from 'react-redux';
import { store } from '../store';
import SplashScreen from './Splash_Screen';
import { RootStack } from './Router';

export default class SourceComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      changeScreen: false
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000)
  }

  tick() {
    var state = this.state.count;
    state++
    this.setState({count: state})
    if (this.state.count === 3) {
      this.setState({changeScreen: true})
      clearInterval(this.timer)
    }
  }

  render() {
    return(
      <Provider store = { store }>
        {
          this.state.changeScreen
          ?
          <RootStack />
          :
          <SplashScreen />
        }
      </Provider>
    )
  }
}
