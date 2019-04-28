// Dependencies
import React, { Component, Fragment } from "react";
import $ from "jquery";
import axios from "axios";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getFavouriteList, appReady, resetUser } from "./actions/userActions";

// LAYOUT COMPONENTS
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

// BOOK COMPONENTS
import Books from "./components/Books";
import BookPage from "./components/BookPage";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";

// AUTH COMPONENTS
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import PageNotFound from "./components/layout/PageNotFound";
import Spinner from "./components/layout/Spinner";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {}
  };
  componentDidMount = () => {
    let state = localStorage["appState"];
    let AppState;
    if (state) {
      AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
      this.props.getFavouriteList(AppState.user.id);
    } else {
      this.props.appReady();
    }
  };

  _loginUser = (email, password) => {
    console.log("_logUser");
    $("#login-form button")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("/api/user/login", formData)
      .then(response => {
        console.log(response.data);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert("Login Success!");

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
          this.props.getFavouriteList(appState.user.id);
          this.props.history.push("/");
        } else alert("Login Failed!");

        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      });
  };

  _registerUser = (name, email, password) => {
    $("#email-login-btn")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );

    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);

    axios
      .post("/api/user/register", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert(`Registration Successful!`);

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
          this.props.history.push("/");
        } else {
          alert(`Registration Failed!`);
          $("#email-login-btn")
            .removeAttr("disabled")
            .html("Register");
        }
      })
      .catch(error => {
        alert("An Error Occured!" + error);
        console.log(`${formData} ${error}`);
        $("#email-login-btn")
          .removeAttr("disabled")
          .html("Register");
      });
  };

  _logoutUser = () => {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    this.props.resetUser();
    // save app state with user date in local storage
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
  };

  render() {
    if (this.props.isReady) {
      const { isLoggedIn, user } = this.state;
      const { favouriteBooks } = this.props;
      console.log(this.props);

      return (
        <div className="bg-secondary">
          <Navbar
            username={user.name}
            isLoggedIn={isLoggedIn}
            logout={this._logoutUser}
          />
          <div className="container-fluid pt-3">
            <div className="row">
              <div className="col-md-9">
                {isLoggedIn ? (
                  <Switch>
                    <Route
                      path="/dashboard"
                      render={props => (
                        <Dashboard {...props} favouriteBooks={favouriteBooks} />
                      )}
                    />
                    <Route
                      path="/book/:id/edit"
                      component={withRouter(EditBook)}
                    />
                    <Route
                      path="/book/create"
                      component={withRouter(CreateBook)}
                    />
                    <Route
                      path="/book/:id"
                      render={props => (
                        <BookPage
                          {...props}
                          isLoggedIn={isLoggedIn}
                          user={user}
                          favouriteBooks={favouriteBooks}
                        />
                      )}
                    />

                    <Route exact path="/" component={withRouter(Books)} />
                    <Route path="/about" component={About} />

                    <Route component={PageNotFound} />
                  </Switch>
                ) : (
                  <Switch>
                    <Route
                      path="/login"
                      render={props => (
                        <Login {...props} login={this._loginUser} />
                      )}
                    />
                    <Route
                      path="/register"
                      render={props => (
                        <Register {...props} register={this._registerUser} />
                      )}
                    />

                    <Route
                      path="/book/:id"
                      render={props => (
                        <BookPage {...props} isLoggedIn={isLoggedIn} />
                      )}
                    />

                    <Route exact path="/" component={withRouter(Books)} />

                    <Route path="/about" component={About} />

                    <Route component={PageNotFound} />
                  </Switch>
                )}
              </div>
              <div className="col-md-3 d-none d-md-block">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  isReady: state.user.isReady,
  favouriteBooks: state.user.favouriteBooks
});

export default connect(
  mapStateToProps,
  { getFavouriteList, appReady, resetUser }
)(App);
