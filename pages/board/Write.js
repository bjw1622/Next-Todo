import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Write = () => {
  const [board, setBoard] = useState({
    Title: "",
    Content: "",
    Email: "bjw1622@gmail.com",
  });

  const addBoardInfo = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };
  const addClick = () => {
    axios.post(`/Board/WriteBoard`, {
      Title: board.Title,
      Content: board.Content,
      Email: board.Email,
    });
  };

  return (
    <form style={{ margin: "0 87.273px", padding: "0 15px" }}>
      <Form.Group className="mb-3">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="제목"
          name="Title"
          onChange={addBoardInfo}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>이메일</Form.Label>
        <Form.Control type="text" placeholder="bjw1622@gmail.com" readOnly />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>글 내용</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="글 내용"
          name="Content"
          onChange={addBoardInfo}
        />
      </Form.Group>
      <Button variant="primary" type="button" onClick={addClick}>
        작성
      </Button>
    </form>
  );
};
export default Write;
