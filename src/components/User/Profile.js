import React, {useEffect} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withSnackbar} from 'notistack'
const axios = require('axios')

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '700px',
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
    field: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 288,
    },
    button: {
        margin: '2px',
        marginBottom: '10px'
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
        field: [],
    });
    const [fieldState, setFieldState] = React.useState('')

    const action = (key) => (
        <Button onClick={() => { props.closeSnackbar(key) }}>
            {'Dismiss'}
        </Button>
    )

    const id = localStorage.getItem('profileID')

    const [file, setFile] = React.useState({
        selectedFile: null
    })

    var inputBut = null
    const fileSelector = (event) => {
        setFile({selectedFile: event.target.files[0]})
    }

    const fileUploader = () => {
        const fd = new FormData()
        fd.append('image', file.selectedFile, file.selectedFile.name)
        axios.post('https://us-central1-ufaweb-229ce.cloudfunctions.net/uploadFile', fd)
            .then(res => {
                setValues({...values, avatar: res.data.url})
                console.log(res.data.url)
                const data = {...values, avatar: res.data.url}
                axios.post(`http://localhost:9000/teacher/${id}`, data)
                    .then(res => {
                        // console.log(res)
                        props.enqueueSnackbar('Ok', {variant: 'success', action})
                    })
                    .catch(e => {
                        console.log(e)
                    })
                
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/teacher/${id}`, id)
            .then(res => {
                let {field} = res.data
                setValues({...values, ...res.data})
                field = field.join('\n')
                console.log(field)
                setFieldState(field)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const handleSubmit = () => {
        const data = {...values}
        axios.post(`http://localhost:9000/teacher/${id}`, data)
            .then(res => {
                // console.log(res)
                props.enqueueSnackbar('Ok', {variant: 'success', action})
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    return (
        <div>
            <div style={{width: '900px', margin: '0 auto',fontSize: '26px'}}>
                <p>Thông tin cá nhân</p>
            </div>
            <div style={{width: '900px', margin: '10px auto',display: 'flex',flexDirection: 'row',
                        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)'
            }}>
                <Grid container style={{width: '25%', height: 'min-content'}} justify="center" alignItems="center">
                    <Avatar alt="avatars" src={values.avatar} style={styles.avatar} />    
                    <input style={{display: 'none'}} type='file' onChange={fileSelector} ref={thisinput => inputBut = thisinput} />
                    <Button color='primary' onClick={() => inputBut.click()}>Chọn ảnh</Button>
                    <Button color='secondary' onClick={fileUploader}>Đăng ảnh</Button>
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
                        label="Lĩnh vực quan tâm"
                        style={styles.field}
                        value={fieldState}
                        multiline
                        onChange={handleChange('field')}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Mô tả"
                        value={values.description}
                        onChange={handleChange('description')}
                        multiline
                        rows="6"
                        style={styles.description}
                        margin="normal"
                    />
                    <Button onClick={handleSubmit} variant="contained" size="medium" color="primary" style={styles.button}>
                        Cập nhật
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default withSnackbar(TextFields);
