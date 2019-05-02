import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    console.log("Dashvoard", this.props);
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
}
