import cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar, PrivateRoute, SignIn, SignUp } from '../components'
import { AppContext } from '../contexts'
import { User } from '../interfaces'
import { Cart, Home, Orders } from '../pages'
import { getAuthenticatedUser } from '../services'

export function App() {
  const [user, setUser] = useState<User | null>(null)
  const [signInIsVisible, setSignInIsVisible] = useState(false)
  const [signUpIsVisible, setSignUpIsVisible] = useState(false)

  useEffect(() => {
    const token = cookies.get('NaturaChallenge:Token')

    if (token) {
      getAuthenticatedUser(token).then((user) => setUser(user))
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        signInIsVisible,
        setSignInIsVisible,
        signUpIsVisible,
        setSignUpIsVisible,
      }}
    >
      <BrowserRouter>
        <Navbar />

        <div className="flex justify-center bg-gray-100">
          <div className="w-full max-w-screen-xl">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>

        <SignIn />
        <SignUp />
      </BrowserRouter>
    </AppContext.Provider>
  )
}
