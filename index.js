require("dotenv").config();
const { MongoClient } = require("mongodb");
const users = require("./dao/user.dao");
const app = require("./server");

const port = process.env.PORT || 8000;

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("index.js -- after new mongoclient");

const main = async () => {
  try {
    await client.connect();
    await users.initialize(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main().catch(console.error);