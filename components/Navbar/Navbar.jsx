import { HStack, MenuItem } from "@chakra-ui/react";
import NavLink from "../UI/NavLink";
import { NavTab, NavTabItem } from "../UI/NavTab";

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
      <NavTab title="Dinner" baseHref="/dinner">
        <NavTabItem href="/dinner">All Dinners</NavTabItem>
        <NavTabItem href="/dinner/pasta">Pasta</NavTabItem>
        <NavTabItem href="/dinner/seafood">Seafood</NavTabItem>
        <NavTabItem href="/dinner/salad">Salad</NavTabItem>
        <NavTabItem href="/dinner/mexican">Mexico</NavTabItem>
      </NavTab>
      <NavLink href="/dessert">Dessert</NavLink>
      <NavLink href="/snacks">Snacks</NavLink>
      <NavLink href="/appetizers">Appetizers</NavLink>
      <NavLink href="/other">Other</NavLink>
    </HStack>
  );
}
