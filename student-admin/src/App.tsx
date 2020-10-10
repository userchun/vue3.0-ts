import React, { Fragment, Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter, Switch } from 'react-router-dom'
import Loading from './components/loading'
import routes from './routers'
import './App.less'
function App() {
  return (
    <Fragment>
      <HashRouter>
        <Switch>
          <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
        </Switch>
      </HashRouter>
    </Fragment>
  )
}

export default App
