import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'

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


class DatasetViewsList extends Component {

  static styles = theme => ({
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
                    <IconButton disabled={disabled} edge="end" onClick={() => onView(view)}>
                      <EditIcon />
                    </IconButton>
                  ) : null
                }
                <IconButton disabled={disabled} edge="end" onClick={() => onView(view)}>
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
