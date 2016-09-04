import {expect} from 'chai'
import React from 'react'
import {stub, spy, assert} from 'sinon'
import {shallow, mount} from 'enzyme'
import proxyquire from 'proxyquire'
import {View} from 'react-native'
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

const proxyquireStrict = proxyquire.noCallThru();

describe('ReactiveContainer', function () {
    let ReactiveContainer, DDPClient

    let _fakeReactiveContainer = (DDPClientStubs) => {
        return ReactiveContainer = proxyquireStrict('./ReactiveContainer.js', {
            'ddp-client': DDPClientStubs,
        }).default
    }

    it('make ddpConnections', function () {

        let
            DDPClient = stub(),
            ReactiveContainer = _fakeReactiveContainer(DDPClient)


        shallow(<ReactiveContainer component={<any/>}/>)
        expect(DDPClient.calledWithNew()).to.be.true
    });

    it('subscribe and observe to collections passed by props', function () {

        class DDPClient {
            constructor() {
                this.collections = {}
            }
            connect(callback) {
                callback(null, true)
            }
            observe() {
                return {}
            }
            subscribe() { }
        }

        let
            observeSpy = spy(DDPClient.prototype, "observe"),
            subscribeSpy = spy(DDPClient.prototype, "subscribe")

        let ReactiveContainer = _fakeReactiveContainer(DDPClient)

        var collections = [];

        for (var i = 0; i <= Math.floor(Math.random() * 100); i++) {
            collections.push('collections' + i)
        }

        var props = {
            collections,
            component: (<any />),
            updateView: () => { }
        }

        mount(<ReactiveContainer {...props} />)

        collections.forEach((collection) => {
            expect(observeSpy.calledWith(collection)).to.true
            expect(subscribeSpy.calledWith(collection)).to.true
        })

    })

    it("renders component passed by property 'component' ", function () {
        let ReactiveContainer = _fakeReactiveContainer(stub())

        const Component = (<any className='any'/>)

        let ReactiveContainerRendered = shallow(<ReactiveContainer collections={[]} component={Component} updateView={() => { } }/>)

        expect(ReactiveContainerRendered.find('any')).to.have.length(1)

    });

    // @TOFIX - solve problems
    xit("renders view with the props returned by updateView callback ", function (done) {
           
        
        let ReactiveContainer = _fakeReactiveContainer(stub())

        let viewProperties = {
            treco: 'batata',
            vixe: 'maria',
            any: 'qualquer'
        }

       
        class ViewElement extends React.Component {
            render() {
                let {treco, vixe, any} = this.props

                console.log('AIAIAI')
                             return (
                    <View>
                        <View className={treco}>{treco}</View>
                        <View className={vixe}>{vixe}</View>
                        <View className={any}>{any}</View>
                    </View>
                )
            }
        }

        var props = {
            updateView: ()=>{},
            collections: [],
            component: (<ViewElement />)
        }

        let container = shallow(<ReactiveContainer {...props}/>) 
        container.setState({
            view: Object.assign({},viewProperties)
        })     
       
       container.update()
     
        expect(container.find('.maria')).to.length(1)
        // expect(container.find(`ViewElement.qualquer`)).to.length(1)

    });




});
