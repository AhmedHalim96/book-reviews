// Dependencies
import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

// Redux
import {
  appReady,
  resetUser,
  getUser,
  loginUser,
  registerUser,
  logoutUser
} from "./actions/userActions";
import { getBooks } from "./actions/booksActions";

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
import AdminPanel from "./components/AdminPanel";
import Search from "./components/search/Search";

class App extends Component {
  componentDidMount = () => {
    this.props.getBooks().then(() => this.props.getUser());
  };

  render() {
    if (this.props.isReady) {
      const { isLoggedIn, user, books } = this.props;
      return (
        <Fragment>
          <Helmet>
            <title>Book Reviews</title>
          </Helmet>
          <div className="bg-secondary">
            <Navbar
              user={user}
              isLoggedIn={isLoggedIn}
              logout={this.props.logoutUser}
            />
            <div className="container-fluid pt-3 slide-left">
              <div className="row">
                <div className="col-lg-9">
                  {isLoggedIn ? (
                    <Switch>
                      {user.role == "Admin" ? (
                        <Route
                          path="/admin-panel"
                          render={props => (
                            <AdminPanel {...props} user={user} />
                          )}
                        />
                      ) : null}
                      <Route
                        path="/dashboard"
                        render={props => (
                          <Dashboard {...props} userId={user.id} />
                        )}
                      />

                      {user.role == "Admin" || user.role == "Editor" ? (
                        <Route
                          path="/book/:id/edit"
                          render={props => (
                            <EditBook
                              {...props}
                              userId={user.id}
                              userRole={user.role}
                            />
                          )}
                        />
                      ) : null}
                      {user.role == "Admin" || user.role == "Editor" ? (
                        <Route
                          path="/book/create"
                          render={props => (
                            <CreateBook {...props} userId={user.id} />
                          )}
                        />
                      ) : null}
                      <Route
                        path="/book/:id"
                        render={props => (
                          <BookPage
                            {...props}
                            isLoggedIn={isLoggedIn}
                            user={user}
                            books={books}
                          />
                        )}
                      />

                      <Route
                        exact
                        path="/"
                        render={props => <Books {...props} books={books} />}
                      />
                      <Route path="/about" component={About} />
                      <Route
                        path="/search/:q/:p?"
                        render={props => <Search {...props} books={books} />}
                      />

                      <Route component={PageNotFound} />
                    </Switch>
                  ) : (
                    <Switch>
                      <Route
                        path="/login"
                        render={props => (
                          <Login {...props} login={this.props.loginUser} />
                        )}
                      />
                      <Route
                        path="/register"
                        render={props => (
                          <Register
                            {...props}
                            register={this.props.registerUser}
                          />
                        )}
                      />

                      <Route
                        path="/book/:id"
                        render={props => (
                          <BookPage {...props} isLoggedIn={isLoggedIn} />
                        )}
                      />

                      <Route
                        exact
                        path="/"
                        render={props => <Books {...props} books={books} />}
                      />

                      <Route path="/about" component={About} />
                      <Route
                        path="/search/:q/:p?"
                        render={props => <Search {...props} books={books} />}
                      />
                      <Route component={PageNotFound} />
                    </Switch>
                  )}
                </div>
                <div className="col-lg-3 d-none d-lg-block">
                  <Sidebar books={books} />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  isReady: state.user.isReady,
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn,
  books: state.books.books
});

export default connect(
  mapStateToProps,
  {
    appReady,
    resetUser,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    getBooks
  }
)(App);
