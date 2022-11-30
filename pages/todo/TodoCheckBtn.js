import React from "react";
import styled from "styled-components";
const TodoCheckBtnSyled = styled.input`
   {
    width: 30px !important;
  }
`;
const TodoCheckBtn = (props) => {
  const checkClick = () => {};

  return (
    <TodoCheckBtnSyled
      type="checkbox"
      onChange={checkClick}
      checked={props.check}
    ></TodoCheckBtnSyled>
  );
};
export default TodoCheckBtn;
