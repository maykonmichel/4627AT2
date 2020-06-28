import React, {memo} from 'react';
import { Divider, Grid, Paper } from '@material-ui/core';

import useStyles from './useStyles';

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={5}>
        <Paper className={[classes.paper, classes.form]}>
          <h1>Alunos</h1>
          <p>Beatriz Tavares - 181022011</p>
          <p>Jamilly Souza - 181020416</p>
          <p>Maykon Michel - 181022656</p>
          <p>Rafael Kawagoe - 171025725</p>
          <Divider />
          <p>
            Código fonte em:
            <a href="https://github.com/maykonmichel/4627AT2"> https://github.com/maykonmichel/4627AT2</a>
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default memo(Home);
