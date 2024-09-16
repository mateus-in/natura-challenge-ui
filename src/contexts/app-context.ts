import { createContext, Dispatch, SetStateAction } from 'react'

interface AppContextProps {
  signInIsVisible: boolean
  setSignInIsVisible: Dispatch<SetStateAction<boolean>>
  signUpIsVisible: boolean
  setSignUpIsVisible: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)
