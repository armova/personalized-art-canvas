'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import Canvas from './components/Canvas'


render((
    <Router history={browserHistory}>
      <Route path="/" component={Canvas} />
    </Router>
    ),
    document.getElementById('main')
)
