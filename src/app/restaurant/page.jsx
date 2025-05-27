import LoginSwitcher from '@components/LoginSwitcher';
import Layout from '@components/layout/Layout';

export const metadata = {
  title: 'Login - Restaurant ',
  description: 'Login or sign up to access the Restaurant app.',
};

export default function AuthPage() {
  return (
    <Layout>

      <section>
        <div className="wrapper bg-[url('/images/login/login.jpg')] bg-cover bg-center min-h-screen">
          <div className="container">
            <div className="flex items-center justify-center h-screen">
              <div className="pt-10 xl:pt-10 2xl:pt-0">
                <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
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
