import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import SinglePoll from './Pages/SinglePoll'
import PollList from './Pages/PollList'
render(
  <AppContainer>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/:poll" component={SinglePoll}/>
        <IndexRoute component={PollList}/>
      </Route>
    </Router>
  </AppContainer>,
  document.getElementById('root')
)
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(
      <AppContainer>
        <Router history={browserHistory}>
          <Route path="/" component={NextApp}>
            <Route path="/:poll" component={SinglePoll}/>
            <IndexRoute component={PollList}/>
          </Route>
        </Router>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
