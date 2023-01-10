import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/baseLayout.module.scss";
import { firebaseApp } from "../../javascripts/firebaseConfig";
import { useState } from "react";

const BaseLayout = ({ children }) => {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState("");
  const { data } = useSession();
  if (data) {
    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage, `images/${data.user.email}`);
    getDownloadURL(ref(imageRef)).then((url) => {
      setProfileImg(url);
    });
    return (
      <>
        <div className={styles.baseLayout}>
          <li className={styles.baseLi}>
            <Link
              href={"/"}
              className={router.pathname === "/" ? "active" : ""}
            >
              <h4>Home</h4>
            </Link>
          </li>
          <li className={styles.baseLi}>
            <Link
              href={"/todo"}
              className={router.pathname === "/todo" ? "active" : ""}
            >
              <h4>Todo</h4>
            </Link>
          </li>
          <div className={styles.logIn}>
            <Link href={"/imageBtn"}>
              <img
                className={styles.profileImg}
                id="profileImg"
                src={profileImg}
              />
            </Link>
            <span>
              <Link href={"/imageBtn"}>
                <h4 id={styles.profileId}>{data.user.name}</h4>
              </Link>
              님 환영합니다
            </span>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
        {children}
      </>
    );
  }
  return (
    <>
      <div className={styles.baseLayout}>
        <li className={styles.baseLi}>
          <Link href={"/"} className={router.pathname === "/" ? "active" : ""}>
            <h4>Home</h4>
          </Link>
        </li>
        <li className={styles.baseLi}>
          <Link
            href={"/todo"}
            className={router.pathname === "/todo" ? "active" : ""}
          >
            <h4>Todo</h4>
          </Link>
        </li>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </button>
        </div>
      </div>
      {children}
    </>
  );
};

export default BaseLayout;
