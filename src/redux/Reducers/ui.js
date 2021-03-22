import { SET_LOADING, EXIT_APP } from '../Actions/ui';

const initialState = {
  loading: false,
  exitApp: false,
};

export default (state = initialState, action) => {
  const matches = /\w+_(REQUEST|FAIL|SUCCESS)/.exec(action.type);
  if (!matches) {
    switch (action.type) {
      case SET_LOADING:
        return { ...state, loading: action.loading };
      case EXIT_APP:
        return {
          ...state,
          exitApp: action.exit,
        };
      default:
        return state;
    }
  }
  const [, requestType] = matches;

  switch (requestType) {
    case 'REQUEST':
      return { ...state, loading: true };

    case 'FAIL':
    case 'SUCCESS':
      return { ...state, loading: false };

    default:
      return state;
  }
};
