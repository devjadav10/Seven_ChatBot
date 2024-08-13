const calculateSIP = (goalAmount, time, returns) => {
    const monthlyInterestRate = (returns / 100) / 12;
    const months = time * 12;
    // const sipAmount = goalAmount / ((Math.pow(1 + monthlyInterestRate, months) - 1) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)));
    const sipAmount = (goalAmount * monthlyInterestRate) / (((1 + monthlyInterestRate) ** months) - 1);
    console.info("SipAmount", sipAmount);
    return Math.ceil(sipAmount / 500) * 500;
    // return sipAmount;
};

const calculateTotalAmountSip = (sipAmount, years, annualInterestRate) => {
    // Convert annual interest rate to a monthly interest rate
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    // Total number of months
    const totalMonths = years * 12;
 
    // Calculate the total amount accumulated
    const totalAmount = sipAmount * (((1 + monthlyInterestRate) ** totalMonths - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
 
    Math.ceil(totalAmount / 1000) * 1000;
}

const calculateLumpsum = (goalAmount, time, returns) => {
    // Covert interest rate from percent to decimal
    const interestRate = returns/100;
    // Calculate LumpSum with Compound Interest Formula
    let lumpsum = goalAmount / Math.pow((1+interestRate), time);

    lumpsum =  lumpsum.toFixed(2);
    return Math.ceil(lumpsum / 1000) * 1000;
}

const calculateTotalAmountLumpsum = (principal, years, returns ) => {
    // Convert the returns percentage to a decimal
    const rate = returns / 100;

    // Calculate the total amount using the formula
    const totalAmount = principal * Math.pow((1 + rate), years);

    return Math.ceil(totalAmount / 1000) * 1000;
}

async function goalAnalysis(amount, time, returns, type) {
    // let sip = 10000;
    if(type === 'sip'){
        let sip = calculateSIP(amount, time, returns);
        console.log("Sip", sip);
        let investedAmount = sip * time * 12;
        // let returnAmount = investedAmount * returns;
        let returnAmount = calculateTotalAmountSip(sip, time, returns);

        let totalProfit = (returnAmount - investedAmount);
        let amountInHigh, amountInMed, amountInLow;
        if(returns >= 10 && returns <= 20){
            amountInHigh = (sip * 0.05);
            amountInMed = (sip * 0.15);
            amountInLow = (sip * 0.80);
        }
        else if(returns > 20 && returns <= 30){
            amountInHigh = (sip * 0.30);
            amountInMed = (sip * 0.40);
            amountInLow = (sip * 0.30);
        }
        else if(returns > 30 && returns <= 45){
            amountInHigh = (sip * 0.50);
            amountInMed = (sip * 0.30);
            amountInLow = (sip * 0.20);
        }
        else {
            return { error: "No Such Interest Rate Possible" };
        }
        const result = {
            "Monthly Investment Amount" : sip,
            "Investment In Equity Funds" : amountInHigh,
            "Investment In Hybrid Fund": amountInMed,
            "Investment In Debt Fund": amountInLow,
            "Total Investment Amount" : investedAmount,
            "Total Amount" : returnAmount,
            "Total Profit" : totalProfit
        }

        return result;
    }
    else{
        let lumpsum = calculateLumpsum(amount, time, returns);
        console.log("lumpsum", lumpsum);
        let returnAmount = calculateTotalAmountLumpsum(lumpsum, time, returns);
        let totalProfit = (returnAmount - lumpsum);
        let amountInHigh, amountInMed, amountInLow;
        if(returns >= 10 && returns <= 20){
            amountInHigh = (lumpsum * 0.05);
            amountInMed = (lumpsum * 0.15);
            amountInLow = (lumpsum * 0.80);
        }
        else if(returns > 20 && returns <= 30){
            amountInHigh = (lumpsum * 0.30);
            amountInMed = (lumpsum * 0.40);
            amountInLow = (lumpsum * 0.30);
        }
        else if(returns > 30 && returns <= 45){
            amountInHigh = (lumpsum * 0.50);
            amountInMed = (lumpsum * 0.30);
            amountInLow = (lumpsum * 0.20);
        }
        else {
            return { error: "No Such Interest Rate Possible" };
        }
        const result = {
            "Investment Amount" : lumpsum,
            "Investment In Equity Funds" : amountInHigh,
            "Investment In Hybrid Fund": amountInMed,
            "Investment In Debt Fund": amountInLow,
            "Total Investment Amount" : lumpsum,
            "Total Amount" : returnAmount,
            "Total Profit" : totalProfit
        }

        return result;
        // return lumpsum;
    }

  }

  export default goalAnalysis;