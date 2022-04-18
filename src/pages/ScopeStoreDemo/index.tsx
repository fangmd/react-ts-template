import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Provider, useStore } from './context'
import ChildrenOne from './components/ChildrenOne'
import ChildrenTwo from './components/ChildrenTwo'

/**
 * Context 使用 demo
 */
const ScopeStoreDemo: React.FC = observer(() => {
  const commonStore = useStore()

  console.log('ScopeStoreDemo render')

  return (
    <>
      <div>ScopeStoreDemo</div>
      <div>{commonStore.counter}</div>

      <ChildrenOne></ChildrenOne>
      <ChildrenTwo></ChildrenTwo>

      <button
        onClick={() => {
          commonStore.addCounter()
        }}
      >
        add count
      </button>
    </>
  )
})

export default function () {
  return (
    <Provider>
      <ScopeStoreDemo></ScopeStoreDemo>
    </Provider>
  )
}
