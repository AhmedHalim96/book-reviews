import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { getBook } from '../actions/bookPageActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getBooks } from '../actions/booksActions';


 class BookPage extends Component {
  
componentDidMount() {
  this.props.getBook(this.props.match.params.id);
  this.props.getBooks();
}

  
  render() {
     if (this.props.isLoaded) {
      
   const {id, name, book_author, review_text, book_score} = this.props.book;

      return (
        <Fragment>
          <Link to='/'><i className="fa fa-arrow-circle-left"></i> Return to Home</Link>
          <hr/>
          
            <div className="card card-body">
            
              <h1>{name}</h1><span className="badge badge-danger float-right">{book_score.slice(0,3)} / 5</span>
              <div dangerouslySetInnerHTML={{__html: review_text}}></div>
            </div>
          <hr/>
          <div className="list-group">
          <div className="list-group">
      <li className="list-group-item list-group-item-action list-group-item-secondary">Other Book Reviews</li>
      {books.map((book, id) =>{
        if(id != this.props.book.id){
          return (  <li key={book.id} className="list-group-item list-group-item-secondary"><Link to={`/book/${book.id}`}>{book.name}</Link></li>
          )
        }
      })}        
      </div>
          </div>          
        </Fragment>
      )
     }
    return 'Loading';
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

export default connect(mapStateToProps, {getBook})(BookPage) ;