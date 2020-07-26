import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import clsx from 'clsx'

console.log(grey)

class ExecutionNodesGraph extends Component {

  static styles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap-reverse',

      // display: 'grid',
      // gridAutoFlow: 'row dense',
      // gridTemplateColumns: 'repeat(20, auto)',
      // display: 'grid',
      // flexGrow: 1,
      // gridTemplateColumns: 'repeat(30, 1fr)',
      // gridTemplateRows: 'repeat(autoFit, 250px)',
      // justifyContent: 'center',
      // alignContent: 'center',
      // direction: 'rtl',
    },
    square: {
      display: 'block',
      // paddingTop: '100%',
      height: 10,
      width: 10, //({ nodes }) => `${20 / 60 * 100}%`,
      boxShadow: 'inset 0 0 1px #000000',
    },
    running: { backgroundColor: theme.palette.info.light },
    success: { backgroundColor: theme.palette.success.light },
    error: { backgroundColor: theme.palette.error.light },
    unknown: { backgroundColor: grey[400] },
  })

  render() {
    const { classes, nodes } = this.props
    const statuses = ['running', 'success', 'error', 'unknown']

    const bp = {
      success: ~~(nodes.size * 0.5),
      running: ~~(nodes.size * 0.3),
      error: ~~(nodes.size * 0.05),
    }

    return (
      <div className={classes.container}>
        {
          nodes
            .valueSeq()
            .slice(0, 67)
            .sortBy((l) => l.get('start'))
            .map((l, i) => {
              const status = 
                i < bp.success ? 'success' : (
                  i < bp.running + bp.success ? 'running' : (
                    i < bp.error + bp.running + bp.success ? 'error' : 'unknown'
                  )
                )
              return (
                <div key={i} className={clsx(classes.square, classes[status])}></div>
              )
            })
        }
      </div>
    )
  }
}

export default withStyles(ExecutionNodesGraph.styles)(ExecutionNodesGraph)
