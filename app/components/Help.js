import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Popover from '@mui/material/Popover'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula as highlightStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import cpac from '@internal/c-pac'

import {
  HelpIcon
} from './icons'

/** TODO: Refactor for 1.8+ syntax */
class Help extends PureComponent {
  state = {
    open: false,
  }

  static styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing(50),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
    },
    help: {
      padding: 0
    },
  })

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, regex, type, help, mini, style: rootStyle, fullWidth, width=600 } = this.props

    let helper = help
    if (typeof help === "string") {
      helper = (
        <Typography>{ help }</Typography>
      )
    }

    let showCode = true
    let matchedLine = -1
    let matchedRelLine = -1
    let code = ""

    if (type && regex){
      // @TODO replace this functionality
      const t = '' // type == "pipeline" ? cpac.pipeline.rawTemplate : ""
      const lines = t.split('\n')

      for (matchedLine in lines) {
        if (regex.exec(lines[matchedLine])) {
          break
        }
      }

      matchedLine = matchedLine - 0
      const codeBefore = lines.slice(Math.max(0, matchedLine - 4), matchedLine)
      const codeAfter = lines.slice(matchedLine + 1, Math.min(matchedLine + 5, lines.length))
      const codeCurrent = lines[matchedLine]
      code = codeBefore.join('\n') + '\n' + codeCurrent + '\n' + codeAfter.join('\n')
      matchedRelLine = codeBefore.length + 1
    } else {
      showCode = false
    }

    const style = {}
    if (!fullWidth) {
      style.width = 'auto'
    }

    const subStyle = {}
    if (fullWidth) {
      subStyle.flexGrow = 1
    }

    const buttonStyle = { padding: 0 }
    if (fullWidth) {
      buttonStyle.padding = 0
    }

    const button = (
      <>
      {/* TODO: fix help
      <IconButton
        aria-label="Help"
        disableRipple
        buttonRef={node => {
          this.anchorEl = node
        }}
        style={{ buttonStyle, ...rootStyle }}
        onClick={this.handleOpen}>
        <HelpIcon fontSize="small" />
      </IconButton> */}
      </>
    )

    return (
      <React.Fragment>

        {
          this.props.children ? (
            mini ?
              <React.Fragment>
                { this.props.children }
                { button }
              </React.Fragment>
            :
            <Grid container spacing={0} wrap={`nowrap`} alignItems={`center`} style={style}>
              <Grid style={subStyle}>
                { this.props.children }
              </Grid>
              <Grid>
                { button }
              </Grid>
            </Grid>
          )
          :
          button
        }

        <Popover
          open={this.state.open}
          onClose={this.handleClose}
          anchorEl={this.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          style={{ maxWidth: width }}
        >
          <Grid container style={{ overflow: 'hidden' }}>
            <Grid size={{ sm: 12, md: showCode ? 6 : 12 }} style={{ padding: 20 }}>
              { helper }
            </Grid>
            { showCode ?
            <Grid size={{ sm: 12, md: 6 }}>
              <SyntaxHighlighter
                wrapLines
                showLineNumbers
                language='yaml'
                style={highlightStyle}
                customStyle={{overflow: 'hidden'}}
                startingLineNumber={matchedLine - 4}
                lineProps={lineNumber => ({
                  style: {
                    display: 'block', ...(
                      lineNumber == matchedRelLine ?
                      { backgroundColor: '#FFFFFF12' } :
                      {}
                    )
                  },
                })}>{code}</SyntaxHighlighter>
            </Grid>
            : null }
          </Grid>
        </Popover>
      </React.Fragment>
    )
  }
}

export default withStyles(Help.styles)(Help)
