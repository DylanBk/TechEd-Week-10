'use client';

import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";


const Checkout = ({amount}: {amount: number}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div>

        </div>
    );
};

export default Checkout;