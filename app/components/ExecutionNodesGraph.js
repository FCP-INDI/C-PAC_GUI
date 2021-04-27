import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Tooltip from 'components/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { styles as TooltipStyles } from '@material-ui/core/Tooltip/Tooltip'
import capitalize from '@material-ui/core/utils/capitalize';


class ExecutionNodesGraph extends Component {

  static styles = theme => ({
    container: {
      display: 'grid',
      flexGrow: 1,

      gridTemplateColumns: 'repeat(30, 1fr)',
      [theme.breakpoints.only('xs')]: {
        gridTemplateColumns: 'repeat(20, 1fr)',
      },
      [theme.breakpoints.only('sm')]: {
        gridTemplateColumns: 'repeat(30, 1fr)',
      },
      [theme.breakpoints.only('md')]: {
        gridTemplateColumns: 'repeat(25, 1fr)',
      },
      [theme.breakpoints.between('xs', 'sm')]: {
        marginTop: theme.spacing(2),
      },
      justifyContent: 'center',
      alignContent: 'center',
      direction: 'rtl',
      overflow: 'hidden',
    },
    square: {
      display: 'block',
      paddingTop: '100%',
      boxShadow: 'inset 0 0 1px #FFF',
    },
    active: {
      boxShadow: 'inset 0 0 5px #FFF',
    },
    selected: {
      boxShadow: `inset 0 0 5px ${theme.palette.grey[800]}`,
    },
    running: { backgroundColor: theme.palette.info.light },
    success: { backgroundColor: theme.palette.success.light },
    failure: { backgroundColor: theme.palette.error.light },
    unknown: { backgroundColor: theme.palette.grey[400] },

    nomouse: { pointerEvents: 'none' },

    ...TooltipStyles(theme),

    arrowPos: {
      marginTop: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      top: 0,
      left: 'calc(50% - 0.705em) !important',
    },
  })

  state = {
    node: false,
    nodeI: -1,
  }

  constructor(props) {
    super(props);
    this.arrowRef = React.createRef()
    this.gridRef = React.createRef()
    this.anchorEl = null
  }

  handleEnter = (e) => {
    e.persist();

    let clientX = e.clientX
    let clientY = e.clientY
    if (e.type === 'touchstart' && e.targetTouches.length) {
      clientX = e.targetTouches[0].clientX
      clientY = e.targetTouches[0].clientY
    }

    this.anchorEl = {
      getBoundingClientRect: () => ({
        left: clientX,
        right: clientX,
        top: clientY,
        bottom: clientY,
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
      }),
      get clientWidth() {
        return window.innerWidth;
      },
      get clientHeight() {
        return window.innerHeight;
      },
    }
  }
  
  handleHover = (node, nodeI) => (e) => {
    this.setState({ node, nodeI })
  }

  handleClick =  (node) => (e) => {
    const { onClickSchedule } = this.props
    if (onClickSchedule) {
      onClickSchedule(node)
    }
  }

  handleClose = (e) => {
    const elementRelated = event.toElement || event.relatedTarget
    if (this.gridRef.current && elementRelated?.parentNode == this.gridRef.current) {
      return
    }
    this.anchorEl = null
    this.setState({ node: null, nodeI: -1 })
  }

  render() {
    const { classes, nodes, onClickSchedule, selectedSchedule } = this.props
    const { node, nodeI } = this.state
    const statuses = ['running', 'success', 'failure', 'unknown']

    const bp = {
      success: ~~(nodes.size * 0.5),
      running: ~~(nodes.size * 0.3),
      failure: ~~(nodes.size * 0.05),
    }

    return (
      <>
        <Popper
          className={clsx(classes.popper, classes.popperArrow)}
          placement={'bottom'}
          anchorEl={this.anchorEl}
          open={!!this.anchorEl}
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
        >
          {({ placement: placementInner }) => (
          <div
            className={clsx(
              classes.tooltip, classes.touch, classes.tooltipArrow, classes.nomouse,
              classes[`tooltipPlacement${capitalize(placementInner.split('-')[0])}`],
            )}
          >
            { node && 'name' in node ? node.get('name') : node.get('id')}
            <span className={clsx(classes.arrowPos, classes.arrow)} />
          </div>
          )}
        </Popper>

        <div className={classes.container} ref={this.gridRef} onMouseOver={this.handleEnter} onMouseMove={this.handleEnter} onMouseOut={this.handleClose}>
          {
            nodes
              .map((l, i) => {
                const status = l.get('status')
                return (
                  <div
                    key={i}
                    className={clsx(
                      classes.square,
                      classes[status || 'unknown'],
                      i === nodeI ? classes.active : null,
                      selectedSchedule && selectedSchedule === l.get('id') ? classes.selected : null,

                    )}
                    onClick={this.handleClick(l, i)}
                    onMouseOver={this.handleHover(l, i)}
                    onMouseOut={this.handleClose}
                  />
                )
              })
          }
        </div>
      </>
    )
  }
}

export default withStyles(ExecutionNodesGraph.styles)(ExecutionNodesGraph)
