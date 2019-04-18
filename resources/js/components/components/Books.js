import React, { Component } from 'react'
// import axios from 'axios';
import BookItem from './bookItem';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getBooks} from '../actions/booksActions'
import Spinner from './layout/Spinner';


// import {Link} from 'react-router-dom'


export class Books extends Component {
  
  componentDidMount() {
    this.props.getBooks();
  }
  
  
 
  render() {

    const {books, isLoaded} = this.props;
    if (isLoaded) {
      return (
        
          <div className="row">
            {books.map(book => (
            <BookItem book={book} key={book.id}/>
          ))}          
          </div>
       
      )
    }
    return <Spinner/>;
     
    
  }
}

Books.protoTypes = {
  books: PropTypes.array.isRequired,
  getBooks: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
  books: state.books.books,
  isLoaded: state.books.isLoaded
})


export default connect(mapStateToProps, {getBooks}) (Books);
