import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    padding: '2px 2px',
  },
}

function PaperSheet() {

  return (
    <div>
      <Paper style={styles.root}>
        <Typography variant="h5" component="h3">
            Welcome to Ufacilities
        </Typography>
        <Typography component="p">
            UFA
        </Typography>
      </Paper>
    </div>
  );
}

export default PaperSheet;
