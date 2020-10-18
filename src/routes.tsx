import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanages from './pages/Orphanages'
import CreateOrphanage from './pages/CreateOrphanage'
import SignIn from './pages/AppPages/SignIn'

import PasswordForgot from './pages/AppPages/PasswordForgot'
import NewPassword from './pages/AppPages/NewPassword'



import PageSuccess from './pages/RegisterSuccessPage'
import PageNotFound from './pages/PageNotFound'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanages" exact component={OrphanagesMap} />
        <Route path="/orphanages/create/" exact component={CreateOrphanage} />
        <Route path="/orphanages/:id" exact component={Orphanages} />

        <Route path="/app/sign-in"  component={SignIn} />
        <Route path="/app/password-forgot"  component={PasswordForgot} />
        <Route path="/app/new-password"  component={NewPassword} />

        <Route path="/orphanages/success" component={PageSuccess} />

        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes