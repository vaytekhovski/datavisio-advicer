import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Filter from './Filters/Filter.js'
import Statistics from './Statistics.js'

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ height: '100vh' }} >
            <Filter/>
            <Statistics/>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
