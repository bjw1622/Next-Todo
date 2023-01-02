import { db } from "../../javascripts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function addTodo(req, res) {
  const querySnapshot = await getDocs(collection(db, "todo"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  res.status(200).json(data);

  // const todoListCollectionCollectionRef = collection(db, "todo");
  // if (req.method === "GET") {
  //   try {
  //     const data = await getDocs(todoListCollectionCollectionRef);
  //     res.status(200).json(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  // }
}
