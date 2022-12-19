import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoBoard from "../../component/layout/todo/TodoBoard";
import styles from "../../styles/index.module.scss";
//firestore
import { db } from "../../javascripts/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const todo = () => {
  const { default: Axios, default: axios } = require("axios");
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const id = uuidv4();
  const usersCollectionRef = collection(db, "todo");

  const addData = {
    id,
    inputValue,
    check: false,
  };

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(usersCollectionRef);
      setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTodos();
  }, []);

  const setInputVal = (e) => {
    setInputValue(e.target.value);
  };

  const changeInput = async (id) => {
    const changeInputValue = prompt("수정 내용을 입력해주세요");
    if (changeInputValue !== null) {
      const todoDoc = doc(db, "todo", id);
      await updateDoc(todoDoc, { inputValue: changeInputValue });
    } else if (changeInputValue.trim() !== "") {
      alert("올바른 값을 입력해주세요.");
    }
  };

  const checkClick = async (id, check) => {
    const todoDoc = doc(db, "todo", id);
    await updateDoc(todoDoc, { check: !check });
  };

  const addItem = async () => {
    if (addData.inputValue !== null && addData.inputValue.trim() !== "") {
      await addDoc(usersCollectionRef, {
        id: addData.id,
        inputValue: addData.inputValue,
        check: addData.check,
      });
      setInputValue("");
    } else {
      alert("값을 올바르게 입력해주세요");
    }
  };

  const DeleteList = async (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      const todoDoc = doc(db, "todo", id);
      await deleteDoc(todoDoc);
    }
  };

  const DeleteTotalList = async () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
      const todoDoc = doc(db, "todo");
      console.log(todoDoc);
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

export default todo;
