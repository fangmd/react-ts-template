import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../context'

/**
 * 子元素
 */
const ChildrenTwo: React.FC = observer(() => {
  const commonStore = useStore()
  console.log('ChildrenTwo render')

  return (
    <div>
      ChildrenTwo

      <div>{commonStore.cnt2}</div>
      <button
        onClick={() => {
          commonStore.addCounter2()
        }}
      >
        add count2 ChildrenTwo 自己更新自己
      </button>
    </div>
  )
})

export default ChildrenTwo
