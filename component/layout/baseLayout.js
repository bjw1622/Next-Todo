import Link from "next/link";

const BaseLayout = ({ children }) => {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href={"/todo"}>ToDo</Link>
        </li>
      </ul>
      <ul></ul>
      {children}
    </div>
  );
};

export default BaseLayout;
