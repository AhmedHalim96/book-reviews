import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../actions/userActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../components/layout/Modal/Modal";

class Login extends Component {
  state = {
    userData: {},
    rememberMe: false,
    error: { target: null, errorMessage: "" },
    showModal: false,
    modalMessage: "",
    sendingRequest: false,
    loggedIn: false,
    pageAnimation: "slide-left"
  };
  _email;
  _password;
  _rememberMe;

  closeModalHandler = () => {
    this.setState({ showModal: false });
    if (this.state.loggedIn) {
      this.setState({
        pageAnimation: "slide-right"
      });
      setTimeout(() => {
        this.props.setUser(this.state.userData, this.state.rememberMe);
      }, 300);
    } else {
      this.setState({ sendingRequest: false });
    }
  };

  loginUser = e => {
    e.preventDefault();
    this.setState({ sendingRequest: true });
    var formData = new FormData();
    formData.append("email", this._email.value);
    formData.append("password", this._password.value);
    formData.append("rememberMe", this._rememberMe.checked);
    axios
      .post("/api/user/login", formData)
      .then(res => {
        if (res.data.success) {
          let userData = {
            name: res.data.data.name,
            id: res.data.data.id,
            email: res.data.data.email,
            token: res.data.data.token,
            timestamp: new Date().toString(),
            role: res.data.data.role
          };
          this.setState({
            showModal: true,
            modalMessage: "Login Success!",
            loggedIn: true,
            userData: userData,
            rememberMe: this._rememberMe.checked
          });
        } else {
          this.setState({
            showModal: true,
            modalMessage: `Login Failed! ${res.data.msg}`
          });
        }
      })
      .catch(error => {
        this.setState({
          showModal: true,
          modalMessage: `Login Failed!, ${error}`
        });
        console.log(`${formData} ${error}`);
      });
  };

  render() {
    const { error, pageAnimation, sendingRequest } = this.state;
    return (
      <div className={pageAnimation}>
        <div className="card bg-dark text-white">
          <h3 className="card-header">Login Form</h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <form
                  id="login-form"
                  action=""
                  onSubmit={this.loginUser}
                  method="post"
                >
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      ref={input => (this._email = input)}
                      id="email-input"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      ref={input => (this._password = input)}
                      id="password-input"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      ref={input => (this._rememberMe = input)}
                    />
                    <label className="form-check-label">Remember Me</label>
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
                      "Login"
                    )}
                  </button>
                  <p className="lead float-right">
                    New Member?
                    <Link to="/register"> Register</Link>
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
)(Login);
