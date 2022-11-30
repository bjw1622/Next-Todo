import moment from "moment";
import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = (props) => {
  return (
    <div>
      {/* {totalList.list.map((item) => {
        if (item.addDate === moment(props.dateValue).format("DD-MM-YYYY")) {
          return <TodoItem />;
        } else {
          return <></>;
        }
      })} */}
    </div>
  );
};
export default TodoBoard;
