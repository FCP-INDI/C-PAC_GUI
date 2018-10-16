import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
