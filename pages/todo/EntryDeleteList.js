const EntryDeleteList = () => {
  const DeleteTotalList = () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
    }
  };
  return (
    <button variant="contained" color="error" onClick={DeleteTotalList}>
      전체 삭제
    </button>
  );
};
export default EntryDeleteList;
