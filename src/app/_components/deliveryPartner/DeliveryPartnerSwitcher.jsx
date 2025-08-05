'use client';
import { Suspense, useEffect, useState } from 'react';
import DeliveryPartnerSignup from '@components/deliveryPartner/DeliveryPartnerSignup';
import DeliveryPartnerLogin from '@components/deliveryPartner/DeliveryPartnerLogin';

const DeliveryPartnerSwitcher = () => {
    const [login, setLogin] = useState(true);

    useEffect(() => {
        document.title = login ? 'Login - User' : 'Sign Up - User';
    }, [login]);

    return (
        <>

            {login ? <Suspense><DeliveryPartnerLogin /></Suspense> : <DeliveryPartnerSignup />}
            <span
                className="flex justify-center cursor-pointer text-white"
                onClick={() => setLogin(!login)}
            >
                {login
                    ? "Don't have an Account? Sign Up"
                    : 'Already have an Account? Login'}
            </span>
        </>
    )
}

export default DeliveryPartnerSwitcher