import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createBook } from "../actions/singleBookActions";
import CKEditor from "ckeditor4-react";
import Loading from "./layout/Loading";

class CreateBook extends Component {
  state = {
    newBook: {
      name: "",
      book_author: "",
      review_text: "",
      book_score: 0,
      featured_image: null,
      userId: null
    },
    animation: "slide-left",
    loading: false,
    imgPrev: null
  };

  handleChange = event => {
    if (event.target.files) {
      this.setState({
        newBook: {
          ...this.state.newBook,
          [event.target.name]: event.target.files[0]
        },
        imgPrev: URL.createObjectURL(event.target.files[0])
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

  editorChangeHandler = e => {
    this.setState({
      newBook: {
        ...this.state.newBook,
        review_text: e.editor.getData()
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const fileSize = this.state.newBook.featured_image.size;
    if (!(fileSize > 2086666)) {
      this.props.createBook(
        this.state.newBook,
        this.props.userId,
        this.props.history
      );
      this.setState({
        loading: true
      });
    } else {
      alert("File Too Big");
    }
  };
  render() {
    const { animation, loading, imgPrev } = this.state;
    return (
      <div className={animation + loading ? " overflow-hidden" : null}>
        <Helmet>
          <title>Create a Review - Book Reviews</title>
        </Helmet>
        {loading ? <Loading /> : null}

        <div className="card card-body card-dark bg-dark text-white">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Book Title*:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Book Author*:</label>
              <input
                type="text"
                className="form-control"
                name="book_author"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Book Rating*:</label>
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
              <label>Book Review*:</label>

              <CKEditor data="" onChange={this.editorChangeHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="img-prev d-block">Image Preview:</label>
              <br />
              <img
                src={imgPrev}
                className={`img-thumbnail img-fluid w-25 h-25 ${
                  this.state.imgPrev ? "" : "d-none"
                }`}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Featured Image:</label>
              <input
                type="file"
                className="form-control-file"
                name="featured_image"
                id="image"
                onChange={this.handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-25 mx-auto btn-block py-3 "
            >
              <strong>Submit Review</strong>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { createBook }
)(CreateBook);
