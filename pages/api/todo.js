import { db } from "../../javascripts/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default async function Todo(req, res) {
  const todoListCollectionCollectionRef = collection(db, "todo");
  const { data } = useSession();
  if (data === null) {
    console.log("test");
    return;
  }
  if (req.method === "POST") {
    try {
      await addDoc(todoListCollectionCollectionRef, {
        inputValue: req.body.inputValue,
        check: req.body.check,
      });
      // 값 전달 true or false
      // api 하나로 합치기
      // catch return
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "todo"));
      // data 유효성체크 null
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
