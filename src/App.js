import React, { Component } from "react";
import CreateFlagPage from "./pages/CreateFlagPage.js";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AdminPage from "./pages/AdminPage.js";
import CreatePostPage from "./pages/CreatePostPage.js";
import MainPage from "./pages/MainPage.js";
import ProfilePage from "./pages/ProfilePage";
import getUser from "./components/getUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      mayRender: false,
    };

    this.reloadApp = this.reloadApp.bind(this);
  }
  componentDidMount() {
    getUser().then((user) => this.setState({ user: user, mayRender: true }));
  }

  handleUser = (usr) => {
    this.setState({ user: usr });
    this.forceUpdate();
    console.log(usr);
  };

  reloadApp() {
    this.forceReload();
  }

  render() {
    return (
      <div className="App">
        {this.state.mayRender && (
          <BrowserRouter>
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loginRequired={true}
                user={this.state.user}
                reloadApp={this.reloadApp}
              >
                <MainPage />
              </ProtectedRoute>

              <ProtectedRoute
                path="/create-post"
                loginRequired={true}
                user={this.state.user}
                reloadApp={this.reloadApp}
              >
                <CreatePostPage />
              </ProtectedRoute>

              <ProtectedRoute
                path="/admin-page"
                loginRequired={true}
                adminRequired={true}
                user={this.state.user}
                reloadApp={this.reloadApp}
              >
                <AdminPage />
              </ProtectedRoute>

              <ProtectedRoute
                path="/profile-page"
                loginRequired={true}
                user={this.state.user}
                reloadApp={this.reloadApp}
              >
                <ProfilePage />
              </ProtectedRoute>

              <ProtectedRoute
                path="/create-flag"
                loginRequired={true}
                user={this.state.user}
                reloadApp={this.reloadApp}
              >
                <CreateFlagPage />
              </ProtectedRoute>

              <ProtectedRoute
                path="/login"
                loginRequired={false}
                user={this.state.user}
              >
                <LoginPage handleUser={this.handleUser} />
              </ProtectedRoute>

              <ProtectedRoute
                path="/register"
                loginRequired={false}
                user={this.state.user}
              >
                <RegisterPage handleUser={this.handleUser} />
              </ProtectedRoute>

              {/* Alle uspesifiserte stier fører til redirect */}
              <ProtectedRoute
                path="*"
                loginRequired={false}
                user={this.state.user}
              >
                <Redirect to="/login" />
              </ProtectedRoute>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
