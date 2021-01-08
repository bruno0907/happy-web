import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanages from './pages/Orphanages'
import CreateOrphanage from './pages/CreateOrphanage'
import SignIn from './pages/SignIn'

import PasswordForgot from './pages/PasswordForgot'
import NewPassword from './pages/NewPassword'

import PageSuccess from './pages/RegisterSuccess'
import PageNotFound from './pages/PageNotFound'
import Dashboard from './pages/Dashboard'
import OrphanageRevision from './pages/OrphanageRevision'
import OrphanageRemoval from './pages/OrphanageRemoval'
import EditOrphanage from './pages/EditOrphanage'

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanages" exact component={OrphanagesMap} />
        <Route path="/orphanages/create/" exact component={CreateOrphanage} />
        <Route path="/orphanages/:id" exact component={Orphanages} />
        <Route path="/app/sign-in"  component={SignIn} />
        <Route path="/app/dashboard" exact component={Dashboard} />
        <Route path="/app/dashboard/orphanage/revision/:id" component={OrphanageRevision} />
        <Route path="/app/dashboard/orphanage/edit/:id/:auth" component={EditOrphanage} />
        <Route path="/app/dashboard/orphanage/remove/:name/:id" component={OrphanageRemoval} />

        <Route path="/app/password-forgot"  component={PasswordForgot} />
        <Route path="/app/new-password"  component={NewPassword} />

        <Route path="/orphanages/create/success" component={PageSuccess} />

        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes