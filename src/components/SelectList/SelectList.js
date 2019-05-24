import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { FormHelperText } from '@material-ui/core';
// import HUE from '@material-ui/core/colors/HUE';

// const useStyles = makeStyles(theme => ({
//     button: {
//         display: 'block',
//         marginTop: theme.spacing(2),
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
// }));

const styles = {
    // button: {
    //     display: 'block',
    //     marginTop: 1,
        
    // },
    formControl: {
        margin: 3,
        minWidth: 180,
        color: 'white',
    },
}

const style = {
    form: {
        margin: '0 8px 0 0',
        display: 'flex',
        borderColor: 'white',
        width: '100px',
        // background: '#f5f5f5',
    },
    text: {
        color: 'white',
    }
    // background: 'white',
}

function SelectList(props) {
    const classes = props;
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    function handleChange(event) {
        setAge(event.target.value);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    return (
        <form autoComplete="off">
            <FormControl style={style.form}>
                <InputLabel style={style.text} shrink htmlFor="demo-controlled-open-select">Age</InputLabel>
                <Select 
                    name='test'
                    style={style.text}
                    displayEmpty
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'demo-controlled-open-select',
                    }}
                >
                    <MenuItem value="">
                        Select
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </form>
    );
}

// SelectList.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SelectList);
export default SelectList
