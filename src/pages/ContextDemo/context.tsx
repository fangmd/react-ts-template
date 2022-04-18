import React, { createContext, useState } from 'react'

export const DemoContext = createContext({
  cnt: 1,
  addCnt: () => {},
})

export const Provider: React.FC = ({ children }) => {
  const [cnt, setCnt] = useState(2)

  const addCnt = () => {
    setCnt(cnt + 1)
  }

  const contextValue: any = {
    cnt: cnt,
    addCnt: addCnt,
  }

  console.log('refresh provider')

  return <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
}
