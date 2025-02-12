import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { Suspense } from 'react'
import HeaderAuth from './header-auth'
import SearchInput from './search-input'

function Header() {
  return (
    <Navbar className="bg-slate-300 p-6 text-center shadow-md rounded-md">
      <NavbarBrand>
        <Link href="/" className="font-bold text-black">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
