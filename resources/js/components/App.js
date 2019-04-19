import React, { Component, Fragment } from 'react';
import Books from './components/Books';
import BookPage from './components/BookPage';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Sidebar from './components/layout/Sidebar';
import CreateBook from './components/CreateBook';
import EditBook from './components/EditBook';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className='bg-secondary'>  
        <div className="container-fluid pt-3">  
          <div className="row">
              <div className="col-md-9">
                <Switch>
                  
                  <Route exact path='/' component={withRouter( Books )} />
                  <Route  path='/book/:id/edit' component={withRouter( EditBook )} />
                  <Route  path='/book/create' component={withRouter( CreateBook )} />
                  <Route  path='/book/:id' component={withRouter( BookPage )} />
                  <Route path='/' />
                </Switch>
              </div>
              <div className="col-md-3 d-none d-md-block">
                <Sidebar />
              </div> 
          </div>  
        </div>
      </div>
      </BrowserRouter>
      </Provider>  
    );
  }
}

export default (App) ;
