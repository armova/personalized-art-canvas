'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import Canvas from './components/Canvas'
import Controls from './components/Controls'


render((
    <Router history={browserHistory}>
      <Route path="/" component={Canvas}>
        <Route path="/controls" component={Controls} />
      </Route>
    </Router>
    ),
    document.getElementById('main')
)
