import React, {useEffect} from 'react';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
const axios = require('axios')

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 200,
    },
    dense: {
        marginTop: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: '2px',
    },
    avatar: {
        margin: 30,
        width: '15rem',
        height: '15rem',
    },
}

const departments = [
    {
        value: '1',
        label: 'BM Các Hệ thống Thông tin',
    },
    {
        value: '2',
        label: 'BM Công nghệ Phần mềm'
    },
    {
        value: '3',
        label: 'BM Khoa học Máy tính'
    },
    {
        value: '4',
        label: 'BM Khoa học và Kỹ thuật tính toán'
    },
    {
        value: '5',
        label: 'BM Truyền thông và Mạng máy tính'
    },
    {
        value: '6',
        label: 'PTN An toàn thông tin'
    },
    {
        value: '7',
        label: 'PTN Hệ thống Nhúng'
    },
    {
        value: '8',
        label: 'PTN Tương tác Người – Máy'
    }
]

const degrees = [
    {
        value: '1',
        label: 'ThS.',
    },
    {
        value: '2',
        label: 'TS.',
    },
    {
        value: '3',
        label: 'PGS.TS.',
    },
    {
        value: '4',
        label: 'GS.TS.'
    },
    {
        value: '5',
        label: 'CN.'
    }
]

function TextFields(props) {
    const [values, setValues] = React.useState({
        name: '',
        address: '',
        email: '',
        description: '',
        degree: '',  
        website: '',
        avatar: '',
        department: '',
        phone: '',
        field: '',
    });

    useEffect(() => {
        // let id = localStorage.getItem('profileID')
        // console.log(id)
        const id = props.profileID
        console.log(props)
        axios.get(`http://localhost:9000/teacher/${id}`, id)
            .then(res => {
                // console.log(res.data)
                setValues({...values, ...res.data})
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <form style={styles.container} noValidate autoComplete="off">
            <Grid container justify="center" alignItems="center">
                <Avatar alt="avatars" src={values.avatar} style={styles.avatar} />
            </Grid>
            <TextField
                id="standard-name"
                label="Họ tên"
                style={styles.textField}
                value={values.name}
                // onChange={handleChange('name')}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField 
                id='standard-email'
                label='Email'
                style={styles.textField}
                value={values.email}
                // onChange={handleChange('email')}
                margin='normal'
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField 
                id='standard-phone'
                label='Điện thoại'
                style={styles.textField}
                value={values.phone}
                // onChange={handleChange('phone')}
                margin='normal'
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="standard-address"
                label="Địa chỉ"
                style={styles.textField}
                value={values.address}
                // onChange={handleChange('address')}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="standard-address"
                label="Website"
                style={styles.textField}
                value={values.website}
                // onChange={handleChange('address')}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="standard-select-degree"
                select
                label="Học hàm, Học vị"
                style={styles.textField}
                value={values.degree}
                // onChange={handleChange('degree')}
                SelectProps={{
                    MenuProps: {
                        style: styles.menu,
                    },
                }}
                InputProps={{
                    readOnly: true,
                }}
                helperText="Select degree"
                margin="normal"
            >
                {degrees.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <TextField
                id="standard-select-department"
                select
                label="Đơn vị"
                style={styles.textField}
                value={values.department}
                // onChange={handleChange('department')}
                SelectProps={{
                    MenuProps: {
                        style: styles.menu,
                    },
                }}
                InputProps={{
                    readOnly: true,
                }}
                helperText="Select department"
                margin="normal"
            >
                {departments.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <TextField
                id="standard-field"
                label="Lĩnh vực nghiên cứu"
                value={values.field}
                // onChange={handleChange('description')}
                multiline
                rows="4"
                style={styles.textField}
                InputProps={{
                    readOnly: true,
                }}
                margin="normal"
            />
            <TextField
                id="standard-multiline-static"
                label="Mô tả"
                value={values.description}
                // onChange={handleChange('description')}
                multiline
                rows="4"
                style={styles.textField}
                InputProps={{
                    readOnly: true,
                }}
                margin="normal"
            />
        </form>
    );
}

export default TextFields;
