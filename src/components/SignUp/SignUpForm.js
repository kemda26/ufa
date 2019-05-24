import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    state = {
        open: false,
        register: {
            username: '',
            email: '',
            password: '',
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState(({register}) => ({register: {...register, [name]:value}}))
    }

    handleSignup = () => {
        console.log(this.state.register.username)
        console.log(this.state.register.email)
        console.log(this.state.register.password)
    }

    render() {
        const {register} = this.state

        return (
            <div>
                <Button color='inherit' onClick={this.handleClickOpen}>
                    Sign Up
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Sign up
                        </DialogContentText>
                        <TextField
                            name="username"
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            value={register.username}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="email"
                            margin="dense"
                            id="email"
                            label="Email Address"
                            value={register.email}
                            onChange={this.handleChange}
                            type="email"
                            fullWidth
                        />
                        <TextField
                            name="password"
                            margin="dense"
                            id="password"
                            label="Password"
                            onChange={this.handleChange}
                            value={register.password}
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSignup} color="primary">
                            Sign Up
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}