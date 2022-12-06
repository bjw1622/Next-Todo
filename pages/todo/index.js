import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoBoard from "../../component/layout/todo/TodoBoard";
import styles from "../../styles/index.module.scss";
const { default: Axios, default: axios } = require("axios");

const todo = ({ data }) => {
  const [inputValue, setInputValue] = useState("");

  const [todoList, setTodoList] = useState([]);

  const id = uuidv4();

  const addData = {
    id,
    inputValue,
    check: false,
  };

  useEffect(() => {
    // setTodoList(data);
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
      <div className={styles.todoList}>
        <h1 className={styles.todoTitle}>Todo List</h1>
        <input
          className={styles.todoInput}
          type="text"
          onChange={setInputVal}
          value={inputValue}
        />
        <button
          className={styles.todoBtn}
          variant="contained"
          onClick={addItem}
        >
          추가
        </button>
        <button
          className={styles.todoBtn}
          variant="contained"
          color="error"
          onClick={DeleteTotalList}
        >
          전체 삭제
        </button>
        <TodoBoard
          todoList={todoList}
          delete={DeleteList}
          change={changeInput}
          checkClick={checkClick}
        />
      </div>
    </>
  );
};

// Axios(csr), getServersideProps(ssr), getStaticProps(ssg)
//getStaticProps => ssg (첫 빌드시에만)
// export const getServerSideProps = async () => {
//   try {
//     const res = await Axios.get(`http://localhost:3001/todo`);
//     const data = await res.data;
//     return { props: { data } };
//   } catch (error) {
//     console.log("-----error-----");
//     return { props: {} };
//   }
// };
export default todo;
