import Link from "next/link";
import { useRouter } from "next/router";
const BaseLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <li>
        <Link href={"/"} className={router.pathname === "/" ? "active" : ""}>
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/todo"}
          className={router.pathname === "/todo" ? "active" : ""}
        >
          Todo
        </Link>
      </li>
      <li>
        <Link
          href={"/LoginBtn"}
          className={router.pathname.includes("/LoginBtn") ? "active" : ""}
        >
          LogIn
        </Link>
      </li>
      <li>
        <Link
          href={"/imageBtn"}
          className={router.pathname.includes("/imageBtn") ? "active" : ""}
        >
          imageBtn
        </Link>
      </li>
      {children}
    </>
  );
};

export default BaseLayout;
