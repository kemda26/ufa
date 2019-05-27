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
        value: 'computer science',
        label: 'Computer Science',
    },
    {
        value: 'network',
        label: 'Network',
    }
]

const degrees = [
    {
        value: 'phd',
        label: 'PhD',
    },
    {
        value: 'bachelor',
        label: 'Bachelor',
    },
    {
        value: 'master',
        label: 'Master',
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

    // const handleSubmit = () => {
    //     let id = localStorage.getItem('profileID')
    //     const data = {...values}
    //     axios.post(`http://localhost:9000/teacher/${id}`, data)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    // }

    // const handleChange = name => event => {
    //     setValues({ ...values, [name]: event.target.value });
    // };

    return (
        <form style={styles.container} noValidate autoComplete="off">
            <Grid container justify="center" alignItems="center">
                <Avatar alt="avatars" src={values.avatar} style={styles.avatar} />
            </Grid>
            <TextField
                id="standard-name"
                label="Name"
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
                label='phone'
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
                label="Address"
                style={styles.textField}
                value={values.address}
                // onChange={handleChange('address')}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
            {/* <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue="Hello World"
                style={styles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            /> */}
            <TextField
                id="standard-select-degree"
                select
                label="Degree"
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
                label="Department"
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
                id="standard-multiline-static"
                label="Description"
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
