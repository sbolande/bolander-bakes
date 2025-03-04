export function filterSearchResults(recipes, searchTerms) {
  const filteredRecipes = {
    exactMatch: [],
    closeMatch: [],
    wordMatch: [],
    ingredientMatch: [],
    showMoreMaxCount: -1,
  };

  searchTerms = searchTerms.toLowerCase();
  const searchTermsArray = searchTerms.split(" ");

  recipes.forEach((r) => {
    let name = r.name.toLowerCase();

    if (name.startsWith(searchTerms)) {
      filteredRecipes.exactMatch.push(r);
      filteredRecipes.showMoreMaxCount++;
      return;
    }
    if (name.includes(searchTerms)) {
      filteredRecipes.closeMatch.push(r);
      filteredRecipes.showMoreMaxCount++;
      return;
    }
    if (searchTermsArray.some((t) => name.includes(t))) {
      filteredRecipes.wordMatch.push(r);
      filteredRecipes.showMoreMaxCount++;
      return;
    }
    if (searchTermsArray.some((t) => r.ingredients.toLowerCase().includes(t))) {
      filteredRecipes.ingredientMatch.push(r);
      filteredRecipes.showMoreMaxCount++;
      return;
    }
  });

  return filteredRecipes;
}
