import PropTypes from "prop-types";
import Container from "../ui/container/Container";
import ErrorMessage from "../ui/errorMessage/ErrorMessage";
import Label from "../ui/textInput/Label";
import TextInput from "../ui/textInput/TextInput";

const InputGroup = ({
  label,
  error,
  name,
  placeholder,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        name={name}
        id={name}
        placeholder={placeholder ?? ""}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        error={error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

///Defining prop types of this component
InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputGroup;
