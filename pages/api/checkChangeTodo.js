import { db } from "../../javascripts/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default async function checkChangeTodo(req, res) {
  const todoDoc = doc(db, req.body.emailData, req.body.id);
  if (req.method === "PUT") {
    try {
      await updateDoc(todoDoc, { check: !req.body.check });
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
