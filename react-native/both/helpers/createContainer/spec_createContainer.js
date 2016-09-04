import {expect} from 'chai'
import React from 'react'
import {stub, spy, assert, match} from 'sinon'
import {shallow, mount} from 'enzyme'
import proxyquire from 'proxyquire'
import {View} from 'react-native'
import jsdom from 'jsdom'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

const proxyquireStrict = proxyquire.noCallThru();

describe('createContainer function', function () {

    let ReactiveContainer, createContainer

    let observeSpy, subscribeSpy

    beforeEach(() => {

        class DDPClient {
            constructor() {
                this.collections = {

                }
            }
            connect(callback) {
                callback(null, true)
            }
            observe() {
                return {}
            }
            subscribe() { }

        }


        observeSpy = spy(DDPClient.prototype, "observe"),
            subscribeSpy = spy(DDPClient.prototype, "subscribe")


        let path = '../../components/ReactiveContainer/ReactiveContainer.js'

        ReactiveContainer = proxyquireStrict(path, {
            'ddp-client': DDPClient,
        }).default

        createContainer = proxyquireStrict('./createContainer.js', {
            '../../components/ReactiveContainer/ReactiveContainer.js': ReactiveContainer,
        }).default


    })


    describe('throws error ', () => {

        xit("if collection isn't array or empty", function () {
 
            var createContainerSpy = spy(createContainer);


                createContainerSpy([], ()=>{}, (<div></div>))
            
                 assert.threw(spy, Error)


        });

        
    })

    describe('reactive container', function () {

        it('is returned', function () {
            let rendered = shallow(createContainer(['oi', 'ola'], ()=>{}, (<div></div>)))
 
            expect(rendered.is('.reactive-container')).to.true
        })

        it('a component passed by argument is rendered', function () {

            var component = (<div></div>)


            var container = shallow(createContainer(['oi', 'ola'], ()=>{}, component))

            expect(container.find('div')).to.length(1)

        })


        it('the collection in the argument is used to make Meteor subscriptions', () => {

            var collections = ['oi', 'ola']
            var component = (<div></div>)

            var container = mount(createContainer(collections, () => { }, component))

            collections.forEach((collection, index) => {
                expect(observeSpy.calledWith(collection)).to.true
                expect(subscribeSpy.calledWith(collection)).to.true
            })


        })


        it('callback is called with collections data', () => {

            var
                collections = ['ola', 'oi'],

                updateView = function (reactiveData) {
                    return {
                        lero: 'lero',
                        teco: 'treco'
                    }
                }

            var callBackSpy = spy(updateView),
                container = mount(createContainer(collections, callBackSpy, (<div></div>)))

            collections.forEach((collection) => {
                assert.calledWith(callBackSpy, match.has(collection))
            })


        })




    });


});
