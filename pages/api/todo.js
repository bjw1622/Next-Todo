import { db } from "../../javascripts/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default async function Todo(req, res) {
  if (req.method === "GET") {
    try {
      console.log(req.query);
      // emaildata 정보 어떻게??
      const querySnapshot = await getDocs(collection(db, req.query.emailData));
      // data 유효성체크 null
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "POST") {
    try {
      const todoListCollectionCollectionRef = collection(
        db,
        req.body.emailData
      );
      await addDoc(todoListCollectionCollectionRef, {
        inputValue: req.body.inputValue,
        check: req.body.check,
      });
      // 값 전달 true or false
      // catch return
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const todoDoc = doc(db, req.body.emailData, req.body.id);
      await deleteDoc(todoDoc);
      res.status(200).json({ data: todoDoc });
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "PUT") {
    try {
      const todoDoc = doc(db, req.body.emailData, req.body.id);
      await updateDoc(todoDoc, { inputValue: req.body.inputValue });
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  }
}
