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
import { blue } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import {
  DatasetIcon,
  ParticipantIcon,
  PipelineIcon,
  LaunchIcon,
  SettingsIcon,
  NavigateNextIcon
} from './icons';

class DatasetCard extends Component {
  const navigate = useNavigate();

  const handleOpen = (dataset) => {
    navigate(`/datasets/${dataset}`, { replace: true })
  }

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    actions: {
      display: 'flex',
      paddingLeft: 20,
    },
    expand: {
      marginLeft: 'auto',
    },
    avatar: {
      backgroundColor: blue[500],
    },
    info: {
      padding: 0
    }
  })

  render() {
    const { classes, raised = false, dataset } = this.props

    const labels = {
      bids: 'BIDS',
      custom: 'Custom'
    }

    return (
      <Card className={classes.card} raised={raised}>
        <CardHeader
          avatar={
            <Avatar aria-label={dataset.name} className={classes.avatar}><DatasetIcon /></Avatar>
          }
          title={dataset.name}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ParticipantIcon />
              </ListItemIcon>
              <ListItemText primary={`${labels[dataset.settings.format]}`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton className={classes.expand} onClick={() => this.handleOpen(dataset.id)}>
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(DatasetCard.styles)(DatasetCard)
