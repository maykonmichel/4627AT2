import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  active: {
    height: 3,
    width: 50,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: 5,
    left: 'calc(50% - 25px)',
  },
}));
