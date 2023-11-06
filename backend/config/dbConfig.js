import mongoose from "mongoose";

const connect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
      });
      console.log("Database Connected");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  

export default connect