import { db } from "../../javascripts/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default async function addTodo(req, res) {
  const todoListCollectionCollectionRef = collection(db, "todo");
  if (req.method === "POST") {
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
