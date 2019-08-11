import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
import DatasetSettingsEditor from '../components/dataset/DatasetSettingsEditor'
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header'
import Content from '../components/Content'
import Box from '../components/Box'

<<<<<<< HEAD
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import DatasetSettingsEditor from '../components/dataset/DatasetSettingsEditor';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header';
import Content from '../components/Content';
import Box from '../components/Box';
import NotFound from 'components/404';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
=======
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)
import IconButton from '@material-ui/core/IconButton'

import {
  DatasetIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon
} from '../components/icons'

import {
  dataSettingsGenerateDataConfig
} from '../actions/dataset'


class DatasetPage extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    }
  })
  
  handleGenerateDataConfig = () => {
    this.props.dataSettingsGenerateDataConfig({
      dataset: this.props.dataset.get('id'),
      dataSettings: this.props.dataset,
      version: this.props.version,
    })
  }

  render() {
    const { classes, dataset } = this.props

    if (!dataset) {
      return <NotFound />
    }

    const tools = (
      <React.Fragment>
        <Button size="small">
          <DownloadIcon />
        </Button>
        <Button size="small">
          <SaveIcon />
        </Button>
        <Button size="small">
          <RevertIcon />
        </Button>
      </React.Fragment>
    )

    return (
      <Box title={dataset.get('name')}
           avatar={<DatasetIcon />}
           tools={tools}>

        <Button onClick={this.handleGenerateDataConfig}>Generate</Button>

        <p>{ dataset.get('data') ? dataset.getIn(['data', 'sites']).toJS().join(', ') : null }</p>

        <p>{ dataset.get('data') ? `${dataset.getIn(['data', 'subject_ids']).size} subjects` : null }</p>

      </Box>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { dataset: id } } } = props

  if (!state.main.get('config')) {
    return {
      dataset: null
    }
  }

  const dataset = state.dataset.getIn(['datasets']).find((p) => p.get('id') == id)
  const version = dataset.get('versions').keySeq().max()

  return {
    dataset,
    version,
    configuration: dataset.getIn(['versions', version, 'configuration']),
  }
}

const mapDispatchToProps = {
  dataSettingsGenerateDataConfig,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(DatasetPage.styles)(DatasetPage)
)
