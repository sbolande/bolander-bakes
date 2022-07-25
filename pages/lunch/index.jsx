import { Center } from "@chakra-ui/react";
import RecipeLoader from "../../components/Recipe/RecipeLoader";

export default function Lunch() {
  return (
    <Center>
      <RecipeLoader category="Lunch" />
    </Center>
  );
}
