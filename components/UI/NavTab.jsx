import { Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// import { ChevronDownIcon } from "@chakra-ui/icons";

export function NavTab({ title, baseHref, children }) {
  const isActive = useRouter().pathname.includes(baseHref);

  return (
    <Menu>
      <MenuButton
        _hover={{ textDecor: "none", borderBottomColor: "teal.500" }}
        _focus={{ boxShadow: "none" }}
        padding="0"
        borderBottom="3px solid"
        borderBottomColor={isActive ? "teal.500" : "gray.800"}
      >
        {title}
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
}

export function NavTabItem({ href, children }) {
  const isActive = useRouter().pathname.endsWith(href);

  return (
    <MenuItem
      _hover={{ backgroundColor: isActive ? "teal.600" : "gray.600" }}
      backgroundColor={isActive ? "teal.500" : "gray.700"}
    >
      <NextLink href={href}>{children}</NextLink>
    </MenuItem>
  );
}
