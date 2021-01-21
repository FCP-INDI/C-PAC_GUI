import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import CpacpySchedulerSelector from 'containers/cpacpy/SchedulerSelector'

import {
  HomeIcon,
  NextIcon,
  PipelineIcon,
  DatasetIcon,
  ExecutionIcon,
} from './icons'

class Breadcrumbs extends Component {

  static styles = theme => ({
    bread: {
      flexShrink: 0,
      flexGrow: 0,
    },
    crumbs: {
      flexGrow: 1,
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(),
    },
    nextIcon: {
      alignSelf: 'center',
    },
    selectorButton: {
      padding: theme.spacing(2),
    },
  })

  static mapStateToProps = (state, { execution }) => {
    return {
    }
  }
  
  static mapDispatchToProps = {
  }

  render() {
    const { classes, configLoaded, location } = this.props

    const crumbs = [
      <Button key={0} size="small" component={Link} to={`/`}>
        <HomeIcon className={classes.icon} />
        Home
      </Button>
    ]

    const next = () =>
      <NextIcon key={crumbs.length} className={classes.nextIcon} />

    const place = location.pathname.substr(1).split('/')
    const [module, ...params] = place
    switch (module) {
      case 'pipelines':
        const [id] = params
        crumbs.push(next())
        crumbs.push(
          <Button key={crumbs.length} size="small" component={Link} to={`/pipelines`}>
            <PipelineIcon className={classes.icon} />
            Pipelines
          </Button>
        )
        break

      case 'datasets':
        const [dataset] = params
        crumbs.push(next())
        crumbs.push(
          <Button key={crumbs.length} size="small" component={Link} to={`/datasets`}>
            <DatasetIcon className={classes.icon} />
            Datasets
          </Button>
        )
        break

      case 'executions':
        const [execution, schedule, operation] = params
        crumbs.push(next())
        crumbs.push(
          <Button key={crumbs.length} size="small" component={Link} to={`/executions`}>
            <ExecutionIcon className={classes.icon} />
            Executions
          </Button>
        )
    }

    return (
      <AppBar position="static" color="default" className={classes.bread}>
        <Toolbar>
          <div className={classes.crumbs}>
            { crumbs }
          </div>
          <CpacpySchedulerSelector
            buttonProps={{
              variant: 'contained',
              className: classes.selectorButton,
            }}
            onSelect={this.handleScheduler}
          />

        </Toolbar>
      </AppBar>
    )
  };
}

export default
  connect(Breadcrumbs.mapStateToProps, Breadcrumbs.mapDispatchToProps)
    (withRouter(withStyles(Breadcrumbs.styles)(Breadcrumbs)))