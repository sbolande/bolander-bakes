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
import { FormCheckbox, FormPin } from "../../components/Form/Input";

import { BiTrash } from "react-icons/bi";

export default function Delete() {
  const router = useRouter();
  const { id } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDeleting(true);

    const authorized = event.target["authorize"]?.checked;
    if (authorized) {
      // build PIN from inputs
      const pin1 = event.target["pin_1"]?.value;
      const pin2 = event.target["pin_2"]?.value;
      const pin3 = event.target["pin_3"]?.value;
      const pin4 = event.target["pin_4"]?.value;
      const pin = `${pin1}${pin2}${pin3}${pin4}`;

      fetch(`/api/delete/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          authorized,
          pin,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(async (res) => {
          let data = await res.json();
          if (!res.ok) throw new Error(`${res.status}: ${data.message}`);
          return data;
        })
        .then((data) => {
          toast({
            title: data.message,
            status: "success",
            isClosable: true,
          });
          setTimeout(() => {
            router.push("/");
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "There was a problem deleting that recipe!",
            description: err.message,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => setIsDeleting(false));
    } else {
      setIsDeleting(false);
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
          id="deleteForm"
          margin="auto"
          w="85vw"
          maxW="800px"
          onSubmit={handleSubmit}
        >
          <VStack align="center" spacing="0.6rem" marginBottom="0.6rem">
            <FormCheckbox
              label={`Are you sure you want to delete ${recipe.current?.name}?`}
              name="authorize"
              icon={<BiTrash />}
              onChange={(val) => {
                setIsAuthorized(val);
              }}
            />
            <FormPin name="pin" />
            <Button
              type="submit"
              colorScheme="red"
              isLoading={isDeleting}
              loadingText="Deleting"
              disabled={!isAuthorized}
            >
              Delete Recipe
            </Button>
          </VStack>
        </chakra.form>
      )}
    </>
  );
}
