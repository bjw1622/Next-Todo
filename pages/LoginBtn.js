import { useSession, signIn, signOut, getSession } from "next-auth/react";
export default function Component() {
  const { data } = useSession();
  if (data) {
    // getSession().then((data) => {
    //   console.log(data.user.email);
    // });
    console.log(data.user.name);

    return (
      <>
        <span style={{ backgroundImage: `url(${data.user.image})` }}></span>
        {data.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>Sign in</button>;
}
