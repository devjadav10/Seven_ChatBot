/*
* Install the Generative AI SDK
*
* $ npm install @google/generative-ai
*/
 
// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  import { GoogleGenerativeAI } from "@google/generative-ai";
   
  const apiKey = "AIzaSyDojOoUJFgJYM4cXDFfmyzwbUIO9k8DTr4";
  const genAI = new GoogleGenerativeAI(apiKey);
   
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
   
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
   

async function analyzeFinancialData(name, age, income, essential, savings, leisure, healthcare, debt, transport) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    console.log("hello");
    const result = await chatSession.sendMessage(`My name is ${name}. I am ${age} years old. My income is ${income} INR. 
        My spends is as following: 
        Debt- ${debt}% 
        Essentials- ${essential}%
        Healthcare- ${healthcare}%
        Leisure- ${leisure}%
        Savings- ${savings}%
        Transport- ${transport}%
Now based on my age, income and spends in each categories analyze it based on the financial guidlines and rules. 
Give me only Investment Allocation and Modifying Your Spends. 
I don't need any additional information. 
Can you send response in json key value object pass only the json in the format like
{
  "Investment Allocation": {
    "Equity": {
      "Percentage": 60,
      "Reason": "Higher growth potential for long-term wealth creation"
    },
    "Debt": {
      "Percentage": 20,
      "Reason": "Provides stability and income generation"
    },
    "Real Estate": {
      "Percentage": 10,
      "Reason": "Long-term asset appreciation and potential rental income"
    },
    "Gold": {
      "Percentage": 10,
      "Reason": "Inflation hedge and portfolio diversification"
    }
  },
  "Modifying Your Spends": {
    "Leisure": {
      "Suggestion": "Reduce by 10%",
      "Reason": "Optimize spending for long-term financial goals"
    },
    "Savings": {
      "Suggestion": "Increase by 10%",
      "Reason": "Build a strong financial foundation for future needs"
    }
  }
}. 
Note: This format is just for your reference you can add/remove the keys like Leisure Savings etc. 
If there is need to modify leisure then only give leisure else no need to give it. 
Also you can give suggestion to reduce transport and debt as well if they are higher then normal average percent. 
Make sure the total of spends in each categories equal to 100% And make sure no category spend is 0%. 
Give logical and reasonable reasons dont give vague reasons and make the reasons as concise as possible.
`);
// console.log("result", result.response.text);
    return result.response.text();
  }  

async function extractJson(analysisResult) {
  // Find the index of the first '{' and the last '}'
  const startIndex = analysisResult.indexOf('{');
  const endIndex = analysisResult.lastIndexOf('}');

  // Check if both indices are valid
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      // Slice the string to get the JSON part
      analysisResult = analysisResult.slice(startIndex, endIndex + 1);
      console.log("Extracted JSON:", analysisResult);
  } else {
      console.log("No valid JSON found.");
      analysisResult = null; // Or handle this case as needed
  }

  return analysisResult;
}
//   module.exports = {
//     analyzeFinancialData
//   };
  export default {
    analyzeFinancialData,
    extractJson,
  };