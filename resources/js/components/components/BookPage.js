import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { getBook } from '../actions/bookPageActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getBooks } from '../actions/booksActions';
import Spinner from './layout/Spinner';
import DeleteBook from './DeleteBook';


 class BookPage extends Component {
  
componentDidMount() {
  this.props.getBook(this.props.match.params.id);
  this.props.getBooks();
}

  
  render() {
     if (this.props.isLoaded) {
      
   const { name, book_author, review_text, book_score} = this.props.book;
   const currentBookId = this.props.book.id;

      return (
        <Fragment>
          <Link to='/'><i className="fa fa-arrow-circle-left"></i> Return to Home</Link>
          
          <hr/>
          
            <div className="card card-body">
            
              <h1>{name}<span className="badge badge-danger float-right">{book_score.slice(0,3)} / 5</span></h1>
              <h5><small>By: </small><i>{book_author}</i></h5>
              <div dangerouslySetInnerHTML={{__html: review_text}}></div>
            </div>
            <Link to={`/book/${currentBookId}/edit`} className='btn btn-success btn-block'>Edit Review</Link>
            <DeleteBook id={currentBookId} history={this.props.history} />
          <hr/>
          
          <div className="list-group">
      <li className="list-group-item list-group-item-action list-group-item-secondary">Other Book Reviews</li>
      {this.props.books.map((book, id) =>{
        if(book.id != currentBookId){
          return (  <li key={book.id} className="list-group-item list-group-item-secondary"><a href={`/book/${book.id}`}>{book.name}</a></li>
          )
        }
      })}        
      </div>
              
        </Fragment>
      )
     }
    return <Spinner/>;
  }
}
 const mapStateToProps = (state) => ({
  books: state.books.books,
  book: state.bookPage.book,
  isLoaded: state.bookPage.isLoaded
 })
 BookPage.proptypes = {
   books: PropTypes.array.isRequired,
  book: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired
}

export default (connect(mapStateToProps, {getBook, getBooks})(BookPage)) ;