import { useState, useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
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
    if (showMore >= 1) {
      results = results.concat(sortRecipes(matches.closeMatch));
    }
    if (showMore >= 2) {
      results = results.concat(sortRecipes(matches.wordMatch));
    }
    if (showMore >= 3) {
      results = results.concat(sortRecipes(matches.ingredientMatch));
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
  const decrementShowMore = () => {
    if (showMore > showMoreMax) setShowMore(showMoreMax);
    if (showMore <= showMoreMin) {
      setShowMore(showMoreMin);
    } else {
      setShowMore(showMore - 1);
      setHideShowMore(false);
    }
  };

  return (
    <Center>
      {isLoading && <Spinner marginTop="1rem" />}
      {!isLoading && <Recipes recipes={recipes} />}
      {!isLoading && <div>
        {!hideShowMore && <p onClick={incrementShowMore}>Show more...</p>}
        {(!hideShowMore && showMore > 0) && <p onClick={decrementShowMore}>Show less...</p>}
      </div>}
    </Center>
  );
}
