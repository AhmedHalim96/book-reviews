import React, { Component } from "react";
import BookItem from "./bookItem";
import PropTypes from "prop-types";
import "./style.css";
import { filterText } from "../customFunctions";

class Books extends Component {
  state = {
    filterBy: "Title",
    filterTerm: null,
    selectedView:
      localStorage["selectedView"] == "grid" ||
      localStorage["selectedView"] == "list"
        ? localStorage["selectedView"]
        : "grid"
  };

  changeFilterTermHandler = e => {
    this.setState({
      filterTerm: e.target.value.toLowerCase()
    });
  };
  changeFilteByHandler = e => {
    this.setState({
      filterBy: e.target.value
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
      let filterBy;
      switch (this.state.filterBy) {
        case "Title":
          filterBy = "name";
          break;
        case "Author":
          filterBy = "book_author";
          break;
        case "Reviewer":
          filterBy = "review_author";
          break;
        default:
          break;
      }
      books = books.filter(book => {
        return (
          filterText(book[filterBy]).indexOf(
            filterText(this.state.filterTerm)
          ) !== -1
        );
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

          <div className="d-inline float-right">
            <label htmlFor="filterBy" className="text-white">
              Filter By:
            </label>
            <select
              className="filter-select mx-2"
              onChange={this.changeFilteByHandler}
              id="filterBy"
            >
              <option>Title</option>
              <option>Author</option>
              <option>Reviewer</option>
            </select>
            <input
              onChange={this.changeFilterTermHandler}
              type="text"
              className="filter-input px-2"
              placeholder={`Filter by ${this.state.filterBy
                .charAt(0)
                .toUpperCase() + this.state.filterBy.slice(1)}......`}
            />
          </div>
        </div>
        <div
          className={`row col-md-12 ${
            this.state.selectedView == "grid" ? "ml-5" : null
          }`}
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
