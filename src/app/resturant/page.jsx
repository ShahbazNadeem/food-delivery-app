import LoginSwitcher from '@components/LoginSwitcher';

export const metadata = {
  title: 'Restaurant - Login / Sign Up',
  description: 'Login or sign up to access the Restaurant app.',
};

export default function AuthPage() {
  return (
    <div className="container">
      <h2>Restaurant Login/SignUp Page</h2>
      <div className="sm:border pb-8 sm:max-w-md mx-auto rounded-2xl mt-5">
        <LoginSwitcher />
      </div>
    </div>
  );
}
