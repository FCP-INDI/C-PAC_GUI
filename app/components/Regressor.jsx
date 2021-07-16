import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import {
  FilterBWIcon
} from './icons';

const emptyRegressor = {
  'Name': '',
  'Motion': {
    'include_delayed': false,
    'include_squared': false,
    'include_delayed_squared': false
  },
  'aCompCor': {
    'summary': {
      'method': '',
      'components': 0
    },
    'tissues': [''],
    'extraction_resolution': 0
  },
  'CerebrospinalFluid': {
    'summary': '',
    'extraction_resolution': 0,
    'erode_mask': false
  },
  'GlobalSignal': {
    'summary': ''
  },
  'PolyOrt': {
    'degree': 0
  },
  'Bandpass': {
    'bottom_frequency': 0.0,
    'top_frequency': 0.,
    'method': ''
  }
}

/** A card component to show a pipeline configuration available to view/edit, duplicate, and/or delete. */
class RegressorCard extends PureComponent {
  // static propTypes = {
  //   /** Inherited style */
  //   classes: PropTypes.object,
  //   /** Methods for mutating array of pipelines */
  //   onDelete: PropTypes.func.isRequired,
  //   onDuplicate: PropTypes.func.isRequired,
  //   /** A pipeline configuration */
  //   pipeline: PropTypes.instanceOf(Immutable.Map).isRequired,
  //   /** Routing props */
  //   history: PropTypes.object,
  //   location: PropTypes.object,
  //   match: PropTypes.object
  // }

  // handleOpen = (pipeline) => {
  //   this.props.history.push(`/pipelines/${pipeline}`)
  // }

  render() {
    const { chain, classes, level, isDefault, item, onChange, parents } = this.props
    console.log(chain);
    console.log(item);
    console.log(parents);

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <FilterBWIcon />
            </Avatar>
          }
          title={ item.getIn(['Name']) }
          subheader={'Regressor'}
        />
        <CardContent className={classes.info}>
         {JSON.stringify(item.toJS())}
        </CardContent>
      </Card>
    )
  }
}

export default RegressorCard;
export { emptyRegressor };