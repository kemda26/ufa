import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import ReadonlyTeacherProfile from './TeacherProfile'

const axios = require('axios')
const style = {
        margin: '10px',
        fontSize: '28px',
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
        data: [],
    });

    const [loading, setLoading] = React.useState(true)
    const [selectedRow, setSelectedRow] = React.useState(null)

    useEffect(() => {
        setLoading(true)
        let data = []
        axios.get('http://localhost:9000/teachers')
            .then(res => {
                setLoading(false)
                // console.log(res.data)
                res.data.forEach(item => {
                    let {_id, name, avatar, address, degree, department, phone, website, description, email} = item
                    let id = _id
                    data.push({id, name, avatar, address, degree, department, phone, website, description, email})
                    setState({...state, data})
                })
                
            })
            .catch(e => {console.log(e)})
    }, [])


    return (
    <div style={style}>    
        <MaterialTable
            title="Teachers"
            isLoading={loading}
            columns={state.columns}
            data={state.data}
            onRowClick={(event, selectedRow, togglePanel) => {
                togglePanel()
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
            detailPanel={rowData => {
                const {id} = rowData
                return (
                    <ReadonlyTeacherProfile profileID={id}/>
                )
            }}
        />
    </div>
    );

}
