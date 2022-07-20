import { useState } from "react";

import { VStack, Heading } from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import RecipeLoader from "../Recipe/RecipeLoader";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState();

  const handleSearch = (val) => {
    console.log(val);
    setSearchTerm(val);
  };

  return (
    <VStack w="100%">
      <Searchbar onSubmit={handleSearch} />
      {searchTerm && (
        <>
          <Heading as="h2" align="center">
            Search Results
          </Heading>
          <RecipeLoader searchTerm={searchTerm} />
        </>
      )}
    </VStack>
  );
}
