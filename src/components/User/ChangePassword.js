import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withSnackbar} from 'notistack'
const axios = require('axios')

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // width: '100%',
        margin: '20px'
    },
    textField: {
        marginLeft: '4px',
        marginRight: '4px',
        width: 550,
    },
    wrapper: {
        width: '100%'
    }
}

function ChangePassword(props) {
    const [state, setState] = useState({
        currentPassword: '',
        newPassword: '',
        verifyNewPassword: '',
    })

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value})
    }

    const action = (key) => (
        <Button onClick={() => { props.closeSnackbar(key) }}>
            {'Dismiss'}
        </Button>
    )

    const id = localStorage.getItem('userID')

    const handleSubmit = () => {
        if (state.newPassword != state.verifyNewPassword) {
            props.enqueueSnackbar('Mật khẩu không trùng nhau', {variant: 'error', action})
        }
        else {
            const {currentPassword, newPassword} = {...state}
            axios.post('http://localhost:9000/user/changepassword', {id, currentPassword, newPassword})
                .then(res => {
                    if (res.data.success === false) {
                        props.enqueueSnackbar(res.data.message, {variant: 'error', action})
                    }
                    else {
                        props.enqueueSnackbar('Đổi mật khẩu thành công', {variant: 'success', action})
                    }
                })
                .catch(e => {console.log(e)})
        }
    }

    return (
        <div>
            <div style={{width: '600px', margin: '0 auto',fontSize: '26px'}}>
                <p>Đổi mật khẩu</p>
            </div>
            <div style={{width: '600px', margin: '10px auto', boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)'}}>
                <form style={styles.container} noValidate autoComplete="off">
                    <div style={styles.wrapper}>
                        <TextField
                            id="standard-password"
                            label="Mật khẩu hiện tại"
                            style={styles.textField}
                            value={state.currentPassword}
                            onChange={handleChange('currentPassword')}
                            margin="normal"
                            type='password'
                        />
                    </div>
                    <div style={styles.wrapper}>
                        <TextField 
                            id='standard-new-password'
                            label='Mật khẩu mới'
                            style={styles.textField}
                            value={state.newPassword}
                            onChange={handleChange('newPassword')}
                            margin='normal'
                            type='password'
                        />
                    </div>
                    <div style={styles.wrapper}>
                        <TextField 
                            id='standard-verify-new-password'
                            label='Nhập lại mật khẩu mới'
                            style={styles.textField}
                            value={state.verifyNewPassword}
                            onChange={handleChange('verifyNewPassword')}
                            margin='normal'
                            type='password'
                        />
                    </div>
                        <Button style={{marginTop: '15px', marginBottom: '15px'}} color='secondary' onClick={handleSubmit}>Xác nhận</Button>
                </form>
            </div>
        </div>
    )
}

export default withSnackbar(ChangePassword)
