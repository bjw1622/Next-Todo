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
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const id = uuidv4();
  const todoListCollectionCollectionRef = collection(db, "todo");
  const addData = {
    id,
    inputValue,
    check: false,
  };

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
      const todoDoc = doc(db, "todo", id);
      await updateDoc(todoDoc, { inputValue: changeInputValue });
      getTodos();
    } else if (changeInputValue.trim() !== "") {
      alert("올바른 값을 입력해주세요.");
    }
  };

  const checkClick = async (id, check) => {
    const todoDoc = doc(db, "todo", id);
    await updateDoc(todoDoc, { check: !check });
    getTodos();
  };

  const addItem = async () => {
    if (addData.inputValue !== null && addData.inputValue.trim() !== "") {
      await addDoc(todoListCollectionCollectionRef, {
        id: addData.id,
        inputValue: addData.inputValue,
        check: addData.check,
      });
      setInputValue("");
      getTodos();
    } else {
      alert("값을 올바르게 입력해주세요");
    }
  };

  const DeleteList = async (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      const todoDoc = doc(db, "todo", id);
      await deleteDoc(todoDoc);
      getTodos();
    }
  };
  const DeleteTotalList = () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
      todoList.map((item) => {
        deleteDoc(doc(db, "todo", item.id));
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

export default todo;
