import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Appetizers() {
  return (
    <Center>
      <RecipeLoader category="Appetizers" />
    </Center>
  );
}
