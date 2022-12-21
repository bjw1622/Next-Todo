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
    // Process a POST request
  } else {
    try {
      await addDoc(todoListCollectionCollectionRef, {
        // id: addData.id,
        // inputValue: addData.inputValue,
        // check: addData.check,
      });
      res.status(200).json({ data: "111" });
    } catch (error) {
      console.log(error);
    }
  }
}
