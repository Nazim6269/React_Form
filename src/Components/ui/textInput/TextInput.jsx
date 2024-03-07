import styled from "styled-components";

const TextInput = styled.input`
  outline: none;
  border: 1px solid #000;
  padding: 5px 4px;

  &:focus {
    border: 2px solid #719;
  }
`;

export default TextInput;
