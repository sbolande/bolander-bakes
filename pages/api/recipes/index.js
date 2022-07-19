import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  // connect to mongo
  MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
      console.log("Successfully connected to Mongo.");

      // fetch query params
      const category = req.query.category;
      const favorites = req.query.favorites;
      let query = {};
      if (category) query.category = category;
      if (favorites) query.favorite = true;

      // query collection
      const db = client.db(process.env.MONGO_DB);
      db.collection("recipes")
        .find(query)
        .toArray()
        .then((recipes) => {
          if (recipes === null || recipes.length === 0) {
            console.error("No documents found in db.");
          }

          res.status(200).json(recipes);
        })
        .finally(() => {
          // close client regardless
          client.close();
        });

      return;
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
      return;
    });
}
