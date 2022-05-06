import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Select,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export function FormInput({
  name,
  label,
  type,
  placeholder,
  required,
  autoFocus,
  icon,
}) {
  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor={name} color="teal.300">
        {label}
      </FormLabel>
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none" children={icon} />}
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          focusBorderColor="teal.400"
          required={required}
          autoFocus={autoFocus}
        />
      </InputGroup>
    </FormControl>
  );
}

export function FormTextarea({
  name,
  label,
  placeholder,
  required,
  autoFocus,
}) {
  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor={name} color="teal.300">
        {label}
      </FormLabel>
      <Textarea
        name={name}
        placeholder={placeholder}
        focusBorderColor="teal.400"
        required={required}
        autoFocus={autoFocus}
        minH="8em"
      />
    </FormControl>
  );
}

export function FormSelect({
  name,
  label,
  placeholder,
  required,
  autoFocus,
  children,
}) {
  const [firstRender, setFirstRender] = useState(true);
  const handleChange = () => {
    setFirstRender(false);
  };

  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor={name} color="teal.300">
        {label}
      </FormLabel>
      <Select
        name={name}
        placeholder={firstRender ? placeholder : null}
        onChange={handleChange}
        autoFocus={autoFocus}
        required={required}
        focusBorderColor="teal.400"
      >
        {children}
      </Select>
    </FormControl>
  );
}
