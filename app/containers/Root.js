import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: teal[200] },
    secondary: { main: teal[600] }
  }
});

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={this.props.history}>
            <Routes store={this.props.store} history={this.props.history} />
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
