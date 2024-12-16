import { useState } from "react";

import { VStack, Heading } from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import RecipeLoader from "../Recipe/RecipeLoader";

export default function Search() {
  const [searchTerms, setSearchTerms] = useState();

  const handleSearch = (val) => {
    console.log(val);
    setSearchTerms(val);
  };

  return (
    <VStack w="100%">
      <Searchbar onSubmit={handleSearch} />
      {searchTerms && (
        <>
          <Heading as="h2" align="center">
            Search Results
          </Heading>
          <RecipeLoader searchTerms={searchTerms} />
        </>
      )}
    </VStack>
  );
}
