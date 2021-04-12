import { common } from "@/api"
import { useStore } from "@/store/context"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Link } from "react-router-dom"

const HomePage = observer(() => {
  const [getResult, setGetResult] = useState("")
  const store = useStore()
  const testGetRequest = async () => {
    const res = await common.getUser()
    setGetResult(JSON.stringify(res))
  }

  const changeUserName = () => {
    console.log(store)
    store.userStore.setUserName("asds")
  }

  return (
    <>
      <h1>HomePage</h1>
      <button onClick={testGetRequest}>Test get request</button>
      <p>{getResult}</p>
      <button onClick={changeUserName}>Change User Name</button>
      <p>user name: {JSON.stringify(store.userStore.user)}</p>
      <Link to="/mine">To MinePage</Link>
    </>
  )
})

export default HomePage
