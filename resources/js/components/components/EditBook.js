import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { getBook, updateBook } from "../actions/singleBookActions";
import Spinner from "./layout/Spinner";

class EditBook extends Component {
  state = {
    currentBook: null
  };

  async componentDidMount() {
    console.log(this.props);
    await this.props.getBook(this.props.match.params.id);
    this.setState({
      currentBook: this.props.book
    });
  }

  handleChange = event => {
    if (event.target.files) {
      this.setState({
        currentBook: {
          ...this.state.currentBook,
          [event.target.name]: event.target.files[0]
        }
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

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.updateBook(this.state.currentBook);
    this.props.history.push("/book/" + this.state.currentBook.id);
  };
  render() {
    if (this.props.isLoaded) {
      const {
        name,
        review_text,
        book_author,
        book_score,
        featured_image
      } = this.props.book;
      return (
        <div className="card card-body card-dark bg-dark text-white">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Book Title*</label>
              <input
                type="text"
                className="form-control"
                name="name"
                defaultValue={name}
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
                defaultValue={book_author}
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
                defaultValue={book_score}
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
                defaultValue={review_text}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <img
                src={`/storage/featured_images/${featured_image}`}
                className="img-thumbnail img-fluid w-50 h-50 "
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Change Featured Image</label>
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
