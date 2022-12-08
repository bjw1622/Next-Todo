import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import BoardItem from "../../component/layout/board/BoardItem";
import Link from "next/link";
const BoardIndex = ({ data }) => {
  return (
    <div>
      <div>
        <Form.Select
          aria-label="Default select example"
          style={{ width: "75px", height: "40px", marginRight: "5px" }}
        >
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          style={{ width: "100px", height: "40px", marginRight: "5px" }}
        >
          <option value="Name">작성자</option>
          <option value="Title">제목</option>
        </Form.Select>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{ width: "200px", height: "45px", marginRight: "5px" }}
          >
            <Form.Control type="text" style={{ height: "40px" }} />
          </Form.Group>
        </Form>
        <Button
          variant="info"
          style={{ width: "60px", height: "40px", color: "white" }}
        >
          검색
        </Button>
      </div>
      <Table striped hover>
        <thead style={{ borderStyle: "none" }}>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">제목</th>
            <th className="text-center">작성자</th>
            <th className="text-center">댓글</th>
            <th className="text-center">추천</th>
          </tr>
        </thead>
        <tbody>
          {{ data }.data.map((item, num) => {
            return (
              <BoardItem
                key={item.No}
                number={num + 1}
                boardinfo={item}
              ></BoardItem>
            );
          })}
        </tbody>
      </Table>
      <ButtonGroup
        className="me-2"
        aria-label="First group"
        style={{ display: "block", textAlign: "center" }}
      >
        <Button variant="secondary" style={{ color: "white" }}>
          1
        </Button>
        <Button variant="secondary" style={{ color: "white" }}>
          2
        </Button>
        <Button variant="secondary" style={{ color: "white" }}>
          3
        </Button>
        <Button variant="secondary" style={{ color: "white" }}>
          4
        </Button>
      </ButtonGroup>
      <Link href="/board/Write">
        <Button variant="primary">글쓰기</Button>
      </Link>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      `http://board-www.board.com/Board/IndexBoardList`
    );
    const data = await res.data;
    return { props: { data } };
  } catch (error) {
    return { props: {} };
  }
};

export default BoardIndex;
