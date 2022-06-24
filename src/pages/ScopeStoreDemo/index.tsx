import React, { useContext } from 'react'
import ChildrenOne from './components/ChildrenOne'
import ChildrenTwo from './components/ChildrenTwo'

/**
 * Context 使用 demo
 */
const ScopeStoreDemo: React.FC = () => {
  console.log('ScopeStoreDemo render')

  return (
    <>
      <div>ScopeStoreDemo</div>

      <ChildrenOne></ChildrenOne>
      <ChildrenTwo></ChildrenTwo>

      <button onClick={() => {}}>add count</button>
    </>
  )
}

export default function () {
  return <ScopeStoreDemo></ScopeStoreDemo>
}
