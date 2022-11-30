import React from "react";
const TodoChangeBtn = (props) => {
  const changeInput = () => {};
  return (
    <button
      onClick={() => {
        props.change(props.id);
      }}
    >
      수정
    </button>
  );
};
export default TodoChangeBtn;
