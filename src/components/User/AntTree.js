import { TreeSelect } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import data from './test.json'
const axios = require('axios')

// const SHOW_PARENT = TreeSelect.SHOW_PARENT
const treeData = data

class Demo extends React.Component {
    state = {
        value: ['0-0-0', '0-0-1', '0-0-2', '0-0-3'],
    }

  
    onChange = value => {
      console.log('onChange ', value)
      this.setState({ value })
    }
    
    handleSubmit = () => {
        const id = localStorage.getItem('profileID')
        const field = this.state.value
        axios.patch(`http://localhost:9000/teacher/${id}`, {id, field})
            .then(res => {
                console.log(res)
            })
            .catch(e => {console.log(e)})
    }
  
    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            // showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Chọn lĩnh vực nghiên cứu',
            style: {
                width: 600,
            },
        }

        return (
            <div>
                <div style={{width: '600px', margin: '0 auto', fontSize: '26px'}}>
                    <p>Lĩnh vực nghiên cứu</p>
                </div>
                <div style={{width: '600px', margin: '30px auto'}}>
                    <TreeSelect {...tProps} />
                </div>
            </div>
        )
    }
}

export default Demo