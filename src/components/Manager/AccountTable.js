import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
const axios = require('axios')

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

    const addUser = (newUser) => {
        axios({
            url: 'http://localhost:9000/manage/user/add',
            method: 'POST', 
            data:{...newUser},
            headers : {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                // console.log(res)
                let {_id} = res.data
                // let {name, email, phone} = profile
                let id = _id.toString()
                let newObj = {id, ...newUser}
                const data = [...state.data]
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
                const data = [...state.data];
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
                const data = [...state.data];
                data.splice(data.indexOf(oldUser), 1);
                setState({ ...state, data });
                // console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    } 


    return (
        <MaterialTable
            title="Quản lý giảng viên"
            columns={state.columns}
            data={state.data}
            options={{
                grouping: true,
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
    );
}
