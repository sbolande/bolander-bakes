import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  // fetch query params
  const { id } = req.query;

  try {
    // connect to mongo
    const client = await MongoClient.connect(process.env.MONGO_URL);
    // query collection
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection("recipes");
    const recipe = await collection.findOne({ _id: ObjectId(id) });
    client.close();

    console.log(recipe);

    if (recipe === null) {
      console.log("No documents found in db.");
    }
    res.status(200).json(recipe);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
