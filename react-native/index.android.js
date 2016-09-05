import React, {Component} from 'react'
import { AppRegistry, View, Text, StyleSheet } from 'react-native'
import App from './both/components/App/App'

import createContainer from './both/helpers/createContainer/createContainer'

class RNApp extends Component {  
  render() {
    return createContainer(['posts'], (reactiveData, ddpClient)=>{
      return{
        ddpClient, 
        posts: reactiveData.posts
      }
    }, <App/>)
 
  }
}

const styles = StyleSheet.create({
  App: {
    height: 500
  }
});

AppRegistry.registerComponent('RNApp', () => RNApp);