import { VStack } from "@chakra-ui/react";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  IngredientInput,
} from "../../components/Form/Input";

export default function Add() {
  const handleSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <VStack align="center" margin="0 2rem" spacing="1rem">
      <FormInput
        label="Recipe Name"
        name="name"
        type="text"
        placeholder="..."
        autoFocus={true}
        required
      />
      <FormSelect
        label="Category"
        name="category"
        placeholder="-- Choose one --"
        required
      >
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="other">Other</option>
      </FormSelect>
      <FormTextarea label="Ingredients" name="ingredients" placeholder="..." />
      <FormTextarea
        label="Instructions"
        name="instructions"
        placeholder="..."
      />
    </VStack>
  );
}
