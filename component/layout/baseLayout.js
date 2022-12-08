import Link from "next/link";
import { useRouter } from "next/router";

const BaseLayout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <ul>
        <li>
          <Link href={"/"} className={router.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link
            href={"/todo"}
            className={router.pathname === "/todo" ? "active" : ""}
          >
            Todo
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link
            href={"/board"}
            className={router.pathname.includes("/board") ? "active" : ""}
          >
            Board
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link
            href={"/board/LoginBtn"}
            className={router.pathname === "/board/LoginBtn" ? "active" : ""}
          >
            Google LogIn
          </Link>
        </li>
      </ul>
      {children}
      <style jsx>
        {`
          .active {
            color: red;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default BaseLayout;
