import { useState, useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import Recipes from "./Recipes";

export default function RecipeLoader({ category = null, favorites = false }) {
  var query = null;
  if (category) query = `?category=${category}`;
  if (favorites) {
    if (!query) query = "?favorites=true";
    else query += "&favorites=true";
  }

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (recipes.length > 0) return;
    setIsLoading(true);
    fetch(`api/recipes${query}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw `${res.status} error`;
      })
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Center>
      {isLoading && <Spinner marginTop="1rem" />}
      {!isLoading && <Recipes recipes={recipes} />}
    </Center>
  );
}
