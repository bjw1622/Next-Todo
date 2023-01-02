import React, { useEffect, useState } from "react";
import TodoBoard from "../../component/layout/todo/TodoBoard";
import styles from "../../styles/index.module.scss";
import { useSession } from "next-auth/react";
import Router from "next/router";
const Todo = ({ resData }) => {
  const { data } = useSession();
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addData = {
    inputValue,
    check: false,
  };
  if (data === null) {
    alert("로그인 해주세요.");
    Router.push("/LoginBtn");
    return;
  }
  const getTodos = async () => {
    await fetch("/api/getTodo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodoList(data.map((doc) => ({ ...doc, id: doc.id })));
      });
  };

  useEffect(() => {
    setTodoList(resData.map((doc) => ({ ...doc, id: doc.id })));
  }, []);

  useEffect(() => {}, [todoList]);

  const setInputVal = (e) => {
    setInputValue(e.target.value);
  };

  const changeInput = async (id) => {
    const changeInputValue = prompt("수정 내용을 입력해주세요");
    if (changeInputValue !== null) {
      await fetch("/api/inputChangeTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          inputValue: changeInputValue,
        }),
      });
    } else {
      alert("올바른 값을 입력해주세요.");
    }
    getTodos();
  };

  const checkClick = async (id, check) => {
    await fetch("/api/checkChangeTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        check: check,
      }),
    });
    getTodos();
  };

  const addItem = async () => {
    if (addData.inputValue.trim() !== "") {
      await fetch("/api/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputValue: addData.inputValue,
          check: addData.check,
        }),
      });
    } else {
      alert("올바른 값을 입력해주세요");
    }
    setInputValue("");
    getTodos();
  };

  const DeleteList = async (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      await fetch("/api/deleteTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });
      getTodos();
    }
  };

  const DeleteTotalList = async () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
      await fetch("/api/deleteTotalTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoList: todoList,
        }),
      })
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });
      setTodoList([]);
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

export async function getServerSideProps() {
  let resData;
  await fetch("http://localhost:3000/api/getTodo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      resData = data;
      return data;
    });
  return { props: { resData } };
}

export default Todo;
