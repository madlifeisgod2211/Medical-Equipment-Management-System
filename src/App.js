import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import Auth from './views/Auth';
import Dashboard from './views/dashboardPage/Dashboard';
import UsersPage from './views/usersPage/UsersPage';
import ProtectedRoute from './components/routing/ProtectRoute';
import Landing from './components/layout/Landing';
import ItemContextProvider from './contexts/ItemContext';
import ParameterContextProvider from './contexts/ParameterContext';
import SmartBagPage from './views/smartBagPage/SmartBagPage';
import CabinetPage from './views/cabinetPage/CabinetPage';
import SettingPage from './views/settings/SettingPage';
import HistoryPage from './views/historyPage/HistoryPage';
import TestPage from './views/testPage/TestPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserDeviceContextProvider from './contexts/UserDeviceContext';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['"Source Sans Pro"'].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <ItemContextProvider>
          <UserDeviceContextProvider>
            <ParameterContextProvider>
              <Router>
                <Switch>
                  <Route exact path='/' component={Landing} />
                  <Route
                    exact
                    path='/login'
                    render={props => <Auth {...props} authRoute='login' />}
                  />
                  <Route
                    exact
                    path='/register'
                    render={props => <Auth {...props} authRoute='register' />}
                  />
                  <ProtectedRoute
                    exact
                    path='/dashboard'
                    component={Dashboard}
                  />
                  {/* <ProtectedRoute exact path='/smartBag' component={SmartBagPage} /> */}
                  <ProtectedRoute
                    exact
                    path='/smartBagTest'
                    component={TestPage}
                  />
                  <ProtectedRoute
                    exact
                    path='/cabinet'
                    component={CabinetPage}
                  />
                  <ProtectedRoute
                    exact
                    path='/settings'
                    component={SettingPage}
                  />
                  <ProtectedRoute exact path='/users' component={UsersPage} />
                  <ProtectedRoute
                    exact
                    path='/history'
                    component={HistoryPage}
                  />
                </Switch>
              </Router>
            </ParameterContextProvider>
          </UserDeviceContextProvider>
        </ItemContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
