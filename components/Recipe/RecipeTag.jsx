import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

export function CategoryTag({ category }) {
  const getCategoryScheme = () => {
    switch (category.toLowerCase()) {
      case "breakfast":
        return "yellow";
      case "lunch":
        return "green";
      case "dinner":
        return "pink";
      case "dessert":
        return "red";
      case "snacks":
        return "purple";
      case "appetizers":
        return "cyan";
      default:
        return "blue";
    }
  };

  return (
    <Tag size="lg" variant="subtle" colorScheme={getCategoryScheme()}>
      <TagLabel>{category}</TagLabel>
    </Tag>
  );
}

export function FavoriteTag() {
  return (
    <Tag size="lg" variant="subtle" colorScheme="teal">
      <TagLabel>Favorite</TagLabel>
      <TagRightIcon as={MdStar} />
    </Tag>
  );
}
