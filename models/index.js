import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

try {
    mongoose.connect(`mongodb+srv://ankuringole98:150398@finchatbot.kzwg0wc.mongodb.net/?retryWrites=true&w=majority&appName=FinChatBot`);
    console.log("mongoose connected successfully");
} catch (error) {
    console.log(error);
}

export default mongoose;