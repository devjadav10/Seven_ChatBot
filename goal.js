const calculateSIP = (goalAmount, time, returns) => {
    const monthlyInterestRate = (returns / 100) / 12;
    const months = time * 12;
    // const sipAmount = goalAmount / ((Math.pow(1 + monthlyInterestRate, months) - 1) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)));
    const sipAmount = (goalAmount * monthlyInterestRate) / (((1 + monthlyInterestRate) ** months) - 1);
    console.info("SipAmount", sipAmount);
    return Math.ceil(sipAmount / 500) * 500;
    // return sipAmount;
};

const calculateTotalAmount = (sipAmount, annualInterestRate, years) => {
    // Convert annual interest rate to a monthly interest rate
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    // Total number of months
    const totalMonths = years * 12;
 
    // Calculate the total amount accumulated
    const totalAmount = sipAmount * (((1 + monthlyInterestRate) ** totalMonths - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
 
    return totalAmount;
}

async function goalAnalysis(amount, time, returns) {
    // let sip = 10000;
    let sip = calculateSIP(amount, time, returns);
    console.log("Sip", sip);
    let investedAmount = sip * time * 12;
    // let returnAmount = investedAmount * returns;
    let returnAmount = calculateTotalAmount(sip, returns, time);

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

  module.exports = {
    goalAnalysis
  };