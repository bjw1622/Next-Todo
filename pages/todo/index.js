import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import TodoBoard from "../../component/layout/todo/TodoBoard";
import styles from "../../styles/index.module.scss";
const Todo = () => {
  const axios = require("axios");
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addData = {
    inputValue,
    check: false,
  };
  const { data } = useSession();
  let email;
  if (data) {
    email = data.user.email;
    console.log(email);
  }
  console.log(email);
  const getTodos = async () => {
    await axios
      .get("/api/todo", {
        params: { emailData: "bjw1622@gmail.com", testData: email },
      })
      .then((res) => {
        setTodoList(res.data.map((doc) => ({ ...doc, id: doc.id })));
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {}, [todoList]);

  const setInputVal = (e) => {
    setInputValue(e.target.value);
  };

  const changeInput = async (id) => {
    const changeInputValue = prompt("수정 내용을 입력해주세요");
    if (changeInputValue !== null) {
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
    } else {
      alert("올바른 값을 입력해주세요.");
    }
    getTodos();
  };

  const checkClick = async (id, check) => {
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
    getTodos();
  };

  const addItem = async () => {
    if (addData.inputValue.trim() !== "") {
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
    } else {
      alert("올바른 값을 입력해주세요");
    }
    setInputValue("");
    getTodos();
  };

  const DeleteList = async (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
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
      getTodos();
    }
  };

  const DeleteTotalList = async () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
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
// export async function getServerSideProps() {
//   let resData;
//   getSession().then((data) => {
//     console.log(data);
//   });
//   await fetch("http://localhost:3000/api/todo", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       resData = data;
//       return data;
//     });
//   return { props: { resData } };
// }

export default Todo;
