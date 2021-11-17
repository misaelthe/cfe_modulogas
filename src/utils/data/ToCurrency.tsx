declare var process: {
    env: {
        REACT_APP_CURRENCY_PRINCIPAL: string
    }
}

export const toCurrency = (number:number,currency=process.env.REACT_APP_CURRENCY_PRINCIPAL,lang = 'undefine') => {
    return Intl.NumberFormat(lang,{style:'currency', currency, minimumFractionDigits: 3 }).format(number);
};