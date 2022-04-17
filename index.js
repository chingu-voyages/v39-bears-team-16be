require("dotenv").config();
const app = require("./server.js");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 8000;
const UserModel = require("./models/users.model.js");

const connect = async () => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    await UserModel.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

connect().catch(console.error);
