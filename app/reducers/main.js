// @flow
import { CONFIG_LOADED, ENVIRONMENT_CHECKED, ENVIRONMENT_SELECT } from '../actions/main';

// export type cpacStateType = ?{
//   config: ?{}
// };

type actionType = {
  +type: string
};

export default function main(state, action) {
  if (!state) {
    return {}
  }

  switch (action.type) {
    case CONFIG_LOADED:
      return { ...state, config: action.config };
    case ENVIRONMENT_CHECKED:
      return { ...state, config: { ...state.config, environments: { ...state.config.environments, ...action.environment }  } };
    case ENVIRONMENT_SELECT:
      if (state.config.environments[action.environment]) {
        return { ...state, environment: state.config.environments[action.environment] };
      } else {
        return { ...state, environment: undefined };
      }
    default:
      return state;
  }
}
