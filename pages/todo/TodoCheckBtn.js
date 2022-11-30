import React from "react";

const TodoCheckBtn = (props) => {
  const checkClick = () => {};

  return (
    <>
      <input
        type="checkbox"
        onChange={() => props.checkClick(props.id, props.check)}
        checked={props.check}
      ></input>
      <style jsx>{`
        input {
          width: 30px !important;
        }
      `}</style>
    </>
  );
};
export default TodoCheckBtn;
