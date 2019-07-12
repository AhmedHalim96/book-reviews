import React, { Component, Fragment } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  state = {
    searchTerm: null
  };

  onSearchTermChange = e => this.setState({ searchTerm: e.target.value });
  submitSearchHandler = () => {
    this.props.history.push(`/search/${this.state.searchTerm}/1`);
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <i className="fas fa-book" /> Book Reviews
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="form-inline d-inline nav-item  my-auto">
                <div className="form-group">
                  <input
                    type="text"
                    className="search-input text-white bg-dark"
                    placeholder="Search....."
                    onChange={this.onSearchTermChange}
                    onKeyPress={e =>
                      e.key == "Enter" ? this.submitSearchHandler() : null
                    }
                  />
                  <i
                    className="fa fa-search bg-white"
                    onClick={this.submitSearchHandler}
                  />
                </div>
              </li>
              {this.props.isLoggedIn ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="dropdown01"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user-circle fa-lg" />{" "}
                    {this.props.user.name}
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown01"
                    style={{ zIndex: "1500" }}
                  >
                    {this.props.user.role == "Admin" ? (
                      <Link className="dropdown-item" to="/admin-panel">
                        <i className="fas fa-users-cog" /> Admin Panel
                      </Link>
                    ) : null}
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="fa fa-columns" /> Dashboard
                    </Link>
                    {this.props.user.role == "Admin" ||
                    this.props.user.role == "Editor" ? (
                      <Link className="dropdown-item" to="/book/create">
                        <i className="fa fa-plus" /> Create a Review
                      </Link>
                    ) : null}

                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={this.props.logout}
                    >
                      <i className="fas fa-sign-out-alt" /> Logout
                    </Link>
                  </div>
                </li>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item disabled">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </Fragment>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  ABOUT US
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
