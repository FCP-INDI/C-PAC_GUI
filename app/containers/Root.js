import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import RouterPage from '../routes';

const Root = ({ store }) => {

  return (
    <ReduxProvider store={store}>
      <HashRouter>
        <RouterPage />
      </HashRouter>
    </ReduxProvider>
  );
};

export default Root;
