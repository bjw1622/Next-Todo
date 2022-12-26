import { db } from "../../javascripts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function addTodo(req, res) {
  const todoListCollectionCollectionRef = collection(db, "todo");
  if (req.method === "GET") {
    try {
      const data = await getDocs(todoListCollectionCollectionRef);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
