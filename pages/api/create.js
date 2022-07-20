import { MongoClient } from "mongodb";
import requestIp from "request-ip";

function isSet(val) {
  if (val === null || val === undefined || val === "") {
    return false;
  }
  return true;
}

async function sendToMongo(recipe) {
  // conect to mongo
  const client = await MongoClient.connect(process.env.MONGO_URL);
  // insert into collection
  const db = client.db(process.env.MONGO_DB);
  const result = await db.collection("recipes").insertOne(recipe);
  return result;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed." });
    return;
  }

  const ip = requestIp.getClientIp(req);
  console.log(ip);
  if (ip !== process.env.TEST_IP && ip !== process.env.SETH_IP) {
    res.status(401).send({ message: "Unauthorized, only Bolanders allowed!" });
  }

  try {
    console.log(req.body);
    const { name, category, favorite } = req.body;

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

    await sendToMongo(req.body);
    res.status(201).send({
      message: `${name} added to ${category}${
        favorite ? " and Favorites" : ""
      }`,
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
