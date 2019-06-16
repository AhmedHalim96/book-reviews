import React, { Component } from "react";
import BookItem from "./bookItem";
import PropTypes from "prop-types";
import "./style.css";

class Books extends Component {
  state = {
    filterTerm: null,
    selectedView:
      localStorage["selectedView"] == "grid" || "list"
        ? localStorage["selectedView"]
        : "grid"
  };

  onChangeHandler = e => {
    this.setState({
      filterTerm: e.target.value
    });
  };

  changeViewHandler = (e, view) => {
    e.preventDefault();
    localStorage["selectedView"] = view;
    this.setState({
      selectedView: view
    });
  };

  render() {
    let { books } = this.props;
    if (this.state.filterTerm) {
      books = books.filter(book => {
        return book.name.toLowerCase().indexOf(this.state.filterTerm) !== -1;
      });
    }
    return (
      <div className="row">
        <div className="col-md-10 mx-auto mb-1 ">
          <a
            href=""
            className={
              this.state.selectedView == "list"
                ? "mr-2 text-dark __view"
                : "mr-2 text-white __view"
            }
            onClick={e => this.changeViewHandler(e, "list")}
          >
            <i className="fa fa-list fa-2x" />
          </a>
          <a
            href=""
            className={
              this.state.selectedView == "grid"
                ? " __view text-dark"
                : "text-white __view"
            }
            onClick={e => this.changeViewHandler(e, "grid")}
          >
            <i className="fa fa-th-large fa-2x " />
          </a>

          <input
            onChange={this.onChangeHandler}
            type="text"
            className="float-right filter-input px-2"
            placeholder="Filter by Name......"
          />
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
