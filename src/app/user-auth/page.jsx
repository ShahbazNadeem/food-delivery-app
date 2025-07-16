import React from 'react'
import CommenLayout from '../_components/layout/CommenLayout'
import UserLoginSwitcher from '../_components/user/UserLoginSwitcher'

const Page = () => {
    return (
        <CommenLayout>
            <section>
                <div className="wrapper bg-[url('/images/login/userLogin.jpg')] bg-cover bg-center min-h-screen">
                    <div className="container">
                        <div className="flex items-center justify-center h-screen">
                            <div className="pt-10 xl:pt-10 2xl:pt-0">
                                <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
                                    <UserLoginSwitcher />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </CommenLayout>
    )
}

export default Page
