import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Immutable, { fromJS } from 'immutable';

import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Help from 'components/Help';
import {
  AddIcon,
  DeleteIcon,
  DuplicateIcon
} from 'components/icons';
import CustomPropTypes from 'components/PropTypes';
import OnOffSwitch from 'components/OnOffSwitch';
import PipelinePart, { formatLabel } from 'containers/pipeline/parts/PipelinePart';
import PipelineTextField from 'components/TextField';

/** A Boolean toggle component within a list. */
class OnOffSwitchListItem extends PureComponent {
  static propTypes = {
    /** Text label to display by switch. */
    label: PropTypes.string,
    /** This list's specific key, this entire list. */
    entry: CustomPropTypes.entryList.isRequired,
    /** Sequence of keys from the top of the overall pipeline configuration to this list (array). */
    chain: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this list (array). */
    name: PropTypes.string.isRequired,
    /** This field's index in this list (array). */
    i: PropTypes.number.isRequired,
    /** On or off? (true == on) */
    item: PropTypes.bool.isRequired,
    /** Function to call on change. */
    onChange: PropTypes.func.isRequired,
    /** Regular expression for help field (deprecated). */
    regex: PropTypes.instanceOf(RegExp),
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool
  }

  render() {
    const {
      chain, entry, handleDelete, i, isDefault, item, label, name, onChange,
      regex
    } = this.props;
    return (
      <ListItem button key={i}>
        <OnOffSwitch
          { ...{ label, isDefault, onChange } }
          key={ `${entry[0]}-${i}` }
          name={`${name}.${i}`}
          // onChange={(e) => this.togglePair(e, onChange)}
          regex={ regex }
          checked={ item }
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={ () => {
              handleDelete(
                chain, name, i, onChange
              );
            } }
            disabled={ isDefault }
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

/** A TextField component within a list. */
class CpacTextListItem extends PureComponent {
  static propTypes = {
    /** Text label to display by switch. */
    label: PropTypes.string,
    /** Sequence of keys from the top of the overall pipeline configuration to this list (array). */
    chain: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this list (array). */
    name: PropTypes.string.isRequired,
    /** This field's index in this list (array). */
    i: PropTypes.number.isRequired,
    /** On or off? (true == on) */
    item: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    /** Functions to call on change. */
    onChange: PropTypes.func.isRequired,
    handlers: PropTypes.objectOf(PropTypes.func).isRequired,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool
  }

  state = { item: this.props.item }; 

  render() {
    const {
      chain, handlers, i, inputType, isDefault, item, label, name, onChange
    } = this.props;

    return (
      <ListItem button key={i}>
        <PipelineTextField
          label={label} fullWidth margin="normal" variant="outlined"
          name={`${name}.${i}`}
          type={inputType}
          value={item}
          { ...{ isDefault, onChange } }
        />
        <ListItemSecondaryAction>
          { item == '' ? null : (
            <IconButton
              disabled={ isDefault }
              onClick={ () => {
                handlers.handleDuplicate(
                  chain, name, i, onChange
                );
              } }
            >
              <DuplicateIcon />
            </IconButton>
          ) }
          <IconButton
            disabled={ isDefault }
            onClick={() => {
              handlers.handleDelete(
                chain, name, i, onChange
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

}

/** Editable item in a list within a pipeline configuration. */
class CpacListItem extends PureComponent {
  static propTypes = {
    /** Sequence of keys from the top of the overall pipeline configuration to this list (array). */
    chain: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this list (array). */
    name: PropTypes.string.isRequired,
    /** Text label to display by TextField. */
    label: PropTypes.string,
    /** Sequence of keys from the top of the overall pipeline configuration to this Map. */
    parents: PropTypes.array.isRequired,
    /** Current depth level (integer). */
    level: PropTypes.number.isRequired,
    /** This list's specific key, this entire list. */
    entry: CustomPropTypes.entryList.isRequired,
    /** This field's index in this list (array). */
    i: PropTypes.number.isRequired,
    /** On or off? (true == on) */
    item: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
      PropTypes.instanceOf(Immutable.Map)
    ]).isRequired,
    /** Change methods */
    handleDelete: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    /** Inherited style */
    classes: PropTypes.object,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool
  }

  render() {
    const {
      chain, classes, entry, handleDelete, handleDuplicate, i, isDefault,
      item, label, level, name, onChange, parents
    } = this.props;
    const handlers = {
      handleDelete: handleDelete,
      handleDuplicate: handleDuplicate
    }

    if (!Immutable.Map.isMap(item)){
      switch (typeof(item)){
        case "boolean": // list of On/Off switches
          return (
            <OnOffSwitchListItem
              { ...{
                chain, entry, handleDelete, i, isDefault, item, label, name,
                onChange
              } }
              regex={ null }
            />
          )
        case "number":
          return (
            <CpacTextListItem
              { ...{
                chain, handlers, i, isDefault, item, label, name, onChange
              } }
              inputType={ 'number' }
            />
          )
        case "string":
          return (
            <CpacTextListItem
              { ...{
                chain, handlers, i, isDefault, item, label, name, onChange
              } }
              inputType={ 'text' }
            />
          )
        default:
          console.warn(`UNHANDLED TYPE: ${typeof(item)}: ${parents}: ${$entry[0]}: ${item}`)
          return ('!!!UNHANDLED TYPE!!!')
      }
    } else {
      return (
        <Grid container>
          <PipelinePart 
            { ...{ classes, isDefault, onChange } }
            configuration={ item }
            level={ level + 1 }
            parents={ [...parents.slice(0, level), entry[0]] }
          />
        </Grid>
      )
    }
  }
}

/** List of editable items within a pipeline configuration. */
class CpacList extends PureComponent {
  static propTypes = {
    /** This list's specific key, this entire list. */
    entry: CustomPropTypes.entryList.isRequired,
    /** The Immutable Map containing this list. */
    configuration: PropTypes.instanceOf(Immutable.Map),
    /** Sequence of keys from the top of the overall pipeline configuration to this Map. */
    parents: PropTypes.array.isRequired,
    /** Current depth level (integer). */
    level: PropTypes.number.isRequired,
    /** Change method */
    onChange: PropTypes.func.isRequired,
    /** Inherited style */
    classes: PropTypes.object,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool
  }

  state = { fullList: this.props.entry[1] };

  updateList = (name, value, onChange) => {
    const immutableValue = fromJS(value);
    onChange({
      target: {
        name, 
        value: immutableValue
      }
    });
    this.setState({ fullList: immutableValue }, () => {
      this.forceUpdate();
    });
  }

  handleDelete = (chain, name, i, onChange) => {
    let newList = this.props.configuration.getIn([chain[chain.length - 1]]).toJS();
    newList.splice(i, 1);
    this.updateList(name, newList, onChange);
  }

  handleDuplicate = (chain, name, i, onChange) => {
    let newList = this.props.configuration.getIn([chain[chain.length - 1]]).toJS();
    newList.push(newList[i]);
    this.updateList(name, newList, onChange);
  }

  handleNew = (chain, name, onChange) => {
    let newList = this.props.configuration.getIn([chain[chain.length - 1]]).toJS();
    switch (typeof(newList[0])) {
      case 'boolean':
        newList.push(!newList[0]);
        break;
      case 'number':
        newList.push(0);
        break;
      case 'string':
      default:
        newList.push('');
        break;
    }
    this.updateList(name, newList, onChange);
  }

  render() {
    const {entry, classes, isDefault, level, parents, onChange} = this.props;

    const regex = new RegExp(`^\s*{entry[0]}`);
    const label = formatLabel(entry[0]);
    const chain = [...parents, entry[0]];
    const name = chain.join('.');

    return (
      <Grid key={ entry[0] } item xs={ 12 } className={ classes.fullWidth }>
      <FormGroup row>
      <Help
        type="pipeline"
        regex={ regex }
        help=""
      >
        <FormLabel>{ label }</FormLabel>
      </Help>
      <List className={ classes.fullWidth }>
      { entry[1].map((item, i) => {
        return (
          <CpacListItem
            { ... {
              chain, classes, entry, i, isDefault, item, label, level, name,
              onChange, parents
            } }
            handleDelete={ this.handleDelete }
            handleDuplicate={ this.handleDuplicate }
            key={ `${name}-${i}` }
          />
        )
      }) }
      { (
        isDefault ||
        entry[1].includes('') ||
        (typeof(entry[1].get(0)) == 'boolean' && entry[1].size >= 2)
      ) ? null : (<>
        <Divider />
        <ListItem style={ { padding: 10 } }>
          <ListItemSecondaryAction>
            <IconButton onClick={ () => this.handleNew(
              chain, name, onChange
            ) }>
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </>) }
      </List>
      </FormGroup>
      </Grid>
    )
  }
}

export default CpacList;
