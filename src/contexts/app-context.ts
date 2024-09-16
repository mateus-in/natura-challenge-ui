import { createContext, Dispatch, SetStateAction } from 'react'

import { User } from '../interfaces'

interface AppContextProps {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  signInIsVisible: boolean
  setSignInIsVisible: Dispatch<SetStateAction<boolean>>
  signUpIsVisible: boolean
  setSignUpIsVisible: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)
