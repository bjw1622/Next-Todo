import { db } from "../../javascripts/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default async function handler(req, res) {
  const todoListCollectionCollectionRef = collection(db, "todo");
  if (req.method === "POST") {
    console.log(req.body);
    try {
      await addDoc(todoListCollectionCollectionRef, {
        id: req.body.id,
        inputValue: req.body.inputValue,
        check: req.body.check,
      });
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
