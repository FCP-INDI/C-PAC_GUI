import React, { PureComponent } from 'react';
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
import OnOffSwitch from 'components/OnOffSwitch';
import PipelinePart, { formatLabel } from './PipelinePart';
import { PipelineTextField } from 'components/TextField';


class CpacTextListItem extends PureComponent {

  state = { item: this.props.item }; 

  render() {

    const {
      chain, handlers, i, inputType, item, label, name, onChange
    } = this.props;

    return (
      <ListItem button key={i}>
        <PipelineTextField
          label={label} fullWidth margin="normal" variant="outlined"
          name={`${name}.${i}`}
          type={inputType}
          value={item}
          onChange={onChange}
        />
        <ListItemSecondaryAction>
          { item == '' ? null : (
            <IconButton onClick={() => {
              handlers.handleDuplicate(
                chain, name, i, onChange
              );
            }}>
              <DuplicateIcon />
            </IconButton>
          ) }
          <IconButton onClick={() => {
            handlers.handleDelete(
              chain, name, i, onChange
            );
          }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

}

class CpacListItem extends PureComponent {

  render() {

    const {
      chain, entry, handleDelete, handleDuplicate, i, item, label, name,
      onChange, parents
    } = this.props;
    const handlers = {
      handleDelete: handleDelete,
      handleDuplicate: handleDuplicate
    }

    if (!Immutable.Map.isMap(item)){
      switch (typeof(item)){
        case "boolean": // list of On/Off switches
          return (
            <ListItem button key={i}>
              <OnOffSwitch
                {...{label, onChange}}
                key={`${entry[0]}-${i}`}
                regex={null}
                checked={item}
              />
            </ListItem>
          )
        case "number":
          return (
            <CpacTextListItem
              { ...{ chain, handlers, i, item, label, name, onChange } }
              inputType={ 'number' }
            />
          )
        case "string":
          return (
            <CpacTextListItem
              { ...{ chain, handlers, i, item, label, name, onChange } }
              inputType={ 'text' }
            />
          )
        default:
          console.warn(`UNHANDLED TYPE: ${typeof(item)}: ${parents}: ${$entry[0]}: ${item}`)
          return ('!!!UNHANDLED TYPE!!!')
      }
    } else {
      <Grid container>
        <PipelinePart 
          { ...{ classes, onChange } }
          configuration={ item }
          level={ level + 1 }
          parents={ [...parents.slice(0, level), entry[0]] }
        />
      </Grid>
    }
  }
}

class CpacList extends PureComponent {

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
      case 'string':
        newList.push('');
        break;
      case 'boolean':
        newList.push(false);
        break;
      case 'number':
        newList.push(0);
        break;
    }
    this.updateList(name, newList, onChange);
  }

  render() {
    const {entry, classes, level, parents, onChange} = this.props;

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
              chain, entry, i, item, label, name, onChange
            } }
            handleDelete={ this.handleDelete }
            handleDuplicate={ this.handleDuplicate }
            key={ `${name}-${i}` }
          />
        )
      }) }
      { entry[1].includes('') ? null : (<>
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
