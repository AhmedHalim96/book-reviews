import React, { Component } from "react";
import { Link } from "react-router-dom";
import { validateEmail } from "../utilities";
import { setUser } from "../actions/userActions";
import { connect } from "react-redux";
import Modal from "../components/layout/Modal/Modal";
import axios from "axios";

class Register extends Component {
  state = {
    userData: {},
    error: { target: null, errorMessage: "" },
    showModal: false,
    modalMessage: "",
    sendingRequest: false,
    registered: false,
    pageAnimation: "slide-left"
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

  closeModalHandler = () => {
    this.setState({ showModal: false });
    if (this.state.registered) {
      this.setState({
        pageAnimation: "slide-right"
      });
      setTimeout(() => {
        this.props.setUser(this.state.userData);
      }, 300);
    } else {
      this.setState({ sendingRequest: false });
    }
  };

  registerUser = () => {
    this.setState({ sendingRequest: true });
    var formData = new FormData();
    formData.append("password", this._password.value);
    formData.append("email", this._email.value);
    formData.append("name", this._name.value);

    axios
      .post("/api/user/register", formData)

      .then(res => {
        if (res.data.success) {
          let userData = {
            name: res.data.data.name,
            id: res.data.data.id,
            email: res.data.data.email,
            auth_token: res.data.data.auth_token,
            timestamp: new Date().toString()
          };

          this.setState({
            showModal: true,
            modalMessage: "Congratulation You're now a User",
            registered: true,
            userData: userData
          });
        } else {
          this.setState({
            showModal: true,
            modalMessage: `Registration Failed!, ${res.data.msg}`
          });
        }
      })
      .catch(error => {
        this.setState({
          showModal: true,
          modalMessage: `Registration Failed!, ${res.data.msg}`
        });
        console.log(`${formData} ${error}`);
      });
  };

  validateForm = e => {
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
      this.registerUser();
    }
  };
  render() {
    const { error, pageAnimation, sendingRequest } = this.state;
    return (
      <div className={pageAnimation}>
        <div className="card  bg-dark text-white">
          <h3 className="card-header">Register Form</h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <form
                  id="login-form"
                  action=""
                  onSubmit={this.validateForm}
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
                    id="email-login-btn"
                    disabled={sendingRequest}
                  >
                    {sendingRequest ? (
                      <span>
                        <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
                        <span className="sr-only">Loading...</span>
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>
                  <p className="lead float-right">
                    Already Registered?
                    <Link to="/login"> Login</Link>
                  </p>
                </form>
                <Modal
                  show={this.state.showModal}
                  close={this.closeModalHandler}
                >
                  <p className="lead text-dark">{this.state.modalMessage}</p>
                  <button
                    className="btn btn-dark mx-auto"
                    onClick={this.closeModalHandler}
                  >
                    OK
                  </button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Register);
