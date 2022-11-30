import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const TodoListStyle = styled.div`
   {
    width: 512px;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    margin: 15px auto 32px auto;
    background: darkgray;
    display: flex;
    flex-direction: column;

    h1 {
      margin: 20px 0px 20px 10px;
      font-size: 36px;
      color: white;
    }

    input {
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #dee2e6;
      width: 100%;
      outline: none;
      font-size: 18px;
      box-sizing: border-box;
    }

    button {
      margin: 10 auto 0 auto;
    }
  }
`;
const todo = () => {
  return <TodoListStyle></TodoListStyle>;
};
export default todo;
