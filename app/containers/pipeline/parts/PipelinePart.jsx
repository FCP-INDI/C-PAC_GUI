import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'
import Immutable from 'immutable';


function formatLabel(label) {
  const specialCasings = {
    ants: "ANTs",
    freesurfer: "FreeSurfer",
    dir: "Directory"
  };  // words with special casing or adjusted spelling
  const keepLower = ['at', 'per']  // words to not capitalize
  let labelParts = label.split("_");
  return labelParts.map(part => {
    if (part == part.toUpperCase() || keepLower.includes(part)) {
      return part;  // keep all uppercase uppercase
    }
    if (Object.keys(specialCasings).includes(part)) {
      return specialCasings[part];
    }
    return part.charAt(0).toUpperCase() + part.slice(1,)
  }).join(" ");
}


function returnComponent(obj, classes={}, onChange=undefined, parents=[]) {
  switch (Immutable.Map.isMap(obj)) {
    case true:
      return (
        <>
        { console.log(obj) }
        { obj.entrySeq().map((entry) => {
          console.log(Object.fromEntries([[entry[0], typeof(entry[1])]]))
          switch (Immutable.Map.isMap(entry[1])) {
            case true:
              parents.push(entry[0])
              return (
                <ExpansionPanel expanded>
                  <ExpansionPanelSummary disabled>
                    <Typography variant="h6" className={classes.sectionTitle}>
                      { formatLabel(entry[0]) }
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <Grid container>
                    { returnComponent(entry[1], classes, onChange, parents) }
                  </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            case false:
              const regex = new RegExp(`^\s*{entry[0]}`);
              const label = formatLabel(entry[0]);
              switch (typeof(entry[1])) {
                case 'boolean':
                  return (
                    <Grid item xs={12}>
                      <FormGroup row>
                        <Help
                          type="pipeline"
                          regex={regex}
                          help=""
                        >
                          <FormControlLabelled label={label}>
                            <Switch
                              name={[entry[0]].join('.')}
                              checked={entry[1]}
                              onChange={onChange}
                              color="primary"
                            />
                          </FormControlLabelled>
                        </Help>
                      </FormGroup>
                    </Grid>
                  )
                case 'string':
                  return (
                    <Grid item xs={12}>
                      <FormGroup row>
                        <Help
                          type="pipeline"
                          regex={regex}
                          help=""
                          fullWidth >
                          <TextField
                            label={label} fullWidth margin="normal" variant="outlined"
                            name={[entry[0]].join('.')}
                            value={entry[1]}
                            onChange={onChange}
                          />
                        </Help>
                      </FormGroup>
                    </Grid>
                  )
                case 'number':
                  return (
                    <Grid item xs={12}>
                      <FormGroup row>
                        <Help
                          type="pipeline"
                          regex={regex}
                          help=""
                          fullWidth >
                          <TextField
                            label={label} fullWidth margin="normal" variant="outlined"
                            name={[entry[0]].join('.')}
                            type='number'
                            value={entry[1]}
                            onChange={onChange}
                          />
                        </Help>
                      </FormGroup>
                    </Grid>
                  )
              }
            default:
              return (
                <>{ entry[1] }</>
                // <>key {k} : value {v}</>
              )
          }
        } ) }
        </>
      )
    default:
      return (
        <></>
        // <div>{ typeof(obj) }<br/>{ obj }</div>
      )
  }
}


class PipelinePart extends Component {

  static styles = theme => ({
    sectionTitle: {
      paddingTop: 6,
      paddingLeft: 6,
    },
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        {/* <div>{ JSON.stringify(configuration, null, 2) }</div> */}
        { returnComponent(configuration, classes, onChange) }
      </React.Fragment>
    )
  }
}

export default withStyles(PipelinePart.styles)(PipelinePart);
