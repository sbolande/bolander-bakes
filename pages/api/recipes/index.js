import { MongoClient } from "mongodb";

function filterSearchResults(recipes, searchTerms) {
  const searchTermsArray = searchTerms.split(' ');
  let filteredRecipes = recipes.filter(r => searchTermsArray.some(t => r.name.toLowerCase().includes(t.toLowerCase())));
  return filteredRecipes;
}

export default async function handler(req, res) {
  // fetch query params
  const category = req.query.category;
  const favorites = req.query.favorites;
  const name = req.query.name;
  const ingredients = req.query.ingredients;
  const instructions = req.query.instructions;
  const searchTerms = req.query.q;

  let query = {};
  if (category) query.category = category;
  if (favorites) query.favorite = true;
  if (name) query.name = { $regex: name };
  if (ingredients) query.ingredients = { $regex: ingredients };
  if (instructions) query.instructions = { $regex: instructions };

  try {
    // connect to mongo
    const client = await MongoClient.connect(process.env.MONGO_URL);
    // query collection
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection("recipes");
    const recipes = await collection.find(query).toArray();
    client.close();

    if (recipes === null || recipes.length === 0) {
      console.log("No documents found in db.");
    } else if (searchTerms) {
      const filteredRecipes = filterSearchResults(recipes, searchTerms);
      res.status(200).json(filteredRecipes);
      return;
    }

    res.status(200).json(recipes);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
