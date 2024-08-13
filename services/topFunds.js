async function getTopFundsByRisk(funds) {
    let fund = funds;
    console.log("fund", fund);
    const parseReturn = (returnString) => parseFloat(returnString.replace('%', ''));
  
    const groupedFunds = funds.reduce((acc, fund) => {
        if (!acc[fund.riskType]) {
            acc[fund.riskType] = [];
        }
        acc[fund.riskType].push(fund);
        return acc;
    }, {});
  
    const topFunds = {};
    Object.keys(groupedFunds).forEach(riskType => {
        topFunds[riskType] = groupedFunds[riskType]
            .sort((a, b) => parseReturn(b["returns"]) - parseReturn(a["returns"]))
            .slice(0, 5);
    });
  
    return topFunds;
  }

  export default getTopFundsByRisk;