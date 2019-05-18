// Dependencies
import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getFavouriteList,
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

class App extends Component {
  componentDidMount = () => {
    this.props.getBooks().then(() => this.props.getUser());
  };

  render() {
    if (this.props.isReady) {
      const { isLoggedIn, user, favouriteBooks, books } = this.props;
      console.log(user);

      return (
        <div className="bg-secondary">
          <Navbar
            user={user}
            isLoggedIn={isLoggedIn}
            logout={this.props.logoutUser}
          />
          <div className="container-fluid pt-3">
            <div className="row">
              <div className="col-md-9">
                {isLoggedIn ? (
                  <Switch>
                    {user.role == "Admin" ? (
                      <Route
                        path="/admin-panel"
                        render={props => <AdminPanel {...props} user={user} />}
                      />
                    ) : null}
                    <Route
                      path="/dashboard"
                      render={props => (
                        <Dashboard {...props} favouriteBooks={favouriteBooks} />
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
                          favouriteBooks={favouriteBooks}
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

                    <Route component={PageNotFound} />
                  </Switch>
                )}
              </div>
              <div className="col-md-3 d-none d-md-block">
                <Sidebar books={books} />
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
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn,
  favouriteBooks: state.user.favouriteBooks,
  books: state.books.books
});

export default connect(
  mapStateToProps,
  {
    getFavouriteList,
    appReady,
    resetUser,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    getBooks
  }
)(App);
