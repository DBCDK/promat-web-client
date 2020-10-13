import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Overview from './components/AdminOverview'
import CreateCase from './components/CreateCase'
import SearchCase from './components/SearchCase'
import Login from './components/Login'
import Navigation from './DBCDesign/components/Navigation'

const NavLinks = [
  {to:"/overview",label:"Overblik", component:() => Overview},
  {to:"/create-case",label:"Opret sag", component:() => CreateCase},
  // {to:"/find",label:"Find sag",component:() => SearchCase},
  {to:"/",label:"Promat", component:() => Login},
]

export default function App() {
  return (
    <BrowserRouter>
      <div id="promat-app">
      
      <Navigation>{NavLinks}</Navigation>

      <Switch>
        {
          NavLinks.map((link) => (
          <Route path={link.to}>{React.createElement(link.component())}</Route>
          ))
        }
      </Switch>

      </div>
    </BrowserRouter>
  );
}
