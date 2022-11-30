import React from "react";

const TodoDeleteBtn = (props) => {
  const DeleteList = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
    }
  };
  return (
    <button
      style={{ marginTop: "6px" }}
      variant="contained"
      color="error"
      onClick={() => DeleteList()}
    >
      삭제
    </button>
  );
};
export default TodoDeleteBtn;
