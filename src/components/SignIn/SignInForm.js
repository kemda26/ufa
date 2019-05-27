import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const axios = require('axios')

export default class FormDialog extends React.Component {
    state = {
        open: false,
        user: {
            username: '',
            password: '',
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleLogin = () => {
        axios.post(`http://localhost:9000/user/login`, this.state.user)
            .then(res => {
                // console.log(res.data)
                // console.log(this.props)
                this.props.loginHandler()
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('profileID', res.data.profile)
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