import React from "react";
import styled from "styled-components";
import TodoCheckBtn from "./TodoCheckBtn";
import TodoDeleteBtn from "./TodoDeleteBtn";
import TodoChangeBtn from "./TodoChangeBtn";

const TodoItemStyle = styled.div`
   {
    width: 510px;
    height: 50px;
    display: flex;
    margin-top: 2px;
    color: white;
    opacity: ${(props) => (props.check ? "0.3" : "1")};x
  }
`;

const TodoItemInput = styled.h6`
   {
    margin: 15px auto auto auto;
    text-decoration: ${(props) =>
      props.check ? "line-through black 3px" : "none"};
  }
`;

const HrStyle = styled.hr`
   {
    margin: auto;
    border: 1px solid #7c7575;
    width: 90%;
    textalign: center;
  }
`;

const TodoItem = (props) => {
  return (
    <>
      <div>
        <TodoCheckBtn
          id={props.id}
          check={props.check}
          checkClick={props.checkClick}
        />
        <TodoItemInput>{props.item}</TodoItemInput>
        <TodoChangeBtn id={props.id} change={props.change} />
        <TodoDeleteBtn id={props.id} delete={props.delete} />
      </div>
      <style jsx>{`
        div {
          width: 500px;
          height: 50px;
          border: 1px solid dimgray;
          margin: 3px;
          display: flex;
        }
      `}</style>
    </>
  );
};
export default TodoItem;
