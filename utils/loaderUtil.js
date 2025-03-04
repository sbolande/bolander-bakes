export function sortRecipes(recipes) {
  recipes.sort((a, b) => {
    // favorites first
    if (a.favorite != b.favorite) {
      return a.favorite < b.favorite ? 1 : -1;
    }

    let textA = a.name?.toUpperCase();
    let textB = b.name?.toUpperCase();
    return textA < textB ? -1 : 1;
  });
  return recipes;
}
