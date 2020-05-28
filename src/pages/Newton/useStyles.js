import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  form: {
    padding: theme.spacing(2),
    alignContent: 'space-between',
  },
  paper: {
    marginTop: theme.spacing(8),
  },
  progress: {
    color: theme.palette.secondary.dark,
    position: 'absolute',
  },
}));
