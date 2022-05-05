import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ href, style, children }) {
  const isActive = useRouter().pathname === href;

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{ textDecor: "none", borderBottomColor: "teal.500" }}
        _focus={{ boxShadow: "none" }}
        padding="0"
        borderBottom="3px solid"
        borderBottomColor={isActive ? "teal.500" : "gray.800"}
        {...style}
      >
        {children}
      </Link>
    </NextLink>
  );
}
