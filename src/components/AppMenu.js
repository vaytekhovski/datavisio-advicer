import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';
import EnterIcon from '@material-ui/icons/TouchApp'
import HistoryIcon from '@material-ui/icons/History';
import PaymentIcon from '@material-ui/icons/Payment';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" size="large" href={props.isAuth ? "/dashboard" : "/home"}>Datavisio adviser</Button>
          </Typography>
          {props.isAuth ?
            <>
              <Button color="inherit" startIcon={<HistoryIcon />} href="/history">History</Button>
              <Button color="inherit" startIcon={<SettingsIcon />} href="/settings">Settings</Button>
              <Button color="inherit" startIcon={<PaymentIcon />} href="/payments">Payments</Button>
              <Button color="inherit" startIcon={<ExitIcon />} href="/sign-out">Sign out</Button>
            </>
            :
            <Button color="inherit" startIcon={<EnterIcon />} href="/auth">Sign in</Button>

          }

        </Toolbar>
      </AppBar>
    </div>
  );
}
