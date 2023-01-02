import { db } from "../../javascripts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function addTodo(req, res) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "todo"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
