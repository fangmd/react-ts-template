import { userAtom } from '@/state/user/state'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const MinePage = () => {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <h1 className="title">MinePage</h1>
      <p>user atom: {JSON.stringify(user)}</p>
      <Link to="/home">To HomePage</Link>
    </>
  )
}

export default MinePage
