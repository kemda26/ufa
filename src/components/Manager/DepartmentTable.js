import React from 'react';
import MaterialTable from 'material-table';

export default function DepartmentTable() {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Department', field: 'department' },
            { title: 'Type', field: 'type' },
            { title: 'Address', field: 'address'},
            { title: 'Phone', field: 'phone'},
            { title: 'Website', field: 'website'}
        ],
        data: [
            { 
                department: 'Computer Science',
                type: 'department',
                address: 'abc',
                phone: '0999', 
                website: 'uet.com'
            },
        ],
    });

    return (
        <MaterialTable
            title="Manage Department"
            columns={state.columns}
            data={state.data}
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
