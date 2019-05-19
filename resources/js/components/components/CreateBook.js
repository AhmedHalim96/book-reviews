import React, { Component } from "react";
import { connect } from "react-redux";
import { createBook } from "../actions/singleBookActions";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class CreateBook extends Component {
  state = {
    newBook: {
      name: "",
      book_author: "",
      review_text: "",
      book_score: 0,
      featured_image: null,
      userId: null
    }
  };

  handleChange = event => {
    if (event.target.files) {
      return this.setState({
        newBook: {
          ...this.state.newBook,
          [event.target.name]: event.target.files[0]
        }
      });
    } else {
      this.setState({
        newBook: {
          ...this.state.newBook,
          [event.target.name]: event.target.value
        }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createBook(
      this.state.newBook,
      this.props.userId,
      this.props.history
    );
  };
  render() {
    return (
      <div className="card card-body card-dark bg-dark text-white">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Book Title*</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Book Author*</label>
            <input
              type="text"
              className="form-control"
              name="book_author"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Book Rating*</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              name="book_score"
              onChange={this.handleChange}
              required
              placeholder="Rating out of 5"
            />
          </div>
          <div className="form-group">
            <label>Book Review*</label>

            <textarea
              className="form-control"
              rows="10"
              name="review_text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Featured Image</label>
            <input
              type="file"
              className="form-control-file"
              name="featured_image"
              id="image"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark btn-block">
            Submit Review
          </button>
        </form>
      </div>
    );
  }
}
export default connect(
  null,
  { createBook }
)(CreateBook);
