import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import HeaderAuth from './header-auth'

function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Input></Input>
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
