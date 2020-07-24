import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
<<<<<<< HEAD
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
=======
>>>>>>> 31b5f4b (data config viewer)
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { default  as FlexBox } from '@material-ui/core/Box'

import {
  DatasetIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon,
  LoadingIcon,
  CheckIcon,
  UncheckIcon,
} from '../components/icons'

import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header'
import Content from '../components/Content'
import Box from '../components/Box'
import Table from '../components/Table'
import VirtualTable from '../components/VirtualTable'

import {
  generateDataConfig,
} from '../actions/dataset'


class DatasetPage extends Component {

  state = { filters: {} }

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    },
    loading: { height: 60, width: 60 }
  })

  handleGenerateDataConfig = () => {
    this.props.generateDataConfig({
      dataset: this.props.dataset.get('id'),
      dataSettings: this.props.dataset,
      version: this.props.version,
    })
  }

  renderTable(columns, rows) {
    return (
      <Table
        title="Datasets"
        data={rows}
        columns={columns}
        options={{
          selection: true
        }}
        actions={[
          {
            tooltip: 'Remove All Selected Users',
            icon: DownloadIcon,
            onClick: (evt, data) => console.log(data)
          }
        ]}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      />
    )

  }

  render() {
    const { classes, dataset, pipelines } = this.props

    if (!dataset) {
      return <NotFound />
    }

    const tools = (
      <React.Fragment>
        <Button size="small">
          <DownloadIcon />
        </Button>
        {/* <Button size="small">
          <SaveIcon />
        </Button> */}
        {/* <Button size="small">
          <RevertIcon />
        </Button> */}
      </React.Fragment>
    )

    const loading = dataset.get('loading')

    let rows, columns
    if (dataset.get('data')) {
      console.log(dataset.get('data').toJS())
      columns = [
        {
          field: "subject",
          title: "Subject",
          headerStyle: { textAlign: 'center' },
          cellStyle: { textAlign: 'center' },
        },
        {
          field: "unique",
          title: "Unique",
          headerStyle: { textAlign: 'center' },
          cellStyle: { textAlign: 'center' },
        },
        {
          field: "site",
          title: "Site",
          headerStyle: { textAlign: 'center' },
          cellStyle: { textAlign: 'center' },
        },
        {
          field: "anatomical",
          title: "Anatomical",
          headerStyle: { textAlign: 'center' },
          cellStyle: { textAlign: 'center' },
          render: rowData => {
            if (rowData.anatomical === true) {
              return <CheckIcon />
            } else if (rowData.anatomical === false) {
              return <UncheckIcon />
            }
            return (rowData.anatomical)
          }
        },
        {
          field: "functionals",
          title: "Functional",
          headerStyle: { textAlign: 'center' },
          cellStyle: { textAlign: 'center' },
          render: rowData => {
            if (rowData.functionals === true) {
              return <CheckIcon />
            } else if (rowData.functionals === false) {
              return <UncheckIcon />
            }
            return (rowData.functionals)
          }
        },
      ]

      rows = []
      dataset.getIn(['data', 'sets']).entrySeq().map(([subject, uniques]) => {
        uniques.entrySeq().map(([unique, def]) => {
          const func = Object.assign(...dataset.getIn(['data', 'series']).map(s => {
            return {
              [s]: !!def.getIn(['functionals', s])
            }
          }))

          const site = def.get('site')

          const uniqueName = subject + unique + site

          rows.push({
            id: uniqueName,
            subject,
            unique,
            site,
            anatomical: !!def.get('anatomical'),
            functionals: !!def.get('functionals'),
          })

          def.get('functionals').keySeq().forEach(functional => {
            rows.push({
              id: subject + unique + site + functional,
              parentId: uniqueName,
              functionals: functional,
            })
          });

        }).cacheResult()
      }).cacheResult()
    }

    // @TODO review styling, create an element to center-center on Grids
    const paperStyle = loading ? { alignItems: 'center', alignContent: 'center', display: 'flex', justifyContent: 'center' } : {}

    return (
      <Box title={dataset.get('name')}
           avatar={<DatasetIcon />}
           tools={tools}>

        <FlexBox display="flex" alignItems="center" p={1}>
          <FlexBox p={1} flexGrow={1}>
            <TextField
                label="BIDS Directory"
                name="derivatives.network_centrality.mask"
                value={"s3://fcp-indi/data/Projects/ABIDE/RawDataBIDS/"}
                fullWidth={true} margin="normal" variant="outlined"
              />
          </FlexBox>
          <FlexBox p={1}>
            <Button variant="contained" color="secondary" onClick={this.handleGenerateDataConfig}>Generate</Button>
          </FlexBox>
        </FlexBox>

        { rows || loading ?
          <React.Fragment>
            <Paper style={{ ...paperStyle }}>
              {
                !loading ?
                this.renderTable(columns, rows) :
                <LoadingIcon />
              }
            </Paper>
          </React.Fragment>
        : null }
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
  const pipelines = state.main.getIn(['config', 'pipelines'])

  return {
    dataset,
    version,
    configuration: dataset.getIn(['versions', version, 'configuration']),
    pipelines,
  }
}

const mapDispatchToProps = {
  generateDataConfig,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(DatasetPage.styles)(DatasetPage)
)
