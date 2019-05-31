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
        width: '1000px',
    },
    textField: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 220,
    },
    dense: {
        marginTop: 200,
    },
    menu: {
        width: 'auto',
    },
    field:{
        marginLeft: '4px',
        marginRight: '4px',
        width: 426,
    },
    longText: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 448,
    },
    description: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 426,
    },
    button: {
        margin: '2px',
    },
    avatar: {
        margin: 30,
        width: '10rem',
        height: '10rem',
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
    const [fieldState, setFieldState] = React.useState('')

    useEffect(() => {
        const id = props.profileID
        console.log(props)
        axios.get(`http://localhost:9000/teacher/${id}`, id)
            .then(res => {
                let {field} =  res.data
                setValues({...values, ...res.data})
                field = field.join('\n')
                setFieldState(field)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <div style={{width: '83%', margin: '10px auto',display: 'flex',flexDirection: 'row',
                    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)'}}>
            <Grid container style={{width: '25%'}} justify="center" alignItems="center">
                <Avatar alt="avatars" src={values.avatar} style={styles.avatar} />
            </Grid>
            <form style={styles.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="Họ tên"
                    style={styles.textField}
                    value={values.name}
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
                    SelectProps={{
                        MenuProps: {
                            style: styles.menu,
                        },
                    }}
                    InputProps={{
                        readOnly: true,
                    }}
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
                    style={styles.longText}
                    value={values.department}
                    SelectProps={{
                        MenuProps: {
                            style: styles.menu,
                        },
                    }}
                    InputProps={{
                        readOnly: true,
                    }}
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
                    label="Lĩnh vực quan tâm"
                    value={fieldState}
                    multiline
                    rows="4"
                    style={styles.longText}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="standard-multiline-static"
                    label="Mô tả"
                    value={values.description}
                    multiline
                    rows="4"
                    style={styles.longText}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
            </form>
        </div>
    );
}

export default TextFields;
