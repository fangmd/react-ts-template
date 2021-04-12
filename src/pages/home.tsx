import { common } from "@/api"
import React, { useState } from "react"

function HomePage() {
  const [getResult, setGetResult] = useState("")
  const testGetRequest = async () => {
    const res = await common.getUser()
    setGetResult(JSON.stringify(res))
  }
  return (
    <>
      <h1>HomePage</h1>
      <button onClick={testGetRequest}>Test get request</button>
      <p>{getResult}</p>
      <a href="/mine">To MinePage</a>
    </>
  )
}

export default HomePage
