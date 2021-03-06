import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindRecordsContainer from "./containers/FindRecordsContainer";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </Route>
          <Route
            path="/find-records"
            children={(routerProps) => {
              return <FindRecordsContainer {...routerProps} />;
            }}
          ></Route>
          <Route path="*">Not found</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
