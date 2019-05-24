import React from 'react';
import MaterialTable from 'material-table';

export default function DepartmentTable() {
    const [state, setState] = React.useState({
        columns: [  
            { title: 'Id', field: 'id'},
            { title: 'Name', field: 'name' },
            { title: 'Account', field: 'account' },
            { title: 'Email', field: 'email' },
            { title: 'Position', field: 'position'},
            { title: 'Degree', field: 'degree'},
            { title: 'Department', field: 'department'}
        ],
        data: [
            { 
                id: '1',
                name: 'Quang',
                account: 'quangnd',
                email: 'ufa@gmail.com',
                position: 'teacher',
                degree: 'PhD',
                department: 'ufa'
            },
        ],
    });

    return (
        <MaterialTable
            title="Manage Account"
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
