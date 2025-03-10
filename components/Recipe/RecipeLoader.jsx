import { useState, useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { sortRecipes } from "../../utils/loaderUtil";
import Recipes from "./Recipes";

export default function RecipeLoader({
  category = null,
  favorites = false,
  searchTerms = null,
}) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // set querystring
    var query = [];
    if (category) query.push(`category=${category}`);
    if (favorites) query.push("favorites=true");
    if (searchTerms) query.push(`q=${searchTerms}`);
    var queryString = `?${query.join("&")}`;

    // fetch recipes
    setIsLoading(true);
    fetch(`/api/recipes${queryString}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw `${res.status} error`;
      })
      .then((data) => setRecipes(sortRecipes(data)))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [category, favorites, searchTerms]);

  return (
    <Center>
      {isLoading && <Spinner marginTop="1rem" />}
      {!isLoading && <Recipes recipes={recipes} />}
    </Center>
  );
}