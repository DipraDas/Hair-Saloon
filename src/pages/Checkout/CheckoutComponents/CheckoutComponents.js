import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51M92gdFQCJLJqm4sblScDOUPmynvHboWLfO56LJ12xmfZdspFNbIizYuiRYm7YQWamMYATTkh9ND9fN4Mc1pQ4Ny00u6dpMRdu');

const CheckoutComponents = () => {
    return (
        <div className='container mx-auto'>
            {/* <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements> */}
        </div>
    );
};

export default CheckoutComponents;