import React, { useState, useEffect } from 'react';
import {Redirect, useHistory} from 'react-router'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import AddAssignment from '../components/AddAssignment';
import AssignmentsList from '../components/AssignmentsList';
import EditAssignment from '../components/EditAssignment';
import AssignmentSpecific from '../components/AssignmentSpecific';
import Login from '../components/login';
import Register from '../components/register';
import Error403 from '../error/Error403';
import Error400Login from '../error/Error400Login';
import Error400Register from '../error/Error400Register';
import axios from "axios";
import {CookiesProvider, useCookies} from 'react-cookie';


const AppRouter = () => {
  const [assignments, setAssignments] = useState([]);
  const [token] = useCookies(['mytoken']);
  const history = useHistory();
  useEffect(() => {
    if(token['mytoken']){
    axios({
      method: 'get',
      url: 'http://localhost:8000/viewset/assignments/',
      headers:{
        'Content-Type':'application/json',
        Authorization: `Token ${token['mytoken']}`
      }}).then((assignment) => {setAssignments(assignment.data)}
      )    
    }
  }, [setAssignments]);
  return (
    <CookiesProvider>
    <BrowserRouter>
      <div>
        <div className="main-content">
          <Header />
          <Switch>
            <Route
              render={(props) => (
                <AssignmentsList {...props} assignments={assignments} setAssignments={setAssignments} />
              )}
              path="/"
              exact={true}
            />
            <Route
              render={(props) => (
                <Login {...props} />
              )}
              path="/login"
            />
            <Route
              render={(props) => (
                <Register {...props} />
              )}
              path="/register"
            />
            <Route
              render={(props) => (
                <Error403 {...props} />
              )}
              path="/error403"
            />
            <Route
              render={(props) => (
                <Error400Register {...props} />
              )}
              path="/registererr"
            />
            <Route
              render={(props) => (
                <Error400Login {...props} />
              )}
              path="/loginerr"
            />
            <Route
              render={(props) => (
                <AddAssignment {...props} assignments={assignments} setAssignments={setAssignments} />
              )}
              path="/add"
            />
            <Route
              render={(props) => (
                <EditAssignment {...props} assignments={assignments} setAssignments={setAssignments} />
              )}
              path="/edit/:id"
            />
            <Route
              render={(props) => (
                <AssignmentSpecific {...props} assignments={assignments} setAssignments={setAssignments} />
              )}
              path="/specific/:id"
            />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    </CookiesProvider>
  );
};

export default AppRouter;
