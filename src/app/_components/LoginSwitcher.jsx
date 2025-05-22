'use client';
import { useEffect, useState } from 'react';
import Login from '@components/Login';
import SignUp from '@components/SignUp';

export default function LoginSwitcher() {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    document.title = login ? 'Login - Restaurant' : 'Sign Up - Restaurant';
  }, [login]);

  return (
    <>
      {login ? <Login /> : <SignUp />}
      <span
        className="flex justify-center cursor-pointer"
        onClick={() => setLogin(!login)}
      >
        {login
          ? "Don't have an Account? Sign Up"
          : 'Already have an Account? Login'}
      </span>
    </>
  );
}
