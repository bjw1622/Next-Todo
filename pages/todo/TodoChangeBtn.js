import React from "react";

const TodoChangeBtn = (props) => {
  const changeInput = () => {
    // const changeInputValue = prompt("수정 내용을 입력해주세요");
    // if (changeInputValue !== null) {
    // } else if (changeInputValue === null) {
    //   return;
    // } else if (changeInputValue.trim() === "") {
    //   alert("올바른 값을 입력해주세요.");
    // }
  };
  return (
    <button
      style={{ marginTop: "6px", marginRight: "3px" }}
      variant="contained"
      color="success"
      onClick={changeInput}
    >
      수정
    </button>
  );
};
export default TodoChangeBtn;
