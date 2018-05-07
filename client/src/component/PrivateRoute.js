import React, {Component} from 'react';
import {Redirect,Route} from 'react-router-dom';
function PrivateRoute ({component: Component, isLoggedIn, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/admin', state: {from: props.location}}} />}
    />
  )
}
export default PrivateRoute;