// Conversion rates for products (1 GBP = 180 JPY)
const CONVERSION_RATES = {
    'monster_nitro': {
        gbp: 199, // £1.99 in pence
        jpy: 358  // ¥358
    },
    'monster_ultra': {
        gbp: 175, // £1.75 in pence
        jpy: 315  // ¥315
    },
    'monster_juiced': {
        gbp: 175, // £1.75 in pence
        jpy: 315  // ¥315
    },
    'polar_plus': {
        gbp: 399, // £3.99 in pence
        jpy: 718  // ¥718
    },
    'polar_premium': {
        gbp: 799, // £7.99 in pence
        jpy: 1438 // ¥1,438
    }
};

// Standard conversion rate: 1 GBP = 180 JPY
const JPY_RATE = 180;

const convertToSubCurrency = (amount: number, currency: string = 'gbp', productId?: string): number => {
    // Validate inputs
    if (typeof amount !== 'number' || isNaN(amount)) {
        console.error('Invalid amount provided to convertToSubCurrency:', amount);
        return 0;
    }

    if (typeof currency !== 'string') {
        console.error('Invalid currency provided to convertToSubCurrency:', currency);
        return 0;
    }

    // Normalize currency to lowercase
    const normalizedCurrency = currency.toLowerCase();
    
    // If a product ID is provided and exists in our rates, use its specific conversion rate
    if (productId && CONVERSION_RATES[productId as keyof typeof CONVERSION_RATES]) {
        const rate = CONVERSION_RATES[productId as keyof typeof CONVERSION_RATES][normalizedCurrency as 'gbp' | 'jpy'];
        if (typeof rate === 'number') {
            return rate;
        }
    }

    // For custom amounts (like total spent)
    if (normalizedCurrency === 'jpy') {
        // Convert GBP to JPY (1 GBP = 180 JPY)
        return Math.round(amount * JPY_RATE);
    }

    // Default GBP handling (multiply by 100 to convert to pence)
    return Math.round(amount * 100);
};

export const formatCurrency = (amount: number, currency: string = 'gbp', productId?: string): string => {
    // Validate inputs
    if (typeof amount !== 'number' || isNaN(amount)) {
        console.error('Invalid amount provided to formatCurrency:', amount);
        return currency.toLowerCase() === 'jpy' ? '¥0' : '£0.00';
    }

    const normalizedCurrency = currency.toLowerCase();

    if (normalizedCurrency === 'jpy') {
        // For JPY, first convert the amount if it's in GBP
        let value = amount;
        if (productId && CONVERSION_RATES[productId as keyof typeof CONVERSION_RATES]) {
            // Use predefined rates for products
            value = CONVERSION_RATES[productId as keyof typeof CONVERSION_RATES].jpy;
        } else {
            // For custom amounts, convert from GBP to JPY
            value = Math.round(amount * JPY_RATE);
        }
        return `¥${Math.round(value).toLocaleString()}`;
    }

    // For GBP, always show 2 decimal places
    let value = amount;
    if (productId && CONVERSION_RATES[productId as keyof typeof CONVERSION_RATES]) {
        value = CONVERSION_RATES[productId as keyof typeof CONVERSION_RATES].gbp / 100;
    }
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default convertToSubCurrency;