import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'

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
              <EnvironmentCard name="My Docker" type="docker" />
            </Grid>
            <Grid item>
              <EnvironmentCard name="Ned @ CMI" type="server" />
            </Grid>
            <Grid item>
              <EnvironmentCard name="Dozer @ CMI" type="ssh" />
            </Grid>
            <Grid item>
              <EnvironmentCard name="AWS - CMI account" type="aws" />
            </Grid>
            <Grid item>
              <EnvironmentCard name="My computer" type="local" />
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
