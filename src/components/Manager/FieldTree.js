import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import {Button} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
const axios = require('axios')

function TreeData(props) {
    const [state, setState] = useState({
        data: [
            {
                rowId: 'aa',
                name: 'a',
            },
            {
                rowId: 2,
                parentId: 'aa',
                name: 'b',   
            },
            {
                rowId: 'bb',
                parentId: 'aa',
                name: 'c',   
            },
            {
                rowId: 4,
                parentId: 'bb',
                name: 'd', 
            },
            {
                rowId: 'cc',
                name: 'e',   
            },
            {
                rowId: 6,
                parentId: 'cc',
                name: 'f',
            },
        ]
    })

    const [open, setOpen] = useState(false)
    const [field, setField] = useState('')
    const [prData, setPrData] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:9000/fields')
            .then(res => {
                console.log(res.data)
                const data = res.data
                setState({...state, data})
            })
            .catch(e => {console.log(e)})
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        const {value} = event.target
        setField(value)
    }

    const handleSubmit = () => {
        let {rowId} = prData
        const data = [...state.data]
        axios.post('http://localhost:9000/add/fields', {parentId: rowId, name: field, rowId: field})
            .then(res => {
                let {id} = res.data
                data.push({...res.data})
                // console.log(res.data)
                setState({...state, data})
            })
            .catch(e => {console.log(e)})
        setOpen(false)
        // console.log(prData)
        // console.log({parentId: rowId, name: field, rowId: field})
    }

    const addField = (newData) => {
        const {name} = newData
        axios.post('http://localhost:9000/add/onefields', {name, rowId: name})
            .then(res => {
                console.log(res)
            })
            .catch(e => {console.log(e)})
    }

    const deleteField = (oldData) => {
        let {_id} = oldData
        let id = _id
        axios.delete(`http://localhost:9000/field/${id}`, {id})
            .then(res => {
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const editField = (newData, oldData) => {
        const {_id, parentId} = oldData
        const {name, rowId} = newData
        let id= _id
        const data = {id, name, rowId, parentId}
        axios.post(`http://localhost:9000/field/${id}`, data)
            .then(res => {
                console.log(res)
            })
            .catch(e => {console.log(e)})
    }

    return (
        <div>
            <div style={{width: '750px', margin: '14px auto'}}>
                <MaterialTable
                    title="Cây"
                    data={state.data}
                    columns={[{title: ''},{ title: 'Lĩnh vực', field: 'name' }, {title: ''}]}
                    parentChildData={(row, rows) => rows.find(a => a.rowId === row.parentId)}
                    options={{
                        // selection: true,
                        actionsColumnIndex: -1,
                    }}
                    actions={[
                        {
                            tooltip: 'add',
                            icon: 'add',
                            onClick: (event, data) => {
                                setOpen(true)
                                setPrData(data)
                                return null
                            }
                        }
                    ]}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve()
                                    const data = [...state.data]
                                    data[data.indexOf(oldData)] = newData
                                    setState({ ...state, data })
                                    editField(newData, oldData)
                                }, 500)
                            }),
        
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    console.log(oldData)
                                    resolve()
                                    const data = [...state.data]
                                    data.splice(data.indexOf(oldData), 1)
                                    setState({ ...state, data })
                                    deleteField(oldData)
                                }, 500)
                            }),

                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve()
                                    const data = [...state.data]
                                    data.push({name: newData.name, rowId: newData.name})
                                    setState({ ...state, data })
                                    addField(newData)
                                }, 500)
                            })
                    }}
                    
                    
                />
            </div>
            <div >
                <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth='sm'
                    fullWidth={true}
                    // style={}
                >
                    <DialogTitle>
                        Thêm lĩnh vực
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            name="field"
                            autoFocus
                            margin="dense"
                            id="field"
                            label="Field"
                            type="text"
                            value={field}
                            onChange={handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Đóng
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Thêm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}


export default TreeData