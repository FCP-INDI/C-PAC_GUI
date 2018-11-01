import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Paper } from '@material-ui/core';
import Content from '../components/Content';
import Header, { HeaderText, HeaderAvatar } from '../components/Header';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

// import Highcharts from 'highcharts'


class ProjectSubjectsPage extends Component {

  static styles = theme => ({
    header: {
      paddingBottom: 20,
    },
    select: {
      padding: 10,
      display: 'inline'
    }
  });

  componentDidMount() {
    const { project: { subjects } } = this.props;

    const SitesData = subjects.summary.phenotype.filter(p => p.variable === 'Sites')[0]

    const SitesDataChart = SitesData.data.map(
      i => ({
        name: i.name,
        y: i.value,
      })
    )

    // this.SitesChart = Highcharts.chart('Sites', {
    //   chart: {
    //     plotBackgroundColor: null,
    //     plotBorderWidth: null,
    //     plotShadow: false,
    //     type: 'pie'
    //   },
    //   title: false,
    //   tooltip: {
    //     pointFormat: '{series.name}: <b>{point.y}</b>'
    //   },
    //   plotOptions: {
    //     pie: {
    //       allowPointSelect: true,
    //       cursor: 'pointer',
    //       dataLabels: {
    //         enabled: true,
    //         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //         style: {
    //           color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    //         }
    //       }
    //     }
    //   },
    //   series: [{
    //     name: 'Subjects',
    //     data: SitesDataChart
    //   }]
    // });

    const SexByAgeData = subjects.summary.phenotype.filter(p => p.variable === 'Sex distribution')[0]
    const SexByAgeChartData = SexByAgeData.data.map(g => ({
      name: g.name,
      type: 'spline',
      data: g.value.map((d, i) => d)
    }))

  //   this.SexByAgeChart = Highcharts.chart('SexByAge', {
  //     chart: {
  //       type: 'line'
  //     },
  //     title: false,
  //     xAxis: {
  //       title: {
  //         text: 'Age'
  //       }
  //     },
  //     yAxis: {
  //       title: {
  //         text: 'Count'
  //       }
  //     },
  //     plotOptions: {
  //       line: {
  //         dataLabels: {
  //           enabled: true
  //         },
  //         enableMouseTracking: false
  //       }
  //     },
  //     series: SexByAgeChartData
  //   });
  }

  componentWillUnmount() {
    // this.SitesChart.destroy();
    // this.SexByAgeChart.destroy();
  }

  render() {
    const { classes, project } = this.props;

    const data = [
      { id: "51456", data: { site: "NYU", group: "ASD", gender: "M" } },
      { id: "51457", data: { site: "NYU", group: "ASD", gender: "M" } },
      { id: "51458", data: { site: "NYU", group: "ASD", gender: "M" } },
      { id: "51459", data: { site: "NYU", group: "ASD", gender: "F" } },
      { id: "51460", data: { site: "NYU", group: "TC", gender: "M" } },
      { id: "51461", data: { site: "NYU", group: "TC", gender: "F" } },
      { id: "51462", data: { site: "NYU", group: "TC", gender: "F" } },
      { id: "51463", data: { site: "NYU", group: "TC", gender: "M" } },
      { id: "51464", data: { site: "CALTECH", group: "ASD", gender: "M" } },
      { id: "51465", data: { site: "CALTECH", group: "ASD", gender: "M" } },
      { id: "51466", data: { site: "CALTECH", group: "ASD", gender: "F" } },
      { id: "51467", data: { site: "CALTECH", group: "ASD", gender: "F" } },
      { id: "51468", data: { site: "CALTECH", group: "TC", gender: "F" } },
      { id: "51469", data: { site: "CALTECH", group: "TC", gender: "F" } },
      { id: "51470", data: { site: "CALTECH", group: "TC", gender: "F" } },
      { id: "51471", data: { site: "CALTECH", group: "TC", gender: "M" } },
    ]

    const metadata = {
      columns: ['site', 'group', 'piq']
    }

    return (
      <React.Fragment>
        <Header>
          <HeaderAvatar>{project.name[0]}</HeaderAvatar>
          <HeaderText>
            Subjects
          </HeaderText>
        </Header>
        <Content>
          <Grid container spacing={8} alignContent="center">
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" className={classes.header}>
                    Variable:
                    <TextField
                      select
                      className={classes.select}
                      value='site'
                    >
                      <MenuItem key='site' value='site'>
                        Site
                      </MenuItem>
                      <MenuItem key='gender' value='gender'>
                        Gender
                      </MenuItem>
                      <MenuItem key='group' value='group'>
                        Group
                      </MenuItem>
                      <MenuItem key='age' value='age'>
                        Age
                      </MenuItem>
                    </TextField>
                  </Typography>
                  <div id="Sites">
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" className={classes.header}>
                    Cross Variables:
                    <TextField
                      select
                      className={classes.select}
                      value='gender'
                    >
                      <MenuItem key='site' value='site'>
                        Site
                      </MenuItem>
                      <MenuItem key='gender' value='gender'>
                        Gender
                      </MenuItem>
                      <MenuItem key='group' value='group'>
                        Group
                      </MenuItem>
                      <MenuItem key='age' value='age'>
                        Age
                      </MenuItem>
                    </TextField>
                     by
                     <TextField
                      select
                      className={classes.select}
                      value='age'
                    >
                      <MenuItem key='site' value='site'>
                        Site
                      </MenuItem>
                      <MenuItem key='gender' value='gender'>
                        Gender
                      </MenuItem>
                      <MenuItem key='group' value='group'>
                        Group
                      </MenuItem>
                      <MenuItem key='age' value='age'>
                        Age
                      </MenuItem>
                    </TextField>
                  </Typography>
                  <div id="SexByAge">
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Paper style={{ padding: 10 }}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Site</TableCell>
                      <TableCell>Group</TableCell>
                      <TableCell>Gender</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map(n => {
                      return (
                        <TableRow key={n.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              tabIndex={-1}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {n.id}
                          </TableCell>
                          <TableCell>{n.data.site}</TableCell>
                          <TableCell>{n.data.group}</TableCell>
                          <TableCell>{n.data.gender}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { project } } } = props
  return { project: state.main.config.projects[project] }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectSubjectsPage.styles)(ProjectSubjectsPage));
