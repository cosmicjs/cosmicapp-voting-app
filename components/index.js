import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppState from './AppState'
import App from './App'

const data = new AppState()
render(
  <AppContainer>
    <App data={data} />
  </AppContainer>,
  document.getElementById('root')
)
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(
      <AppContainer>
        <NextApp data={data} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
