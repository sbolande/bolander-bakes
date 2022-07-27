import { useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Select,
  Checkbox,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

export function FormInput({
  name,
  label,
  type,
  placeholder,
  required,
  autoFocus,
  icon,
  value,
}) {
  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor={name} color="teal.300">
        {label}
      </FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        )}
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          focusBorderColor="teal.400"
          required={required}
          autoFocus={autoFocus}
          defaultValue={value}
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
  value,
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
        defaultValue={value}
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
  value,
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
        defaultValue={value}
      >
        {children}
      </Select>
    </FormControl>
  );
}

export function FormCheckbox({ name, label, icon, isChecked = false }) {
  const [showIcon, setShowIcon] = useState(isChecked);
  return (
    <Checkbox
      name={name}
      colorScheme="teal"
      icon={showIcon ? icon : <path />}
      onChange={(e) => setShowIcon(e.target.checked)}
      isChecked={showIcon}
    >
      {label}
    </Checkbox>
  );
}

export function FormPin({ name }) {
  return (
    <HStack>
      <PinInput colorScheme="teal">
        <PinInputField name={`${name}_1`} required />
        <PinInputField name={`${name}_2`} required />
        <PinInputField name={`${name}_3`} required />
        <PinInputField name={`${name}_4`} required />
      </PinInput>
    </HStack>
  );
}
