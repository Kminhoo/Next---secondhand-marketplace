import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

const NavItem = ({ mobile } : { mobile? : boolean }) => {

  const { data: session, status } = useSession()
  console.log({session}, status)

  return (
    <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>
      <li className="py-2 text-center border-b-4 curosr-poiner">
        <Link href='/admin'>Admin</Link>
      </li>

      <li className="py-2 text-center border-b-4 curosr-poiner">
        <Link href='/user'>User</Link>
      </li>

      { session?.user ? (
        <li className="py-2 text-center border-b-4 curosr-poiner">
          <button onClick={() => signOut() }>SignOut</button>
        </li>
      ) : (
      <li className="py-2 text-center border-b-4 curosr-poiner">
        <button onClick={() => signIn() }>SignIn</button>
      </li>
      ) }
    </ul>
  )
}

export default NavItem