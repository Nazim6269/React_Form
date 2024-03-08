import styled from "styled-components";

const TextInput = styled.input`
  outline: none;
  border: ${(props) => (props.error ? "2px solid #ff0000" : "1px solid #000")};
  padding: 5px 4px;

  &:focus {
    border: 2px solid #719;
  }
`;

export default TextInput;
