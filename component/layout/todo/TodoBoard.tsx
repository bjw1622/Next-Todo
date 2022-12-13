import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = (props: {
  todoList: [];
  change: {};
  delete: {};
  checkClick: {};
}) => {
  console.log(props);
  return (
    <div>
      {props.todoList.map(
        (item: { id: string; inputValue: string; check: boolean }) => {
          console.log(item);
          return (
            <TodoItem
              key={item.id}
              item={item.inputValue}
              delete={props.delete}
              id={item.id}
              check={item.check}
              checkClick={props.checkClick}
              change={props.change}
            />
          );
        }
      )}
    </div>
  );
};
export default TodoBoard;
