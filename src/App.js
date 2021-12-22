import React from "react";
import "./css/style.css";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import AddAgreement from "./pages/AddAgreement";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/add" component={AddAgreement} />
    </div>
  );
};

export default App;
