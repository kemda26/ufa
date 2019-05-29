import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import XLSX from 'xlsx'
import {Button} from '@material-ui/core'
const axios = require('axios')

const style = {
        margin: '10px',
        // marginBottom: '',
        // height: '80%',
}

export default function DepartmentTable() {
    const [state, setState] = React.useState({
        columns: [  
            // { title: 'Number', field: 'number'},
            { title: 'Tên', field: 'name' },
            { title: 'Tài khoản', field: 'username' },
            { title: 'Mật khẩu', field: 'password' },
            { title: 'Loại tài khoản', field: 'type', lookup: {1:'Quản trị viên', 2:'Giảng viên'}},
            { title: 'Email', field: 'email' },
            { title: 'Điện thoại', field: 'phone' },
            // { title: 'Degree', field: 'degree', lookup: {3:'PhD', 4:'Bachelor'}},
            // { title: 'Department', field: 'department'}
        ],
        data: [
            {
                // id: '1',
                // number: '1',
                // name: 'Quang',
                // username: 'quangnd',
                // password: 'abcxyz',
                // email: 'ufa@gmail.com',
                // type: 2,
                // degree: 3,
                // department: 'ufa'
            },
        ],
    });

    useEffect(() => {
        let data = []
        axios.get('http://localhost:9000/users')
            .then(res => {
                // console.log(res.data)
                res.data.forEach(item => {
                    let {_id, profile, ...rest} = item
                    let id = _id
                    data.push({id, ...rest, ...profile})
                    setState({...state, data})
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
                    // let data = [...state.data]
                    // ndata.push(newObj)
                    data.push(newObj)
                    setState({...state, data})
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
                // console.log(res)
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
            // console.log(excel_data)
        }
        reader.readAsArrayBuffer(f)
    }

    const uploadExcel = () => {
        excel_data.forEach(item => {
            addUser(item)
            setTimeout(() => {
                setState({...state, data})
            }, 1000)
        })
    }


    return (
    <div style={style}>
        <input style={{ display: 'none' }} type='file' onChange={convertFile} ref={(e) => loadExcel = e} />
        <Button onClick={() => loadExcel.click()}>Chọn</Button>
        <Button onClick={uploadExcel}>Cập nhật</Button>
        <MaterialTable
            title="Quản lý giảng viên"
            columns={state.columns}
            data={state.data}
            options={{
                grouping: true,
                headerStyle: {
                    backgroundColor: '#005e94',
                    color: '#FFF',
                    fontSize: '15px'
                }
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            // const data = [...state.data];
                            // data.push(newData);
                            // setState({ ...state, data });
                            addUser(newData)
                        }, 600);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            // const data = [...state.data];
                            // data[data.indexOf(oldData)] = newData;
                            // setState({ ...state, data });
                            editUser(newData, oldData)
                        }, 600);
                    }),

                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            // const data = [...state.data];
                            // data.splice(data.indexOf(oldData), 1);
                            // setState({ ...state, data });
                            deleteUser(oldData)
                        }, 600);
                    }),
            }}
        />
    </div>
    );
}
