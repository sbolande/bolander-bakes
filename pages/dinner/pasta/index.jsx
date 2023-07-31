import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../../components/Recipe/RecipeLoader";

export default function Pasta() {
  return (
    <Center>
      <RecipeLoader category="Pasta" />
    </Center>
  );
}
