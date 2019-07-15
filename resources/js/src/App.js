// Dependencies
import React, { Component, Fragment } from "react";
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
import Spinner from "./components/layout/Spinner";
import Routes from "./Routes";

class App extends Component {
  componentDidMount = () => {
    this.props.getBooks().then(() => this.props.getUser());
  };

  render() {
    if (this.props.isReady) {
      const { isLoggedIn, user, books, registerUser, loginUser } = this.props;
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
                  <Routes
                    books={books}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    registerUser={registerUser}
                    loginUser={loginUser}
                  />
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
    return (
      <div className="bg-secondary">
        <Spinner />
      </div>
    );
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
