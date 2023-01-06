import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/baseLayout.module.scss";
const BaseLayout = ({ children }) => {
  const router = useRouter();
  const { data } = useSession();
  if (data) {
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
          <li className={styles.baseLi}>
            <Link
              href={"/imageBtn"}
              className={router.pathname.includes("/imageBtn") ? "active" : ""}
            >
              <h4>imageBtn</h4>
            </Link>
          </li>
          <div>
            {data.user.name}님 환영합니다
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
        <li className={styles.baseLi}>
          <Link
            href={"/imageBtn"}
            className={router.pathname.includes("/imageBtn") ? "active" : ""}
          >
            <h4>imageBtn</h4>
          </Link>
        </li>
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
      {children}
    </>
  );
};

export default BaseLayout;
