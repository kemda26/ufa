import React, { useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import XLSX from 'xlsx'
import {Button} from '@material-ui/core'
const axios = require('axios')
import { withSnackbar } from 'notistack'

const style = {
        margin: '10px',
}

function DepartmentTable(props) {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Tên', field: 'name' },
            { title: 'Tài khoản', field: 'username' },
            { title: 'Mật khẩu', field: 'password' },
            { title: 'Loại tài khoản', field: 'type', lookup: {1:'Quản trị viên', 2:'Giảng viên'}},
            { title: 'Email', field: 'email' },
            { title: 'Điện thoại', field: 'phone' },
        ],
        data: [],
    });

    const [loading, setLoading] = React.useState(true)
    const [selectedRow, setSelectedRow] = React.useState(null)

    useEffect(() => {
        setLoading(true)
        let data = []
        axios.get('http://localhost:9000/users')
            .then(res => {
                // console.log(res.data)
                res.data.forEach(item => {
                    let {_id, profile, ...rest} = item
                    let id = _id
                    data.push({id, ...rest, ...profile})
                    setState({...state, data})
                    setLoading(false)
                })
            })
            .catch(e => {console.log(e)})
    }, [])

    const token = localStorage.getItem('token')

    let data = [...state.data]
    const addUser = (newUser) => {
        axios({
            url: 'http://localhost:9000/manage/user/add',
            method: 'POST', 
            data: {...newUser},
            headers : {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                    let {_id} = res.data
                    let id = _id.toString()
                    let newObj = {id, ...newUser}
                    data.push(newObj)
                    setState({...state, data})
                    props.enqueueSnackbar('Ok', {variant: 'success', action})
                })
            .catch(e => {
                console.log(e)
            })
    }

    const editUser = (newUser, oldUser) => {
        let {id} = newUser
        axios({
            url: `http://localhost:9000/manage/user/edit/${id}`, 
            method: 'POST', 
            data: {...newUser}, 
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                let data = [...state.data];
                data[data.indexOf(oldUser)] = newUser
                setState({ ...state, data });
                props.enqueueSnackbar('Ok', {variant: 'success', action})
            })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteUser = (oldUser) => {
        let {id} = oldUser
        axios({
            url: `http://localhost:9000/manage/user/delete/${id}`,
            method: 'delete',
            data: id,
            headers : {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                let data = [...state.data];
                data.splice(data.indexOf(oldUser), 1);
                setState({ ...state, data });
                props.enqueueSnackbar('Ok', {variant: 'success', action})
            })
            .catch(e => {
                console.log(e)
            })
    }

    let loadExcel = null
    let excel_data = []
    const convertFile = (e) => {
        var files = e.target.files, f = files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
            var data = new Uint8Array(e.target.result)
            var workbook = XLSX.read(data, { type: 'array' })
            var first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
            var json_data = XLSX.utils.sheet_to_json(first_worksheet, {header:1})
            for(let i = 1; i < json_data.length; i++) {
                let item = json_data[i]
                if (item.length != 0) {
                    excel_data.push({name: item[3], username: item[1], password: item[2], email: item[4], phone: '', type: '2'})
                }
            }
        }
        reader.readAsArrayBuffer(f)
    }

    const uploadExcel = () => {
        excel_data.forEach(item => {
            addUser(item)
            setTimeout(() => {
                setState({...state, data})
                props.enqueueSnackbar('Ok', {variant: 'success', action})
            }, 1000)
        })
    }

    const action = (key) => (
        <Button onClick={() => { props.closeSnackbar(key) }}>
            {'Dismiss'}
        </Button>
    )

    return (
    <div style={style}>
        <MaterialTable
            title="Quản lý giảng viên"
            isLoading={loading}
            columns={state.columns}
            data={state.data}
            components={{
                Toolbar: props => {
                    return (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{display: 'flex', justifyContent:'flex-end', marginRight: '48px', marginBottom: '11px'}}>
                                <input style={{ display: 'none' }} type='file' onChange={convertFile} ref={(e) => loadExcel = e} />
                                <Button color='primary' onClick={() => loadExcel.click()}>Chọn Excel</Button>
                                <Button color='secondary' onClick={uploadExcel}>Cập nhật</Button>
                            </div>
                        </div>
                    )
                }
            }}
            onRowClick={(event, selectedRow) => {
                setSelectedRow(selectedRow)
            }}
            options={{
                grouping: true,
                headerStyle: {
                    backgroundColor: '#005e94',
                    color: '#FFF',
                    fontSize: '15px'
                },
                rowStyle: rowData => ({
                    backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addUser(newData)
                        }, 600);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            editUser(newData, oldData)
                        }, 600);
                    }),

                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            deleteUser(oldData)
                        }, 600);
                    }),
            }}
        />
    </div>
    );
}

export default withSnackbar(DepartmentTable)