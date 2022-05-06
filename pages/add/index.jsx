import { useState, useRef } from "react";
import { chakra, Button, useToast, VStack } from "@chakra-ui/react";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../components/Form/Input";

export default function Add() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const name = event.target["name"].value;
    const category = event.target["category"].value;
    const ingredients = event.target["ingredients"].value;
    const instructions = event.target["instructions"].value;

    try {
      // TODO: submit to backend
      toast({
        title: `${name} added to ${category}`,
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Oops",
        description: "There was a problem adding that recipe.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <chakra.form
      id="recipeForm"
      margin="auto"
      w="85vw"
      maxW="800px"
      onSubmit={handleSubmit}
    >
      <VStack align="center" spacing="1rem">
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
        <FormTextarea
          label="Ingredients"
          name="ingredients"
          placeholder="..."
        />
        <FormTextarea
          label="Instructions"
          name="instructions"
          placeholder="..."
        />
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isLoading}
          loadingText="Adding"
        >
          Add Recipe
        </Button>
      </VStack>
    </chakra.form>
  );
}
