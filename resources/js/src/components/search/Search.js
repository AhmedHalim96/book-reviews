import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import BookItem from "../bookItem";
import { filterText } from "../../utilities";
import Spinner from "../layout/Spinner";
import SearchPagination from "./searchPagination";

export default class Search extends Component {
  state = {
    q: "",
    books: [],
    currentPage: 1,
    pageCount: 1,
    postsPerPage: 10,
    isLoaded: false
  };

  componentDidMount() {
    this.intialize(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const page = parseInt(this.props.match.params.p);
    const nextPage = parseInt(nextProps.match.params.p);
    const q = this.state.q;
    const nextQ = nextProps.match.params.q;

    if (page !== nextPage) {
      this.setState({
        currentPage: nextPage
      });
    }
    if (nextQ !== q) {
      this.intialize(nextProps);
    }
  }
  intialize = props => {
    // Current page
    const currentPage = parseInt(props.match.params.p);
    if (currentPage) {
      this.setState({
        currentPage: currentPage
      });
    } else {
      this.setState({
        currentPage: 1
      });
    }

    //Filtering books with  Search q
    let { books } = props;
    let q = props.match.params.q;
    books = books.filter(book => {
      let filteredQuery = filterText(q);
      return (
        filterText(book.name).indexOf() !== -1 ||
        filterText(book.book_author).indexOf(filteredQuery) !== -1 ||
        filterText(book.review_author).indexOf(filteredQuery) !== -1 ||
        filterText(book.review_text).indexOf(filteredQuery) !== -1
      );
    });

    // pagination stuff
    const { postsPerPage } = this.state;
    const pageCount =
      books.length / postsPerPage === Math.floor(books.length / postsPerPage) &&
      books.length
        ? books.length / postsPerPage
        : Math.floor(books.length / postsPerPage) + 1;

    this.setState({
      q: q,
      books: books,
      pageCount: pageCount,
      isLoaded: true
    });
  };

  render() {
    const {
      q,
      books,
      isLoaded,
      pageCount,
      currentPage,
      postsPerPage
    } = this.state;

    const pageStart = currentPage === 1 ? 0 : (currentPage - 1) * postsPerPage;
    if (isLoaded) {
      if (currentPage > pageCount) {
        return (
          <div className="card card-body col-lg-10 mx-auto py-5">
            <p className="lead card-text mx-auto">Something Wrong Happened</p>
          </div>
        );
      }
      return (
        <div className="slide-down" onLoad={window.scroll(0, 0)}>
          <Helmet>
            <title>Search Results for "{q}" - Book Reviews</title>
          </Helmet>{" "}
          <div className="row">
            <h1 className="text-white underline col-12">
              Search Results for "{q}"
            </h1>
            {books.length !== 0 ? (
              <Fragment>
                {books
                  .slice(pageStart, pageStart + postsPerPage)
                  .map((book, id) => {
                    return (
                      <BookItem book={book} key={book.id} viewType="list" />
                    );
                  })}
                <SearchPagination
                  q={q}
                  pagecount={pageCount}
                  currentpage={currentPage}
                />
              </Fragment>
            ) : (
              <div className="card card-body col-lg-10 mx-auto py-5">
                <p className="lead card-text mx-auto">
                  Sorry, No Search Results
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}
