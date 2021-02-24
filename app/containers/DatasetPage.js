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

import withCurrentScheduler from '../components/cpacpy/withCurrentScheduler'
import {parse} from '../../c-pac/data_config'

import Content from '../components/Content'
import Box from '../components/Box'
import Table from '../components/Table'

import DatasetViewsList from './dataset/DatasetViewsList'

import {
  createDataSettings,
  updateDataSettings,
  generateDataConfig,
  generateDataConfigSync,
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

  state = {
    name: '',
    base: '',
    format: '',
    uploadFileName: 'No file has been uploaded',
  }

  constructor(props) {
    super(props)
    const { dataset, configuration } = this.props
    if (dataset) {
      this.state.format = configuration.getIn(['format'])
      this.state.base = configuration.getIn(['options', 'base']);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasets && prevProps.datasets) {
      if (this.props.datasets.size > prevProps.datasets.size) {
        const dataset = this.props.datasets.last()
        this.props.history.push(`/datasets/${dataset.get('id')}`)
      }
    }
  }

  handleCreateView = () => {
    
  }

  handleChangeForm(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleCreateDatasetBIDS = () => {
    if(this.state.name === "") {
      alert("Please set a name for the dataset =)")
      return
    }
    this.state.format = 'bids'
    this.props.createDataSettings(
      this.state.name,
      {
        format: 'bids',
        options: {
          base: this.state.base,
        }
      },
    )
  }

  handleCreateDatasetUpload = () => {
    if(this.state.name === "") {
      alert("Please set a name for the dataset =)")
      return
    }
    this.state.format = 'upload'
    this.props.createDataSettings(
      this.state.name,
      {
        format: 'upload',
        options: {
          base: null,
        }
      },
    )
  }

  handleCreateDatasetFetchURL = () => {
    if(this.state.name === "") {
      alert("Please set a name for the dataset =)")
      return
    }
    this.state.format = 'fetch'
    this.props.createDataSettings(
      this.state.name,
      {
        format: 'fetch',
        options: {
          base: null,
        }
      },
    )
  }

  handleUpdateDataset = () => {
    const { dataset } = this.props
    this.props.updateDataSettings(
      dataset.get('id'),
      dataset.get('name'),
      {
        options: {
          base: this.state.base,
        }
      },
    )
  }

  handleGenerateDataConfig = () => {
    this.props.generateDataConfig(
      null,
      {
        id: this.props.dataset.get('id'),
        version: this.props.version,
      }
    )
  }
  handleUpload = (e) => {
    var files = e.target.files
    var f = files[0]
    var reader = new FileReader();
    reader.onload = ((e) => {
      try {
        let id = this.props.dataset.get('id')
        let datasetConfig = parse(e.target.result)
        this.state.uploadFileName = f.name
        this.props.generateDataConfigSync(
          {id: id},
          datasetConfig
        )
      } catch (error) {
        console.error(error)
        alert('Something wrong during parsing the YML file. \n' +
          'Please check your file format :3')
      }
    })
    reader.readAsText(f)
    e.target.value = null
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
    const { classes, dataset, configuration, create } = this.props

    if (create) {
      return (
        <Box title={<TextField
          label="Dataset Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChangeForm.bind(this)}
          fullWidth={true} margin="normal" variant="outlined"
        />}
             avatar={<DatasetIcon />}>

          <FlexBox display="flex" alignItems="center" p={1}>
            <FlexBox p={1}>
              <Button variant="contained" color="secondary" component="span" onClick={this.handleCreateDatasetUpload}>
                Upload yml File
              </Button>
            </FlexBox>
            <FlexBox p={1}> | </FlexBox>
            <FlexBox p={1}>
              <Button variant="contained" color="secondary" onClick={this.handleCreateDatasetFetchURL}>Fetch raw</Button>
            </FlexBox>
            <FlexBox p={1}> | </FlexBox>
            <FlexBox p={1} flexGrow={1}>
              <TextField
                  label="BIDS Directory"
                  name="base"
                  value={this.state.base}
                  onChange={this.handleChangeForm.bind(this)}
                  fullWidth={true} margin="normal" variant="outlined"
                />
            </FlexBox>
            <FlexBox p={1}>
              <Button variant="contained" color="secondary" onClick={this.handleCreateDatasetBIDS}>Create from BIDS</Button>
            </FlexBox>
          </FlexBox>
        </Box>
      )
    }

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
          <IconButton disabled={!columns} onClick={() => this.handleCreateView()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </>
    )

    const BuildDatasetButton = withCurrentScheduler(Button)
    let bidsBlockStyle = {display:'none'}
    let uploadBlockStyle = {display:'none'}
    let fetchBlockStyle = {display:'none'}
    this.state.format === 'bids' ? bidsBlockStyle = {} : bidsBlockStyle
    this.state.format === 'upload' ? uploadBlockStyle = {} : uploadBlockStyle
    this.state.format === 'fetch' ? fetchBlockStyle = {} : fetchBlockStyle


    return (
      <Box title={dataset.get('name')}
           avatar={<DatasetIcon />}
           tools={tools}>

        <FlexBox display="flex" alignItems="center" p={1}
                 style={bidsBlockStyle}>
          <FlexBox p={1} flexGrow={1}>
            <TextField
                label="BIDS Directory"
                name="base"
                value={this.state.base}
                onChange={this.handleChangeForm.bind(this)}
                fullWidth={true} margin="normal" variant="outlined"
              />
          </FlexBox>
          <FlexBox p={1}>
            {
              this.state.base === configuration.getIn(['options', 'base']) ? (
                <BuildDatasetButton variant="contained" color="secondary" onClick={this.handleGenerateDataConfig}>Build Dataset</BuildDatasetButton>
              ) : (
                <Button variant="contained" color="secondary" onClick={this.handleUpdateDataset}>Update</Button>
              )
            }
          </FlexBox>
        </FlexBox>

        <FlexBox display="flex" alignItems="center" p={1}
                 style={uploadBlockStyle}>
          <FlexBox p={1} flexGrow={1}>
            <TextField
              label="File Name"
              name="uploadFileName"
              value={this.state.uploadFileName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth={true} margin="normal"
            />
          </FlexBox>
          <FlexBox p={1}>
            <input
              style={{ display: "none" }}
              id="contained-button-file1"
              type="file"
              onChange={this.handleUpload}
            />
            <label htmlFor="contained-button-file1">
              <Button variant="contained" color="secondary" component="span">
                Upload yml File
              </Button>
            </label>
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

  if (id === 'new') {
    return {
      datasets: state.dataset.getIn(['datasets']),
      create: true
    };
  }

  const dataset = state.dataset.getIn(['datasets']).find((p) => p.get('id') == id)
  const version = dataset ? `${dataset.get('versions').keySeq().map(i => +i).max()}` : null
  const configuration = dataset ? dataset.getIn(['versions', version, 'configuration']) : null

  return {
    dataset,
    version,
    configuration,
  }
}

const mapDispatchToProps = {
  createDataSettings,
  updateDataSettings,
  generateDataConfig,
  generateDataConfigSync,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(DatasetPage.styles)(DatasetPage)
)
