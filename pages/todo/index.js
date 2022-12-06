import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoBoard from "../../component/layout/todo/TodoBoard";
const { default: Axios } = require("axios");

const todo = ({ data }) => {
  const [inputValue, setInputValue] = useState("");

  const [todoList, setTodoList] = useState([]);

  const id = uuidv4();

  const addData = {
    id,
    inputValue,
    check: false,
  };

  // const getTodoList = async () => {
  //   await Axios.get("http://localhost:3001/todo").then((res) => {
  //     setTodoList(res.data);
  //   });
  // };

  // //client side rendering => server side rendering
  // // 클라이언트 페이지가
  useEffect(() => {
    setTodoList(data);
    // getTodoList();
  }, []);

  const changeInput = (id) => {
    const changeInputValue = prompt("수정 내용을 입력해주세요");
    if (changeInputValue !== null) {
      Axios.put("http://localhost:3001/todoInputValue", {
        data: { Id: id, InputValue: changeInputValue },
      }).then((res) => {
        setTodoList(res.data);
      });
    } else if (changeInputValue.trim() !== "") {
      alert("올바른 값을 입력해주세요.");
    }
  };

  const checkClick = (id, check) => {
    Axios.put("http://localhost:3001/todoCheckValue", {
      data: { Id: id },
    }).then((res) => {
      setTodoList(res.data);
    });
  };

  const setInputVal = (e) => {
    setInputValue(e.target.value);
  };

  const addItem = async () => {
    if (addData.inputValue !== null && addData.inputValue.trim() !== "") {
      await Axios.post("http://localhost:3001/todo", addData).then((res) => {
        setTodoList(res.data);
      });
      setInputValue("");
    } else {
      alert("값을 올바르게 입력해주세요");
    }
  };

  const DeleteList = (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      Axios.delete("http://localhost:3001/todo", { data: { Id: id } }).then(
        (res) => {
          setTodoList(res.data);
        }
      );
    }
  };

  const DeleteTotalList = () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
      Axios.delete("http://localhost:3001/todoEntry").then((res) => {
        setTodoList(res.data);
      });
    }
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <input type="text" onChange={setInputVal} value={inputValue} />
        <button variant="contained" onClick={addItem}>
          추가
        </button>
        <button variant="contained" color="error" onClick={DeleteTotalList}>
          전체 삭제
        </button>
        <TodoBoard
          todoList={todoList}
          delete={DeleteList}
          change={changeInput}
          checkClick={checkClick}
        />
      </div>
      <style jsx>{`
        div {
          width: 512px;
          border-radius: 16px;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
          margin: 15px auto 32px auto;
          background: darkgray;
          display: flex;
          flex-direction: column;
        }
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

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3001/todo`, { method: "GET" });
  const data = await res.json();
  return { props: { data } };
}

export default todo;
