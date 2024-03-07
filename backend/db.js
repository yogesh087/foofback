const mongoose = require('mongoose');

const mongoUrl = "mongodb://gofood:8957941422@ac-menxgwz-shard-00-00.9l4ypag.mongodb.net:27017,ac-menxgwz-shard-00-01.9l4ypag.mongodb.net:27017,ac-menxgwz-shard-00-02.9l4ypag.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-j6jc9k-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected');
    const collection = mongoose.connection.collection('fooditems');
    const data = await collection.find({}).toArray();
    const foodcategory = mongoose.connection.collection('foodlist');
    const catdata = await foodcategory.find({}).toArray();
    global.food = data;
    global.foodcat = catdata;
    console.log(global.food);
    console.log(global.foodcat);
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

module.exports = connectToDatabase;
