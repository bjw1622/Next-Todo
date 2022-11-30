import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";
import AddList from "./AddList";
import EntryDeleteList from "./EntryDeleteList";
import TodoBoard from "./TodoBoard";

// const TodoListStyle = styled.div`
//    {
//     width: 512px;
//     border-radius: 16px;
//     box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
//     margin: 15px auto 32px auto;
//     background: darkgray;
//     display: flex;
//     flex-direction: column;

//     h1 {
//       margin: 20px 0px 20px 10px;
//       font-size: 36px;
//       color: white;
//     }

//     input {
//       padding: 12px;
//       border-radius: 4px;
//       border: 1px solid #dee2e6;
//       width: 100%;
//       outline: none;
//       font-size: 18px;
//       box-sizing: border-box;
//     }

//     button {
//       margin: 10 auto 0 auto;
//     }
//   }
// `;
const todo = () => {
  // const [inputValue, setInputValue] = useState("");

  // const [value, onChange] = useState(new Date());

  // const id = uuidv4();

  // const addTodoList = () => {};

  // const addData = {
  //   id,
  //   inputValue,
  //   check: false,
  //   addDate: moment(value).format("DD-MM-YYYY"),
  // };

  // const setInputVal = (e) => {
  //   setInputValue(e);
  // };

  return (
    <>
      {/* <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {}}
      /> */}
      <div>
        <h1 style={{ margin: "0 auto", padding: "15px" }}>Todo List</h1>
        <input />
        <AddList></AddList>
        <EntryDeleteList></EntryDeleteList>
        <TodoBoard></TodoBoard>
      </div>
      <style jsx>{`
          div  {
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
      `}</style>
    </>
  );
};
export default todo;
