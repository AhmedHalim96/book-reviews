import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Book Reviews
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
            {props.isLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-circle-user" />
                  {props.user.name}
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdown01"
                  style={{ zIndex: "1500" }}
                >
                  {props.user.role == "Admin" ? (
                    <Link className="dropdown-item" to="/admin-panel">
                      Admin Panel
                    </Link>
                  ) : null}
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                  {props.user.role != "Subscriber" ? (
                    <Link className="dropdown-item" to="/book/create">
                      Create a Review
                    </Link>
                  ) : null}

                  <Link className="dropdown-item" to="/" onClick={props.logout}>
                    Logout
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
                <li className="nav-item">
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
