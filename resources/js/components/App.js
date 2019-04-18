import React, { Component, Fragment } from 'react';
import Books from './components/Books';
import BookPage from './components/BookPage';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Sidebar from './components/layout/Sidebar';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className='bg-secondary'>
        
        <div className="container-fluid pt-3">  
          <div className="row">
            <BrowserRouter>
            <div className="col-md-9">

                <Switch>
                <Route exact path='/' component={Books} />
                <Route exact path='/book/:id' component={BookPage} />
                </Switch>
                </div>
<div className="col-md-3 d-none d-md-block">
              <Sidebar />
            </div>
                
            </BrowserRouter>
           
            
          </div> 
      
</div>
      </div>
      </Provider>

      
      
      
    );
  }
}

export default App;
