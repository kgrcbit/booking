import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  linkButton: {
    margin: theme.spacing(2),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="h1" align="center">
            Welcome to the Booking App!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            className={classes.linkButton}
          >
            Go to Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/registration"
            className={classes.linkButton}
          >
            Go to Registration
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/booking"
            className={classes.linkButton}
          >
            Go to Booking
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;