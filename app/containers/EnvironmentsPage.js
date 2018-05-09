// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar'

import Header, { HeaderText, HeaderAvatar } from '../components/Header';
import Content from '../components/Content';
import EnvironmentCard from '../components/EnvironmentCard';

import {
  EnvironmentIcon,
} from '../components/icons';

class EnvironmentsPage extends Component {

  static styles = theme => ({
    paper: {
      margin: 10,
      padding: 20
    },
    header: {
      marginBottom: 10
    }
  });

  render() {
    const { classes, main } = this.props;

    return (
      <div>
        <Header>
          <HeaderAvatar><EnvironmentIcon /></HeaderAvatar>
          <HeaderText>
            Environments
          </HeaderText>
        </Header>
        <Content>
          <Grid container spacing={8}>
            <Grid item>
              <EnvironmentCard />
            </Grid>
            <Grid item>
              <EnvironmentCard />
            </Grid>
            <Grid item>
              <EnvironmentCard />
            </Grid>
            <Grid item>
              <EnvironmentCard />
            </Grid>
            <Grid item>
              <EnvironmentCard />
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(EnvironmentsPage.styles)(EnvironmentsPage));
