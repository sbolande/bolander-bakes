import { HStack } from "@chakra-ui/react";
import NavLink from "../UI/NavLink";

export default function Navbar() {
  return (
    <HStack
      fontSize="1.15rem"
      padding="0.15rem 1rem 0 1rem"
      marginBottom="1rem"
      boxShadow="0 0.1rem 0.5rem #0b0b0b"
      justify="space-between"
    >
      <NavLink href="/">Home</NavLink>
      <NavLink href="/breakfast">Breakfast</NavLink>
      <NavLink href="/lunch">Lunch</NavLink>
      <NavLink href="/dinner">Dinner</NavLink>
      <NavLink href="/other">Other</NavLink>
    </HStack>
  );
}
