import LoginSwitcher from '@components/LoginSwitcher';
import Layout from '@components/layout/Layout';

export const metadata = {
  title: 'Restaurant - Login / Sign Up',
  description: 'Login or sign up to access the Restaurant app.',
};

export default function AuthPage() {
  return (
    <Layout>

      <section>
        <div className="wrapper border">
          <div className="container">
            <div className="flex items-center justify-center h-screen">
              <div className="pt-10 xl:pt-10 2xl:pt-0">
                <h2 className='sm:block hidden'>Restaurant Login/SignUp Page</h2>
                <div className="sm:border pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5">
                  <LoginSwitcher />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
