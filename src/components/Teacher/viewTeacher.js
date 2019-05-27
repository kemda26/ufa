import React, { useEffect } from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ReadonlyTeacherProfile from './TeacherProfile'

const axios = require('axios')

export default function TeacherTable() {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Name', field: 'name' },
            { title: 'Type', field: 'type', lookup: {2:'Teacher'}},
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Degree', field: 'degree', lookup: {3:'PhD', 4:'Bachelor'}},
            { title: 'Address', field: 'address'},
            { title: 'Department', field: 'department'}
        ],
        data: [
            {
                id: '111111111',
                name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                type: 2,
                email: '@email',
                phone: '321313',
                address: 'E3',
                degree: 3,
                department: 'aa',
            },
        ],
    });

    useEffect(() => {
        let data = []
        axios.get('http://localhost:9000/teachers')
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

    // const token = localStorage.getItem('token')

    // const editUser = (newUser, oldUser) => {
    //     let {id, ...rest} = newUser
    //     axios({
    //         url: `http://localhost:9000/user/edit/${id}`,
    //         method: 'POST', 
    //         data: {id, ...rest}, 
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //         }
    //     })
    //         .then(res => {
    //             const data = [...state.data];
    //             data[data.indexOf(oldUser)] = newUser
    //             setState({ ...state, data });
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    // }

    return (
        <MaterialTable
            title="Teachers"
            columns={state.columns}
            data={state.data}
            options={{
                grouping: true,
            }}
            detailPanel={rowData => {
                const {id} = rowData
                return (
                    <ReadonlyTeacherProfile profileID={id}/>
                )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
    );
}
