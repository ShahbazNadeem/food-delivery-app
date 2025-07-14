'use client';
import { useEffect, useState } from 'react';
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';

export default function UserLoginSwitcher() {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    document.title = login ? 'Login - User' : 'Sign Up - User';
  }, [login]);

  return (
    <>
      {login ? <UserLogin /> : <UserSignUp />}
      <span
        className="flex justify-center cursor-pointer text-white"
        onClick={() => setLogin(!login)}
      >
        {login
          ? "Don't have an Account? Sign Up"
          : 'Already have an Account? Login'}
      </span>
    </>
  );
}
