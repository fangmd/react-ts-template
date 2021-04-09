import React from "react"
import ReactDOM from "react-dom"
import "./assets/css/base.css"
import "./assets/css/base-tmp.less"

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <>
    <h1>My React and TypeScript App! {env}</h1>
    <h2>My</h2>
  </>
)

ReactDOM.render(<App />, document.getElementById("root"))
