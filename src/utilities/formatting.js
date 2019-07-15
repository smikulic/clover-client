export const currencySymbol = {
    EUR: '€',
    GBP: '£',
    USD: '$',
    HRK: 'kn',
};

export const formatValueWithCurrency = (value, currency) => `${(value/100).toFixed(2)} ${currencySymbol[currency] || currency}`
