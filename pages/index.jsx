import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  HStack,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import RecipeLoader from "../components/Recipe/RecipeLoader";

import { TiPlus } from "react-icons/ti";
import Search from "../components/Search/Search";

export default function Home() {
  return (
    <VStack align="center" spacing="2rem" margin="1rem">
      <Box align="center">
        <Heading as="h1" color="teal.300" fontSize="2.3em">
          Bolander Bakes
        </Heading>
        <Text>What's cookin' good lookin?</Text>
      </Box>
      <NextLink href="/add" passHref>
        <Link
          as="h2"
          fontSize="1.5em"
          color="teal.200"
          _hover={{ color: "teal.300" }}
        >
          <HStack spacing="0.1rem">
            <Icon as={TiPlus} />
            <Text as="button">Add New Recipe</Text>
          </HStack>
        </Link>
      </NextLink>
      <Search />
      <Box>
        <Heading as="h2" align="center">
          Favorites
        </Heading>
        <RecipeLoader favorites={true} freezeOnLoad />
      </Box>
    </VStack>
  );
}
