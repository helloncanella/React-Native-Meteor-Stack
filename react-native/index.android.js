import React, {Component} from 'react'
import { AppRegistry } from 'react-native'


import App from './app';

class RNApp extends Component {  
  render() {
    return <App />;
  }
}
AppRegistry.registerComponent('RNApp', () => RNApp);