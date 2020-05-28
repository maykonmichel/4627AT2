import React, { memo, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

const HeaderItem = memo(({ path, title }) => {
  const classes = useStyles();

  const history = useHistory();

  const { pathname } = useLocation();

  const onClick = useCallback(() => history.push(path), [history, path]);

  return (
    <Button color="inherit" onClick={onClick}>
      {title}
      <span className={clsx(pathname === path && classes.active)} />
    </Button>
  );
});

HeaderItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};

HeaderItem.defaultProps = {
  path: 'path',
  title: '',
};

export default HeaderItem;
