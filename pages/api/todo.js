import { db } from "../../javascripts/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const Todo = async (req, res) => {
  if (req.method === "GET") {
    try {
      const todoListCollectionCollectionRef = collection(
        db,
        req.query.emailData
      );
      const querySnapshot = await getDocs(
        query(todoListCollectionCollectionRef, orderBy("created"))
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json();
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
        created: serverTimestamp(),
      });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(404).json();
    }
  } else if (req.method === "DELETE") {
    try {
      const todoDoc = doc(db, req.body.emailData, req.body.id);
      await deleteDoc(todoDoc);
      res.status(200).json({ data: todoDoc });
    } catch (error) {
      res.status(404).json();
    }
  } else if (req.method === "PUT") {
    try {
      const todoDoc = doc(db, req.body.emailData, req.body.id);
      await updateDoc(todoDoc, { inputValue: req.body.inputValue });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(404).json();
    }
  }
};
export default Todo;
