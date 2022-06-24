import React from 'react'

/**
 * 子元素
 */
const ChildrenTwo: React.FC = () => {
  console.log('ChildrenTwo render')

  return (
    <div>
      ChildrenTwo
      <button onClick={() => {}}>add count2 ChildrenTwo 自己更新自己</button>
    </div>
  )
}

export default ChildrenTwo
