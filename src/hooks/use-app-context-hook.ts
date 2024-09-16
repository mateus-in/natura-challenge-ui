import { useContext } from 'react'

import { AppContext } from '../contexts/app-context'

export function useAppContext() {
  const appContext = useContext(AppContext)

  if (!appContext) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return appContext
}
