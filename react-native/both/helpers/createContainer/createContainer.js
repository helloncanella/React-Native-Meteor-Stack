import ReactiveContainer from '../../components/ReactiveContainer/ReactiveContainer.js'
import React from 'react'

export default function createContainer (collections, callback, element){
    return <ReactiveContainer component={element} updateView={callback} collections={collections}/>  
} 