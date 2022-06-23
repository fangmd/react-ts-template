import React, { lazy, Suspense } from 'react'
import loadable from '@loadable/component'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
        <Routes>
          <Route path="/mine" element={<MinePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/official" element={<OfficialAnimationPage />}></Route>
          <Route path="/context-demo" element={<ContextDemo />}></Route>
          <Route path="/scope-store-demo" element={<ScopeStoreDemo />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
