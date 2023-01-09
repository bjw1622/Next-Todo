import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { firebaseApp } from "../javascripts/firebaseConfig";

const imageBtn = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const { data } = useSession();
  const storage = getStorage(firebaseApp);
  const imageListRef = ref(storage, "images/");

  const upload = () => {
    if (imageUpload === null) {
      alert("올바른 이미지를 첨부해주세요");
      return;
    }

    // 이미지 업로드하고
    const imageRef = ref(storage, `images/${data.user.email}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        document.querySelector("#profileImg").src = url;
        console.log(url);
      });
    });
    alert("프로필 이미지 변경");
  };
  // 업로드 한 이미지 변경
  listAll(imageListRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {});
    });
  });

  return (
    <>
      <h3>프로필 이미지 변경</h3>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={upload}>업로드</button>
      </div>
    </>
  );
};

export default imageBtn;
