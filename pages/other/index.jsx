import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Other() {
  return (
    <Center>
      <RecipeLoader category="Other" />
    </Center>
  );
}
