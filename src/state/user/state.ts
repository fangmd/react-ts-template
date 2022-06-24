import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

interface User {
  name: string
}

/** 用户信息 */
export const userAtom = atom<User | undefined>({
  key: 'user',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})

/** 是否登录 */
const isLoginAtom = selector({
  key: 'isLogin',
  get: ({ get }) => {
    const user = get(userAtom)
    return user?.name
  },
})
