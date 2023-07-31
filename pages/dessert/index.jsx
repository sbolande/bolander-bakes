import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Dessert() {
  return (
    <Center>
      <RecipeLoader category="Dessert" />
    </Center>
  );
}
