import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import ExecutionCard from '../components/ExecutionCard'

class ExecutionList extends Component {

  static styles = theme => ({
  })

  state = {
  }

  render() {
    const { classes, executions } = this.props

    return (
      <>
        <Grid container>
          {
            executions && executions.map((execution) => (
              <Grid item key={execution.get('id')}>
                <ExecutionCard execution={execution} />
              </Grid>
            ))
          }
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  executions: state.execution.getIn(['executions']),
})

const mapDispatchToProps = {
}

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(ExecutionList.styles)
      (ExecutionList))
