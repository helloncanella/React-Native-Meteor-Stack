import React from 'react';
import DDPClient from 'ddp-client';
import {View} from 'react-native'

let
    self,
    ddpClient = new DDPClient({
        //   host: 'localhost',
        host: '192.168.1.6', // If using android use your device IP address
        port: '3000',
        // url: <your websocket url>
    })


export default class ReactiveContainer extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            connected: false,
            view:{}
        }
    }    

    componentDidMount() {

        self = this

        ddpClient.connect((err, wasReconnect) => {
            let connected = true;

            if (err) {
                connected = false
            } else {
                this.makeSubscription();
                this.observeCollections();
            }
            this.setState({ connected: connected });
        });
    }



    makeSubscription() {

        let {collections} = this.props

        collections.forEach((collection) => {
            ddpClient.subscribe(collection, [], () => {
                self.updateView(collection);
            });
        })

    }

    observeCollections() {
        let {collections} = this.props

        collections.forEach((collection) => {
            let observer = ddpClient.observe(collection);
            self.updateView(collection)

            observer.added = (id) => {
                self.updateView(collection)
            }
            observer.changed = (id, oldFields, clearedFields, newFields) => {
                self.updateView(collection)
            }
            observer.removed = (id, oldValue) => {
                self.updateView(collection)
            }

        })
    }

    updateView(collectionName) {

        var viewState = this.props.updateView()
        
        this.setState({ view: Object.assign({}, viewState) })
       
    }

    render() {
        let component = this.props.component
        return <View className="reactive-container">{component}</View>
    } 
}

var propTypes = React.PropTypes

ReactiveContainer.propTypes = {
    collections: propTypes.array.isRequired,
    component: propTypes.element.isRequired,
    updateView: propTypes.func.isRequired
}

