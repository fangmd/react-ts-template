import React, { useContext } from 'react'
import { DemoContext, Provider } from './context'

/**
 * Context 使用 demo
 */
const ContextDemo: React.FC = () => {
  const context = useContext(DemoContext)

  console.log('context', context)

  console.log('refresh ContextDemo')

  return (
    <>
      <div>ContextDemo</div>
      <div>{context.cnt}</div>

      <button
        onClick={() => {
          context.addCnt()
        }}
      >
        add count
      </button>
    </>
  )
}

export default function () {
  return (
    <Provider>
      <ContextDemo></ContextDemo>
    </Provider>
  )
}
