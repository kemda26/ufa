import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
const axios = require('axios')

export default function DepartmentTable() {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Number', field: 'number'},
            { title: 'Name', field: 'name' },
            { title: 'Username', field: 'username' },
            { title: 'Password', field: 'password' },
            { title: 'Type', field: 'type', lookup: {1:'Admin', 2:'Teacher'}},
            { title: 'Email', field: 'email' },
            { title: 'Degree', field: 'degree', lookup: {3:'PhD', 4:'Bachelor'}},
            { title: 'Department', field: 'department'}
        ],
        data: [
            {
                id: '1',
                number: '1',
                name: 'Quang',
                username: 'quangnd',
                password: 'abcxyz',
                email: 'ufa@gmail.com',
                type: 2,
                degree: 3,
                department: 'ufa'
            },
        ],
    });

    useEffect(() => {
        let data = []
        axios.get('http://localhost:9000/users')
            .then(res => {
                console.log(res.data)
                res.data.forEach(item => {
                    let {_id, ...rest} = item
                    let id = _id
                    data.push({id, ...rest})
                    setState({...state, data})
                })
            })
            .catch(e => {console.log(e)})
    }, [])

    const addUser = (newUser) => {
        axios.post('http://localhost:9000/user/add', {...newUser})
            .then(res => {
                console.log(res)
                let {_id, ...rest} = res.data
                let id = _id.toString()
                let newObj = {id, ...rest}
                const data = [...state.data]
                data.push(newObj)
                setState({...state, data})
            })
            .catch(e => {
                console.log(e)
            })
    }

    const editUser = (newUser) => {
        let {id, ...rest} = newUser
        axios.patch(`http://localhost:9000/departments/${id}`, {id, ...rest})
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteUser = (user) => {
        let {id} = data
        axios.delete(`http://localhost:9000/departments/${id}`, id)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    } 


    return (
        <MaterialTable
            title="Manage Account"
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
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 600);
                    }),

                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}
