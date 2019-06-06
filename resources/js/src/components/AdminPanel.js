import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, assignUserRole } from "../actions/adminPanelActions";
import Spinner from "./layout/Spinner";
import Modal from "./layout/Modal/Modal";

class AdminPanel extends Component {
  state = {
    showModal: false,
    rolesArr: ["Admin", "Editor", "Subscriber"]
  };
  async componentDidMount() {
    const { token, id } = this.props.user;
    await this.props.getUsers(token, id);
    this.props.users.map(user => {
      if (user.id != id) {
        const checked = this.state.rolesArr.indexOf(user.role) + 1;
        return this.setState({
          [user.id]: checked
        });
      }
    });
  }

  onChangeHandler = (e, id) => {
    this.setState({ [id]: e.target.id });
  };

  submitHandler = targetedUserId => {
    const role = this.state.rolesArr[parseInt(this.state[targetedUserId]) - 1];
    const { token, id } = this.props.user;
    this.props.assignUserRole(token, id, targetedUserId, role).then(() => {
      this.setState({ showModal: true });
    });
  };

  render() {
    if (this.props.isLoaded) {
      return (
        <div className="card card-body">
          <h1 className="text-primary text-center w-100">Admin Panel</h1>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th scope="col">Editor</th>
                <th scope="col">Subscriber</th>
                <th scope="col">Assign</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user => {
                if (user.id != this.props.user.id) {
                  return (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>

                      <td>
                        <input
                          checked={this.state[user.id] == 1 ? true : false}
                          onChange={e => this.onChangeHandler(e, user.id)}
                          id={1}
                          type="checkbox"
                          className="form-control text-left"
                        />
                      </td>
                      <td>
                        <input
                          checked={this.state[user.id] == 2 ? true : false}
                          onChange={e => this.onChangeHandler(e, user.id)}
                          id={2}
                          type="checkbox"
                          className="form-control text-left"
                        />
                      </td>
                      <td>
                        <input
                          checked={this.state[user.id] == 3 ? true : false}
                          onChange={e => this.onChangeHandler(e, user.id)}
                          id={3}
                          type="checkbox"
                          className="form-control text-left"
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.submitHandler(user.id)}
                          className="btn btn-dark"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <Modal
            show={this.state.showModal}
            close={() => this.setState({ showModal: false })}
          >
            <p className="lead">Operation Succesful</p>
          </Modal>
        </div>
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
