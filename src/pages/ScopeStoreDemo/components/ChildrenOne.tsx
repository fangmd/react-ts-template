import React from 'react'

/**
 * 子元素，通过 React.memo 减少 render 次数
 */
const ChildrenOne: React.FC = () => {
  console.log('ChildrenOne render')

  return <div>ChildrenOne</div>
}

export default React.memo(ChildrenOne)
