import Link from "next/link"

const NavItem = ({ mobile } : { mobile? : boolean }) => {
  return (
    <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>
      <li className="py-2 text-center border-b-4 curosr-poiner">
        <Link href='/admin'>Admin</Link>
      </li>

      <li className="py-2 text-center border-b-4 curosr-poiner">
        <Link href='/user'>User</Link>
      </li>

      <li className="py-2 text-center border-b-4 curosr-poiner">
        <button>회원가입</button>
      </li>

      <li className="py-2 text-center border-b-4 curosr-poiner">
        <button>로그아웃</button>
      </li>
    </ul>
  )
}

export default NavItem