import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
const axios = require('axios')

const style = {
    margin: '10px',
    fontSize: '28px',
}

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

    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        setLoading(true)
        let data = []
        axios.get('http://localhost:9000/departments')
            .then(res => {
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

    return (
        <div style={style}>
            <MaterialTable
                isLoading={loading}
                title="Đơn vị"
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
                
            />
        </div>
    )
}
