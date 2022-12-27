import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoBoard from "../../component/layout/todo/TodoBoard";
import styles from "../../styles/index.module.scss";
import { db } from "../../javascripts/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const id = uuidv4();
  const todoListCollectionCollectionRef = collection(db, "todo");
  const addData = {
    id,
    inputValue,
    check: false,
  };

  // const getTodos = async () => {
  //   await fetch("/api/getTodo", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((json) => {
  //       console.log(json);
  //       // setTodoList(json.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  // };
  const getTodos = async () => {
    const data = await getDocs(todoListCollectionCollectionRef);
    setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    } else if (changeInputValue.trim() !== "") {
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
          id: addData.id,
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
      const todoDoc = doc(db, "todo", id);
      await deleteDoc(todoDoc);
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

// export const getServerSideProps = async () => {
//   try {
//     const res = await getDocs(todoListCollectionCollectionRef);
//     console.log(res);
//     // const data = await res.data;
//     // console.log(data);
//     return { props: { data } };
//   } catch (error) {
//     return { props: {} };
//   }
// };

export default Todo;
