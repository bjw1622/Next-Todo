import { db } from "../../javascripts/firebaseConfig";
import { deleteDoc, doc, docd } from "firebase/firestore";

export default function deleteTotalTodo(req, res) {
  if (req.method === "POST") {
    let a;
    try {
      req.body.todoList.map((item) => {
        a = deleteDoc(doc(db, "todo", item.id));
      });
      res.status(200).json({ data: a });
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
