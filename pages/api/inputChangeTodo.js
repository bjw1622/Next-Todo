import { db } from "../../javascripts/firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore";

export default async function inputChangeTodo(req, res) {
  const todoDoc = doc(db, "todo", req.body.id);
  if (req.method === "POST") {
    try {
      await updateDoc(todoDoc, { inputValue: req.body.inputValue });
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
