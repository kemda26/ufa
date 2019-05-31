import React, { useState, useEffect } from 'react'
import data from './test.json'
import TreeNode from './TreeNode'
import {Button} from '@material-ui/core'


function FieldTree(props) {
    
    function exploreTree(arr) {
        arr.forEach(element => {
            console.log(element.label)
            if (element.children) {
                exploreTree(element.children)
            }
        })
    }

    // useEffect(() => {
    //     exploreTree(data)
    // }, [])

    const handleClick = () => {
        exploreTree(data)
    }

    return (
        <div>
            
        </div>
    )
}

export default FieldTree