import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

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

import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header'
import Content from '../components/Content'
import Box from '../components/Box'
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
    }
  })

  handleGenerateDataConfig = () => {
    this.props.generateDataConfig({
      dataset: this.props.dataset.get('id'),
      dataSettings: this.props.dataset,
      version: this.props.version,
    })
  }

  render() {
    const { classes, dataset, pipelines } = this.props

    if (!dataset) {
      // @TODO ASH create a 404 page/component
      return "404"
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

    const headerRenderer = ({ label, columnIndex }) => {
      const { headerHeight, columns, classes } = this.props

      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="head"
          style={{ height: headerHeight }}
          align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        >
          <span>{label}</span>
        </TableCell>
      )
    }

    let rows, columns
    if (dataset.get('data')) {
      columns = [
        {
          dataKey: "subject",
          label: "Subject",
          filter: {
            values: dataset.getIn(['data', 'subject_ids']).toJS()
          }
        },
        {
          dataKey: "unique",
          label: "Unique",
          filter: {
            values: dataset.getIn(['data', 'unique_ids']).toJS(),
          }
        },
        {
          dataKey: "site",
          label: "Site",
          filter: {
            values: dataset.getIn(['data', 'sites']).toJS(),
            renderer: ({ column, values, onFilter }) => (
              <React.Fragment>
                {/* <FormControl>
                  <Select multiple fullWidth value={values}>
                    {column.filter.values.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <Button onClick={() => onFilter(['MaxMun_b'])}>
                  { column.label }
                </Button>
              </React.Fragment>
            )
          }

        },
        {
          dataKey: "anatomical",
          label: "Anatomical",
          renderer: (content) => content ? 'Y' : 'N',
        },
      ]

      dataset.getIn(['data', 'series']).map((s) => {
        columns.push({
          dataKey: s,
          label: s,
          renderer: (content) => content ? 'Y' : 'N',
        })
      })

      rows = []
      dataset.getIn(['data', 'sets']).entrySeq().map(([subject, uniques]) => {
        uniques.entrySeq().map(([unique, def]) => {
          const func = Object.assign(...dataset.getIn(['data', 'series']).map(s => {
            return {
              [s]: !!def.getIn(['functionals', s])
            }
          }))

          const row = {
            subject,
            unique,
            site: def.get('site'),
            anatomical: !!def.get('anatomical'),
            ...func
          }

          rows.push(row)
        }).cacheResult()
      }).cacheResult()

      rows.sort(
        (a, b) => {
          return (
            a.site === b.site ?
            (a.subject > b.subject ? 1 : -1) :
            (a.site > b.site ? 1 : -1)
          )
        }
      )

    }

    return (
      <Box title={dataset.get('name')}
           avatar={<DatasetIcon />}
           tools={tools}>
        <Button onClick={this.handleGenerateDataConfig}>Generate</Button>
        { rows ? <Button onClick={this.handleGenerateDataConfig}>Execute</Button> : null }
        <p>{ dataset.get('data') ? `${dataset.getIn(['data', 'subject_ids']).size} subjects` : null }</p>
        { rows ?
          <React.Fragment>
            <Paper style={{ height: 400 }}>
              <VirtualTable
                rows={rows}
                columns={columns}
              />
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
