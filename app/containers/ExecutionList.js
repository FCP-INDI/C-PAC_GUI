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
    const { classes, executions } = this.props

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
              No executions so far.
            </Typography>
          )
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  executions: state.execution.getIn(['executions']).map(d => d.subset(['id', 'node', 'status', 'start'])),
})

const mapDispatchToProps = {
}

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(ExecutionList.styles)
      (ExecutionList))
