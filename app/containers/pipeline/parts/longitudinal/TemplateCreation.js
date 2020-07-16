import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import {
  SettingsIcon,
} from 'components/icons';

class TemplateCreation extends Component {

    static styles = theme => ({
    });

    render() {

        const { classes, configuration, advanced, onChange } = this.props

        return (
            <React.Fragment>
                <FormControl fullWidth>
                    <FormGroup row>
                        <Help
                        type="pipeline"
                        regex={/^longitudinal_template_thread_pool/}
                        help={`The number of threads in a thread pool used for longitudinal template creation.`}
                        fullWidth
                        >
                            <TextField label="Thread Pool" fullWidth margin="normal" variant="outlined"
                                        name="longitudinal.thread_pool"
                                        value={configuration.getIn("longitudinal.thread_pool".split("."))}
                                        onChange={onChange} />
                        </Help>
                    </FormGroup>

                    <FormGroup row>
                        <Help
                        type="pipeline"
                        regex={/^longitudinal_template_convergence_threshold/}
                        help={`Threshold of transformation distance to consider that the loop converged. Default is -1 which means numpy.finfo(np.float64).eps.`}
                        fullWidth
                        >
                            <TextField label="Convergence Threshold" fullWidth margin="normal" variant="outlined"
                                        name="longitudinal.convergence_threshold"
                                        value={configuration.getIn("longitudinal.convergence_threshold".split("."))}
                                        onChange={onChange} />
                        </Help>
                    </FormGroup>

                    <FormGroup row>
                        <Help
                        type="pipeline"
                        regex={/^longitudinal_template_dof/}
                        help={`FLIRT degree of freedom for longitudinal template creation. Default is 12.`}
                        fullWidth
                        >
                            <TextField label="Degree of Freedom" fullWidth margin="normal" variant="outlined"
                                        name="longitudinal.dof"
                                        value={configuration.getIn("longitudinal.dof".split("."))}
                                        onChange={onChange} />
                        </Help>
                    </FormGroup>
                    
                    <FormGroup row>
                        <Help
                            type="pipeline"
                            regex={/^longitudinal_template_average_method/}
                            help={`Method to average the dataset at each iteration of longitudinal template creation. Options: Median, Mean or Standard Deviation. Default is Median.`}
                            fullWidth
                        >
                            <TextField
                            select
                            label="Average Method"
                            fullWidth margin="normal" variant="outlined"
                            className={classes.textField} onChange={onChange}
                            name="longitudinal.average_method"
                            value={configuration.getIn("longitudinal.average_method".split("."))}
                            helperText=''
                            >
                            <MenuItem value={"median"}>Median</MenuItem>
                            <MenuItem value={"mean"}>Mean</MenuItem>
                            <MenuItem value={"std"}>Standard Deviation</MenuItem>
                            </TextField>
                        </Help>
                    </FormGroup>

                    <FormGroup row>
                        <Help
                            type="pipeline"
                            regex={/^longitudinal_template_interp/}
                            help={`FLIRT interpolation option for longitudinal template creation. Options: trilinear, nearestneighbour, sinc or spline. Default is trilinear.`}
                            fullWidth
                        >
                            <TextField
                            select
                            label="Interpolation"
                            fullWidth margin="normal" variant="outlined"
                            className={classes.textField} onChange={onChange}
                            name="longitudinal.interpolation"
                            value={configuration.getIn("longitudinal.interpolation".split("."))}
                            helperText=''
                            >
                            <MenuItem value={"trilinear"}>Trilinear</MenuItem>
                            <MenuItem value={"nearestneighbour"}>Nearest Neighbour</MenuItem>
                            <MenuItem value={"sinc"}>Sinc</MenuItem>
                            <MenuItem value={"spline"}>BSpline</MenuItem>
                            </TextField>
                        </Help>
                    </FormGroup>

                    <FormGroup row>
                        <Help
                            type="pipeline"
                            regex={/^longitudinal_template_cost/}
                            help={`FLIRT cost function for longitudinal template creation. Options: corratio, mutualinfo, normmi, normcorr, leastsq, bbr or labeldiff. Default is corratio.`}
                            fullWidth
                        >
                            <TextField
                            select
                            label="Cost Function"
                            fullWidth margin="normal" variant="outlined"
                            className={classes.textField} onChange={onChange}
                            name="longitudinal.cost_function"
                            value={configuration.getIn("longitudinal.cost_function".split("."))}
                            helperText=''
                            >
                            <MenuItem value={"corratio"}>Correlation Ratio (corratio)</MenuItem>
                            <MenuItem value={"mutualinfo"}>Mutual Information (mutualinfo)</MenuItem>
                            <MenuItem value={"normmi"}>Normalized Mutual Information (normmi)</MenuItem>
                            <MenuItem value={"normcorr"}>Normalized Correlation (normcorr)</MenuItem>
                            <MenuItem value={"leastsq"}>Least Squares (leastsq)</MenuItem>
                            <MenuItem value={"bbr"}>Boundary-Based Registration (bbr)</MenuItem>
                            <MenuItem value={"labeldiff"}>labeldiff</MenuItem>
                            </TextField>
                        </Help>
                    </FormGroup>
                </FormControl>
            </React.Fragment>
        )
    
    }

}

const mapStateToProps = (state, props) => {
    return {
        advanced: state.main.getIn(['config', 'settings', 'advanced']),
    }
}

export default connect(mapStateToProps)(withStyles(TemplateCreation.styles)(TemplateCreation));