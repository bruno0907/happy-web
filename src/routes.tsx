import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Orphanages from './pages/Orphanages'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanages" component={Orphanages} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes