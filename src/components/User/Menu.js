import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom'

function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const style = {
        color: 'white'
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        console.log(props)
        setAnchorEl(null);
    }

    const handleLogout = () => {
        props.logoutHandler()
        localStorage.removeItem('token')
        localStorage.removeItem('profileID')
        setAnchorEl(null)
    }

    return (
        <div>
            <Button style={style}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                Account
            </Button>
            <Menu  id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem component={Link} to='/user/profile' onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to='/user/password' onClick={handleClose}>Change Password</MenuItem>
                <MenuItem component={Link} to='/user/fields' onClick={handleClose}>Concern Field</MenuItem>
                <MenuItem onClick={handleLogout} component={Link} to='/'>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default SimpleMenu;
