import React, { createContext, useState } from 'react'
import { makeObservable, observable, action, makeAutoObservable } from 'mobx'
import { useLocalObservable } from 'mobx-react-lite'

class CommonStore {
  counter = 0
  cnt2 = 0

  constructor() {
    makeAutoObservable(this)
  }

  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }

  addCounter() {
    this.counter++
  }
  addCounter2() {
    this.cnt2++
  }
}

function createCommonStore() {
  return new CommonStore()
}

export { createCommonStore }

export const StoreContext = React.createContext<any>(null)

export const useStore = () => {
  const store = React.useContext<any>(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export const Provider: React.FC = ({ children }) => {
  const commonStore = useLocalObservable(createCommonStore)

  const store = {
    commonStore,
  }

  return <StoreContext.Provider value={commonStore}>{children}</StoreContext.Provider>
}
