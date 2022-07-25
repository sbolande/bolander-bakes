import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Breakfast() {
  return (
    <Center>
      <RecipeLoader category="Breakfast" />
    </Center>
  );
}
