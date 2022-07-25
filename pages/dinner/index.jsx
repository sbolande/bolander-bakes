import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Dinner() {
  return (
    <Center>
      <RecipeLoader category="Dinner" />
    </Center>
  );
}
