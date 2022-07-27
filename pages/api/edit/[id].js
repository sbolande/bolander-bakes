import { MongoClient, ObjectId } from "mongodb";

function isSet(val) {
  if (val === null || val === undefined || val === "") {
    return false;
  }
  return true;
}

async function sendToMongo(id, recipe) {
  // conect to mongo
  const client = await MongoClient.connect(process.env.MONGO_URL);
  // insert into collection
  const db = client.db(process.env.MONGO_DB);
  const result = await db
    .collection("recipes")
    .update({ _id: ObjectId(id) }, { $set: { ...recipe } });
  return result;
}

export default async function handler(req, res) {
  console.log(req.query.id);
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only PUT requests allowed." });
    return;
  }

  const pin = req.body.pin;
  if (pin !== process.env.PIN || !isSet(pin)) {
    res.status(401).send({ message: "Incorrect PIN. Only Bolanders allowed." });
    return;
  }

  try {
    console.log(req.body.recipe);
    const { name, category, favorite } = req.body.recipe;

    /** VALIDATION **/
    if (!isSet(name) || !isSet(category)) {
      res.status(400).send({ message: "Name and category must be set." });
      return;
    }
    if (typeof favorite !== "boolean") {
      res.status(400).send({
        message:
          "Favorite must be checked or unchecked; received a non-boolean.",
      });
      return;
    }

    await sendToMongo(req.query.id, req.body.recipe);
    res.status(201).send({ message: `${name} updated successfully` });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
