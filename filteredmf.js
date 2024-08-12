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

function filterAndSortFunds(funds, options = {}) {
    const { riskType, lowerLimit, upperLimit } = options;
    console.log("options", options);

    // Helper function to parse the return percentage
    const parseReturn = (returnString) => parseFloat(returnString.replace('%', ''));

    // Filter funds based on riskType if provided
    let filteredFunds = funds;
    if (riskType) {
        filteredFunds = filteredFunds.filter(fund => fund.riskType === riskType).slice(0, 5)
    }
    // console.log("filteredFunds", filteredFunds);

    // Filter funds based on return percentage range if provided
    if (lowerLimit !== null && upperLimit !== null) {
        filteredFunds = filteredFunds.filter(fund => {
            const fundReturn = parseReturn(fund["returns"]);
            return fundReturn >= lowerLimit && fundReturn <= upperLimit;
        });
    }

    // Sort the filtered funds by 1YrReturn in descending order
    filteredFunds.sort((a, b) => parseReturn(b["returns"]) - parseReturn(a["returns"])).slice(0, 5);
    console.log("filteredFunds", filteredFunds);
    return filteredFunds;
}
module.exports = {
    getTopFundsByRisk,
    filterAndSortFunds
  };