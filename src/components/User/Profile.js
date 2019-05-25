import React from 'react';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '4px',
    marginRight: '4px',
    width: 200,
  },
  dense: {
    marginTop: 200,
  },
  menu: {
    width: 200,
  },
}

function TextFields() {
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form style={styles.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Name"
        style={styles.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        style={styles.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
        <TextField
          id="standard-number"
          label="Number"
          value={values.age}
          onChange={handleChange('age')}
          type="number"
          style={styles.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      <TextField
        id="standard-multiline-static"
        label="Description"
        multiline
        rows="4"
        style={styles.textField}
        margin="normal"
      />
    </form>
  );
}

export default TextFields;
