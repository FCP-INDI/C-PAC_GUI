import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga';

import App from './containers/App';
import HomePage from './containers/HomePage';
// import EnvironmentsPage from './containers/EnvironmentsPage';
import PipelinePage from './containers/PipelinePage';
import DatasetPage from './containers/DatasetPage';

if (process.env.NODE_ENV === 'production') {
  const GACode = 'UA-19224662-10';
  ReactGA.initialize(GACode, {
    debug: process.env.NODE_ENV !== 'production',
  });
  ReactGA.set({ aip: 1 });
}

const RouterPage = () => {

  return (
    <App>
      <Routes>
        {/* <Route exact={true} path="/projects/:project/subjects" element={ProjectSubjectsPage} />
        <Route exact={true} path="/projects/:project/pipelines/:pipeline" element={ProjectPipelinePage} />
        <Route exact={true} path="/projects/:project/pipelines" element={ProjectPipelinesPage} />
        <Route exact={true} path="/projects/:project/runs" element={ProjectRunsPage} />
        <Route exact={true} path="/projects/:project" element={ProjectPage} />
        <Route exact={true} path="/projects" element={ProjectsPage} />
        <Route exact={true} path="/environments" element={EnvironmentsPage} /> */}
        <Route exact={true} path="/pipelines/:pipeline" element={<PipelinePage />} />
        {/* <Route exact={true} path="/datasets/:dataset" element={<DatasetPage />} /> */}
        {/* <Route exact={true} path="/pipelines" element={<PipelinesPage />} /> */}
        <Route exact={true} path="/" element={<HomePage />} />
      </Routes>
    </App>
  );
};

export default RouterPage;
