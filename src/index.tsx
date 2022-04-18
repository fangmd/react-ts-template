import React, { lazy, Suspense } from 'react'
import loadable from '@loadable/component'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'normalize.css'
import './assets/css/base.css'
import '@/assets/css/base-tmp.less'
import { Provider } from './store/context'
import 'bootstrap/dist/css/bootstrap.css'

const HomePage = loadable(() => import(/* webpackChunkName: 'HomePage'*/ './pages/home'))
const MinePage = loadable(() => import(/* webpackChunkName: 'MinePage'*/ './pages/mine/mine'))
const OfficialAnimationPage = loadable(() => import(/* webpackChunkName: 'MinePage'*/ './pages/officialAnimation'))
const ContextDemo = loadable(() => import(/* webpackChunkName: 'MinePage'*/ './pages/ContextDemo'))
const ScopeStoreDemo = loadable(() => import(/* webpackChunkName: 'MinePage'*/ './pages/ScopeStoreDemo'))

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <Provider>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Route path="/mine" exact component={MinePage}></Route>
        <Route path="/home" exact component={HomePage}></Route>
        <Route path="/" exact component={OfficialAnimationPage}></Route>
        <Route path="/context-demo" exact component={ContextDemo}></Route>
        <Route path="/scope-store-demo" exact component={ScopeStoreDemo}></Route>
        
      </BrowserRouter>
    </Suspense>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
