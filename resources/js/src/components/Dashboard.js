import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFavouriteList } from "../actions/userActions";
import Spinner from "./layout/Spinner";

class Dashboard extends Component {
  state = {
    isLoaded: false
  };
  componentDidMount() {
    if (this.props.getFavouriteList(this.props.userId)) {
      this.setState({
        isLoaded: true
      });
    }
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="card card-body">
          <h1>Favourite Books</h1>
          <ul className="list-group">
            {this.props.favouriteBooks.map(book => {
              return (
                <li className="list-group-item" key={book.id}>
                  <Link to={`book/${book.id}`}>{book.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  favouriteBooks: state.user.favouriteBooks
});

export default connect(
  mapStateToProps,
  { getFavouriteList }
)(Dashboard);
