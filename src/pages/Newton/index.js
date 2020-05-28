import React, { memo, useCallback, useState } from 'react';
import { Button, CircularProgress, Grid, Paper, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';

import methods from '../../methods';

import useStyles from './useStyles';

const initialValues = {
  f: '',
  a: 0,
  b: 0,
  d: 0,
  e: 0,
};

const initialResponse = {
  message: '',
  isOpen: false,
  severity: 'success',
};

const validationSchema = yup.object().shape({
  f: yup.string().label('Função').required(),
  a: yup.number().label('a').required(),
  b: yup.number().label('b').required(),
  e: yup.number().label('ε').required().moreThan(0),
});

const Newton = () => {
  const classes = useStyles();

  const [response, setResponse] = useState(initialResponse);

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const message = await methods('newton', values);
      setResponse({
        message,
        isOpen: true,
        severity: 'success',
      });
    } catch ({ message }) {
      setResponse({
        message,
        isOpen: true,
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }, []);

  const { errors, isSubmitting, handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const onCloseResponse = useCallback(() => setResponse({ ...response, isOpen: false }), [
    response,
  ]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={5}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid
              container
              justify="center"
              alignContent="space-between"
              spacing={4}
              className={classes.container}
            >
              <Grid item xs={12}>
                <TextField
                  error={!!errors.f}
                  helperText={errors.f}
                  name="f"
                  label="Função"
                  value={values.f}
                  onChange={handleChange}
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  error={!!errors.a}
                  helperText={errors.a}
                  name="a"
                  label="a"
                  value={values.a}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  error={!!errors.b}
                  helperText={errors.b}
                  name="b"
                  label="b"
                  value={values.b}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  error={!!errors.e}
                  helperText={errors.e}
                  name="e"
                  label="ε"
                  value={values.e}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <CircularProgress size={24} className={classes.progress} />}
                  Determinar mínimo
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar open={response.isOpen} onClose={onCloseResponse}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={onCloseResponse}
          severity={response.severity}
        >
          {response.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default memo(Newton);
