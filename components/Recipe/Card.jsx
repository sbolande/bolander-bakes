import {
  chakra,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Tag,
  TagLabel,
  TagRightIcon,
  HStack,
  Icon,
  IconButton,
  Image,
  Center,
  useBoolean,
  Stack,
} from "@chakra-ui/react";

import { MdStar, MdCloseFullscreen, MdOpenInFull } from "react-icons/md";

export default function Card({
  recipe: {
    id,
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

  const getCategoryScheme = () => {
    switch (category.toLowerCase()) {
      case "breakfast":
        return "yellow";
      case "lunch":
        return "green";
      case "dinner":
        return "pink";
      default:
        return "teal";
    }
  };

  return (
    <>
      <VStack
        id={`recipe_${id}`}
        w={{ base: "75vw", sm: "40vw", md: "25vw", lg: "20vw" }}
        justify="space-between"
        border="1px"
        borderColor="gray.500"
        borderRadius="lg"
        padding="0.5rem"
      >
        <Heading as="h3" fontSize="lg" textAlign="center">
          <Button
            variant="unstyled"
            color="teal.200"
            _hover={{ color: "teal.400" }}
            _focus={{ textDecor: "underline" }}
            onClick={onOpen}
            rightIcon={
              favorite ? <Icon as={MdStar} color="yellow.100" /> : <path />
            }
          >
            {name}
          </Button>
        </Heading>
        {hasImage && (
          <Center>
            <Button variant="unstyled" onClick={onOpen} h="fit-content">
              <Image
                src={imageUrl}
                alt={name}
                fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFhJEVjGAVBH-XiKoDa6Ft9NMyqgrY7m86Q&usqp=CAU"
                borderRadius="md"
              />
            </Button>
          </Center>
        )}
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
                <Image
                  src={imageUrl}
                  alt={name}
                  fallbackSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFhJEVjGAVBH-XiKoDa6Ft9NMyqgrY7m86Q&usqp=CAU"
                  fallbackStrategy="onError"
                  boxSize="300px"
                  alignSelf="center"
                  borderRadius="md"
                  fit="cover"
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
                  <Tag
                    size="lg"
                    variant="subtle"
                    colorScheme={getCategoryScheme()}
                  >
                    <TagLabel>{category}</TagLabel>
                  </Tag>
                  {favorite && (
                    <Tag size="lg" variant="subtle" colorScheme="teal">
                      <TagLabel>Favorite</TagLabel>
                      <TagRightIcon as={MdStar} />
                    </Tag>
                  )}
                </HStack>
              </VStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <IconButton
              colorScheme="teal"
              mr="3"
              icon={fullscreen ? <MdCloseFullscreen /> : <MdOpenInFull />}
              onClick={setFullscreen.toggle}
            />
            <Button colorScheme="teal" mr="3" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}