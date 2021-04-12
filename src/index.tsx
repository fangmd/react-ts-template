import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import "normalize.css"
import "./assets/css/base.css"
import "@/assets/css/base-tmp.less"
import HomePage from "./pages/home"
import MinePage from "./pages/mine"
import { Provider } from "./store/context"

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <>
    <Provider>
      <BrowserRouter>
        <Route path="/mine" exact component={MinePage}></Route>
        <Route path="/home" exact component={HomePage}></Route>
        <Route path="/" exact component={HomePage}></Route>
      </BrowserRouter>
    </Provider>
  </>
)

ReactDOM.render(<App />, document.getElementById("root"))
