import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import './index.less'

const HomePage = observer(() => {
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  const testGetRequest = async () => {
    // const res = await common.getUser()
    // setGetResult(JSON.stringify(res))
  }

  const changeUserName = () => {
    console.log(store)
    store.userStore.setUserName('asds')
    const a = { a: 1 }
    const b = { b: 1 }
    const c = Object.assign(a, b)
    const { k } = c
    console.log(c);
    console.log(k);
  }

  return (
    <div className="Home">
      <h1 className="title">HomePage</h1>
      <Test />
      <button onClick={testGetRequest}>Test get requestTest</button>
      <p>{getResult}</p>
      <button onClick={changeUserName}>Change User Name</button>
      <p>user name: {JSON.stringify(store.userStore.user)}</p>
      <Link to="/mine">To MinePage</Link>
      <div className="img"></div>
      base64
      <div className="img-small"></div>
    </div>
  )
})

export default HomePage
