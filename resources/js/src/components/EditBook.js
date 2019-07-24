import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { getBook, updateBook } from "../actions/singleBookActions";
import Spinner from "./layout/Spinner";
import CKEditor from "ckeditor4-react";

class EditBook extends Component {
  state = {
    currentBook: null,
    imgPrev: null,
    animation: "slide-left"
  };

  componentDidMount() {
    this.props.getBook(this.props.match.params.id).then(() => {
      if (
        this.props.userId == this.props.book.user_id ||
        this.props.userRole == "Admin"
      ) {
        this.setState({
          currentBook: this.props.book
        });
      } else {
        this.props.history.push("/");
      }
    });
  }

  handleChange = event => {
    if (event.target.files) {
      this.setState({
        currentBook: {
          ...this.state.currentBook,
          [event.target.name]: event.target.files[0]
        },
        imgPrev: URL.createObjectURL(event.target.files[0])
      });
    } else {
      this.setState({
        currentBook: {
          ...this.state.currentBook,
          [event.target.name]: event.target.value
        }
      });
    }
  };
  editorChangeHandler = e => {
    this.setState({
      currentBook: {
        ...this.state.currentBook,
        review_text: e.editor.getData()
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.updateBook(this.state.currentBook, this.props.userId);
    this.setState({
      animation: "slide-right"
    });
    setTimeout(() => {
      this.props.history.push("/book/" + this.state.currentBook.id);
    }, 300);
  };
  render() {
    if (
      (this.props.isLoaded && this.props.userId == this.props.book.user_id) ||
      this.props.userRole == "Admin"
    ) {
      const {
        name,
        review_text,
        book_author,
        book_score,
        featured_image
      } = this.props.book;
      return (
        <div className={this.state.animation}>
          <Helmet>
            <title>{`Editing ${name} Review - Book Reviews`}</title>
          </Helmet>
          <div className="card card-body card-dark bg-dark text-white">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label>Book Title*:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  defaultValue={name}
                  onChange={this.handleChange}
                  required
                />
                re
              </div>
              <div className="form-group">
                <label>Book Author*:</label>
                <input
                  type="text"
                  className="form-control"
                  name="book_author"
                  defaultValue={book_author}
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
                  defaultValue={book_score}
                  onChange={this.handleChange}
                  required
                  placeholder="Rating out of 5"
                />
              </div>
              <div className="form-group">
                <label>Book Review*:</label>
                <CKEditor
                  data={review_text}
                  onChange={this.editorChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="img-prev d-block">Image Preview:</label>
                <br />
                <img
                  src={
                    this.state.imgPrev
                      ? this.state.imgPrev
                      : `/storage/featured_images/${featured_image}`
                  }
                  className="img-thumbnail img-fluid w-25 h-25 "
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Change Featured Image:</label>
                <input
                  type="file"
                  className="form-control-file"
                  name="featured_image"
                  id="image"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success btn-block">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  book: state.bookPage.book,
  isLoaded: state.bookPage.isLoaded
});

export default connect(
  mapStateToProps,
  { getBook, updateBook }
)(EditBook);
