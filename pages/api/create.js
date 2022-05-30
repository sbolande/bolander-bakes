function isSet(val) {
  if (val === null || val === undefined || val === "") {
    return false;
  }
  return true;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed." });
    return;
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

    // TODO: send data to Mongo
    res.status(200).send({
      message: `${name} added to ${category}${
        favorite ? " and Favorites" : ""
      }`,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
