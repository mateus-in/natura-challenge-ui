import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppContext } from '../hooks/use-app-context-hook'

interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAppContext()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}
