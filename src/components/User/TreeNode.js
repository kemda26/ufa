import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';

function TreeNode(props) {
    const {node, childNodes} = props

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    }

    return (
        <React.Fragment>
            <div>
                <Checkbox checked={true} color='default' />
            </div>
        </React.Fragment>
    )
}

export default TreeNode
