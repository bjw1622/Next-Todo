import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const BaseLayout = ({ children }) => {
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <>
      <div>
        <div id="navbar-layout">
          <li>
            <Link
              href={"/"}
              className={router.pathname === "/" ? "active" : ""}
            >
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
        </div>
        <li>
          <Link
            href={"/LoginBtn"}
            className={router.pathname.includes("/LoginBtn") ? "active" : ""}
          >
            LogIn
          </Link>
        </li>
        <style jsx>
          {`
            .active {
              color: red;
              font-weight: bold;
            }
            #navbar-layout {
              display: flex;
              backgroud: gray;
              top: 0;
            }
            li {
              list-style-type: none;
            }
          `}
        </style>
      </div>
      {children}
    </>
  );
};

export default BaseLayout;
