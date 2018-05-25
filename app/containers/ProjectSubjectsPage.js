import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Content from '../components/Content';
import Header, { HeaderText, HeaderAvatar } from '../components/Header';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import Highcharts from 'highcharts'


class ProjectSubjectsPage extends Component {

  static styles = theme => ({
  });

  componentDidMount() {
    const { project: { data: { subjects } } } = this.props;

    const SitesData = subjects.summary.phenotype.filter(p => p.variable === 'Sites')[0]

    const SitesDataChart = SitesData.data.map(
      i => ({
        name: i.name,
        y: i.value,
      })
    )

    this.SitesChart = Highcharts.chart('Sites', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: false,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Subjects',
        data: SitesDataChart
      }]
    });

    const SexByAgeData = subjects.summary.phenotype.filter(p => p.variable === 'Sex distribution')[0]
    const SexByAgeChartData = SexByAgeData.data.map(g => ({
      name: g.name,
      type: 'spline',
      data: g.value.map((d, i) => d)
    }))

    this.SexByAgeChart = Highcharts.chart('SexByAge', {
      chart: {
        type: 'line'
      },
      title: false,
      xAxis: {
        title: {
          text: 'Age'
        }
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: SexByAgeChartData
    });
  }

  componentWillUnmount() {
    this.SitesChart.destroy();
    this.SexByAgeChart.destroy();
  }

  render() {
    const { classes, project } = this.props;

    return (
      <div>
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
                  <Typography variant="title" color="textSecondary">
                    Sites
                  </Typography>
                  <div id="Sites">
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="title" color="textSecondary">
                    Sex by Age
                  </Typography>
                  <div id="SexByAge">
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Content>
      </div>
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
