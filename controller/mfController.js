import MutualFund from "../models/mfModel.js";
import  analyzeFinancialData  from "../services/analyseExpense.js";
import goalAnalysis  from "../services/analyseGoal.js";
import filterAndSortFunds from "../services/filterFunds.js";
import getTopFundsByRisk from "../services/topFunds.js";

const topMf =  async(req, res) => {
    try{
        const latestMutualFundList = await MutualFund.findOne({})
        .sort({ createdAt: -1 });
      console.log("latestMutualFundList", latestMutualFundList.fund);
      let topmfResult = await getTopFundsByRisk(latestMutualFundList.fund);
      console.log("topmf Result", topmfResult);
      res.status(200).json(topmfResult);

    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const analyze = async (req, res) => {
  try {
      console.log("Start");
  //   const { message } = req.body; // Expecting { "message": "..." }
    const {name, age, income, essential, savings, leisure, healthcare, debt, transport} = req.query;
    
    if (!name || !age || !income || !essential || !savings || !leisure || !healthcare ||!debt || !transport){
      res.status(400).json({error:"Missing Required Params"});
    }
  //   res.send('Hello NODE API');
    let analysisResult = await analyzeFinancialData(name, age, income, essential, savings, leisure, healthcare, debt, transport);
    console.log("Analysis Result", analysisResult);
    if (analysisResult.startsWith('```json') || analysisResult.endsWith('```')) {
      console.log("Inside slice");
      analysisResult = analysisResult.slice(7, -3); // Remove the leading and trailing backticks
      }
  console.log("Analysis Result 2", analysisResult);
    const parsedResult = JSON.parse(analysisResult);
  //   res.status(200).json({ response: parsedResult });
  res.status(200).json(parsedResult);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const goal = async(req, res) => {
  try{
      const { amount, time, returns, type } = req.query;
    if (!amount || !time || !returns || !type){
      res.status(400).json({error:"Missing Required Params"});
    }
    let goalResult = await goalAnalysis(amount, time, returns, type);
    console.log("Goal Result", goalResult);
    res.status(200).json(goalResult);

  }catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}; 

const mutualFund =  async(req, res) => {
  try {
      console.log(req.body);
      const mutualFund = await MutualFund.create({fund : req.body});
      res.status(200).json(mutualFund);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
}

const filteredmf = async(req, res) => {
  try{
      const { riskType, lowerLimit, upperLimit } = req.query;
      const options = {
          riskType: riskType || null,     // Filter by risk type
          lowerLimit: lowerLimit || null,// Minimum 1YrReturn
          upperLimit: upperLimit || null     // Maximum 1YrReturn
      };
      const filteredMutualFundList = await MutualFund.findOne({})
      .sort({ createdAt: -1 });
    console.log("filteredMutualFundList", filteredMutualFundList.fund);
    let filteredMutualFundListResult = await filterAndSortFunds(filteredMutualFundList.fund, options);
    console.log("topmf Result", filteredMutualFundListResult);
    res.status(200).json(filteredMutualFundListResult);

  }catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default  {
  topMf,
  analyze,
  goal,
  mutualFund,
  filteredmf
};

