import React, { Component } from 'react'
import Axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBook:  {
        name:'',
        book_author: '',
        review_text:'',
        book_score:0
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      newBook:{...this.state.newBook,
      [event.target.name] : event.target.value}
    });
  }

  handleSubmit(event) {
    // console.log( this.state.newBook);
    
    event.preventDefault();
    const {name, review_text, book_author, book_score} = this.state.newBook
    Axios.post('/books',{
      name: name,
      review_text: review_text,
      book_author: book_author,
      book_score: book_score
    
    })
    .then(res=>{
      this.props.history.push('/book/'+res.data.id);
    })
    .catch(err=>console.log(err));
  }
  render() {
    return (
      <div className="card card-body card-dark bg-dark text-white">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Book Title*</label>
            <input type="text" className='form-control' name='name' onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Book Author*</label>
            <input type="text" className='form-control' name='book_author' onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Book Rating*</label>
            <input type="number" step='0.1' min='0' max='5' className='form-control' name='book_score' onChange={this.handleChange} required placeholder="Rating out of 5"/>
          </div>
          <div className="form-group">
            <label>Book Review*</label>
            <textarea  className='form-control' rows='10' name='review_text' onChange={this.handleChange} required ></textarea>
          </div>
          <button type="submit" className='btn btn-dark btn-block'>Submit Review</button>
        </form>
      </div>
    )
  }
}
