import { db } from "../../javascripts/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export default function deleteTotalTodo(req, res) {
  if (req.method === "DELETE") {
    let a;
    try {
      req.body.todoList.map((item) => {
        a = deleteDoc(doc(db, req.body.emailData, item.id));
      });
      res.status(200).json({ data: a });
    } catch (error) {
      console.log(error);
    }
  }
}
