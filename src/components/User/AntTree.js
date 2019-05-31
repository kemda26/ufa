import { TreeSelect } from 'antd'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import data from './test.json'
import {Button} from '@material-ui/core'
import {withSnackbar} from 'notistack'
const axios = require('axios')

// const SHOW_PARENT = TreeSelect.SHOW_PARENT
// const treeData = data
// let treeData = []

// class Demo extends React.Component {
//     state = {
//         value: [],
//     }
    

//     componentWillMount() {
//         axios.get('http://localhost:9000/fields')
//             .then(res => {
//                 treeData = res.data
//                 console.log(res.data)
//             })
//             .catch(e => {
//                 console.log(e)
//             })
//     }

//     onChange = value => {
//       console.log('onChange ', value)
//       this.setState({ value })
//     }
    
//     handleSubmit = () => {
//         const id = localStorage.getItem('profileID')
//         const field = this.state.value
//         axios.patch(`http://localhost:9000/teacher/${id}`, {id, field})
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(e => {console.log(e)})
//     }
  
//     render() {
//         const tProps = {
//             treeData,
//             value: this.state.value,
//             onChange: this.onChange,
//             treeCheckable: true,
//             // showCheckedStrategy: SHOW_PARENT,
//             searchPlaceholder: 'Chọn lĩnh vực nghiên cứu',
//             style: {
//                 width: 600,
//             },
//         }

//         return (
//             <div>
//                 <div style={{width: '600px', margin: '0 auto', fontSize: '26px'}}>
//                     <p>Lĩnh vực nghiên cứu</p>
//                 </div>
//                 <div style={{width: '600px', margin: '30px auto'}}>
//                     <TreeSelect {...tProps} />
//                 </div>
//             </div>
//         )
//     }
// }

// export default Demo


function AntTree(props) {
    const [state, setState] = React.useState({
        value: []
    })
    const [treeData, setTreeData] = React.useState([])
    const id = localStorage.getItem('profileID')

    useEffect(() => {
        axios.get('http://localhost:9000/fields')
            .then(res => {
                setTreeData(res.data)
                // console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
            
        axios.get(`http://localhost:9000/teacher/${id}`)
            .then(res => {
                console.log(res.data)
                let {field} = res.data
                setState({value: field})
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const action = (key) => (
        <Button onClick={() => { props.closeSnackbar(key) }}>
            {'Dismiss'}
        </Button>
    )

    const onChange = value => {
        console.log('onChange ', value)
        setState({ value })
      }

    const handleSubmit = () => {
        console.log(id)
        const field = state.value
        axios.post(`http://localhost:9000/teacher/field/${id}`, {id, field})
            .then(res => {
                props.enqueueSnackbar('Ok', {variant: 'success', action})
                console.log(res)
            })
            .catch(e => {console.log(e)})
    }

    const treeProps = {
        treeData,
        value: state.value,
        onChange: onChange,
        treeCheckable: true,
        searchPlaceholder: 'Chọn lĩnh vực quan tâm',
        style: {
            width: 500,
        },
    }
    
    return (
        <div>
            <div style={{width: '600px', margin: '0 auto', fontSize: '26px'}}>
                <p>Lĩnh vực quan tâm</p>
            </div>
            <div style={{width: '600px', margin: '30px auto'}}>
                <TreeSelect {...treeProps} />
                <Button color="primary" onClick={handleSubmit} >Cập nhật</Button>
            </div>
        </div>
    )
}

export default withSnackbar(AntTree)
