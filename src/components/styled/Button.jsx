import styled from "styled-components";

const Button = styled.button`
  height: 40px;
  border: none;
  background-color: rgba(20, 65, 80, 1);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  padding: 0 15px;
  color: white;
  :hover {
    background-color: rgba(20, 65, 80, 0.7);
  }
  cursor: pointer;
  transition: 0.1s ease-in;
  :disabled {
    background-color: rgba(76, 80, 82, 0.7);
    cursor: not-allowed;
  }

  ${props => {
    return `
      color: ${props.greaterThanFive? "black": "white"}
    `
  }}

`;

export default Button;
