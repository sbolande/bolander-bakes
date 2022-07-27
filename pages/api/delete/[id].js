import { MongoClient, ObjectId } from "mongodb";

function isSet(val) {
  if (val === null || val === undefined || val === "") {
    return false;
  }
  return true;
}

async function sendToMongo(id) {
  // conect to mongo
  const client = await MongoClient.connect(process.env.MONGO_URL);
  // insert into collection
  const db = client.db(process.env.MONGO_DB);
  const result = await db.collection("recipes").remove({ _id: ObjectId(id) });
  return result;
}

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).send({ message: "Only DELETE requests allowed." });
    return;
  }

  const pin = req.body.pin;
  if (pin !== process.env.PIN || !isSet(pin)) {
    res.status(401).send({ message: "Incorrect PIN. Only Bolanders allowed." });
    return;
  }

  try {
    await sendToMongo(req.query.id);
    res.status(202).send({ message: `Recipe deleted successfully` });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
