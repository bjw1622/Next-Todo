import { db } from "../../javascripts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
const Index = () => {
  const [users, setUsers] = useState([]);
  // firebase collection 가져오기
  const usersCollectionRef = collection(db, "todo");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data.docs);
    };
    getUsers();
  }, []);
  return <div></div>;
};
export default Index;
