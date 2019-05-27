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
        // flexDiretion: 'column'
        width: '700px',
    },
    textField: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 200,
    },
    phone: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 130,
    },
    dense: {
        marginTop: 200,
    },
    menu: {
        width: 'auto',
    },
    longText: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 320,
    },
    description: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 616,
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

function TextFields() {
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
        let id = localStorage.getItem('profileID')
        // console.log(id)
        axios.get(`http://localhost:9000/teacher/${id}`, id)
            .then(res => {
                // console.log(res.data)
                setValues({...values, ...res.data})
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const handleSubmit = () => {
        let id = localStorage.getItem('profileID')
        const data = {...values}
        axios.post(`http://localhost:9000/teacher/${id}`, data)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div style={{width: '900px', margin: '10px auto',display: 'flex',flexDirection: 'row',
                    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)'}}>
            <Grid container style={{width: '25%'}} justify="flex-start" alignItems="center">
                <Avatar alt="avatars" src={values.avatar} style={styles.avatar} />
            </Grid>
            <form style={styles.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="Họ tên"
                    style={styles.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField 
                    id='standard-email'
                    label='Email'
                    style={styles.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin='normal'
                />
                <TextField 
                    id='standard-phone'
                    label='Điện thoại'
                    style={styles.textField}
                    value={values.phone}
                    onChange={handleChange('phone')}
                    margin='normal'
                />
                <TextField 
                    id='standard-website'
                    label='Website'
                    style={styles.textField}
                    value={values.website}
                    onChange={handleChange('website')}
                    margin='normal'
                />
                <TextField
                    id="standard-address"
                    label="Địa chỉ"
                    style={styles.textField}
                    value={values.address}
                    onChange={handleChange('address')}
                    margin="normal"
                />
                <TextField
                    id="standard-select-degree"
                    select
                    label="Học hàm, Học vị"
                    style={styles.textField}
                    value={values.degree}
                    onChange={handleChange('degree')}
                    SelectProps={{
                        MenuProps: {
                            style: styles.menu,
                        },
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
                    onChange={handleChange('department')}
                    SelectProps={{
                        MenuProps: {
                            style: styles.menu,
                        },
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
                    label="Lĩnh vực nghiên cứu"
                    style={styles.textField}
                    value={values.field}
                    onChange={handleChange('field')}
                    margin="normal"
                />
                <TextField
                    id="standard-multiline-static"
                    label="Mô tả"
                    value={values.description}
                    onChange={handleChange('description')}
                    multiline
                    rows="4"
                    style={styles.description}
                    margin="normal"
                />
                <Button onClick={handleSubmit} variant="contained" size="medium" color="primary" style={styles.button}>
                    Cập nhật
                </Button>
            </form>
        </div>
    );
}

export default TextFields;
