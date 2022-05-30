import { useState } from "react";
import { chakra, Button, useToast, VStack } from "@chakra-ui/react";
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../components/Form/Input";

import { FaStar } from "react-icons/fa";

export default function Add() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const name = event.target["name"]?.value;
      const category = event.target["category"]?.value;
      const time = event.target["time"]?.value;
      const ingredients = event.target["ingredients"]?.value;
      const instructions = event.target["instructions"]?.value;
      const favorite = event.target["favorite"]?.checked;

      const res = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          name,
          category,
          time,
          ingredients,
          instructions,
          favorite,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status !== 200)
        throw new Error(`${res.status} Error: ${data.message}`);

      toast({
        title: data.message,
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "There was a problem adding that recipe!",
        description: err.message,
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
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Other">Other</option>
        </FormSelect>
        <FormInput
          label="Time"
          name="time"
          type="text"
          placeholder="30 minutes"
        />
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
        <FormCheckbox label="Favorite?" name="favorite" icon={<FaStar />} />
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
