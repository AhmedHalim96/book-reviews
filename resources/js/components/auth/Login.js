import React from "react";
import { Link } from "react-router-dom";

const Login = props => {
  let _email, _password;
  const handleLogin = e => {
    e.preventDefault();
    props.login(_email.value, _password.value);
  };
  return (
    <div id="main">
      <div className="card bg-dark text-white">
        <h3 className="card-header">Login Form</h3>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form
                id="login-form"
                action=""
                onSubmit={handleLogin}
                method="post"
              >
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    ref={input => (_email = input)}
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
                    ref={input => (_password = input)}
                    id="password-input"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-lg btn-success"
                  id="email-login-btn"
                >
                  Login
                </button>
                <p className="lead float-right">
                  New Member?
                  <Link to="/register"> Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
