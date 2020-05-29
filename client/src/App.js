import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Comments from "./components/CommentArea/Comments";
import Login from "./components/Login/Login";

const App = () => (
  <Router>
    <Route path="/" exact component={Login}></Route>
    <Route path="/comments" component={Comments} />
  </Router>
);

export default App;
