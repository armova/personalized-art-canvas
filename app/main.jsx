'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import Canvas from './components/Canvas'
import Controls from './components/Controls'
import Remote from './components/Remote'

render((
    <Router history={browserHistory}>
      <Route path="/" component={Canvas}>
        <Route path="/controls" component={Controls} />
      </Route>
      <Route path="/remote" component={Remote} />
    </Router>
    ),
    document.getElementById('main')
)
