import React, { memo, useCallback } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import HeaderItem from "../HeaderItem";

import useStyles from "./useStyles";

import logo from "../../assets/images/logo.png";

const Header = memo(() => {
  const classes = useStyles();

  const history = useHistory();

  const navigateToHome = useCallback(() => history.push("/"), [history]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={navigateToHome}
          >
            <img src={logo} alt="" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            2º trabalho - Programação não linear: multivariável irrestrito
          </Typography>
          <HeaderItem
            path="/coordenadas-ciclicas"
            title="Coordenadas cíclicas"
          />
          <HeaderItem path="/hooke-and-jeeves" title="Hooke and Jeeves" />
          <HeaderItem path="/gradiente" title="Gradiente" />
          <HeaderItem path="/newton" title="Newton" />
          <HeaderItem
            path="/gradiente-conjugado-generalizado"
            title="Gradiente conjugado generalizado"
          />
          <HeaderItem path="/fletcher-reeves" title="Fletcher and Reeves" />
          <HeaderItem
            path="/davidon-fletcher-powell"
            title="Davidon-Fletcher-Powelll"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Header;
