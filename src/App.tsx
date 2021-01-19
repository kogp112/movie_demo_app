import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "./pages/detail/Detail";
import Main from "./pages/main/Main";
import Header from "./components/header/Header"
import ScrollTop from "react-scrolltop-button";
import { IoArrowUpSharp } from "react-icons/io5";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/detail/:id'>
            <Detail />
          </Route>
        </Switch>
      </Router>
      <ScrollTop
        distance={100}
        breakpoint={768}
        speed={1000}
        target={75}
        text={<IoArrowUpSharp />}
      />
    </>
  );
}

export default App;
