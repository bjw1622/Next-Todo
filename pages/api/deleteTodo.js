import { db } from "../../javascripts/firebaseConfig";
import { deleteDoc, doc, docd } from "firebase/firestore";

export default async function deleteTotalTodo(req, res) {
  const todoDoc = doc(db, "todo", req.body.id);
  if (req.method === "POST") {
    try {
      await deleteDoc(todoDoc);
      res.status(200).json({ data: todoDoc });
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
