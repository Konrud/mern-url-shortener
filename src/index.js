import "./styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/app";

ReactDOM.render(<App />, document.getElementById("root"));


/*

from: https://youtu.be/ivDjWYcKDZI  (MERN - URL Shortener from Scratch to Deploy (Mongo, Express, React, Node))

data regarding folders structure for NODE.JS with Express APP is taken from:
https://dev.to/eaetukudo/understanding-mvc-pattern-in-nodejs-2bdn


*/

if (process.env.NODE_ENV === "development") {
    module.hot.accept(); // for `HotModuleReplacementPlugin`, this command enables hot reloading   
}
