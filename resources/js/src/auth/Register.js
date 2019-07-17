import React, { Component } from "react";
import { Link } from "react-router-dom";
import { validateEmail } from "../customFunctions";
import axios from "axios";

export default class Register extends Component {
  state = {
    error: { target: null, errorMessage: "" },
    submittable: false
  };

  // Refs
  _email;
  _name;
  _password;
  _confirmPassword;

  confirmPasswordHandler = e => {
    if (this._password.value !== this._confirmPassword.value) {
      if (this.state.errorMessage !== "Passwords don't Match") {
        this.setState({
          error: { target: "password", errorMessage: "Passwords don't Match" }
        });
      }
    } else {
      this.setState({
        error: { target: null, errorMessage: "" },
        submittable: true
      });
    }
  };

  handleRegister = e => {
    e.preventDefault();
    if (this._password.value !== this._confirmPassword.value) {
      this.setState({
        error: { target: "password", errorMessage: "Passwords don't Match" }
      });
    } else if (!validateEmail(this._email.value)) {
      this.setState({
        error: { target: "email", errorMessage: "Please Enter a Valid Email" }
      });
    } else {
      this.props.register(
        this._name.value,
        this._email.value,
        this._password.value,
        this.props.history
      );
    }
  };
  render() {
    const { error, submittable } = this.state;
    return (
      <div className="slide-left">
        <div className="card  bg-dark text-white">
          <h3 className="card-header">Register Form</h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <form
                  id="login-form"
                  action=""
                  onSubmit={this.handleRegister}
                  method="post"
                >
                  <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input
                      ref={input => (this._name = input)}
                      id="name-input"
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input
                      ref={input => (this._email = input)}
                      id="email-input"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="email"
                      required
                    />
                    <p className="text-danger">
                      {error.target === "email" ? error.errorMessage : ""}
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <input
                      ref={input => (this._password = input)}
                      id="password-input"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="password"
                      pattern=".{8,12}"
                      required
                      title="8 to 12 characters"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      ref={input => (this._confirmPassword = input)}
                      name="confirm-password"
                      type="password"
                      onChange={this.confirmPasswordHandler}
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                    <p className="text-danger">
                      {error.target === "password" ? error.errorMessage : ""}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-success"
                    disabled={!submittable}
                    id="email-login-btn"
                  >
                    Register
                  </button>
                  <p className="lead float-right">
                    Already Registered?
                    <Link to="/login"> Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
