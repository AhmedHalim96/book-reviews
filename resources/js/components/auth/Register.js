import React from "react";
import { Link, withRouter } from "react-router-dom";

const Register = props => {
  let _email, _password, _name;

  const handleLogin = e => {
    e.preventDefault();
    props.register(_name.value, _email.value, _password.value, props.history);
  };

  return (
    <div id="main">
      <div className="card  bg-dark text-white">
        <h3 className="card-header">Register Form</h3>
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
                  <label htmlFor="name">Name*</label>
                  <input
                    ref={input => (_name = input)}
                    id="name-input"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
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
                  <label htmlFor="password">Password*</label>
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
};

export default withRouter(Register);
