import { useState, useEffect } from "react";
import { Center, Spinner, ButtonGroup, Button } from "@chakra-ui/react";
import { sortRecipes } from "../../utils/loaderUtil";
import Recipes from "../Recipe/Recipes";

const showMoreMin = 0;
const showMoreMax = 3;

export default function SearchResultLoader({ searchTerms }) {
  const [showMore, setShowMore] = useState(0);
  const [hideShowMore, setHideShowMore] = useState(true);

  const [matches, setMatches] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch recipes
    setIsLoading(true);
    setHideShowMore(true);
    setShowMore(0);
    fetch(`/api/recipes?q=${searchTerms}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw `${res.status} error`;
      })
      .then((data) => setMatches(data))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        if (matches.showMoreMaxCount > 0) setHideShowMore(false);
      });
  }, [searchTerms]);

  useEffect(() => {
    if (!matches || Object.keys(matches).length === 0) {
      setHideShowMore(true);
      return;
    }

    if (matches.showMoreMaxCount > 0 && showMore < matches.showMoreMaxCount) setHideShowMore(false);
    if (showMore === matches.showMoreMaxCount) setHideShowMore(true);

    // sort after loading recipes
    let results = [];

    results = results.concat(sortRecipes(matches.exactMatch));
    if (showMore >= 1 && matches.closeMatch.length > 0) {
      results = results.concat(sortRecipes(matches.closeMatch));
    } else if (showMore === 1 && matches.closeMatch.length === 0) {
      incrementShowMore();
    }
    if (showMore >= 2 && matches.wordMatch.length > 0) {
      results = results.concat(sortRecipes(matches.wordMatch));
    } else if (showMore === 2 && matches.wordMatch.length === 0) {
      incrementShowMore();
    }
    if (showMore >= 3 && matches.ingredientMatch.length > 0) {
      results = results.concat(sortRecipes(matches.ingredientMatch));
    } else if (showMore === 3 && matches.ingredientMatch.length === 0) {
      incrementShowMore();
    }

    setRecipes(results);
  }, [matches, showMore]);

  const incrementShowMore = () => {
    if (showMore < showMoreMin) setShowMore(showMoreMin);
    if (showMore >= showMoreMax) {
      setShowMore(showMoreMax);
      setHideShowMore(true);
    } else {
      setShowMore(showMore + 1);
    }
  };

  return (
    <>
      <Center>
        {isLoading && <Spinner marginTop="1rem" />}
        {!isLoading && <Recipes recipes={recipes} />}
      </Center>
      {!isLoading && <div>
        {!hideShowMore && <Button onClick={incrementShowMore}>Show more...</Button>}
      </div>}
    </>
  );
}
