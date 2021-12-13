import React, { useEffect, useReducer } from 'react';
import { getIssues } from './apiServices/IssueApi';
import LoginPage from './pages/Login';
import { AppContext } from './contextReducer/Context';
import { initialState } from './contextReducer/InitialState';
import reducer from './contextReducer/Reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // get all issues
  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      
      <LoginPage />
    </AppContext.Provider>
  );
};

export default App;
