import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withSnackbar} from 'notistack'
const axios = require('axios')

function ChangePassword() {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        currentPassword = '',
        newPassword: '',
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
        setOpen(false)
    }

    return (
        <div>
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
                        <Button onClick={handleClose} color="primary">
                            Đóng
                        </Button>
                        <Button onClick={handleLogin} color="primary">
                            Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default withSnackbar(ChangePassword)
