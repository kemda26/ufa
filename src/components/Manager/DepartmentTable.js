import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
const axios = require('axios')

export default function DepartmentTable() {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Tên đơn vị', field: 'name' },
            { title: 'Loại đơn vị', field: 'type', lookup: {1: 'Bộ môn', 2: 'Phòng thí nghiệm'}},
            { title: 'Địa chỉ', field: 'address'},
            { title: 'Điện thoại', field: 'phone'},
            { title: 'Website', field: 'website'}
        ],
        data: [],
    });

    useEffect(() => {
        let data = []
        axios.get('http://localhost:9000/departments')
            .then(res => {
                res.data.forEach(item => {
                    let {_id, ...rest} = item
                    let id = _id
                    data.push({id, ...rest})
                    setState({...state, data})
                })
            })
            .catch(e => {console.log(e)})
    }, [])

    const addDataToDb = (newdata) => {
        axios.post('http://localhost:9000/departments', {...newdata})
            .then(res => {
                // console.log(res)
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

    const editDataToDb = (newData) => {
        let {id, ...rest} = newData
        axios.patch(`http://localhost:9000/departments/${id}`, {id, ...rest})
            .then(res => {
                // console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteData = (data) => {
        let {id} = data
        axios.delete(`http://localhost:9000/departments/${id}`, id)
            .then(res => {
                // console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    } 

    return (
        <MaterialTable
            title="Quản lý đơn vị"
            columns={state.columns}
            data={state.data}
            options={{
                grouping: true,
                // selection: true
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            addDataToDb(newData)
                        }, 500);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        editDataToDb(newData)
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 500);
                    }),

                onRowDelete: oldData =>
                    new Promise(resolve => {
                        // console.log(oldData)
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                            deleteData(oldData)
                        }, 500);
                    }),
            }}
        />
    )
}
