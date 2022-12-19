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
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  console.log(users);
  return <div></div>;
};
export default Index;
