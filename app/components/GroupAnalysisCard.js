import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import classnames from 'classnames'
import { withStyles } from '@mui/styles'

import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import {
  GroupIcon,
  NavigateNextIcon,
  DuplicateIcon,
} from './icons'


class GroupAnalysisCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    actions: {
      display: 'flex',
    },
    expand: {
      marginLeft: 'auto',
    },
    action: {
    },
    avatar: {
    },
    info: {
      padding: 0
    },

    featDisabled: { opacity: 0.5 },
    featEnabled: { opacity: 1.0 },
  })

  const navigate = useNavigate();
  const handleOpen = (pipeline) => {
    navigate(`/pipelines/${pipeline}`, { replace: true })
  }

  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <GroupIcon />
            </Avatar>
          }
          title={'FEAT'}
          subheader={`C-PAC ${version.get('version')}`}
        />
        <CardContent className={classes.info}>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Tooltip title="Duplicate">
            <IconButton>
              <DuplicateIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(GroupAnalysisCard.styles)(GroupAnalysisCard)
