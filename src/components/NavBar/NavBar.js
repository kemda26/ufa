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
import Avatar from '@material-ui/core/Avatar';

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

const style = {
        background: '#005e94',
}

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
            <AppBar style={style} position="static">
                <Toolbar>
                    <IconButton component={Link} to='/' className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Ivd-mj3CYUN1hX7B3waACsdHRe0NgyP9qtyyNCZkdJmmhfzS" className={classes.bigAvatar} />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        UFACULTIES
                    </Typography>
                    {(state.isLogin || token)? (
                        <React.Fragment>
                            <Manager />
                            <Teachers />
                            <Department />
                            <User logoutHandler={logoutHandler}/>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <Teachers />
                            <Department />
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