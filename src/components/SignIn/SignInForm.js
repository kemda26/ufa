import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withSnackbar} from 'notistack'
const axios = require('axios')

class FormDialog extends React.Component {
    state = {
        open: false,
        user: {
            username: '',
            password: '',
        },
        popper: false,
        msg: 'dwadwadwda',
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    action = (key) => (
        <Button onClick={() => { props.closeSnackbar(key) }}>
            {'Dismiss'}
        </Button>
    )

    handleLogin = () => {
        axios.post(`http://localhost:9000/user/login`, this.state.user)
            .then(res => {
                if (res.data.success === false) {
                    console.log(res.data.message)
                    this.props.enqueueSnackbar(res.data.message, {
                        action: this.action,
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    })
                }
                else {
                    this.props.loginHandler()
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('profileID', res.data.profile)
                    localStorage.setItem('userID', res.data.id)
                }
                // this.setState({open: false})
            })
            .catch(e => {
                console.log(e)
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState(({user}) => ({user: {...user, [name]: value}}))
    }

    render() {
        const { user } = this.state

        return (
            <div>
                <Button color='inherit' onClick={this.handleClickOpen}>
                    Login
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Login
                        </DialogContentText>
                        <TextField
                            name="username"
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            value={user.username}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="password"
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            value={user.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLogin} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withSnackbar(FormDialog)