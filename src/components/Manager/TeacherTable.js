import React, { useEffect } from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';

const axios = require('axios')

export default function TeacherTable() {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Họ tên', field: 'name' },
            { title: 'Học hàm, Học vị', field: 'degree', lookup: {1:'ThS.', 2:'TS.', 3:'PGS.TS.', 4:'GS.TS.', 5:'CN.'}},
            { title: 'Email', field: 'email' },
            { title: 'Đơn vị', field: 'department', lookup: {
                1:'BM Các Hệ thống Thông tin',
                2:'BM Công nghệ Phần mềm',
                3:'BM Khoa học Máy tính',
                4:'BM Khoa học và Kỹ thuật tính toán',
                5:'BM Truyền thông và Mạng máy tính',
                6:'PTN An toàn thông tin',
                7:'PTN Hệ thống Nhúng',
                8:'PTN Tương tác Người – Máy',
            }},
            {title: 'Lĩnh vực nghiên cứu', field: 'field'},
            {title: 'Website', field: 'website'},

        ],
        data: [],
    });

    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        setLoading(true)
        let data = []
        axios.get('http://localhost:9000/teachers')
            .then(res => {
                console.log(res.data)
                res.data.forEach(item => {
                    let {_id, ...rest} = item
                    let id = _id
                    data.push({id, ...rest})
                    setState({...state, data})
                    setLoading(false)
                })
            })
            .catch(e => {console.log(e)})
    }, [])

    const token = localStorage.getItem('token')

    const editUser = (newUser, oldUser) => {
        let {id, ...rest} = newUser
        axios({
            url: `http://localhost:9000/user/edit/${id}`,
            method: 'POST', 
            data: {id, ...rest}, 
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

    return (
        <MaterialTable
            title="Quản lý giảng viên"
            isLoading={loading}
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
                            // addUser(newData)
                        }, 600);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                            // editUser(newData, oldData)
                        }, 600);
                    }),

                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                            // deleteUser(oldData)
                        }, 600);
                    }),
            }}
            // detailPanel={rowData => {
            //     const {id} = rowData
            //     return (
            //     )
            // }}
            // onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
    );
}
