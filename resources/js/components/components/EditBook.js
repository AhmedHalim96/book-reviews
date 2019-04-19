import React, { Component } from 'react'
import Axios from 'axios';
import{connect} from 'react-redux';
import {getBook} from '../actions/bookPageActions'
import Spinner from './layout/Spinner';

 class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(prevState.currentBook==null){
  //     console.log('Baaaam!!!')
  //     return {
  //     currentBook: nextProps.book
  //     }
  //   }
  //   return null;
  // }
  async componentDidMount() {
    console.log(this.props) ;
   await this.props.getBook(this.props.match.params.id)
   this.setState({
     currentBook: this.props.book
   })
    
  }
  
  handleChange(event) {
    // console.log(event);
    this.setState({
      currentBook:{...this.state.currentBook,
      [event.target.name] : event.target.value}
    });
  }

  handleSubmit(event) {
    // console.log( this.state.currentBook);
    
    event.preventDefault();
    
    const {name, review_text, book_author, book_score} = this.state.currentBook
    Axios.patch('/books/'+this.state.currentBook.id,{
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
    if(this.props.isLoaded){
      const {name, review_text, book_author, book_score} = this.props.book;
    return (
      <div className="card card-body card-dark bg-dark text-white">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Book Title*</label>
            <input type="text" className='form-control' name='name'  defaultValue={name} onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Book Author*</label>
            <input type="text" className='form-control' name='book_author' defaultValue={book_author} onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Book Rating*</label>
            <input type="number" step='0.1' min='0' max='5' className='form-control' name='book_score' defaultValue={book_score} onChange={this.handleChange} required placeholder="Rating out of 5"/>
          </div>
          <div className="form-group">
            <label>Book Review*</label>
            <textarea  className='form-control' rows='10' name='review_text' defaultValue={review_text} onChange={this.handleChange} required ></textarea>
          </div>
          <button type="submit" className='btn btn-success btn-block'>Submit Review</button>
        </form>
      </div>
    )}
    return <Spinner/>;
    
    
  }
}

const mapStateToProps = (state) => ({
  book: state.bookPage.book,
  isLoaded: state.bookPage.isLoaded
})




export default connect(mapStateToProps,{getBook})(EditBook);