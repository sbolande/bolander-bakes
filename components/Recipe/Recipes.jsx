import { SimpleGrid, Text } from "@chakra-ui/react";
import Card from "./Card";

export default function Recipes({ recipes }) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing="1rem"
      w="100%"
      padding="1rem"
    >
      {recipes.length === 0 && <Text>No recipes found.</Text>}
      {recipes.length > 0 &&
        recipes.map((r, i) => <Card recipe={r} key={`Recipe_${i}`} />)}
    </SimpleGrid>
  );
}
