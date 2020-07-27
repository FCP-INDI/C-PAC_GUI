import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { default  as FlexBox } from '@material-ui/core/Box'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import {
  DefaultIcon,
  FilterIcon,
  ExecutionIcon,
  EditIcon,
} from 'components/icons'

import Header, { HeaderText, HeaderAvatar, HeaderTools } from 'components/Header'
import Content from 'components/Content'
import Box from 'components/Box'


class DatasetViewsList extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    },
    loading: {
      width: 36, height: 36,
    },
  })

  render() {
    const { classes, views, disabled, onView } = this.props

    return (
      <List>
        {
          views.map(view => (
            <ListItem button disabled={disabled} key={view.get('id')} onClick={() => onView(view)}>
              {
                view.get('id') === 'default' ? (
                <ListItemIcon>
                  <DefaultIcon />
                </ListItemIcon>
                ) : null
              }
              <ListItemText inset={view.get('id') !== 'default'} primary={view.get('name')} />
              <ListItemSecondaryAction>
                {
                  view.get('id') !== 'default' ? (
                    <IconButton edge="end" onClick={() => onView(view)}>
                      <EditIcon />
                    </IconButton>
                  ) : null
                }
                <IconButton edge="end" onClick={() => onView(view)}>
                  <ExecutionIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    )
  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(DatasetViewsList.styles)(DatasetViewsList)
)
