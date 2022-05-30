import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
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
    setIsLoading(true);
    fetch(`api/recipes${query}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Spinner />}
      {!isLoading && <Recipes recipes={recipes} />}
    </React.Fragment>
  );
}
