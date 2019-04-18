import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


export default function bookItem(props) {
  const {id, name, book_author, review_text, book_score} = props.book;
    const mini_review_text = review_text.slice(0,40)+'...."'; 
    return (
      <div className="card col-md-10 ml-auto mr-auto card-dark bg-dark text-white pt-3 mb-2">
  
  <div className="card-body">
    <h5 className="card-title">{name} <small>Written by</small> {book_author} <span className="float-right">{book_score.slice(0,3)} / 5</span></h5>
    <div dangerouslySetInnerHTML={{__html: mini_review_text}} className="card-text d-inline"></div>
    <Link to={`/book/${id}`} className='float-right'>Read Review</Link>
  </div>
  
  </div>);
}

