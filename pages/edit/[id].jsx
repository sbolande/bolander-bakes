import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  chakra,
  Button,
  useToast,
  VStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import {
  FormCheckbox,
  FormInput,
  FormPin,
  FormSelect,
  FormTextarea,
} from "../../components/Form/Input";

import { FaStar } from "react-icons/fa";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [isFetching, setIsFetching] = useState(false);

  const recipe = useRef();

  useEffect(() => {
    if (id) {
      // fetch recipe
      setIsFetching(true);
      fetch(`/api/recipes/${id}`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw `${res.status} error`;
        })
        .then((data) => {
          recipe.current = data;
        })
        .catch((err) => console.error(err))
        .finally(() => setIsFetching(false));
    }
  }, [id]);

  /******************** HANDLE SUBMIT ********************/
  const [isPutting, setIsPutting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPutting(true);

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

      const res = await fetch(`/api/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          recipe: {
            name,
            category,
            imageUrl,
            time,
            ingredients,
            instructions,
            favorite,
          },
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
      setIsPutting(false);
    }
  };

  return (
    <>
      {isFetching && (
        <Center>
          <Spinner marginTop="1rem" />
        </Center>
      )}
      {!isFetching && (
        <chakra.form
          id="editForm"
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
              value={recipe.current?.name}
            />
            <FormSelect
              label="Category"
              name="category"
              placeholder="-- Choose one --"
              required
              value={recipe.current?.category}
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
              value={recipe.current?.imageUrl}
            />
            <FormInput
              label="Time"
              name="time"
              type="text"
              placeholder="30 minutes"
              value={recipe.current?.time}
            />
            <FormTextarea
              label="Ingredients"
              name="ingredients"
              placeholder="..."
              value={recipe.current?.ingredients}
            />
            <FormTextarea
              label="Instructions"
              name="instructions"
              placeholder="..."
              value={recipe.current?.instructions}
            />
            <FormCheckbox
              label="Favorite?"
              name="favorite"
              icon={<FaStar />}
              isChecked={recipe.current?.favorite}
            />
            <FormPin name="pin" />
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isPutting}
              loadingText="Updating"
            >
              Update Recipe
            </Button>
          </VStack>
        </chakra.form>
      )}
    </>
  );
}
