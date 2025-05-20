'use client'
import React from 'react'
import SignUp from '@components/SignUp'
import Login from '@components/Login'

const page = () => {
  const [login, setLogin] = useState(true)
  return (
    <div>
      page
      {login ? <Login /> : <SignUp />}

      <button>{login ? "Don't have an Account SignUp" : "Already have an Account Login"}</button>

    </div>
  )
}

export default page