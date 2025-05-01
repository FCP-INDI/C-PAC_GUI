import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return <Component {...props} params={params} location={location} navigate={navigate} />;
  };
};

export default withRouter;
