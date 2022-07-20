import {
  chakra,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

export default function Searchbar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target["search"]?.value);
  };

  return (
    <chakra.form w="100%" maxW="40rem" padding="0 3rem" onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          name="search"
          placeholder="Search recipes"
          focusBorderColor="teal.400"
        />
        <InputRightElement>
          <IconButton as="button" type="submit" color="teal.400">
            <BiSearch />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </chakra.form>
  );
}
