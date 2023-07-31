import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Snacks() {
  return (
    <Center>
      <RecipeLoader category="Snacks" />
    </Center>
  );
}
