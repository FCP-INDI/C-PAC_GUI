import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import ExecutionCard from '../components/ExecutionCard'
import Typography from '@material-ui/core/Typography'


class ExecutionList extends Component {

  static styles = theme => ({
  })

  state = {
  }

  render() {
    const { classes, executions, version } = this.props

    return (
      <>
        {
          (
            executions.size > 0 && (
              <Grid container>
                {
                  executions.map((execution) => (
                    <Grid item key={execution.get('id')}>
                      <ExecutionCard execution={execution} />
                    </Grid>
                  ))
                }
              </Grid>
            )
          ) || (
            <Typography variant="subtitle1">
              {version ? 'No executions so far.' : 'Loading executions... it may take seconds...'}
            </Typography>
          )
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  executions: state.execution.getIn(['executions']).map(d => d.subset(['id', 'node', 'status', 'start'])),
  version: state.execution.get('version'),
})

const mapDispatchToProps = {
}

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(ExecutionList.styles)
      (ExecutionList))
