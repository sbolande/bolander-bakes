import {
  chakra,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Stack,
  VStack,
  useDisclosure,
  useBoolean,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { CategoryTag, FavoriteTag } from "./RecipeTag";

import {
  MdStar,
  MdCloseFullscreen,
  MdOpenInFull,
  MdEdit,
} from "react-icons/md";
import { BiTrash } from "react-icons/bi";

export default function Card({
  recipe: {
    _id,
    name,
    imageUrl,
    category,
    time,
    ingredients,
    instructions,
    favorite,
  },
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullscreen, setFullscreen] = useBoolean(false);
  const hasImage = imageUrl !== null && imageUrl !== "";

  const hideImg = (ev) => {
    ev.target.style.display = "none";
  };

  return (
    <>
      <VStack
        id={_id}
        w={{ base: "75vw", sm: "40vw", md: "25vw", lg: "20vw" }}
        justify="space-between"
        border="1px"
        borderColor="gray.500"
        borderRadius="lg"
        padding="0.5rem"
      >
        <Heading
          as="h3"
          fontSize="lg"
          textAlign="center"
          color="teal.200"
          _hover={{ color: "teal.400" }}
          _focus={{ textDecor: "underline" }}
          cursor="pointer"
          onClick={onOpen}
        >
          {name} {favorite && <Icon as={MdStar} color="yellow.100" />}
        </Heading>
        <Center>
          <Button variant="unstyled" onClick={onOpen} h="fit-content">
            {hasImage && (
              <Img
                src={imageUrl}
                alt={name}
                onError={hideImg}
                borderRadius="md"
              />
            )}
          </Button>
        </Center>
        <Text fontSize="sm" alignSelf="start">
          {time}
        </Text>
      </VStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={fullscreen ? "full" : "md"}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text color="teal.300" fontSize="1.6em">
                {name}
              </Text>
              {favorite && <Icon as={MdStar} w={6} h={6} color="yellow.100" />}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="recipeModal">
            <Stack
              direction={{
                base: "column",
                md: fullscreen ? "row-reverse" : "column",
              }}
            >
              {hasImage && (
                <Img
                  src={imageUrl}
                  alt={name}
                  fallbackStrategy="onError"
                  maxH="300px"
                  maxW={fullscreen && "420px"}
                  alignSelf="center"
                  borderRadius="md"
                  objectFit="cover"
                />
              )}
              <VStack align="left" w="100%" spacing="0.8rem">
                <Text>
                  <chakra.strong color="teal.300">Approx Time:</chakra.strong>{" "}
                  {time}
                </Text>
                <Box>
                  <Text color="teal.300" as="strong">
                    Ingredients:
                  </Text>
                  <Text whiteSpace="pre-wrap">{ingredients}</Text>
                </Box>
                <Box>
                  <Text color="teal.300" as="strong">
                    Instructions:
                  </Text>
                  <Text whiteSpace="pre-wrap">{instructions}</Text>
                </Box>
                <HStack align="start" spacing="0.5rem">
                  <CategoryTag category={category} />
                  {favorite && <FavoriteTag />}
                </HStack>
              </VStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="1rem">
              <IconButton
                colorScheme="teal"
                icon={fullscreen ? <MdCloseFullscreen /> : <MdOpenInFull />}
                onClick={setFullscreen.toggle}
              />
              <NextLink href={`/edit/${_id}`} passHref>
                <Link>
                  <IconButton colorScheme="teal" icon={<MdEdit />} />
                </Link>
              </NextLink>
              <NextLink href={`/delete/${_id}`} passHref>
                <Link>
                  <IconButton colorScheme="red" icon={<BiTrash />} />
                </Link>
              </NextLink>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
