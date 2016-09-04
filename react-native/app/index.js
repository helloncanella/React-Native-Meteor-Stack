import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Button from './button';

import DDPClient from 'ddp-client';
let ddpClient = new DDPClient({
//   host: 'localhost',
  host: '192.168.1.6', // If using android use your device IP address
  port: '3000',
  // url: <your websocket url>
});

export default React.createClass({
  getInitialState() {
    return {
      connected: false,
      posts: {}
    }
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) {
        connected = false
      } else {
        this.makeSubscription();
        this.observePosts();
      }
      this.setState({ connected: connected });
    });
  },

  // This is just extremely simple. We're replacing the entire state whenever the collection changes
  observePosts() {
    let observer = ddpClient.observe("posts");
    observer.added = (id) => {
      this.setState({posts: ddpClient.collections.posts})
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      this.setState({posts: ddpClient.collections.posts})
    }
    observer.removed = (id, oldValue) => {
      this.setState({posts: ddpClient.collections.posts})
    }
  },

  makeSubscription() {
    ddpClient.subscribe("posts", [], () => {
      this.setState({posts: ddpClient.collections.posts});
    });
  },

  handleIncrement() {
    ddpClient.call('addPost');
  },

  handleDecrement() {
    ddpClient.call('deletePost');
  },

  render() {
    let count = Object.keys(this.state.posts).length;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {count}</Text>
          <Button text="Increment" onPress={this.handleIncrement}/>
          <Button text="Decrement" onPress={this.handleDecrement}/>
        </View>
      </View>
    );
  }
});

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