// from https://github.com/mui-org/material-ui/blob/dbd64d603fcc23e4d85198decc42afff4be58aa2/packages/material-ui-icons/src/utils/createSvgIcon.js

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '@material-ui/core/SvgIcon';

function createSvgIcon(path, displayName) {
  let Icon = props => (
    <SvgIcon {...props}>
      {path}
    </SvgIcon>
  );

  Icon.displayName = displayName;
  Icon = pure(Icon);
  Icon.muiName = 'SvgIcon';

  return Icon;
};

export default createSvgIcon;
