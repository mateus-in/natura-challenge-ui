import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar, SignIn, SignUp } from '../components'
import { AppContext } from '../contexts'
import { Cart, Home, Orders } from '../pages'

export function App() {
  const [signInIsVisible, setSignInIsVisible] = useState(false)
  const [signUpIsVisible, setSignUpIsVisible] = useState(false)

  return (
    <AppContext.Provider
      value={{
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
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>

        <SignIn />
        <SignUp />
      </BrowserRouter>
    </AppContext.Provider>
  )
}
