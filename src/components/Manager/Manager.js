import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const style = {
        color: 'white'
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }


    return (
        <div>
            <Button style={style}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                Manager
            </Button>
            <Menu  id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem component={Link} to='/manage/departments' onClick={handleClose}>Department</MenuItem>
                <MenuItem component={Link} to='/manage/users' onClick={handleClose}>Account</MenuItem>
                <MenuItem component={Link} to='/manage/teachers' onClick={handleClose}>Teacher</MenuItem>
                <MenuItem component={Link} to='/manage/researches' onClick={handleClose}>Research</MenuItem>
            </Menu>
        </div>
    );
}

export default SimpleMenu;
