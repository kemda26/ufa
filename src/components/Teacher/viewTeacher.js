import React, { useEffect } from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import { Link } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ReadonlyTeacherProfile from './TeacherProfile'

const axios = require('axios')
const style = {
        margin: '10px',
}
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
            // { title: 'Type', field: 'type', lookup: {2:'Teacher'}},
            // { title: 'Phone', field: 'phone' },
            
        ],
        data: [
            // {
            //     id: '111111111',
            //     name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            //     type: 2,
            //     email: '@email',
            //     phone: '321313',
            //     address: 'E3',
            //     degree: 3,
            //     department: 'aa',
            //     field: 'aaaaa',
            // },
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

    return (
    <div style={style}>    
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
    </div>
    );
}
