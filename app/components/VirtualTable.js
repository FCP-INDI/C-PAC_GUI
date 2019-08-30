import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { AutoSizer, Column, ColumnSizer, Table } from 'react-virtualized'

import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'


class VirtualTable extends React.PureComponent {

  static defaultProps = {
    // headerHeight: 64,
    headerHeight: 48,
    rowHeight: 48,
  }

  static styles = theme => ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      flexBasis: 'auto',
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableFilter: {
    },
    tableCell: {
      flex: 1,
    },
    tableCellInner: {
      flex: 1,
      textAlign: 'center',
      alignItems: 'center',
    },
    tableHeader: {
      display: 'flex',
      flexDirection: 'column',
      // padding: theme.spacing()
    },
    noClick: {
      cursor: 'initial',
    },
  })

  constructor(props) {
    super(props)
    const { columns } = this.props
    this.state = {
      filters: {},
      columns: Object.assign(
        ...columns.map((c) => ({
          [c.dataKey]: {
            open: false,
            anchor: null,
          }
        }))
      )
    }
  }

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  cellRenderer = (column) => ({ cellData }) => {
    const { classes, rowHeight, onRowClick } = this.props
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
      >
        <div className={classes.tableCellInner}>{ column.renderer ? column.renderer(cellData) : cellData }</div>
      </TableCell>
    )
  }

  handleHeaderClick = (column) => (e) => {
    this.setState({
      columns: {
        ...this.state.columns,
        [column.dataKey]: {
          open: true,
          anchor: e.currentTarget,
        }
      }
    })
  }

  handleFilter = (column) => (values) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [column.dataKey]: {
          values,
        },
      },
      columns: {
        ...this.state.columns,
        [column.dataKey]: {
          ...this.state.columns[column.dataKey],
          open: false,
        },
      },
    })
  }

  headerRenderer = ({ dataKey, label, column }) => {
    const { headerHeight, classes } = this.props

    return (
      <React.Fragment>
        { column.filter && column.filter.renderer ? 
          <Popover
            open={!!this.state.columns[column.dataKey].open}
            anchorEl={this.state.columns[column.dataKey].anchor}
            onClose={() => this.setState({
              columns: {
                ...this.state.columns,
                [column.dataKey]: {
                  ...this.state.columns[column.dataKey],
                  open: false,
                }
              }
            })}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <column.filter.renderer
              column={column}
              values={(this.state.filters[column.dataKey] && this.state.filters[column.dataKey].values) || []}
              onFilter={this.handleFilter(column)} />
          </Popover>
        : null }

        <TableCell
          component="div"
          className={clsx(
            classes.tableCell,
            classes.tableHeader,
            classes.flexContainer,
            classes.noClick
          )}
          variant="head"
          style={{ height: headerHeight }}
          align={column.numeric || false ? 'right' : 'left'}
          onClick={this.handleHeaderClick(column)}
        >
          { label }
        </TableCell>
      </React.Fragment>
    )
  }

  render() {
    const { classes, columns, rowHeight, rows, headerHeight, ...tableProps } = this.props

    const { filters } = this.state
    const filteredRows = rows.filter((row) => {
      for (let col of Object.keys(filters)) {
        if (!filters[col].values.includes(row[col])) {
          return false
        }
      }
      return true
    })

    return (
      <AutoSizer>
        {({ height, width }) => (
          <ColumnSizer
            columnMinWidth={50}
            columnCount={columns.length}
            width={width}
          >
            {({ adjustedWidth, getColumnWidth, registerChild }) => (
              <Table
                height={height}
                width={adjustedWidth}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                rowCount={filteredRows.length}
                rowGetter={({ index }) => filteredRows[index]}
                {...tableProps}
                rowClassName={this.getRowClassName}
              >
                {columns.map(({ dataKey, ...other }, index) => (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        column: columns[index],
                        dataKey,
                      })
                    }
                    className={classes.flexContainer}
                    cellRenderer={this.cellRenderer(columns[index])}
                    dataKey={dataKey}
                    width={adjustedWidth}
                    {...other}
                  />
                ))}
              </Table>
            )}
          </ColumnSizer>
        )}
      </AutoSizer>
    )
  }
}

export default withStyles(VirtualTable.styles)(VirtualTable)