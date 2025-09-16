import type { Session } from "@/lib/auth-client"
import SearchInput from "../search-input"
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

export const MobileNavbar: React.FC<Props> = ({ session, currentUrl }) => {
  return (
    <ul className="flex items-center gap-4 md:hidden">
      {!session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MenuIcon size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <a href="/sign-in">Sign in</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/sign-up">Sign up</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/games">Games</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {/* TODO: Make this a dropdown menu with user options */}
          <DropdownMenu>
            <DropdownMenuTrigger>{session?.user.username}</DropdownMenuTrigger>
          </DropdownMenu>
        </>
      )}
    </ul>
  )
}

export default MobileNavbar
