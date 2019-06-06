import React, { Component } from "react";
import BookItem from "./bookItem";
import PropTypes from "prop-types";
import "./style.css";

class Books extends Component {
  state = {
    selectedView:
      localStorage["selectedView"] == "grid" || "list"
        ? localStorage["selectedView"]
        : "grid"
  };

  changeViewHandler = (e, view) => {
    e.preventDefault();
    localStorage["selectedView"] = view;
    this.setState({
      selectedView: view
    });
  };

  render() {
    const { books } = this.props;

    return (
      <div className="row">
        <div className="col-md-10 mx-auto mb-1 ">
          <a
            href=""
            className={
              this.state.selectedView == "list"
                ? "float-right text-dark __view"
                : "float-right text-white __view"
            }
            onClick={e => this.changeViewHandler(e, "list")}
          >
            <i className="fa fa-list fa-2x" />
          </a>
          <a
            href=""
            className={
              this.state.selectedView == "grid"
                ? "mr-2 float-right  __view text-dark"
                : "mr-2 float-right text-white __view"
            }
            onClick={e => this.changeViewHandler(e, "grid")}
          >
            <i className="fa fa-th-large fa-2x " />
          </a>
        </div>
        <div
          className={`row ${this.state.selectedView == "grid" ? "ml-5" : null}`}
        >
          {books.map(book => (
            <BookItem
              book={book}
              key={book.id}
              viewType={this.state.selectedView}
            />
          ))}
        </div>
      </div>
    );
  }
}

Books.protoTypes = {
  books: PropTypes.array.isRequired
};

export default Books;
