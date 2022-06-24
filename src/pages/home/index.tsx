import React, { useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import './index.less'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '@/state/user/state'
import { useChangeUserName } from '@/state/user/hooks'

/** 优化刷新范围 */
const NameComponent: React.FC = () => {
  const user = useRecoilValue(userAtom)
  console.log('NameComponent reload')
  return <p>user name: {JSON.stringify(user)}</p>
}

const HomePage = () => {
  const [getResult, setGetResult] = useState('')
  // const [user, setUser] = useRecoilState(userAtom)
  // const setUser = useSetRecoilState(userAtom)
  const changeUserNameInner = useChangeUserName()

  const testGetRequest = async () => {
    // const res = await common.getUser()
    // setGetResult(JSON.stringify(res))
  }

  const changeUserName = () => {
    // console.log(store)
    // setUser({ name: 'asdf' })
    changeUserNameInner('aaaa')
  }

  console.log('HomePage reload')

  return (
    <div className="Home">
      <h1 className="title">HomePage</h1>
      <Test />
      <button onClick={testGetRequest}>Test get requestTest</button>
      <p>{getResult}</p>
      <button onClick={changeUserName}>Change User Name</button>
      <NameComponent />
      <Link to="/mine">To MinePage</Link>
      <div className="img"></div>
      base64
      <div className="img-small"></div>
    </div>
  )
}

export default HomePage
