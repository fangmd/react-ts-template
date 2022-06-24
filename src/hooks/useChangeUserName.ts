import { userAtom } from '@/store/userStore'
import { useSetRecoilState } from 'recoil'

/** 自定义 hooks */
export const useChangeUserName = () => {
  const setUser = useSetRecoilState(userAtom)

  const changeUserNameInner = (name) => {
    setUser({ name: name })
  }

  return changeUserNameInner
}
