import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../../components/Recipe/RecipeLoader";

export default function Salad() {
  return (
    <Center>
      <RecipeLoader category="Salad" />
    </Center>
  );
}