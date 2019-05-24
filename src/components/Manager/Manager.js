import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

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

    const DepartmentLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    return (
        <div>
            <Router>
                <Button style={style}
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    Manager
                </Button>
                <Menu  id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem component={DepartmentLink} to='/manage/departments' onClick={handleClose}>Department</MenuItem>
                    <MenuItem onClick={handleClose}>Account</MenuItem>
                    <MenuItem onClick={handleClose}>Research</MenuItem>
                </Menu>
            </Router>
        </div>
    );
}

export default SimpleMenu;
