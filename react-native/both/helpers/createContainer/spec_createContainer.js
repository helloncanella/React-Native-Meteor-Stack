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

describe('createContainer function', function () {

    describe('reactive container', function () {

        let ReactiveContainer, createContainer

        beforeEach(() => {
            let path = '../../components/ReactiveContainer/ReactiveContainer.js'

            ReactiveContainer = proxyquireStrict(path, {
                'ddp-client': stub(),
            }).default

            createContainer = proxyquireStrict('./createContainer.js', {
                '../../components/ReactiveContainer/ReactiveContainer.js': ReactiveContainer,
            }).default

        })

 
        it('is returned', function () {
            let rendered = shallow(createContainer())
       
            expect(rendered.is('.reactive-container')).to.true
        }) 

        it('if component passed by argument as child', function () {

        })


        it('the child is rendered with props given by the return of the callback', function () {

        })


    });

    it('callback is triggered always the the view is updated', function () {

    })

});
