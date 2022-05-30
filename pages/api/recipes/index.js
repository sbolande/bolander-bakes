export default async function handler(req, res) {
  try {
    const category = req.query.category;
    const favorites = req.query.favorites;

    // TODO: fetch data to Mongo
    let recipes = [
      {
        id: 1,
        name: "Poop on a Stick",
        category: "Breakfast",
        time: "10 minutes",
        ingredients: "- Poop\n- Stick",
        instructions: "Put poop on stick, enjoy.",
        favorite: true,
      },
      {
        id: 2,
        name: "Poop on a Stick",
        category: "Dinner",
        time: "10 minutes",
        ingredients: "- Poop\n- Stick",
        instructions: "Put poop on stick, enjoy.",
        favorite: false,
      },
      {
        id: 3,
        name: "Poop on a Stick",
        category: "Lunch",
        time: "10 minutes",
        ingredients: "- Poop\n- Stick",
        instructions: "Put poop on stick, enjoy.",
        favorite: false,
      },
      {
        id: 4,
        name: "Poop on a Stick",
        category: "Breakfast",
        time: "10 minutes",
        ingredients: "- Poop\n- Stick",
        instructions: "Put poop on stick, enjoy.",
        favorite: false,
      },
    ];

    if (category) {
      recipes = recipes.filter(
        (r) => r.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (favorites) {
      recipes = recipes.filter((r) => r.favorite);
    }

    res.status(200).json(recipes);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error." });
    return;
  }
}
