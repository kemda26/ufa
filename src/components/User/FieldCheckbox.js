import React, {useState, useEffect} from 'react'
import MaterialTable, { MTableCell } from 'material-table';
import {withSnackbar} from 'notistack'
import {Button} from '@material-ui/core'
const axios = require('axios')

function BasicTreeData(props) {
    const [state, setState] = useState({
        data: [
            {
                rowId: 'rid',
                name: 'name',
                parentId: '',
            },
            {
                rowId: 'dsada',
                name: 'memem',
                parentId: 'rid',
            }
        ]
    })

    const action = (key) => (
        <Button onClick={() => { props.closeSnackbar(key) }}>
            {'Dismiss'}
        </Button>
    )

    const [field, setField] = useState([])
    const id = localStorage.getItem('profileID')

    useEffect(() => {
        axios.get('http://localhost:9000/fields')
            .then(res => {
                const data = res.data
                setState({...state, data})
                console.log(res.data)
            })
            .catch(e => {console.log(e)})
    }, [])

    return (
        <div style={{width: '750px', margin: '14px auto'}}>
            <MaterialTable
                title="Lĩnh vực nghiên cứu"
                data={state.data}
                columns={[{},{ title: 'Lĩnh vực', field: 'name' },{}]}
                parentChildData={(row, rows) => rows.find(a => a.rowId === row.parentId)}
                options={{
                    selection: true,
                    selectionProps: rowData => ({
                        disabled: rowData.name === 'Mehmet',
                        color: 'primary',
                        onSelectionChange
                      })
                }}
                onSelectionChange={(rows) => {
                    console.log(rows)
                    // setField(rows)
                    return null
                }}
                actions={[
                    {
                        icon: 'check',
                        tooltip: 'cập nhật',
                        onClick: (event, rowData) => {
                            console.log(rowData)
                            setField(rowData)
                            axios.post(`http://localhost:9000/teacher/field/${id}`, {id, field: rowData})
                                .then(res => {
                                    props.enqueueSnackbar('Ok', {variant: 'success', action})
                                    console.log(res)
                                })
                                .catch(e => {console.log(e)})
                        }
                    }
                ]}
            />
        </div>
    )
}

export default withSnackbar(BasicTreeData)