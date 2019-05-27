import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SignUp from '../SignUp/SignUpForm'
import SignIn from '../SignIn/SignInForm'
import User from '../User/Menu'
import HomeIcon from '../Home/HomeIcon'
import Department from '../Department/DepartmentMenu'
import Manager from '../Manager/Manager'
import {Link} from 'react-router-dom'
import Teachers from '../Teacher/Teacher'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function NavBar(props) {
    const [state, setState] = React.useState({
        isLogin: false
    })
    const token = localStorage.getItem('token')
    const { classes } = props;

    const loginHandler = () => {
        setState({isLogin: true})
    }

    const logoutHandler = () => {
        setState({isLogin: false})
    }

    return (
        <div className={classes.root}>
            <AppBar  position="static">
                <Toolbar>
                    <IconButton component={Link} to='/' className={classes.menuButton} color="inherit" aria-label="Menu">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        UFA
                    </Typography>
                    {(state.isLogin || token)? (
                        <React.Fragment>
                            <Manager />
                            <Department />
                            <User logoutHandler={logoutHandler}/>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <Teachers />
                            <SignIn loginHandler={loginHandler}/>
                        </React.Fragment>
                        )
                    }
                   
                    {/* <SignUp /> */}
                    {/* <SignIn /> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);