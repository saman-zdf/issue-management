const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISSUES': {
      return {
        ...state,
        issues: action.data,
      };
    }
    case 'LOGIN_INFO': {
      return {
        ...state,
        currentUser: action.data,
      };
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        currentUser: false,
        error: true,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        currentUser: null,
      };
    }
    case 'INCREASE_COUNTER': {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    default:
      return state;
  }
};

export default reducer;
