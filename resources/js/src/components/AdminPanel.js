import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { getUsers, assignUserRole } from "../actions/adminPanelActions";
import Spinner from "./layout/Spinner";
import Modal from "./layout/Modal/Modal";
import "./style.css";

class AdminPanel extends Component {
  state = {
    modalMessage: null,
    showModal: false
  };

  componentDidMount() {
    const { token, id } = this.props.user;
    this.props.getUsers(token, id);
  }

  onChangeHandler = (e, targetedUser) => {
    const role = e.target.value;
    const { token, id } = this.props.user;
    this.props.assignUserRole(token, id, targetedUser.id, role).then(() => {
      this.setState({
        showModal: true,
        modalMessage: `${targetedUser.name} is now ${
          role == "Subscriber" ? "a" : "an"
        } ${role.toLowerCase()}`
      });
    });
  };

  render() {
    if (this.props.isLoaded) {
      return (
        <React.Fragment>
          <Helmet>
            <title>Admin Panel - Book Reviews</title>
          </Helmet>
          <div className="card card-body">
            <h1 className="text-primary text-center w-100 mb-3">Admin Panel</h1>
            <div className="row">
              <div className="col-md-10 mx-auto">
                <table className="table border border-light">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Name</th>
                      <th scope="col" className="d-none d-lg-table-cell">
                        Email
                      </th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.map(user => {
                      if (user.id != this.props.user.id) {
                        return (
                          <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td className="d-none d-lg-table-cell">
                              {user.email}
                            </td>

                            <td>
                              <select
                                onChange={e => this.onChangeHandler(e, user)}
                                defaultValue={user.role}
                              >
                                <option>Admin</option>
                                <option>Editor</option>
                                <option>Subscriber</option>
                              </select>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <Modal
              show={this.state.showModal}
              close={() => this.setState({ showModal: false })}
            >
              <p className="lead">{this.state.modalMessage}</p>
              <button
                className="btn btn-dark mx-auto"
                onClick={() => this.setState({ showModal: false })}
              >
                OK
              </button>
            </Modal>
          </div>
        </React.Fragment>
      );
    }
    return <Spinner />;
  }
}
const mapStateToProps = state => ({
  users: state.adminPanel.users,
  isLoaded: state.adminPanel.isLoaded
});

export default connect(
  mapStateToProps,
  { getUsers, assignUserRole }
)(AdminPanel);
