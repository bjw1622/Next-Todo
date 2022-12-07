import axios from "axios";

const BoardIndex = ({ data }) => {
  console.log({ data });
  return (
    <div>
      <a href=""></a>
    </div>
  );
};
export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      `http://board-www.board.com/Board/IndexBoardList`
    );
    const data = await res.data;
    console.log(data);
    return { props: { data } };
  } catch (error) {
    return { props: {} };
  }
};
export default BoardIndex;
