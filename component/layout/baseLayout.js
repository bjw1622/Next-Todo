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
          href={"/board"}
          className={router.pathname.includes("/board") ? "active" : ""}
        >
          Board
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
      {children}
    </>
  );
};

export default BaseLayout;
