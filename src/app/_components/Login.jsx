import React from 'react'
const Login = () => {
  return (
    <>

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-lg">
      <div className="w-full">
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-gray-900 md:text-2xl text-center">
            Sign in to your account
          </h3>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <input type="email" name="email" id="email" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full">Sign in</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login;

