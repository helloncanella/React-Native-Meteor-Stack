import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Button from './button';

var ddpClient;


class App extends React.Component {

  handleIncrement() {
    this.props.ddpClient.call('addPost')
  }

  handleDecrement() {
    this.props.ddpClient.call('deletePost')
  }

  render() {
    let {posts} = this.props

    let count = Object.keys(posts || []).length;

    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {count}</Text>
          <Button text="Increment" onPress={this.handleIncrement.bind(this) }/>
          <Button text="Decrement" onPress={this.handleDecrement.bind(this) }/>
        </View>
      </View>
    );
  }
}



export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  center: {
    alignItems: 'center'
  }
});