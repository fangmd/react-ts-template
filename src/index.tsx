import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import "normalize.css"
import HomePage from "./pages/home"
import MinePage from "./pages/mine"

import "./assets/css/base.css"
import "@/assets/css/base-tmp.less"

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <>
    <BrowserRouter>
      <Route path="/mine" exact component={MinePage}></Route>
      <Route path="/home" exact component={HomePage}></Route>
      <Route path="/" exact component={HomePage}></Route>
    </BrowserRouter>
  </>
)

ReactDOM.render(<App />, document.getElementById("root"))
