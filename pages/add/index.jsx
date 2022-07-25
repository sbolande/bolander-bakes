import { useState } from "react";
import { chakra, Button, useToast, VStack } from "@chakra-ui/react";
import {
  FormCheckbox,
  FormInput,
  FormPin,
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
      const imageUrl = event.target["imageUrl"]?.value;
      const time = event.target["time"]?.value;
      const ingredients = event.target["ingredients"]?.value;
      const instructions = event.target["instructions"]?.value;
      const favorite = event.target["favorite"]?.checked;
      // build PIN from inputs
      const pin1 = event.target["pin_1"]?.value;
      const pin2 = event.target["pin_2"]?.value;
      const pin3 = event.target["pin_3"]?.value;
      const pin4 = event.target["pin_4"]?.value;
      const pin = `${pin1}${pin2}${pin3}${pin4}`;

      const res = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          name,
          category,
          imageUrl,
          time,
          ingredients,
          instructions,
          favorite,
          pin,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(`${res.status}: ${data.message}`);

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
      <VStack align="center" spacing="0.6rem" marginBottom="0.6rem">
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
          label="Image URL"
          name="imageUrl"
          type="url"
          placeholder="https://www.food.com/hamburger.jpg"
        />
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
        <FormPin name="pin" />
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
