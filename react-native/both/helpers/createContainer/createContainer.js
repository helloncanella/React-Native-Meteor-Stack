import ReactiveContainer from '../../components/ReactiveContainer/ReactiveContainer.js'
import React from 'react'

export default function createContainer (collections, callback, element){
    if( !collections || !Array.isArray(collections) || collections.length===0){
        console.log(!collections , !Array.isArray(collections) , collections.length===0)
        throw Error(`'${collections}' isn't an array, is empty or is null`)
    }

    if( typeof callback !=='function' ){
        throw Error("'${collections}' isn't an functions or is null")
    }
 

    return <ReactiveContainer component={element} updateView={callback} collections={collections}/>  
} 