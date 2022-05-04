import { HStack } from "@chakra-ui/react";
import NavLink from "../UI/NavLink";

export default function Navbar() {
  return (
    <HStack
      fontSize="1.2rem"
      paddingTop="0.25rem"
      marginBottom="1rem"
      boxShadow="0 0.1rem 0.5rem #0b0b0b"
      justify={["space-around", "start"]}
      spacing={["0", "2rem"]}
      paddingLeft={["0", "2rem"]}
    >
      <NavLink href="/">Home</NavLink>
      <NavLink href="/breakfast">Breakfast</NavLink>
      <NavLink href="/lunch">Lunch</NavLink>
      <NavLink href="/dinner">Dinner</NavLink>
      <NavLink href="/other">Other</NavLink>
    </HStack>
  );
}
