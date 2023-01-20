import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useReducer, useState } from "react";
import TodoBoard from "../../component/layout/todo/TodoBoard";
import styles from "../../styles/index.module.scss";
import Loading from "../../component/common/Loading";

const Todo = ({ resData }) => {
  const axios = require("axios");
  const { data } = useSession();
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addData = {
    inputValue,
    check: false,
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTodoList(resData.map((doc) => ({ ...doc, id: doc.id })));
  }, []);

  const setInputVal = (e) => {
    setInputValue(e.target.value);
  };

  const getTodos = async () => {
    setLoading(true);
    await axios
      .get("/api/todo", {
        params: { emailData: data.user.email },
      })
      .then((res) => {
        setTodoList(res.data.map((doc) => ({ ...doc, id: doc.id })));
      });
    setLoading(false);
  };

  const changeInput = async (id) => {
    const changeInputValue = prompt("수정 내용을 입력해주세요");
    if (changeInputValue !== null) {
      setLoading(true);
      await fetch("/api/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          inputValue: changeInputValue,
          emailData: data.user.email,
        }),
      });
      setLoading(false);
    } else {
      alert("올바른 값을 입력해주세요.");
    }
    getTodos();
  };

  const checkClick = async (id, check) => {
    setLoading(true);
    await fetch("/api/checkChangeTodo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        check: check,
        emailData: data.user.email,
      }),
    });
    setLoading(false);
    getTodos();
  };

  const addItem = async () => {
    if (addData.inputValue.trim() !== "") {
      setLoading(true);
      await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputValue: addData.inputValue,
          check: addData.check,
          emailData: data.user.email,
        }),
      });
      setLoading(false);
    } else {
      alert("올바른 값을 입력해주세요");
    }
    setInputValue("");
    getTodos();
  };

  const DeleteList = async (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      setLoading(true);
      await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          emailData: data.user.email,
        }),
      })
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });
      setLoading(false);
      getTodos();
    }
  };

  const DeleteTotalList = async () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
      setLoading(true);
      await fetch("/api/deleteTotalTodo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoList: todoList,
          emailData: data.user.email,
        }),
      });
      setLoading(false);
      setTodoList([]);
    }
  };
  return (
    <>
      {loading ? <Loading /> : null}
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

export async function getServerSideProps(ctx) {
  const sessionData = await getSession(ctx);
  console.log(sessionData);
  if (sessionData) {
    const axios = require("axios");
    const res = await axios.get("https://next-todo-psi.vercel.app/api/todo", {
      params: { emailData: sessionData.user.email },
    });
    const resData = res.data;
    return { props: { resData: resData } };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
    props: {},
  };
}

export default Todo;
