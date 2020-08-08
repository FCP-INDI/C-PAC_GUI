import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

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
import Tooltip from 'components/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { default as FlexBox } from '@material-ui/core/Box'

import {
  DatasetIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon,
  LoadingIcon,
  CheckIcon,
  UncheckIcon,
  ViewIcon,
  AddIcon,
} from '../components/icons'

import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header'
import Content from '../components/Content'
import Box from '../components/Box'
import Table from '../components/Table'

import DatasetViewsList from './dataset/DatasetViewsList'

import {
  generateDataConfig,
} from '../actions/dataset'


class DatasetPage extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    },
    loading: {
      width: 36, height: 36,
    },
  })

  handleCreateView = () => {
    
  }

  handleGenerateDataConfig = () => {
    this.props.generateDataConfig(
      'local',
      {
        id: this.props.dataset.get('id'),
        version: this.props.version,
      }
    )
  }

  handleFilter(view) {
    console.log(view.toJS())
  }

  prepareData(dataset) {

    if (!dataset || !dataset.get('data')) {
      return { rows: null, columns: null }
    }

    const columns = [
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

    const rows = []
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

    return { rows, columns }
  }

  renderTable(columns, rows) {
    return (
      <Table
        title={null}
        data={rows}
        columns={columns}
        options={{
          selection: true
        }}
        actions={[
          {
            tooltip: 'Create view of the selected users',
            icon: DownloadIcon,
            onClick: (evt, data) => console.log(data)
          }
        ]}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      />
    )
  }

  render() {
    const { classes, dataset, configuration } = this.props

    if (!dataset) {
      return <NotFound />
    }

    const loading = dataset.get('loading')
    const { rows, columns } = this.prepareData(loading ? null : dataset)

    const tools = (
      <>
        <Button size="small">
          <DownloadIcon />
        </Button>
        {/* <Button size="small">
          <SaveIcon />
        </Button> */}
        {/* <Button size="small">
          <RevertIcon />
        </Button> */}
      </>
    )

    const viewTools = (
      <>
        <Tooltip title="Create View">
          <span> {/* @TODO abstract tooltip + button into a component */}
          <IconButton disabled={!columns} onClick={() => this.handleCreateView()}>
            <AddIcon />
          </IconButton>
          </span>
        </Tooltip>
      </>
    )

    return (
      <Box title={dataset.get('name')}
           avatar={<DatasetIcon />}
           tools={tools}>

        <FlexBox display="flex" alignItems="center" p={1}>
          <FlexBox p={1} flexGrow={1}>
            <TextField
                label="BIDS Directory"
                name="derivatives.network_centrality.mask"
                value={configuration.getIn(['options', 'base'])}
                fullWidth={true} margin="normal" variant="outlined"
              />
          </FlexBox>
          <FlexBox p={1}>
            <Button variant="contained" color="secondary" onClick={this.handleGenerateDataConfig}>Build Dataset</Button>
          </FlexBox>
        </FlexBox>

        <Grid container alignItems="stretch">
          <Grid item xs={12} lg={8} style={{display: 'flex'}}>
            <Paper style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 100}}> 
              {
                loading ?
                <Skeleton animation="wave" variant="rect" style={{flexGrow: 1}} /> :
                (
                  columns ?
                  this.renderTable(columns, rows):
                  <Typography style={{ textAlign: 'center' }}>The dataset must be build before accessing it.</Typography>
                )
              }
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box title={'Views'} avatar={<ViewIcon />} tools={viewTools} inner>
              <DatasetViewsList disabled={!columns} views={dataset.get('views')} onView={(view) => this.handleFilter(view)} />
            </Box>
          </Grid>
        </Grid>
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
  const version =  `${dataset.get('versions').keySeq().map(i => +i).max()}`

  return {
    dataset,
    version,
    configuration: dataset.getIn(['versions', version, 'configuration']),
  }
}

const mapDispatchToProps = {
  generateDataConfig,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(DatasetPage.styles)(DatasetPage)
)
