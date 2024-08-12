/*
* Install the Generative AI SDK
*
* $ npm install @google/generative-ai
*/
 
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
   
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
   
//   async function run() {
//     const chatSession = model.startChat({
//       generationConfig,
//   // safetySettings: Adjust safety settings
//   // See https://ai.google.dev/gemini-api/docs/safety-settings
//       history: [
//       ],
//     });
   
//     const result = await chatSession.sendMessage(`My name is Shobheet. I am 23 years old. My income is 20 LPA. 
//         My spends is as following: 
//         Debt- 20% 
//         Essentials- 20%
//         Healthcare- 20%
//         Leisure- 10%
//         Savings- 5%
//         Transport- 25%
// Now based on my age, income and spends in each categories analyze it based on the financial guidlines and rules. 
// Give me only Investment Allocation and Modifying Your Spends. 
// I don't need any additional information. 
// Can you send response in json key value object pass only the json in the format like
// {
//   "Investment Allocation": {
//     "Equity": {
//       "Percentage": 60,
//       "Reason": "Higher growth potential for long-term wealth creation"
//     },
//     "Debt": {
//       "Percentage": 20,
//       "Reason": "Provides stability and income generation"
//     },
//     "Real Estate": {
//       "Percentage": 10,
//       "Reason": "Long-term asset appreciation and potential rental income"
//     },
//     "Gold": {
//       "Percentage": 10,
//       "Reason": "Inflation hedge and portfolio diversification"
//     }
//   },
//   "Modifying Your Spends": {
//     "Leisure": {
//       "Suggestion": "Reduce by 10%",
//       "Reason": "Optimize spending for long-term financial goals"
//     },
//     "Savings": {
//       "Suggestion": "Increase by 10%",
//       "Reason": "Build a strong financial foundation for future needs"
//     }
//   }
// }. 
// Note: This format is just for your reference you can add/remove the keys like Leisure Savings etc. 
// If there is need to modify leisure then only give leisure else no need to give it. 
// Also you can give suggestion to reduce transport and debt as well if they are higher then normal average percent. 
// Make sure the total of spends in each categories equal to 100% And make sure no category spend is 0%. 
// Give logical and reasonable reasons dont give vague reasons and make the reasons as concise as possible.
// `);
//     console.log(result.response.text());
//   }

   
//   run();

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

async function analyzeGoalData(name, age, income, essential, savings, leisure, healthcare, debt, transport) {
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
   
  module.exports = {
    analyzeFinancialData,
    analyzeGoalData
  };