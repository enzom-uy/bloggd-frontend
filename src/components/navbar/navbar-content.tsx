// navbar-content.tsx
import type { Session } from "@/lib/auth-client"
import { SearchInput } from "../search-input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"

interface Props {
  session: Session | null
  currentUrl: string
}

type NavItem = { href: string; label: string }

// Datos compartidos
const getNavItems = (session: Session | null) => ({
  authLinks: session
    ? ([{ href: "/profile", label: session.user.username }] as Array<NavItem>)
    : ([
        { href: "/sign-in", label: "Sign in" },
        { href: "/sign-up", label: "Sign up" },
      ] as Array<NavItem>),
  navigationLinks: [{ href: "/games", label: "Games" }] as Array<NavItem>,
})

export const NavbarContent: React.FC<Props> = ({ session }) => {
  const { authLinks, navigationLinks } = getNavItems(session)

  return (
    <>
      {/* Desktop Navigation */}

      <ul className="hidden gap-4 md:flex">
        {authLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {navigationLinks.map((link) => (
        <a key={link.href} href={link.href} className="hidden md:inline">
          {link.label}
        </a>
      ))}

      <SearchInput sessionProp={session} />
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MenuIcon size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {authLinks.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <a href={link.href}>{link.label}</a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {navigationLinks.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <a href={link.href}>{link.label}</a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* TODO: Sign out feature*/}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
