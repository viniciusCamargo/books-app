import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './style.css'
import Books from './Books'
import Book from './Book'

export const Loader = (props) => (
  <img className='loader' src='loader.gif' alt='Loading...' {...props} />
)

const NotFound = () => <p>404</p>

export default () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Books}/>
      <Route exact path='/:book' component={Book}/>
      
      <Route path='*' component={NotFound}/>
    </Switch>
  </Router>
)
