import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

function CheckboxesGroup() {
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const { gilad, jason, antoine } = state;
    // const error = [gilad, jason, antoine].filter(v => v).length !== 2;

    return (
        <div style={{ display: 'flex' }}>
            <FormControl component="fieldset" style={{ margin: '1px' }}>
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
                        }
                        label="Antoine Llorca"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
}

export default CheckboxesGroup;
