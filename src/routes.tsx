import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanages" exact component={OrphanagesMap} />
        <Route path="/orphanages/create/" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanages} />        
        
        <Route path="/orphanages/edit/:id" component={EditOrphanage} />

        <Route path="/sign-in" component={SignIn} />
       
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/orphanage/revision/:id" component={OrphanageRevision} />
        <Route path="/dashboard/orphanage/edit/:id" component={EditOrphanage} />
        <Route path="/dashboard/orphanage/remove/:name/:id" component={OrphanageRemoval} />

        <Route path="/password-forgot" component={PasswordForgot} />
        <Route path="/new-password" component={NewPassword} />

        <Route path="/orphanages/create/success" component={PageSuccess} />
        <Route path="/404-page-not-found" component={PageNotFound} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default Routes