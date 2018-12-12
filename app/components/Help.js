import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula as style } from 'react-syntax-highlighter/dist/styles/hljs';

import cpac from '@internal/c-pac'

import {
  HelpIcon
} from './icons'


class Help extends React.Component {
  state = {
    open: false,
  };

  static styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
    help: {
      // padding: 0
    },
  })

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, regex, type, help, width=600 } = this.props;

    let helper = help
    if (typeof help === "string") {
      helper = (
        <Typography>{ help }</Typography>
      )
    }

    // @TODO include other templates
    const t = type == "pipeline" ? cpac.pipeline.rawTemplate : ""
    const lines = t.split('\n')

    let matchLineNumber = -1
    for (matchLineNumber in lines) {
      if (regex.exec(lines[matchLineNumber])) {
        break
      }
    }

    matchLineNumber = matchLineNumber - 0

    const codeBefore = lines.slice(Math.max(0, matchLineNumber - 5), matchLineNumber)
    const codeAfter = lines.slice(matchLineNumber + 1, Math.min(matchLineNumber + 5, lines.length))
    const codeCurrent = lines[matchLineNumber]

    const code = codeBefore.join('\n') + '\n' + codeCurrent + '\n' + codeAfter.join('\n')

    return (
      <React.Fragment>
        { this.props.children }

        <IconButton
          aria-label="Help"
          disableRipple
          className={classes.help}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          onClick={this.handleOpen}>
          <HelpIcon fontSize="small" />
        </IconButton>

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
            <Grid item sm={12} md={6} style={{ padding: 20 }}>
              { helper }
            </Grid>
            <Grid item sm={12} md={6}>
              <SyntaxHighlighter
                language='yaml'
                style={ style }
                customStyle={{overflow: 'hidden'}}
                wrapLines={true}
                showLineNumbers={true}
                startingLineNumber={matchLineNumber - 5}
                lineProps={lineNumber => ({
                  style: {
                    display: 'block', ...(
                      lineNumber == codeBefore.length + 1 ?
                      { backgroundColor: '#FFFFFF12' } :
                      {}
                    )
                  },
                })}>{code}</SyntaxHighlighter>
            </Grid>
          </Grid>
        </Popover>
      </React.Fragment>
    )
  }
}

export default withStyles(Help.styles)(Help)
