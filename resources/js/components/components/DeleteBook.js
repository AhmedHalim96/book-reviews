import React, { Component } from "react";
import Axios from "axios";

export default class DeleteBook extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    Axios.delete("/books/" + this.props.id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <button
        type="submit"
        className="btn btn-danger btn-lg float-right"
        onClick={this.handleClick}
      >
        Delete Book
      </button>
    );
  }
}
