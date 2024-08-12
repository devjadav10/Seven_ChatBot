// console.log("hello world");

const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const {analyzeFinancialData, analyzeGoalData} = require('./gemini')
const {goalAnalysis} = require('./goal');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/analyze', async (req, res) => {
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
    console.log("Analysis Result", analysisResult);
      const parsedResult = JSON.parse(analysisResult);
    //   res.status(200).json({ response: parsedResult });
    res.status(200).json(parsedResult);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/analyzeGoal', async (req, res) => {
    try {
        console.log("Start");
    //   const { message } = req.body; // Expecting { "message": "..." }
      const {name, age, income, essential, savings, leisure, healthcare, debt, transport} = req.query;
      
      if (!name || !age || !income || !essential || !savings || !leisure || !healthcare ||!debt || !transport){
        res.status(400).json({error:"Missing Required Params"});
      }
    //   res.send('Hello NODE API');
      let analysisResult = await analyzeGoalData(name, age, income, essential, savings, leisure, healthcare, debt, transport);
      console.log("Analysis Result", analysisResult);
      if (analysisResult.startsWith('```json') || analysisResult.endsWith('```')) {
        console.log("Inside slice");
        analysisResult = analysisResult.slice(7, -3); // Remove the leading and trailing backticks
        }
    console.log("Analysis Result", analysisResult);
      const parsedResult = JSON.parse(analysisResult);
    //   res.status(200).json({ response: parsedResult });
    res.status(200).json(parsedResult);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

app.get('/goal', async(req, res) => {
    try{
        const { amount, time, returns } = req.query;
      if (!amount || !time || !returns ){
        res.status(400).json({error:"Missing Required Params"});
      }
      let goalResult = await goalAnalysis(amount, time, returns);
      console.log("Goal Result", goalResult);
      res.status(200).json(goalResult);

    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});  
  
mongoose.
connect('mongodb+srv://ankuringole98:150398@finchatbot.kzwg0wc.mongodb.net/?retryWrites=true&w=majority&appName=FinChatBot')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})
