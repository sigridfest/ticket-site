import React, { Component, Fragment } from "react";
import { Redirect, Route } from "react-router-dom";

/*
 * Denne komponeneten sjekker om brukeren er pålogget ved å hente
 * dens token fra sessionStorage.
 * Det settes opp en Route-komponent.
 * Er brukeren innlogget, vil de ønskede komponentene vises. Om ikke
 * sendes brukeren til /login.
 * /login og /register kan kun nås dersom brukeren er avlogget, og en
 * pålogget bruker vil sendes til rotsiden /
 *
 * props (exact, path, loginRequired)
 */
export class ProtectedRoute extends Component {
  isLoggedIn() {
    if (this.props.user) {
      return true
    }
    return false
  }

  getComponents(loginRequired, adminRequired, children) {
    if (loginRequired) {
      if (this.isLoggedIn()){
        if (adminRequired) {
          if (this.props.user.is_admin) {
            return React.cloneElement(children, {user: this.props.user});
          }
          else{
            return <Redirect to="/" />
          }
        }
        return React.cloneElement(children, {user: this.props.user});
      } 
      else return <Redirect to="/login" />;
    } else {
      if (this.isLoggedIn()) return <Redirect to="/" />;
      else return children;
    }
  }

  render() {
    // Destrukturerer props i loginRequired, barnekomponenetene og ...rest som gir de resterende props
    const { loginRequired, adminRequired, children, ...rest } = this.props;

    return (
      <Fragment>
        <Route {...rest}>{this.getComponents(loginRequired, adminRequired, children)}</Route>
      </Fragment>
    );
  }
}

export default ProtectedRoute;
