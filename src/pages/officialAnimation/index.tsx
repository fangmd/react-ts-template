import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import Block from '../../components/Block'

import './index.less'

/**
 * 响应式 Demo
 */
const OfficialAnimationPage = observer(() => {
  return (
    <div className="OfficialAnimationPage__root">
      <div>Banner</div>
      <div className="container">
        <div></div>
      </div>
      <div className="container-sm">
        100% wide until small breakpoint
        <div className="row align-items-start">
          <div className="col block">One of three columns</div>
          <div className="col block">One of three columns</div>
          <div className="col block">One of three columns</div>
        </div>
      </div>

      <div className="container-md">100% wide until medium breakpoint</div>
      <div className="container-lg">100% wide until large breakpoint</div>
      <div className="container-xl">100% wide until extra large breakpoint</div>
      <div className="container-xxl">100% wide until extra extra large breakpoint</div>
    </div>
  )
})

export default OfficialAnimationPage
